module.exports = (companies, areaId) => {
  return companies.filter((company) => company.area == areaId);
};
