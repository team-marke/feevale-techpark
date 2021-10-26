/**
 * Filter to get all the companies by a specific areaId
 * @param {Array} companies 
 * @param {String} areaId 
 * @returns {Array} filtered companies array
 */
module.exports = (companies, areaId) => {
  return companies.filter((company) => company.area == areaId);
};
