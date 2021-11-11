require('dotenv').config();
const fetchContent = require('../assets/js/utils/fetch-content');
const cacheClient = require('../assets/js/utils/clients/node-cache');

const getModalities = async () => {
  const data = await fetchContent('modality');
  let modaliteis = [];
  for (const item of data.items) {
    modaliteis.push({
      id: item.sys.id,
      title: item.fields.title,
    });
  }
  return modaliteis;
};

module.exports = async () => {
  const cachedModaliteis = cacheClient.get('modaliteis');
  if (cachedModaliteis == undefined) {
    const newModaliteis = await getModalities();
    cacheClient.set('modaliteis', newModaliteis);
    return newModaliteis;
  }
  return cachedModaliteis;
};