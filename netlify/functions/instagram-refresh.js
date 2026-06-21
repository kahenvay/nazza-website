import axios from "axios"

export default async (req) => {
    const currentToken = Netlify.env.get("GATSBY_INSTA_ACCESS_TOKEN")
    const netlifyToken = Netlify.env.get("NETLIFY_ACCESS_TOKEN")
    const siteId = Netlify.env.get("CUSTOM_SITE_ID") || Netlify.env.get("SITE_ID")
    const buildHook = Netlify.env.get("NETLIFY_CRON_BUILD_HOOK")

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
        return new Response("Error refreshing Instagram token", { status: 500 })
    }

    // 2. Update Netlify Env Var
    try {
        console.log("Updating Netlify Environment Variable...")
        await axios.put(
            `https://api.netlify.com/api/v1/sites/${siteId}/env/GATSBY_INSTA_ACCESS_TOKEN`,
            {
                values: [
                    {
                        value: newToken,
                        context: "all",
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
        return new Response("Error updating Netlify Env Var", { status: 500 })
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
        return new Response("Error triggering build", { status: 500 })
    }

    return new Response("Success", { status: 200 })
}

export const config = {
    schedule: "0 3 * * *",
}
