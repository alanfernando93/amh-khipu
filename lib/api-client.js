'use strict';

/**
 * api-client module.
 * @module lib/api-client
 * @see module:lib/configuration
 * @see module:lib/api-exception
 */

const KhipuConfiguration = require('./configuration');
const KhipuApiException = require('./api-exception');

const request = require('request');
const crypto = require('crypto');

const OPTIONS = 'OPTIONS';
const DELETE = 'DELETE';
const PATCH = 'PATCH';
const HEAD = 'HEAD';
const POST = 'POST';
const GET = 'GET';
const PUT = 'PUT';

class KhipuApiClient {

  static get OPTIONS() {
    return OPTIONS;
  }

  static get DELETE() {
    return DELETE;
  }

  static get PATCH() {
    return PATCH;
  }

  static get HEAD() {
    return HEAD;
  }

  static get POST() {
    return POST;
  }

  static get GET() {
    return GET;
  }

  static get PUT() {
    return PUT;
  }


  constructor(config) {
    if (!(config instanceof KhipuConfiguration)) {
      config = KhipuConfiguration.getDefaultConfiguration();
    }

    this.config = config;
  }

  /**
   * Gets the API key with prefix if set.
   *
   * @param  {String} apiKeyIdentifier API key name to retrieve..
   *
   * @return {String}
   */
  getApiKeyWithPrefix(apiKeyIdentifier) {
    var prefix = this.config.getApiKeyPrefix(apiKeyIdentifier);
    var apiKey = this.config.getApiKey(apiKeyIdentifier);

    if (prefix && apiKey) {
      return prefix + ' ' + apiKey;
    }

    return apiKey;
  }

  /**
   * Performs the API HTTP request.
   *
   * @param {String} resourcePath path to method endpoint.
   * @param {String} method method to call.
   * @param {Array} queryParams parameters to be place in query URL.
   * @param {Array} postData parameters to be placed in POST body.
   * @param {Array} headerParams parameters to be place in request header.
   * @param {String} responseType expected response type of the endpoint.
   * @param {Function} callback The callback function.
   */
  callApi(options, callback) {

    /* Normalize headers */
    if (options.headers) {
      /* Place all default configuration headers into options headers */
      for (var key in this.config.defaultHeaders[key]) {
        if (!options.headers[key] && this.config.defaultHeaders[key]) {
          options.headers[key] = this.config.defaultHeaders[key];
        }
      }
    } else {
      options.headers = this.config.defaultHeaders;
    }

    /* Set request URL */
    options.baseUrl = this.config.host;

    /* Set timeout */
    if (this.config.requestTimeout > 0) {
      options.timeout = Math.round(this.config.requestTimeout * 1000);
    }

    /* Set SSL verification option */
    options.strictSSL = !!this.config.sslVerification;

    /* Ensure a correct request method */
    if (!options.method) {
      throw new KhipuApiException("Method cannot be empty!");
    }

    if ([POST, HEAD, OPTIONS, PATCH, PUT, DELETE, GET].indexOf(options.method) < 0) {
      throw new KhipuApiException("Method [" + options.method + "] is not recognized!");
    }

    /* Set user agent */
    options.headers['User-Agent'] = this.config.userAgent;

    /* Set request debugging */
    request.debug = !!this.config.debug;

    var toSign = options.method + '&' + encodeURIComponent(options.baseUrl + options.uri);

    var hash = crypto.createHmac('sha256', this.config.secret)
      .update(toSign)
      .digest('hex');

    options.headers.Authorization = String(this.config.receiverId) + ':' + hash;

    /* Make the request */
    request(options, callback);
  }

  /**
   * Return the 'Accept' request header based on an array of provided Accept.
   *
   * @param {String[]} accept Array of header
   *
   * @return {String}
   */
  static selectHeaderAccept(accept) {
    if (!Array.isArray(accept) || !accept.length || (accept.length === 1 && accept[0] === '')) {
      return null;
    }

    if (/application\/json/i.exec(accept)) {
      return 'application/json';
    }

    return accept.join(',');
  }

  /**
   * Return the content type based on array of provided content types.
   *
   * @param {String[]} content_type Array of content types.
   *
   * @return {String}
   */
  static selectHeaderContentType(contentType) {
    if (!Array.isArray(contentType) || !contentType.length || (contentType.length === 1 && contentType[0] === '')) {
      return 'application/json';
    }

    if (/application\/json/i.exec(contentType)) {
      return 'application/json';
    }

    return contentType.join(',');
  }

}

module.exports = exports = KhipuApiClient;
