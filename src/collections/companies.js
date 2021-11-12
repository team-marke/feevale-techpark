require('dotenv').config();
const fetchContent = require('../assets/js/utils/fetch-content');
const cacheClient = require('../assets/js/utils/clients/node-cache');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const getCompanies = async () => {
  const data = await fetchContent('company');
  let companies = [];
  for (const item of data.items) {
    companies.push({
      id: item.sys.id,
      title: item.fields.title,
      description: documentToHtmlString(item.fields.description),
      site: item.fields.site,
      unit: item.fields.unit.sys.id,
      area: item.fields.area.sys.id,
      modality: item.fields.modality.sys.id,
      image: item.fields.cloudinaryImage[0].original_secure_url,
    });
  }
  return companies;
};

module.exports = async () => {
  const cachedCompanies = cacheClient.get('companies');
  if (cachedCompanies == undefined) {
    const newCompanies = await getCompanies();
    cacheClient.set('companies', newCompanies);
    return newCompanies;
  }
  return cachedCompanies;
};
