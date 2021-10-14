const { URL } = require('url');
const path = require('path');
const cloudinaryClient = require('../assets/js/utils/clients/cloudinary');
require('dotenv').config();

/**
 * Creates image markup with transformations/url using the Cloudinary API.
 *
 * @param {string} source Filename or File URL.
 * @param {cloudinary.ImageTransformationAndTagsOptions} opts
 * @returns {string} <img> markup tag.
 */
module.exports = (source, opts) => {
  let filename = '';
  try {
    let url = new URL(source);
    if (url.pathname.includes('image/')) {
      filename = path.basename(url.pathname);
    } else {
      if (url.hostname === 'res.cloudinary.com') {
        filename = path.basename(url.pathname);
      } else if (opts.type == 'fetch') {
        filename = source;
      } else {
        let attributesString = '';
        for (const [key, value] of Object.entries(opts)) {
          attributesString += ` ${key}="${value}"`;
        }
        return `
          <img src="${source}"${attributesString}>
        `;
      }
    }
  } catch (err) {
    filename = source;
  }
  let imageHtml = cloudinaryClient.v2.image(filename, { secure: true, ...opts });
  return imageHtml;
};
