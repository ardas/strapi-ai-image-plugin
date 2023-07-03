'use strict';
const { pluginId } = require('../utils/pluginId');

module.exports = ({ strapi }) => ({
  set(value, key) {
    return strapi.store.set(({ type: 'plugin', name: pluginId, key, value }));
  },
  get(key) {
    return strapi.store.get({ type: 'plugin', name: pluginId, key });
  },
});
