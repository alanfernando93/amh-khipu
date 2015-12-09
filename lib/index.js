module.exports = {
  Configuration: require('./configuration'),
  Exception: require('./exception'),
  Client: require('./client'),

  currencies: require('./constants/currencies'),
  methods: require('./constants/methods'),

  clients: {
    Payments: require('./clients/payments'),
    Banks: require('./clients/banks')
  }
};
