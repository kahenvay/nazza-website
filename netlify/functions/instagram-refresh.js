import { schedule } from "@netlify/functions"
import axios from "axios"

console.log("instagram-refresh function file loaded")

const NETLIFY_API_BASE_URL = "https://api.netlify.com/api/v1"
const INSTAGRAM_TOKEN_KEY = "GATSBY_INSTA_ACCESS_TOKEN"

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
 * @param {object} event - Netlify scheduled function event.
 * @param {object} context - Netlify function runtime context.
 * @returns {Promise<{statusCode: number, body: string}>} HTTP-style result for the function run.
 */
const refreshInstagramToken = async (event, context) => {
    const currentToken = process.env[INSTAGRAM_TOKEN_KEY]
    const netlifyToken = process.env.NETLIFY_ACCESS_TOKEN
    // Netlify functions don't have access to the reserved SITE_ID automatically, so we allow CUSTOM_SITE_ID
    const siteId = process.env.CUSTOM_SITE_ID || process.env.SITE_ID
    const configuredAccountId = process.env.NETLIFY_ACCOUNT_ID
    const buildHook = process.env.NETLIFY_CRON_BUILD_HOOK

    console.log("Starting Instagram Token Refresh...")

    if (!currentToken) {
        console.error("Missing GATSBY_INSTA_ACCESS_TOKEN")
        return {
            statusCode: 500,
            body: "Missing GATSBY_INSTA_ACCESS_TOKEN",
        }
    }
    if (!netlifyToken) {
        console.error("Missing NETLIFY_ACCESS_TOKEN")
        return {
            statusCode: 500,
            body: "Missing NETLIFY_ACCESS_TOKEN",
        }
    }
    if (!siteId) {
        console.error("Missing SITE_ID or CUSTOM_SITE_ID. Please add CUSTOM_SITE_ID to your Netlify Env Vars.")
        return {
            statusCode: 500,
            body: "Missing SITE_ID",
        }
    }

    // 1. Refresh Instagram Token
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
        return {
            statusCode: 500,
            body: "Error refreshing Instagram token",
        }
    }

    // 2. Update Netlify Env Var
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
        return {
            statusCode: 500,
            body: "Error updating Netlify Env Var",
        }
    }

    // 3. Trigger Build
    try {
        console.log("Triggering new build...")
        if (buildHook) {
            console.log("Using NETLIFY_CRON_BUILD_HOOK...")
            await axios.post(buildHook, {})
        } else {
            console.log("Using Netlify API with SITE_ID...")
            await axios.post(
                `https://api.netlify.com/api/v1/sites/${siteId}/builds`,
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
        return {
            statusCode: 500,
            body: "Error triggering build",
        }
    }

    return {
        statusCode: 200,
        body: "Success",
    }
}

// Run every month on the 1st at 00:00 UTC
// export const handler = schedule("0 0 1 * *", refreshInstagramToken)

// Run every day at 3:00 AM
export const handler = schedule("0 3 * * *", refreshInstagramToken)
