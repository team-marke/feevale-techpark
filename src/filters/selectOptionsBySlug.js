const slugify = require('slugify')

module.exports = (collection) => {
  const newObj = {};
  for (const entry of collection) {
    newObj[entry.title] = slugify(entry.title, { lower: true });
  }
  return newObj;
};
