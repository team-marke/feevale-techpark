const fetch = require('node-fetch');
const slugify = require('slugify');
const cacheClient = require('../assets/js/utils/clients/node-cache');
const numberOfPosts = 25;

const getTechNews = async () => {
  let allTechNews = [];
  const response = await fetch(`https://servico.feevale.br/site/v1/noticias/0/${numberOfPosts}/techpark`);
  const data = await response.json();
  for (const item of data) {
    allTechNews.push({
      id: slugify(item.titulo, { lower: true }),
      title: item.titulo,
      excerpt: item.resumo,
      image: item.midia,
      featured: item.destaque,
      url: item.tituloUrl,
      date: item.dataCadastro,
    });
  }
  return allTechNews;
};

module.exports = async () => {
  const cachedTechNews = cacheClient.get('techNews');
  if (cachedTechNews == undefined) {
    const newTechNews = await getTechNews();
    cacheClient.set('techNews', newTechNews);
    return newTechNews;
  }
  return await cachedTechNews;
};
