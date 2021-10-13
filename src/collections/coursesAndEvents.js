const fetch = require('node-fetch');
const cacheClient = require('../assets/js/utils/clients/node-cache');

const getCoursesAndEvents = async () => {
  let allCoursesAndEvents = [];
  let count = 0;
  let data = [];
  do {
    const response = await fetch(`https://servico.feevale.br/site/v1/eventos/${count}/100/Pilulas%20Techpark`);
    data = await response.json();
    for (const item of data) {
      allCoursesAndEvents.push({
        title: item.titulo,
        excerpt: item.resumo,
        url: item.tituloURL,
        date: item.dataInicial,
      });
    }
    count++;
  } while (Array.isArray(data) && data.length > 0);
  return allCoursesAndEvents;
};

module.exports = async () => {
  const cachedCoursesAndEvents = cacheClient.get('coursesAndEvents');
  if (cachedCoursesAndEvents == undefined) {
    const newCoursesAndEvents = await getCoursesAndEvents();
    cacheClient.set('coursesAndEvents', newCoursesAndEvents);
    return newCoursesAndEvents;
  }
  return await cachedCoursesAndEvents;
};
