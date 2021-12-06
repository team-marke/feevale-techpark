const algoliasearch = require('algoliasearch');

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_KEY);

const updateIndexes = async (indexes) => {
  for (const index of indexes) {
    const algoliaIndex = client.initIndex(index.name);
    try {
      await algoliaIndex.replaceAllObjects(index.records);
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = updateIndexes;
