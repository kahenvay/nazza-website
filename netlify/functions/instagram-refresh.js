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
 * Gets the Netlify account/team id that owns a site.
 *
 * Netlify's environment-variable API is account-scoped, even when updating a
 * site-level variable. We keep NETLIFY_ACCOUNT_ID optional by deriving it from
 * the site record when it is not configured.
 *
 * @param {string} siteId - Netlify site id.
 * @param {string} netlifyToken - Personal access token with access to the site.
 * @returns {Promise<string>} Account/team id for the site.
 */
const getNetlifyAccountId = async (siteId, netlifyToken) => {
    const response = await axios.get(`${NETLIFY_API_BASE_URL}/sites/${siteId}`, {
        headers: getNetlifyHeaders(netlifyToken),
    })

    return response.data.account_id
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
    const siteId = getEnvVar("CUSTOM_SITE_ID") || getEnvVar("SITE_ID")
    const configuredAccountId = getEnvVar("NETLIFY_ACCOUNT_ID")
    const buildHook = getEnvVar("NETLIFY_CRON_BUILD_HOOK")

    console.log("Starting Instagram Token Refresh...")

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
            throw new Error("Could not determine Netlify account id")
        }

        await updateInstagramTokenEnvVar({
            accountId,
            siteId,
            netlifyToken,
            instagramToken: newToken,
        })
        console.log("Netlify Environment Variable updated.")
    } catch (e) {
        console.error("Error updating Netlify Env Var", e.message)
        if (e.response) {
            console.error("Netlify API response:", e.response.data)
        }
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
