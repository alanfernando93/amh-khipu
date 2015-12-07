module.exports = exports = {
  Configuration: require('./configuration'),
  ApiException: require('./api-exception'),
  ApiClient: require('./api-client'),

  client: {
    Banks: require('./client/banks')
  }
};
