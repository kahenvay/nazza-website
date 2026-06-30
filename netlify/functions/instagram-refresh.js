import axios from "axios"

console.log("instagram-refresh function file loaded")

const NETLIFY_API_BASE_URL = "https://api.netlify.com/api/v1"
const INSTAGRAM_TOKEN_KEY = "GATSBY_INSTA_ACCESS_TOKEN"
const DEFAULT_NETLIFY_ENV_CONTEXT = "production"

/**
 * Reads an environment variable from Netlify's runtime helper when available,
 * falling back to process.env for local builds and older function runtimes.
 *
 * @param {string} key - Environment variable name.
 * @returns {string | undefined} Environment variable value.
 */
const getEnvVar = key => globalThis.Netlify?.env?.get?.(key) || process.env[key]

/**
 * Gets the Netlify deploy context to update for the refreshed token.
 *
 * Netlify rejects "all" for this account env-var value endpoint, so production
 * is the safe default for the scheduled refresh and production rebuild flow.
 *
 * @returns {string} Netlify deploy context to update.
 */
const getNetlifyEnvContext = () =>
    getEnvVar("NETLIFY_ENV_CONTEXT") || getEnvVar("CONTEXT") || DEFAULT_NETLIFY_ENV_CONTEXT

/**
 * Builds the Netlify API authorization headers used by authenticated requests.
 *
 * @param {string} netlifyToken - Personal access token with access to the site.
 * @returns {{ Authorization: string, "Content-Type": string }} Headers for Netlify API JSON requests.
 */
const getNetlifyHeaders = netlifyToken => ({
    Authorization: `Bearer ${netlifyToken}`,
    "Content-Type": "application/json",
})

/**
 * Masks an identifier so logs can show whether values match without exposing the full value.
 *
 * @param {string | undefined} value - Identifier to mask.
 * @returns {string} Masked identifier for logs.
 */
const maskIdentifier = value => {
    if (!value) {
        return "missing"
    }

    if (value.length <= 8) {
        return `${value.slice(0, 2)}...${value.slice(-2)}`
    }

    return `${value.slice(0, 4)}...${value.slice(-4)}`
}

/**
 * Logs a compact set of response details from failed Netlify API requests.
 *
 * @param {unknown} error - Error thrown by axios.
 * @returns {void}
 */
const logNetlifyApiError = error => {
    if (!error?.response) {
        return
    }

    const { status, statusText, data, headers } = error.response
    console.error("Netlify API status:", status, statusText)
    console.error("Netlify API response:", data)
    console.error("Netlify API request id:", headers?.["x-nf-request-id"] || headers?.["x-request-id"] || "missing")
}

/**
 * Returns the first non-empty API identifier from a list of possible values.
 *
 * @param {...unknown} values - Possible API identifier values.
 * @returns {string | undefined} First non-empty API identifier.
 */
const getFirstIdentifier = (...values) =>
    values.find(value => typeof value === "string" && value.trim())

/**
 * Gets Netlify accounts available to the API token.
 *
 * @param {string} netlifyToken - Personal access token with access to Netlify.
 * @returns {Promise<object[]>} Accounts visible to the token.
 */
const getAccessibleAccounts = async netlifyToken => {
    const response = await axios.get(`${NETLIFY_API_BASE_URL}/accounts`, {
        headers: getNetlifyHeaders(netlifyToken),
    })
    const accounts = Array.isArray(response.data) ? response.data : []
    console.log(`Netlify accounts lookup returned ${accounts.length} account(s).`)

    return accounts
}

/**
 * Finds an account by slug and prefers its stable account id for API paths.
 *
 * @param {object[]} accounts - Accounts visible to the Netlify API token.
 * @param {string | undefined} accountSlug - Account slug from the site response or env vars.
 * @returns {string | undefined} Matching account id or slug.
 */
