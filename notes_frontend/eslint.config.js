const { createRequire } = require('module');
const requireModule = createRequire(__filename);

// Bridge to the ES module config for environments/CI tools expecting .js config.
module.exports = requireModule('./eslint.config.mjs');
