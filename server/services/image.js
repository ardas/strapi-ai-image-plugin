'use strict'
const fetch = require('node-fetch')

module.exports = ({ strapi }) => ({
  async getBalance (apiKey) {
    const response = await fetch(`https://api.stability.ai/v1/user/balance`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${apiKey}` },
    })
    const { credits } = await response.json();

    if (credits === undefined){
      throw new Error('Can\'t get balance!');
    }

    return credits
  },
  async generate ({ prompt, height, width, cfgScale, style, samples }, apiKey) {
    //TODO: add engine choosing on frontend
    const response = await fetch(`https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image`, {
      method: 'POST',
      body: JSON.stringify({
        height: parseInt(height),
        width: parseInt(width),
        samples: parseInt(samples),
        cfg_scale: parseInt(cfgScale),
        style_preset: !style ? null : style,
        text_prompts: extractPrompts(prompt)
      }),
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
    })

    const {
      artifacts,
    } = await response.json()

    return { images: artifacts.map((i) => i.base64) }
  },
})

const extractPrompts = (prompt) => {
  //TODO: implement weight logic on frontend
  return prompt.split(',').map((i) => {return { weight: 1, text: i.trim() }})
}
