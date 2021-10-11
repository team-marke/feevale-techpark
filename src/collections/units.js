require('dotenv').config();
const fetchContent = require('../assets/js/utils/fetch-content');
const cacheClient = require('../assets/js/utils/clients/node-cache');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const slugify = require('slugify');

const getUnits = async () => {
  const data = await fetchContent('unit');
  let units = [];
  for (const item of data.items) {
    units.push({
      title: item.fields.title,
      menu_order: item.fields.menuOrder,
      meta_description: item.fields.metaDescription,
      excerpt: documentToHtmlString(item.fields.excerpt),
      image: item.fields.cloudinaryImage[0].original_secure_url,
      phone: item.fields.phone,
      address: item.fields.address,
      pathname: `unidades-parque-tecnologico/${slugify(item.fields.title, { lower: true })}/` 
    });
  }
  return units;
};

module.exports = async () => {
  const cachedUnits = cacheClient.get('units');
  if (cachedUnits == undefined) {
    const newUnits = await getUnits();
    cacheClient.set('units', newUnits);
    return newUnits;
  }
  return cachedUnits;
};