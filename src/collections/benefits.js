module.exports = (collection) => {
  return [...collection.getFilteredByGlob('./src/data/benefits/*.md')].sort((a, b) => {
    if (a.data.priority > b.data.priority) {
      return 1;
    }
    if (a.data.priority < b.data.priority) {
      return -1;
    }
    return 0;
  });
}