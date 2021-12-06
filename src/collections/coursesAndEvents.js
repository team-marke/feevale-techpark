const fetch = require('node-fetch');
const slugify = require('slugify');
const cacheClient = require('../assets/js/utils/clients/node-cache');
const numberOfPosts = 6;

const getCoursesAndEvents = async () => {
  let allCoursesAndEvents = [];
  const response = await fetch(`https://servico.feevale.br/site/v1/eventos/0/${numberOfPosts}/Pilulas%20Techpark`);
  const data = await response.json();
  for (const item of data) {
    allCoursesAndEvents.push({
      id: slugify(item.titulo, { lower: true }),
      title: item.titulo,
      excerpt: item.resumo,
      url: item.tituloURL,
      date: item.dataInicial,
      icon: '<i class="far fa-calendar-alt"></i>',
      label: 'Curso/Evento',
    });
  }
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
