const NodeCache = require('node-cache');

const cache = new NodeCache({ 
  stdTTL: 2400
});

module.exports = cache;
