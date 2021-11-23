require('dotenv').config();
const { google } = require('googleapis');
const cacheClient = require('../assets/js/utils/clients/node-cache');

const getVideos = async () => {
  let videos = [];
  try {
    const response = await google.youtube('v3').search.list({
      key: process.env.GOOGLE_KEY,
      channelId: process.env.YOUTUBE_CHANNEL_ID,
      part: 'snippet',
      order: 'date',
      maxResults: 7,
    });
    const items = response.data.items;
    for (const item of items) {
      videos.push({
        id: item.id.videoId,
        title: item.snippet.title
      });
    }
  } catch (error) {
    console.error(error);
  }
  return videos;
};

module.exports = async () => {
  const cachedVideos = cacheClient.get('videos');
  if (cachedVideos == undefined) {
    const newVideos = await getVideos();
    cacheClient.set('videos', newVideos);
    return newVideos;
  }
  return cachedVideos;
};
