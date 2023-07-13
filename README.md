# Strapi plugin strapi-ai-image-plugin

## Features
```
Generation using "stability.ai"
Permission for generation
```

## Installation

To install this plugin, you need to add an NPM dependency to your Strapi application.

```sh
# Using Yarn
yarn add strapi-ai-image-plugin

# Or using NPM
npm install strapi-ai-image-plugin
```

`./config/plugins.js`

## Plugin Configuration

```js
module.exports = ({ env }) => ({
  // ...
  'strapi-ai-image-plugin': {
    enabled: true
  },
  // ...
});
```

## API Configuration
```
1. Go to the settings 
2. Ai Image Generation section. 
3. Insert your stability.ai API key and configure default parameters.
```

## Image generation

```
On any collection or single type press "generate" button on the right side.
Fill all appropriate fields and select interested image.
Use generated image in upload library "ai" page
```