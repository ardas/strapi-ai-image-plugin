'use strict';

const getService = (name) => {
  return strapi.plugin('ai').service(name);
};

module.exports = {
  getService,
};
