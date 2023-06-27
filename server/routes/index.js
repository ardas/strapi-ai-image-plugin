module.exports = [
  {
    method: 'GET',
    path: '/config/:key',
    handler: 'image.getConfig',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/config/:key',
    handler: 'image.setConfig',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/image/generate',
    handler: 'image.generate',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/image/balance',
    handler: 'image.balance',
    config: {
      policies: [],
    },
  }
];
