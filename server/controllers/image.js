'use strict';

const { getService } = require('../utils')

module.exports = {
  async getConfig(ctx) {
    const { key } = ctx.params;
    const settingsService = getService('settings')

    ctx.body = await settingsService.get(key) ?? {}
  },
  async setConfig(ctx) {
    const { key } = ctx.params;
    const config = ctx.request.body;

    const settingsService = getService('settings')

    ctx.body = await settingsService.set(config, key) ?? {}
  },
  async generate(ctx) {
    const settingsService = getService('settings')
    const imageService = getService('image')
    const { apiKey } = await settingsService.get('image')

    //TODO: prepare prompts

    return imageService.generate(ctx.request.body, apiKey)
  },
  async balance(ctx) {
    const settingsService = getService('settings')
    const imageService = getService('image')
    const { apiKey } = await settingsService.get('image')

    ctx.body = {balance: await imageService.getBalance(apiKey)}
  }
};
