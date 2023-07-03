'use strict';
const { pluginId } = require('./utils/pluginId');

module.exports = async () => {
  try {
    // Register permission actions.
    const actions = [
      {
        section: 'plugins',
        displayName: 'Generate AI image.',
        uid: 'generate',
        pluginName: pluginId,
      },
    ];
    await strapi.admin.services.permission.actionProvider.registerMany(actions);
  } catch (error) {
    strapi.log.error('Bootstrap failed.');
  }
};
