module.exports = (companies, unitId) => {
  return companies.filter((company) => company.unit == unitId);
};
