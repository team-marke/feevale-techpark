require('dotenv').config();
const slugify = require('slugify');
const contenful = require('contentful');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const client = contenful.createClient({
  space: 'd0y97x3ocvkp',
  environment: 'master',
  accessToken: process.env.CONTENTFUL_TOKEN,
});

module.exports = async () => {
  const entries = await client.getEntries({ content_type: 'unit' });
  let units = [];
  for (const item of entries.items) {
    units.push({
      name: item.fields.name,
      menu_order: item.fields.menuOrder,
      meta_description: item.fields.metaDescription,
      excerpt: documentToHtmlString(item.fields.excerpt),
      image: item.fields.cloudinaryImage[0].original_secure_url,
      phone: item.fields.phone,
      address: item.fields.address,
      pathname: `unidades-parque-tecnologico/${slugify(item.fields.name, { lower: true })}/` 
    });
  }
  return units;
};