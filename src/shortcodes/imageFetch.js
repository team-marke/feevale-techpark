const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/**
 * Creates image markup with transformations/url using the Cloudinary API.
 *
 * @param {source} File URL.
 * @param {ImageTransformationOptions} transformOpts
 * @param {ImageTagOptions} tagOpts
 * @returns {string} <img> markup tag.
 */
module.exports = (source, transformOpts, tagOpts) => {
  tagOpts.secure = 'true'
  tagOpts.type = 'fetch',
  tagOpts.transformation = transformOpts
  return cloudinary.v2.image(source, tagOpts);
}
