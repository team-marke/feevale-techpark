const { URL } = require('url');
const path = require('path');
require('dotenv').config()
const cloudinaryClient = require('../assets/js/utils/clients/cloudinary');

/**
 * Creates image url with transformations/url opts using the Cloudinary API.
 * 
 * @param {String} source Filename or File URL
 * @param {cloudinary.TransformationOptions | cloudinary.ConfigAndUrlOptions} opts
 * @returns {string} Image full url to Cloudinary.
 */
module.exports = (source, opts) => {
  let public_id = '';
  let imageUrl = '';
  try {
    let url = new URL(source);
    public_id = path.basename(url.pathname);
    if (url.hostname === 'res.cloudinary.com') {
      imageUrl = cloudinaryClient.v2.url(public_id, { secure: true, ...opts });
    } else {
      imageUrl = source;
    }
  } catch (err) {
    imageUrl = source;
  }
  return imageUrl;
};
