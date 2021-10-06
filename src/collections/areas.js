require('dotenv').config();
const contentfulClient = require('../assets/js/utils/clients/contentful');
const cacheClient = require('../assets/js/utils/clients/node-cache');

const fetchAreas = async () => {
  return await contentfulClient.getEntries({ content_type: 'area' });
};

const createAreasArray = async () => {
  const data = await fetchAreas();
  let areasArray = [];
  for (const item of data.items) {
    areasArray.push({
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      image: item.fields.cloudinaryImage[0].original_secure_url,
    });
  }
  return areasArray;
};

module.exports = async () => {
  if (process.env.ELEVENTY_ENV == 'production') {
    return await createAreasArray();
  }
  const cachedAreas = cacheClient.get('areas');
  if (cachedAreas == undefined) {
    const areasArray = await createAreasArray();
    cacheClient.set('areas', areasArray);
    return areasArray;
  }
  return cachedAreas;
};