const getAccountIdentifierBySlug = (accounts, accountSlug) => {
    if (!accountSlug) {
        return undefined
    }

    const matchingAccount = accounts.find(account =>
        getFirstIdentifier(account?.slug, account?.account_slug) === accountSlug
    )

    if (!matchingAccount) {
        console.log(`No accessible account matched slug ${maskIdentifier(accountSlug)}.`)
        return undefined
    }

    const accountIdentifier = getFirstIdentifier(matchingAccount.id, matchingAccount.slug)
    console.log(
        `Matched site account slug to accessible account id: ${maskIdentifier(accountIdentifier)} ` +
            `(slug: ${maskIdentifier(matchingAccount.slug)}, keys: ${Object.keys(matchingAccount || {}).sort().join(", ")})`
    )

    return accountIdentifier
}

/**
 * Gets a Netlify account/team identifier available to the API token.
 *
 * @param {string} netlifyToken - Personal access token with access to the site.
 * @param {string | undefined} preferredAccountSlug - Account slug to match before using the single-account fallback.
 * @returns {Promise<string | undefined>} Account id or slug when it can be determined.
 */
const getAccessibleAccountIdentifier = async (netlifyToken, preferredAccountSlug) => {
    const accounts = await getAccessibleAccounts(netlifyToken)
    const matchingAccountIdentifier = getAccountIdentifierBySlug(accounts, preferredAccountSlug)

    if (matchingAccountIdentifier) {
        return matchingAccountIdentifier
    }

    if (accounts.length !== 1) {
        return undefined
    }

    const accountIdentifier = getFirstIdentifier(accounts[0]?.id, accounts[0]?.slug)
    console.log(
        `Using single accessible Netlify account fallback: ${maskIdentifier(accountIdentifier)} ` +
            `(keys: ${Object.keys(accounts[0] || {}).sort().join(", ")})`
    )

    return accountIdentifier
}

/**
 * Tries to resolve an account slug through the accounts endpoint without blocking fallback behavior.
 *
 * @param {string} netlifyToken - Personal access token with access to Netlify.
 * @param {string | undefined} accountSlug - Account slug to resolve.
 * @returns {Promise<string | undefined>} Matching account id or slug when lookup succeeds.
 */
const safelyResolveAccountSlug = async (netlifyToken, accountSlug) => {
    try {
        return await getAccessibleAccountIdentifier(netlifyToken, accountSlug)
    } catch (error) {
        console.error("Netlify accounts lookup failed while resolving account slug", error.message)
        logNetlifyApiError(error)
        return undefined
    }
}

/**
 * Gets the Netlify account/team identifier that owns a site.
 *
 * Netlify's environment-variable API is account-scoped, even when updating a
 * site-level variable. We keep NETLIFY_ACCOUNT_ID optional by deriving it from
 * the site record when it is not configured.
 *
 * @param {string} siteId - Netlify site id.
 * @param {string} netlifyToken - Personal access token with access to the site.
 * @returns {Promise<string | undefined>} Account/team id or slug for the site.
 */
const getNetlifyAccountId = async (siteId, netlifyToken) => {
    const response = await axios.get(`${NETLIFY_API_BASE_URL}/sites/${siteId}`, {
        headers: getNetlifyHeaders(netlifyToken),
    })
    const siteKeys = Object.keys(response.data || {}).sort()
    const siteAccountId = getFirstIdentifier(response.data?.account_id, response.data?.account?.id)
    const siteAccountSlug = getFirstIdentifier(response.data?.account_slug, response.data?.account?.slug)

    console.log(
        `Netlify site lookup succeeded. Site keys: ${siteKeys.join(", ")}. ` +
            `Candidate account id: ${maskIdentifier(response.data?.account_id)}. ` +
            `Candidate account slug: ${maskIdentifier(response.data?.account_slug)}. ` +
            `Nested account id: ${maskIdentifier(response.data?.account?.id)}. ` +
            `Nested account slug: ${maskIdentifier(response.data?.account?.slug)}.`
    )

    if (siteAccountId) {
        console.log(`Using account id from site lookup: ${maskIdentifier(siteAccountId)}`)
        return siteAccountId
    }

    if (siteAccountSlug) {
        console.log(`Resolving site account slug through /accounts: ${maskIdentifier(siteAccountSlug)}`)
        const accountIdentifier = await safelyResolveAccountSlug(netlifyToken, siteAccountSlug)

        if (accountIdentifier) {
            return accountIdentifier
        }

        console.log(`Falling back to site account slug: ${maskIdentifier(siteAccountSlug)}`)
        return siteAccountSlug
    }

    console.log(
        "Netlify site response did not include account_id/account_slug. " +
            `Available site keys: ${siteKeys.join(", ")}`
    )

    return getAccessibleAccountIdentifier(netlifyToken)
}

