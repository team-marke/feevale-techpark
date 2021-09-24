module.exports = (collection) => {
  const companiesCollection = [...collection.getFilteredByGlob('./src/data/pages/companies/*.md')];
  return companiesCollection;
}