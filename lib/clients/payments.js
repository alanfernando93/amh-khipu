'use strict';

/**
 * banks module.
 * @module lib/client/banks
 * @see module:lib/configuration
 * @see module:lib/api-exception
 * @see module:lib/api-client
 */

const KhipuException = require('../exception');
const KhipuClient = require('../client');

const currencies = require('../constants/currencies');
const methods = require('../constants/methods');
const is = require('is_js');

class KhipuPayments {

  constructor(client) {
    this.client = client || new KhipuClient();
  }

  /**
   * Retrieves a payment by its notification token.
   *
   * @throws KhipuApiException
   */
  getByNotificationToken(token, callback) {
    if (is.not.string(token)) {
      throw new KhipuException("The notification token must be a [String] or an [Array]!");
    }

    if (token.length !== 64) {
      throw new KhipuException("The notification token must have 64 characters!");
    }

    var options = {
      method: methods.GET,
      uri: '/payments',
      qs: {
        notification_token: token
      }
    };

    this.client.request(options, callback);
  }

  /**
   * Retrieves a payment by its ID.
   *
   * @throws KhipuApiException
   */
  getById(id, callback) {
    if (is.not.string(id)) {
      throw new KhipuException("The payment ID must be a [String]!");
    }

    if (!id.length) {
      throw new KhipuException("Invalid ID length!");
    }

    var options = {
      method: methods.GET,
      uri: '/payments/' + encodeURIComponent(id)
    };

    this.client.request(options, callback);
  }

  /**
   * Retrieves a payment by its ID.
   *
   * @throws KhipuApiException
   */
  create(payment, callback) {
    if (is.not.object(payment)) {
      throw new KhipuException("The payment paramenter can only be an [Object]!");
    }

    payment.currency = currencies.CLP;

    if (is.not.string(payment.subject)) {
      throw new KhipuException("The payment subject can only be a [String]!");
    }

    if (is.not.string(payment.currency)) {
      throw new KhipuException("The payment currency can only be a [String] on ISO-4217 format!");
    }

    if (is.not.number(payment.amount)) {
      throw new KhipuException("The payment amount can only be a [Number]!");
    }

    var options = {
      method: methods.POST,
      uri: '/payments',
      form: payment
    };

    this.client.request(options, callback);
  }

  delete(id, callback) {
    if (is.not.string(id)) {
      throw new KhipuException("The payment ID must be a [String]!");
    }

    if (!id.length) {
      throw new KhipuException("Invalid ID length!");
    }

    var options = {
      method: methods.DELETE,
      uri: '/payments/' + encodeURIComponent(id)
    };

    this.client.request(options, callback);
  }

  refund(id, callback) {
    if (is.not.string(id)) {
      throw new KhipuException("The payment ID must be a [String]!");
    }

    if (!id.length) {
      throw new KhipuException("Invalid ID length!");
    }

    var options = {
      method: methods.POST,
      uri: '/payments/' + encodeURIComponent(id) + '/refunds'
    };

    this.client.request(options, callback);
  }

}

module.exports = KhipuPayments;
