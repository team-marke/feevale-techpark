require('dotenv').config();
const contenful = require('contentful');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const client = contenful.createClient({
  space: 'd0y97x3ocvkp',
  environment: 'master',
  accessToken: process.env.CONTENTFUL_TOKEN,
});

module.exports = async () => {
  const entries = await client.getEntries({ content_type: 'company' });
  let companies = [];
  for (const item of entries.items) {
    companies.push({
      name: item.fields.name,
      description: documentToHtmlString(item.fields.description),
      unit_id: item.fields.unitId,
      area: item.fields.area,
      modality: item.fields.modality,
      image: item.fields.cloudinaryImage[0].original_secure_url,
    });
  }
  return companies;
};
