module.exports = (entryId, collection) => {
  return collection.find((entry) => entry.id == entryId);
};