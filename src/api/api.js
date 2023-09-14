const axios = require("axios")

async function getInstagramPhotos(accessToken) {
  try {
    const photos = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`
    )
    // console.log("axios insta photos", photos)
    return photos.data.data
  } catch (error) {
    console.error("Error fetching Instagram photos", error)
  }
}

module.exports = getInstagramPhotos
