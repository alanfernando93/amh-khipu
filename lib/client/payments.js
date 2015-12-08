'use strict';

/**
 * banks module.
 * @module lib/client/banks
 * @see module:lib/configuration
 * @see module:lib/api-exception
 * @see module:lib/api-client
 */

const KhipuApiClient = require('../api-client');
const currencies = require('../currencies');

const is = require('is_js');

class KhipuPaymentsApi {

  constructor(client) {
    this.client = client || new KhipuApiClient();
  }

  /**
   * Retrieves a payment by its notification token.
   *
   * @throws KhipuApiException
   */
  getByNotificationToken(token, callback) {
    if (is.not.string(token) && is.not.array(token)) {
      throw new Error("The notification token must be a [String] or an [Array]!");
    }

    var options = {
      method: KhipuApiClient.GET,
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
      throw new Error("The payment ID must be a [String]!");
    }

    var options = {
      method: KhipuApiClient.GET,
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
      throw new Error("The payment paramenter can only be an [Object]!");
    }

    payment.currency = currencies.CLP;

    if (is.not.string(payment.subject)) {
      throw new Error("The payment subject can only be a [String]!");
    }

    if (is.not.string(payment.currency)) {
      throw new Error("The payment currency can only be a [String] on ISO-4217 format!");
    }

    if (is.not.number(payment.amount)) {
      throw new Error("The payment amount can only be a [Number]!");
    }

    var options = {
      method: KhipuApiClient.POST,
      uri: '/payments',
      form: payment
    };

    this.client.request(options, callback);
  }

}

module.exports = exports = KhipuPaymentsApi;