/**
 * Updates the site-level Instagram token in Netlify environment variables.
 *
 * The env-var endpoint is account-based. Passing site_id in the query tells
 * Netlify to update the variable for this site rather than for the whole team.
 *
 * @param {object} params - Parameters needed to update the Netlify env var.
 * @param {string} params.accountId - Netlify account/team id.
 * @param {string} params.siteId - Netlify site id.
 * @param {string} params.netlifyToken - Personal access token with env-var write access.
 * @param {string} params.instagramToken - Refreshed Instagram access token.
 * @param {string} params.context - Netlify deploy context to update.
 * @returns {Promise<void>} Resolves when Netlify accepts the update.
 */
const updateInstagramTokenEnvVar = async ({
    accountId,
    siteId,
    netlifyToken,
    instagramToken,
    context,
}) => {
    console.log(
        `Netlify env update request: PATCH /accounts/${maskIdentifier(accountId)}/env/${INSTAGRAM_TOKEN_KEY} ` +
            `with site_id=${maskIdentifier(siteId)} and context=${context}.`
    )

    await axios.patch(
        `${NETLIFY_API_BASE_URL}/accounts/${accountId}/env/${INSTAGRAM_TOKEN_KEY}`,
        {
            context,
            value: instagramToken,
        },
        {
            headers: getNetlifyHeaders(netlifyToken),
            params: {
                site_id: siteId,
            },
        }
    )
}

/**
 * Resolves the configured or inferred account identifier to the best API path value.
 *
 * Account ids are preferred over slugs for Netlify's environment-variable API.
 * If only a slug is configured, we try to translate it through /accounts first.
 *
 * @param {object} params - Parameters needed to resolve the account identifier.
 * @param {string | undefined} params.accountIdEnv - Configured Netlify account id.
 * @param {string | undefined} params.accountSlugEnv - Configured Netlify account slug.
 * @param {string} params.netlifyToken - Personal access token with access to Netlify.
 * @param {string} params.siteId - Netlify site id.
 * @returns {Promise<string | undefined>} Account id or slug for Netlify API paths.
 */
const getNetlifyAccountIdentifier = async ({
    accountIdEnv,
    accountSlugEnv,
    netlifyToken,
    siteId,
}) => {
    if (accountIdEnv) {
        console.log(`Using configured Netlify account id: ${maskIdentifier(accountIdEnv)}`)
        return accountIdEnv
    }

    if (accountSlugEnv) {
        console.log(`Resolving configured Netlify account slug through /accounts: ${maskIdentifier(accountSlugEnv)}`)
        return (await safelyResolveAccountSlug(netlifyToken, accountSlugEnv)) || accountSlugEnv
    }

    const accountIdentifier = await getNetlifyAccountId(siteId, netlifyToken)
    console.log(`Using inferred Netlify account identifier: ${maskIdentifier(accountIdentifier)}`)

    return accountIdentifier
}

/**
 * Refreshes the Instagram long-lived token, stores it back in Netlify, and starts a rebuild.
 *
 * @returns {Promise<Response>} Response describing the scheduled function result.
 */
