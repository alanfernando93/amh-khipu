'use strict';

var expect = require('chai').expect;
var khipu = require('../');

var config, client;

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

      banks.getBanks(function (banks) {
        if (Array.isArray(banks) && banks.length) {
          return done();
        }

        done(new Error("No banks obtained!"));
      });
    });
  });

});
