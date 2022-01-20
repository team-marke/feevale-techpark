require('dotenv').config();
const fetchContent = require('../assets/js/utils/fetch-content');
const cacheClient = require('../assets/js/utils/clients/node-cache');
const site = require('../data/global/site.json')

const getCompanies = async () => {
  const data = await fetchContent('company');
  let companies = [];
  for (const item of data.items) {
    companies.push({
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      site: item.fields.site,
      unit: item.fields.unit ? item.fields.unit.sys.id : null,
      area: item.fields.area.sys.id,
      modality: item.fields.modality.sys.id,
      image: item.fields.cloudinaryImage[0] ? item.fields.cloudinaryImage[0].original_secure_url : site.logos.techpark.dark,
      url: item.fields.site ? `https://${item.fields.site}` : null,
      icon: '<i class="far fa-building"></i>',
      label: 'Empresa Parceira',
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
