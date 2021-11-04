require('dotenv').config();
const fetchContent = require('../assets/js/utils/fetch-content');
const cacheClient = require('../assets/js/utils/clients/node-cache');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const getBusinessPartners = async () => {
  const data = await fetchContent('businessPartner');
  let businessPartners = [];
  for (const item of data.items) {
    businessPartners.push({
      title: item.fields.title,
      description: documentToHtmlString(item.fields.description),
      site: item.fields.site,
      email: item.fields.email,
      phone: item.fields.phone,
      image: item.fields.image[0].original_secure_url,
    });
  }
  return businessPartners;
};

module.exports = async () => {
  const cachedBusinessPartners = cacheClient.get('businessPartners');
  if (cachedBusinessPartners == undefined) {
    const newBusinessPartners = await getBusinessPartners();
    cacheClient.set('businessPartners', newBusinessPartners);
    return newBusinessPartners;
  }
  return cachedBusinessPartners;
};
