require('dotenv').config();
const contentfulClient = require('../assets/js/utils/clients/contentful');
const cacheClient = require('../assets/js/utils/clients/node-cache');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const fetchCompanies = async () => {
  return await contentfulClient.getEntries({ content_type: 'company' });
};

const createCompaniesArray = async () => {
  const data = await fetchCompanies();
  let companiesArray = [];
  for (const item of data.items) {
    companiesArray.push({
      title: item.fields.title,
      description: documentToHtmlString(item.fields.description),
      unit: item.fields.unit,
      area: item.fields.area,
      modality: item.fields.modality,
      image: item.fields.cloudinaryImage[0].original_secure_url,
    });
  }
  return companiesArray;
};

module.exports = async () => {
  if (process.env.ELEVENTY_ENV == 'main') {
    return await createCompaniesArray();
  }
  const cachedCompanies = cacheClient.get('companies');
  if (cachedCompanies == undefined) {
    const companiesArray = await createCompaniesArray();
    cacheClient.set('companies', companiesArray);
    return companiesArray;
  }
  return cachedCompanies;
};
