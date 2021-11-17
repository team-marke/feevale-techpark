module.exports = (collection) => {
  const newObj = {};
  for (const entry of collection) {
    newObj[entry.title] = entry.id;
  }
  return newObj;
};
