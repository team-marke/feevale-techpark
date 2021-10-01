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
      title: (data) => data.unit.name,
      order: (data) => data.unit.order,
      key: (data) => slugify(data.unit.name, { lower: true }),
    },
    metadata: {
      title: (data) => `${data.unit.name} | Parque Tecnológico`,
      description: (data) => data.unit.meta_description,
      image: (data) => data.unit.image,
    },
  },
};