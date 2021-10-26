/**
 * Filter to get all the companies by a specific unitId
 * @param {Array} companies 
 * @param {String} unitId 
 * @returns {Array} filtered companies array
 */
module.exports = (companies, unitId) => {
  return companies.filter((company) => company.unit == unitId);
};
