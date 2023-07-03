'use strict';
const { pluginId } = require('./pluginId');

const getService = (name) => {
  return strapi.plugin(pluginId).service(name);
};

module.exports = {
  getService,
};
