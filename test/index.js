'use strict';

var expect = require('chai').expect;
var khipu = require('../');

var config, client;

var stored = [];

describe('Fi Khipu', function () {

  before(function () {
    var json = require('./config.json');

    config = new khipu.Configuration(json.receiverId, json.secret);
    client = new khipu.ApiClient(config);

    config.sslVerification = false;
  });

  describe('object', function () {
    it('should be an object', function () {
      expect(khipu).to.be.an('object');
    });
  });

  describe('banks', function () {
    it('should retrieve banks list', function (done) {
      var banks = new khipu.client.Banks(client);

      banks.list(function (banks) {
        if (Array.isArray(banks) && banks.length) {
          console.log('\nBanks:\n');
          console.dir(banks);
          console.log('\n');
          return done();
        }

        done(new Error("No banks obtained!"));
      });
    });
  });

  describe('payments', function () {
    it('should create a payment', function (done) {
      var payments = new khipu.client.Payments(client);

      payments.create({
        subject: 'Test payment from fi-khipu at ' + new Date(),
        /* Khipu only accepts CLP for now */
        // currency: khipu.currencies.CLP,
        amount: 100
      }, function (payment) {
        if (payment) {
          console.log('\nCreated Payment:\n');
          console.dir(payment);
          console.log('\n');

          stored.push(payment);

          return done();
        }

        done(new Error("No payment obtained!"));
      });
    });

    it('should create retrieve a payment by its ID', function (done) {
      var payments = new khipu.client.Payments(client);

      payments.getById(stored[0].payment_id, function (payment) {
        if (payment) {
          console.log('\nRetrieved payment by ID:\n');

          console.dir(payment);
          console.log('\n');

          stored.push(payment);

          return done();
        }

        done(new Error("No payment obtained!"));
      });
    });

    it('should retrieve a payment by its notification token', function (done) {
      var payments = new khipu.client.Payments(client);

      payments.getByNotificationToken(stored[1].notification_token, function (payment) {
        if (payment) {
          console.log('\nRetrieved payment by notification token:\n');
          console.dir(payment);
          console.log('\n');

          return done();
        }

        done(new Error("No payment obtained!"));
      });
    });
  });

});
