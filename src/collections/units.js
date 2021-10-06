require('dotenv').config();
const contentfulClient = require('../assets/js/utils/clients/contentful');
const cacheClient = require('../assets/js/utils/clients/node-cache');
const slugify = require('slugify');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const fetchUnits = async () => {
  return await contentfulClient.getEntries({ content_type: 'unit' });
};

const createUnitsArray = async () => {
  const data = await fetchUnits();
  let unitsArray = [];
  for (const item of data.items) {
    unitsArray.push({
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
  return unitsArray;
};

module.exports = async () => {
  if (process.env.ELEVENTY_ENV == 'production') {
    console.log('Retornando sem cache...');
    return await createUnitsArray();
  }
  const cachedUnits = cacheClient.get('units');
  if (cachedUnits == undefined) {
    const unitsArray = await createUnitsArray();
    cacheClient.set('units', unitsArray);
    return unitsArray;
  }
  return cachedUnits;
};