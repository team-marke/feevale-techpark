module.exports = (collection) => {
  return [...collection.getFilteredByGlob('./src/data/pages/units/*.md')].sort((a, b) => {
    if (a.data.eleventyNavigation.order > b.data.eleventyNavigation.order) {
      return 1;
    }
    if (a.data.eleventyNavigation.order < b.data.eleventyNavigation.order) {
      return -1;
    }
    return 0;
  });
}