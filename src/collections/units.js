require('dotenv').config();
const fetchContent = require('../assets/js/utils/fetch-content');
const cacheClient = require('../assets/js/utils/clients/node-cache');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const slugify = require('slugify');
const global = require('../data/global/global');

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
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description ? item.fields.description : null,
      priority: item.fields.priority ? item.fields.priority : null,
      meta_description: item.fields.metaDescription ? item.fields.metaDescription : null,
      excerpt: item.fields.excerpt ? documentToHtmlString(item.fields.excerpt) : null,
      mastheadImage: item.fields.mastheadImage ? item.fields.mastheadImage[0].original_secure_url : null,
      cardImage: item.fields.cardImage ? item.fields.cardImage[0].original_secure_url : null,
      phone: item.fields.phone ? item.fields.phone : null,
      address: item.fields.address ? item.fields.address : null,
      content: item.fields.content ? documentToHtmlString(item.fields.content) : null,
      slider: item.fields.slider ? item.fields.slider.map((img) => img.original_secure_url) : null,
      steps: item.fields.steps ? item.fields.steps : null,
      cta: item.fields.callToAction ? item.fields.callToAction : null,
      pathname: `unidades-parque-tecnologico/${slugify(item.fields.title, { lower: true })}/`,
      url: `${global.site_absolute_url}/unidades-parque-tecnologico/${slugify(item.fields.title, { lower: true })}/`,
      icon: '<i class="fas fa-map-marker-alt"></i>',
      label: 'Unidade',
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
