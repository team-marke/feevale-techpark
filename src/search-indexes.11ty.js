class SearchIndexes {
  constructor() {
    this.indexes = [];
  }

  data() {
    return {
      permalink: '/search-indexes.json',
    };
  }

  getIndexPrefix() {
    if (process.env.ELEVENTY_ENV == 'production') {
      return 'prod_';
    }
    return 'dev_';
  }

  addIndex(index) {
    this.indexes.push(index);
  }

  addIndexesFromCollectios(collections) {
    for (const collection of collections) {
      let records = [];
      for (const item of collection.items) {
        if (item.url) {
          records.push({
            objectID: item.id,
            title: item.title,
            url: item.url,
          });
        }
      }
      this.addIndex({
        name: this.getIndexPrefix() + collection.index,
        records: records,
      });
    }
  }

  render(data) {
    this.addIndexesFromCollectios([
      { index: 'TECHNEWS', items: data.collections.techNews },
      { index: 'COURSESANDEVENTS', items: data.collections.coursesAndEvents },
      { index: 'UNITS', items: data.collections.units },
      { index: 'INSTITUTIONALPARTNERS', items: data.collections.institutionalPartners },
      { index: 'BUSINESSPARTNERS', items: data.collections.businessPartners },
      { index: 'COMPANIES', items: data.collections.companies },
    ]);
    return JSON.stringify(this.indexes);
  }
}

module.exports = SearchIndexes;
