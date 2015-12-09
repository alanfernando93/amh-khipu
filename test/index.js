'use strict';

var inspect = require('util').inspect;
var expect = require('chai').expect;
var khipu = require('../');
var fs = require('fs');

var config, client;

var logfile = './test/tests.log';
var stored = [];

/**
 * Logs data to a file.
 */
function logToFile(title, data) {
  fs.appendFileSync(logfile, '\n\n[' + new Date().toISOString() + '] ');
  fs.appendFileSync(logfile, title + ':\n');

  fs.appendFileSync(logfile, inspect(data, {
    depth: null
  }));

  fs.appendFileSync(logfile, '\n');
}

describe('Fi Khipu', function () {

  before(function () {
    fs.unlinkSync(logfile);

    var json = require('./config.json');

    config = new khipu.Configuration(json.receiverId, json.secret);
    client = new khipu.Client(config);

    config.sslVerification = false;
  });

  describe('object', function () {
    it('should be an object', function () {
      expect(khipu).to.be.an('object');
    });
  });

  describe('banks', function () {
    it('should retrieve banks list', function (done) {
      var banks = new khipu.clients.Banks(client);

      banks.list(function (err, banks) {
        if (err) {
          logToFile('Banks error', err);
          return done(err);
        }

        if (Array.isArray(banks) && banks.length) {
          logToFile('Banks', banks);
          return done();
        }

        done(new Error("No banks obtained!"));
      });
    });
  });

  describe('payments', function () {

    it('should create a payment', function (done) {
      var payments = new khipu.clients.Payments(client);

      payments.create({
        subject: 'Test payment from fi-khipu at ' + new Date(),
        /* Khipu only accepts CLP for now */
        // currency: khipu.currencies.CLP,
        amount: 100
      }, function (err, payment) {
        if (err) {
          logToFile('Create payment error', err);
          return done(err);
        }

        if (payment) {
          logToFile('Created payment', payment);

          stored.push(payment);

          return done();
        }

        done(new Error("No payment obtained!"));
      });
    });

    it('should create retrieve a payment by its ID', function (done) {
      var payments = new khipu.clients.Payments(client);

      payments.getById(stored[0].payment_id, function (err, payment) {
        if (err) {
          logToFile('Retrieve payment error', err);
          return done(err);
        }

        if (payment) {
          logToFile('Retrieved payment by ID', payment);

          stored.push(payment);

          return done();
        }

        done(new Error("No payment obtained!"));
      });
    });

    it('should retrieve a payment by its notification token', function (done) {
      var payments = new khipu.clients.Payments(client);

      payments.getByNotificationToken(stored[1].notification_token, function (err, payment) {
        if (err) {
          logToFile('Retrieve payment by notification token error', err);
          return done(err);
        }

        if (payment) {
          logToFile('Retrieved payment by notification token', payment);

          return done();
        }

        done(new Error("No payment obtained!"));
      });
    });

    it('should delete a payment by its ID', function (done) {
      var payments = new khipu.clients.Payments(client);

      payments.delete(stored[0].payment_id, function (err, payment) {
        if (err) {
          logToFile('Delete payment by ID error', err);
          return done(err);
        }

        if (payment) {
          logToFile('Deleted payment by ID', payment);

          stored.push(payment);

          return done();
        }

        done(new Error("No payment deleted!"));
      });
    });

    it('should refund a payment by its ID', function (done) {
      var payments = new khipu.clients.Payments(client);

      payments.refund(stored[1].payment_id, function (err, payment) {
        if (err) {
          logToFile('Refund payment by ID error', err);
          return done(err);
        }

        if (payment) {
          logToFile('Refunded payment by ID', payment);

          stored.push(payment);

          return done();
        }

        done(new Error("No payment refunded!"));
      });
    });

  });

});
