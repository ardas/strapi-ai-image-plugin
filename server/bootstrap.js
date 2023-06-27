'use strict';

module.exports = async () => {
  try {
    // Register permission actions.
    const actions = [
      {
        section: 'plugins',
        displayName: 'Generate AI image.',
        uid: 'generate',
        pluginName: 'ai-image-generation',
      },
    ];
    await strapi.admin.services.permission.actionProvider.registerMany(actions);
  } catch (error) {
    strapi.log.error('Bootstrap failed.');
  }
};
