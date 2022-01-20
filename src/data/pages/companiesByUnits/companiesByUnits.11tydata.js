const slugify = require('slugify');

module.exports = {
  metadata: {
    title: null,
    description: null,
  },
  eleventyComputed: {
    permalink: (data) => `/nossas-empresas/${slugify(data.unit.title, { lower: true })}/`,
    metadata: {
      title: (data) => `Nossas empresas em ${data.unit.title} | Feevale Techpark`,
      description: (data) => `Conheça as empresas em ${data.unit.title} que fazem parte do ecossistema de inovação do Feevale Techpark filtrando por modalidade e área de atuação. Confira!`,
    }
  },
};