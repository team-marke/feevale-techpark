require('dotenv').config();
const contentful = require('contentful');

module.exports = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
  environment: !(process.env.ELEVENTY_ENV == 'main') ? 'develop' : 'main',
});