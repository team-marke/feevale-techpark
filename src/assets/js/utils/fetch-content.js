const contentfulClient = require('./clients/contentful');

/**
 * Function to fetch any content using Contentful client
 * @param {String} contentType 
 * @returns {EntryCollection}
 */
const fetchContent = async (contentType) => {
  return await contentfulClient.getEntries({ content_type: contentType });
};

module.exports = fetchContent;