const refreshInstagramToken = async () => {
    const currentToken = getEnvVar(INSTAGRAM_TOKEN_KEY)
    const netlifyToken = getEnvVar("NETLIFY_ACCESS_TOKEN")
    const customSiteId = getEnvVar("CUSTOM_SITE_ID")
    const reservedSiteId = getEnvVar("SITE_ID")
    const accountIdEnv = getEnvVar("NETLIFY_ACCOUNT_ID")
    const accountSlugEnv = getEnvVar("NETLIFY_ACCOUNT_SLUG")
    const siteId = customSiteId || reservedSiteId
    const buildHook = getEnvVar("NETLIFY_CRON_BUILD_HOOK")
    const netlifyEnvContext = getNetlifyEnvContext()

    console.log("Starting Instagram Token Refresh...")
    console.log(
        "Runtime env debug: " +
            `instagram token present=${Boolean(currentToken)}, ` +
            `netlify token present=${Boolean(netlifyToken)}, ` +
            `custom site id present=${Boolean(customSiteId)}, ` +
            `reserved site id present=${Boolean(reservedSiteId)}, ` +
            `selected site id=${maskIdentifier(siteId)}, ` +
            `account id env present=${Boolean(accountIdEnv)}, ` +
            `account slug env present=${Boolean(accountSlugEnv)}, ` +
            `build hook present=${Boolean(buildHook)}, ` +
            `netlify env context=${netlifyEnvContext}.`
    )

    if (!currentToken) {
        console.error("Missing GATSBY_INSTA_ACCESS_TOKEN")
        return new Response("Missing GATSBY_INSTA_ACCESS_TOKEN", { status: 500 })
    }

    if (!netlifyToken) {
        console.error("Missing NETLIFY_ACCESS_TOKEN")
        return new Response("Missing NETLIFY_ACCESS_TOKEN", { status: 500 })
    }

    if (!siteId) {
        console.error("Missing SITE_ID or CUSTOM_SITE_ID. Please add CUSTOM_SITE_ID to your Netlify Env Vars.")
        return new Response("Missing SITE_ID", { status: 500 })
    }

    let newToken
    try {
        console.log("Refreshing Instagram token...")
        const response = await axios.get(
            "https://graph.instagram.com/refresh_access_token",
            {
                params: {
                    grant_type: "ig_refresh_token",
                    access_token: currentToken,
                },
            }
        )
        newToken = response.data.access_token
        console.log("Token refreshed successfully.")
    } catch (e) {
        console.error("Error refreshing Instagram token", e.message)
        if (e.response) {
            console.error("Instagram API response:", e.response.data)
        }
        return new Response("Error refreshing Instagram token", { status: 500 })
    }

    try {
        console.log("Updating Netlify Environment Variable...")
        const accountId = await getNetlifyAccountIdentifier({
            accountIdEnv,
            accountSlugEnv,
            netlifyToken,
            siteId,
        })

        if (!accountId) {
            throw new Error("Could not determine Netlify account id. Set NETLIFY_ACCOUNT_ID or NETLIFY_ACCOUNT_SLUG.")
        }

        await updateInstagramTokenEnvVar({
            accountId,
            siteId,
            netlifyToken,
            instagramToken: newToken,
            context: netlifyEnvContext,
        })
        console.log("Netlify Environment Variable updated.")
    } catch (e) {
        console.error("Error updating Netlify Env Var", e.message)
        logNetlifyApiError(e)
        return new Response("Error updating Netlify Env Var", { status: 500 })
    }

    try {
        console.log("Triggering new build...")
        if (buildHook) {
            console.log("Using NETLIFY_CRON_BUILD_HOOK...")
            await axios.post(buildHook, {})
        } else {
            console.log("Using Netlify API with SITE_ID...")
            await axios.post(
                `${NETLIFY_API_BASE_URL}/sites/${siteId}/builds`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${netlifyToken}`,
                    },
                }
            )
        }
        console.log("Build triggered successfully.")
    } catch (e) {
        console.error("Error triggering build", e.message)
        if (e.response) {
            console.error("Netlify API response:", e.response.data)
        }
        return new Response("Error triggering build", { status: 500 })
    }

    return new Response("Success", { status: 200 })
}

export default refreshInstagramToken

export const config = {
    schedule: "0 3 * * *",
}
