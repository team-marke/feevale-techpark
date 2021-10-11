require('dotenv').config();
const fetchContent = require('../assets/js/utils/fetch-content');
const cacheClient = require('../assets/js/utils/clients/node-cache');

const getAreas = async () => {
  const data = await fetchContent('area');
  let areas = [];
  for (const item of data.items) {
    areas.push({
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      image: item.fields.cloudinaryImage[0].original_secure_url,
    });
  }
  return areas;
};

module.exports = async () => {
  const cachedAreas = cacheClient.get('areas');
  if (cachedAreas == undefined) {
    const newAreas = await getAreas();
    cacheClient.set('areas', newAreas);
    return newAreas;
  }
  return cachedAreas;
};
