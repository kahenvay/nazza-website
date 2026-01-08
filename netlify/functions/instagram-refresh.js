import { schedule } from "@netlify/functions"
import axios from "axios"

const handler = async (event, context) => {
    const currentToken = process.env.GATSBY_INSTA_ACCESS_TOKEN
    const netlifyToken = process.env.NETLIFY_ACCESS_TOKEN
    const siteId = process.env.SITE_ID

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
        console.error("Missing SITE_ID")
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
        // Using Netlify API to update environment variable
        // Endpoint: PUT /api/v1/sites/{site_id}/env/{key}
        await axios.put(
            `https://api.netlify.com/api/v1/sites/${siteId}/env/GATSBY_INSTA_ACCESS_TOKEN`,
            {
                values: [
                    {
                        value: newToken,
                        context: "all", // Update for all contexts (production, deploy-preview, etc)
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${netlifyToken}`,
                    "Content-Type": "application/json",
                },
            }
        )
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
        await axios.post(
            `https://api.netlify.com/api/v1/sites/${siteId}/builds`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${netlifyToken}`,
                },
            }
        )
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
export const handler = schedule("0 0 1 * *", handler)
