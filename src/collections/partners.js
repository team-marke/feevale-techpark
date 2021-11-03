require('dotenv').config();
const fetchContent = require('../assets/js/utils/fetch-content');
const cacheClient = require('../assets/js/utils/clients/node-cache');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const slugify = require('slugify');

const getPartners = async () => {
  const data = await fetchContent('partner');
  let partners = [];
  for (const item of data.items) {
    partners.push({
      title: item.fields.title,
      description: documentToHtmlString(item.fields.description),
      type: item.fields.type ? slugify(item.fields.type, { lower: true }) : null,
      site: item.fields.site,
      image: item.fields.cloudinaryImage[0].original_secure_url,
      email: item.fields.email,
      phone: item.fields.phone,
    });
  }
  return partners;
};

module.exports = async () => {
  const cachedPartners = cacheClient.get('partners');
  if (cachedPartners == undefined) {
    const newPartners = await getPartners();
    cacheClient.set('partners', newPartners);
    return newPartners;
  }
  return cachedPartners;
};
