require('dotenv').config();
const fetchContent = require('../assets/js/utils/fetch-content');
const cacheClient = require('../assets/js/utils/clients/node-cache');
const slugify = require('slugify');

const getInstitutionalPartner = async () => {
  const data = await fetchContent('institutionalPartner');
  let institutionalPartners = [];
  for (const item of data.items) {
    institutionalPartners.push({
      title: item.fields.title,
      type: slugify(item.fields.type, { lower: true }),
      site: item.fields.site,
      image: item.fields.image[0].original_secure_url,
    });
  }
  return institutionalPartners;
};

module.exports = async () => {
  const cachedInstitutionalPartners = cacheClient.get('institutionalPartners');
  if (cachedInstitutionalPartners == undefined) {
    const newInstitutionalPartners = await getInstitutionalPartner();
    cacheClient.set('institutionalPartners', newInstitutionalPartners);
    return newInstitutionalPartners;
  }
  return cachedInstitutionalPartners;
};
