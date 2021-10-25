const slugify = require('slugify');

module.exports = {
  metadata: {
    title: null,
    description: null,
  },
  eleventyNavigation: {
    parent: null,
    title: null,
    order: null,
    key: null,
  },
  eleventyComputed: {
    eleventyNavigation: {
      parent: 'units',
      title: (data) => data.unit.title,
      order: (data) => data.unit.order,
      key: (data) => slugify(data.unit.title, { lower: true }),
    },
    metadata: {
      title: (data) => `${data.unit.title} | Parque Tecnológico`,
      description: (data) => data.unit.meta_description,
      image: (data) => data.unit.mastheadImage,
    },
  },
};