'use strict';

var Configuration = require('../configuration');
var ApiException = require('./exception');
var request = require('request');

var OPTIONS = 'OPTIONS';
var DELETE = 'DELETE';
var PATCH = 'PATCH';
var HEAD = 'HEAD';
var POST = 'POST';
var GET = 'GET';
var PUT = 'PUT';

/**
 * @constructor
 */
function ApiClient(config) {

  if (!config) {
    config = Configuration.getDefaultConfiguration();
  }

  this.config = config;

  /**
   * @type {ObjectSerializer}
   */
  // this.serializer = null;

  // this.serializer = new ObjectSerializer();
}

/**
 * Gets the configuration.
 * @return {Configuration}
 */
ApiClient.prototype.getConfig = function getConfig() {
  return this.config;
};

// /**
//  * Get the object serializer.
//  * @return {ObjectSerializer}
//  */
// ApiClient.prototype.getSerializer = function getSerializer() {
//   return this.serializer;
// };

/**
 * Gets the API key (with prefix if set).
 * @param  {String} apiKeyIdentifier name of apikey.
 * @return {String}
 */
ApiClient.prototype.getApiKeyWithPrefix = function getApiKeyWithPrefix(apiKeyIdentifier) {
  var prefix = this.config.getApiKeyPrefix(apiKeyIdentifier);
  var apiKey = this.config.getApiKey(apiKeyIdentifier);

  if (prefix && apiKey) {
    return prefix + ' ' + apiKey;
  }

  return apiKey;
};

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
ApiClient.prototype.callApi = function callApi(options, callback) {

  /* Normalize headers */
  if (options.headers) {
    for (var key in this.config.getDefaultHeaders()) {
      if (!options.headers[key] && this.config.getDefaultHeaders()[key]) {
        options.headers[key] = this.config.getDefaultHeaders()[key];
      }
    }
  } else {
    options.headers = this.config.getDefaultHeaders();
  }

  /* Set request URL */
  options.url = this.config.getHost().resourcePath;

  /* Set timeout */
  if (this.config.getRequestTimeout() > 0) {
    options.timeout = Math.round(this.config.getCurlTimeout() * 1000);
  }

  /* Set SSL verification option */
  options.strictSSL = this.config.getSSLVerification();

  /* Ensure a correct request method */
  if (!options.method) {
    throw new ApiException('Method cannot be empty.');
  }

  if ([POST, HEAD, OPTIONS, PATCH, PUT, DELETE, GET].indexOf(options.method) < 0) {
    throw new ApiException('Method ' + options.method + ' is not recognized.');
  }

  /* Set user agent */
  options.headers['User-Agent'] = this.config.getUserAgent();

  if (this.config.debug) {
    request.debug = true;
  }

  /* Make the request */
  request(options, callback);
  /*function (err, res, body) {
      debug('HTTP Request body:\n', util.inspect(res), util.inspect(body));

      return callback(err, body);
    });*/
};

/**
 * Return the header 'Accept' based on an array of Accept provided
 *
 * @param string[] accept Array of header
 *
 * @return string Accept (e.g. application/json)
 */
ApiClient.selectHeaderAccept = function selectHeaderAccept(accept) {
  if (!Array.isArray(accept) || !accept.length || (accept.length === 1 && accept[0] === '')) {
    return null;
  }

  if (/application\/json/i.exec(accept)) {
    return 'application/json';
  }

  return accept.join(',');
};

/**
 * Return the content type based on an array of content-type provided
 *
 * @param string[] content_type Array fo content-type
 *
 * @return string Content-Type (e.g. application/json)
 */
ApiClient.selectHeaderContentType = function selectHeaderContentType(contentType) {
  if (!Array.isArray(contentType) || !contentType.length || (contentType.length === 1 && contentType[0] === '')) {
    return 'application/json';
  }

  if (/application\/json/i.exec(contentType)) {
    return 'application/json';
  }

  return contentType.join(',');
};

module.exports = exports = ApiClient;
