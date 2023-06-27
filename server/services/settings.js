'use strict';

module.exports = ({ strapi }) => ({
  set(value, key) {
    return strapi.store.set(({ type: 'plugin', name: 'ai', key, value }));
  },
  get(key) {
    return strapi.store.get({ type: 'plugin', name: 'ai', key });
  },
});
