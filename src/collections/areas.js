require('dotenv').config();
const contenful = require('contentful');

const client = contenful.createClient({
  space: 'd0y97x3ocvkp',
  environment: 'master',
  accessToken: process.env.CONTENTFUL_TOKEN,
});

module.exports = async () => {
  const entries = await client.getEntries({ content_type: 'area' });
  let units = [];
  for (const item of entries.items) {
    units.push({
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      image: item.fields.cloudinaryImage[0].original_secure_url,
    });
  }
  return units;
};
