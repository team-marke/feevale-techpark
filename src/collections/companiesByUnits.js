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
      unit: item.fields.unit.sys.id,
      area: item.fields.area.sys.id,
      modality: item.fields.modality,
      image: item.fields.cloudinaryImage[0].original_secure_url,
    });
  }
  return companies;
};

const getUnits = async () => {
  const data = await fetchContent('unit');
  let units = [];
  for (const item of data.items) {
    units.push({
      id: item.sys.id,
      title: item.fields.title,
    });
  }
  return units;
};

const getCompaniesByUnits = async () => {
  const companies = await getCompanies();
  const units = await getUnits();
  const companiesByUnitsArr = [];
  for (const unit of units) {
    companiesByUnitsArr.push({
      id: unit.id,
      title: unit.title,
      companies: companies.filter((company) => company.unit == unit.id),
    });
  }
  return companiesByUnitsArr;
};

module.exports = async () => {
  const cachedCompaniesByUnits = cacheClient.get('companiesByUnits');
  if (cachedCompaniesByUnits == undefined) {
    const newCompaniesByUnits = await getCompaniesByUnits();
    cacheClient.set('companiesByUnits', newCompaniesByUnits);
    return newCompaniesByUnits;
  }
  return cachedCompaniesByUnits;
};
