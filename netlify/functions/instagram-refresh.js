import axios from "axios"

console.log("instagram-refresh function file loaded")

const NETLIFY_API_BASE_URL = "https://api.netlify.com/api/v1"
const INSTAGRAM_TOKEN_KEY = "GATSBY_INSTA_ACCESS_TOKEN"

/**
 * Reads an environment variable from Netlify's runtime helper when available,
 * falling back to process.env for local builds and older function runtimes.
 *
 * @param {string} key - Environment variable name.
 * @returns {string | undefined} Environment variable value.
 */
const getEnvVar = key => globalThis.Netlify?.env?.get?.(key) || process.env[key]

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
 * Finds a usable Netlify account identifier in a site API response.
 *
 * Netlify API paths need an account id or slug. Display names can look useful
 * in logs, but they are not reliable API identifiers and can cause 401s.
 *
 * @param {object} site - Netlify site response body.
 * @returns {string | undefined} Account id or slug.
 */
const getAccountIdentifierFromSite = site =>
    getFirstIdentifier(
        site?.account_id,
        site?.account_slug,
        site?.account?.id,
        site?.account?.slug
    )

/**
 * Gets a Netlify account/team identifier available to the API token.
 *
 * @param {string} netlifyToken - Personal access token with access to the site.
 * @returns {Promise<string | undefined>} Account id or slug when exactly one account is available.
 */
const getSingleAccessibleAccountIdentifier = async netlifyToken => {
    const response = await axios.get(`${NETLIFY_API_BASE_URL}/accounts`, {
        headers: getNetlifyHeaders(netlifyToken),
    })
    const accounts = Array.isArray(response.data) ? response.data : []
    console.log(`Netlify accounts lookup returned ${accounts.length} account(s).`)

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
    const siteAccountIdentifier = getAccountIdentifierFromSite(response.data)

    console.log(
        `Netlify site lookup succeeded. Site keys: ${siteKeys.join(", ")}. ` +
            `Candidate account id: ${maskIdentifier(response.data?.account_id)}. ` +
            `Candidate account slug: ${maskIdentifier(response.data?.account_slug)}. ` +
            `Nested account id: ${maskIdentifier(response.data?.account?.id)}. ` +
            `Nested account slug: ${maskIdentifier(response.data?.account?.slug)}.`
    )

    if (siteAccountIdentifier) {
        console.log(`Using account identifier from site lookup: ${maskIdentifier(siteAccountIdentifier)}`)
        return siteAccountIdentifier
    }

    console.log(
        "Netlify site response did not include account_id/account_slug. " +
            `Available site keys: ${siteKeys.join(", ")}`
    )

    return getSingleAccessibleAccountIdentifier(netlifyToken)
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
 * @returns {Promise<void>} Resolves when Netlify accepts the update.
 */
const updateInstagramTokenEnvVar = async ({
    accountId,
    siteId,
    netlifyToken,
    instagramToken,
}) => {
    console.log(
        `Netlify env update request: PATCH /accounts/${maskIdentifier(accountId)}/env/${INSTAGRAM_TOKEN_KEY} ` +
            `with site_id=${maskIdentifier(siteId)} and context=all.`
    )

    await axios.patch(
        `${NETLIFY_API_BASE_URL}/accounts/${accountId}/env/${INSTAGRAM_TOKEN_KEY}`,
        {
            context: "all",
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
    const configuredAccountId = accountIdEnv || accountSlugEnv
    const buildHook = getEnvVar("NETLIFY_CRON_BUILD_HOOK")

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
            `build hook present=${Boolean(buildHook)}.`
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
        const accountId = configuredAccountId || (await getNetlifyAccountId(siteId, netlifyToken))

        if (!accountId) {
            throw new Error("Could not determine Netlify account id. Set NETLIFY_ACCOUNT_ID or NETLIFY_ACCOUNT_SLUG.")
        }

        console.log(
            configuredAccountId
                ? `Using configured Netlify account identifier: ${maskIdentifier(accountId)}`
                : `Using inferred Netlify account identifier: ${maskIdentifier(accountId)}`
        )

        await updateInstagramTokenEnvVar({
            accountId,
            siteId,
            netlifyToken,
            instagramToken: newToken,
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
