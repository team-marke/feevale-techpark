require('dotenv').config();
const fetchContent = require('../assets/js/utils/fetch-content');
const cacheClient = require('../assets/js/utils/clients/node-cache');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const slugify = require('slugify');

const orderUnits = (units) => {
  return units.sort((a, b) => {
    if (a.priority > b.priority) {
      return 1;
    }
    if (a.priority < b.priority) {
      return -1;
    }
    return 0;
  });
};

const getUnits = async () => {
  const data = await fetchContent('unit');
  let units = [];
  for (const item of data.items) {
    units.push({
      title: item.fields.title,
      priority: item.fields.priority,
      meta_description: item.fields.metaDescription,
      excerpt: documentToHtmlString(item.fields.excerpt),
      phone: item.fields.phone,
      address: item.fields.address,
      mastheadImage: item.fields.mastheadImage[0].original_secure_url,
      cardImage: item.fields.cardImage
        ? item.fields.cardImage[0].original_secure_url
        : item.fields.mastheadImage[0].original_secure_url,
      content: documentToHtmlString(item.fields.content),
      steps: item.fields.steps ? item.fields.steps : null,
      pathname: `unidades-parque-tecnologico/${slugify(item.fields.title, { lower: true })}/`,
    });
  }
  return orderUnits(units);
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
