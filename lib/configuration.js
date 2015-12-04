'use strict';

var os = require('os');

var defaultConfiguration = null;

/**
 * Configuration Class.
 * @constructor
 */
function Configuration() {

  /**
   * Array to store API key(s).
   * @type {String[]}
   */
  this.apiKeys = [];

  /**
   * Array to store API prefix (e.g. Bearer).
   * @type {String[]}
   */
  this.apiKeyPrefixes = [];

  /**
   * HTTP basic authentication username.
   * @type {?String}
   */
  this.username = null;

  /**
   * HTTP basic authentication password.
   * @type {?String}
   */
  this.password = null;

  /**
   * ApiClient default instance.
   * @type {ApiClient}
   */
  this.defaultHeaders = [];

  /**
   * Host URI.
   * @type {!String}
   */
  this.host = 'https://khipu.com/api/2.0';

  /**
   * HTTP request timeout in seconds. Defaults to 0 (no timeout).
   * @type {!Number}
   */
  this.requestTimeout = 0;

  /**
   * HTTP request user agent.
   * @type {!String}
   */
  this.userAgent = 'fi-khipu/2.5.0';

  /**
   * Debug flag.
   * @type {Boolean}
   */
  this.debug = false;

  /**
   * Debug file name (log to STDOUT by default).
   * @type {?String}
   */
  this.debugFile = null;

  /**
   * Temp folder location. Defaults to the OS's temp folder.
   * @type string
   */
  this.tempFolderPath = os.tmpdir();

  /**
   * Indicates if SSL verification should be enabled (true) or disabled (false).
   *
   * This is useful if the host uses a self-signed SSL certificate.
   *
   * @type {Boolean}
   */
  this.sslVerification = true;

  this.receiverId = null;
  this.secret = null;
}

/**
 * Sets API key.
 *
 * @param {String} apiKeyIdentifier API key identifier (authentication scheme).
 * @param {String} key API key or token.
 *
 * @return {Configuration}
 */
Configuration.prototype.setApiKey = function setApiKey(apiKeyIdentifier, key) {
  this.apiKeys[apiKeyIdentifier] = key;
  return this;
};

Configuration.prototype.setReceiverId = function setReceiverId(receiverId) {
  this.receiverId = receiverId;
  return this;
};

Configuration.prototype.setSecret = function setSecret(secret) {
  this.secret = secret;
  return this;
};

Configuration.prototype.getReceiverId = function getReceiverId() {
  return this.receiverId;
};

Configuration.prototype.getSecret = function getSecret() {
  return this.secret;
};

/**
 * Gets API key or token.
 *
 * @param {String} apiKeyIdentifier API key identifier (authentication scheme).
 *
 * @return {String}
 */
Configuration.prototype.getApiKey = function getApiKey(apiKeyIdentifier) {
  return this.apiKeys[apiKeyIdentifier];
};

/**
 * Sets the prefix for API key (e.g. Bearer).
 *
 * @param {String} apiKeyIdentifier API key identifier (authentication scheme).
 * @param {String} prefix API key prefix, e.g. Bearer.
 *
 * @return {Configuration}
 */
Configuration.prototype.setApiKeyPrefix = function setApiKeyPrefix(apiKeyIdentifier, prefix) {
  this.apiKeyPrefixes[apiKeyIdentifier] = prefix;
  return this;
};

/**
 * Gets API key prefix.
 *
 * @param {String} apiKeyIdentifier API key identifier (authentication scheme).
 *
 * @return {String}
 */
Configuration.prototype.getApiKeyPrefix = function getApiKeyPrefix(apiKeyIdentifier) {
  return this.apiKeyPrefixes[apiKeyIdentifier];
};

/**
 * Sets the HTTP basic authentication username.
 *
 * @param {String} username Username for HTTP basic authentication.
 *
 * @return {Configuration}
 */
Configuration.prototype.setUsername = function setUsername(username) {
  this.username = username;
  return this;
};

/**
 * Gets the HTTP basic authentication username.
 *
 * @return {String}
 */
Configuration.prototype.getUsername = function getUsername() {
  return this.username;
};

/**
 * Sets the HTTP basic authentication password.
 *
 * @param {String} password Password for HTTP basic authentication.
 *
 * @return {Configuration}
 */
Configuration.prototype.setPassword = function setPassword(password) {
  this.password = password;
  return this;
};

/**
 * Gets the HTTP basic authentication password.
 *
 * @return {String}
 */
Configuration.prototype.getPassword = function getPassword() {
  return this.password;
};

/**
 * Adds a default header.
 *
 * @param {String} headerName Header name (e.g. Token).
 * @param {String} headerValue Header value (e.g. 1z8wp3).
 *
 * @return {ApiClient}
 */
Configuration.prototype.addDefaultHeader = function addDefaultHeader(headerName, headerValue) {
  if (typeof headerName !== 'string') {
    throw new Error('Header name must be a string.');
  }

  this.defaultHeaders[headerName] = headerValue;
  return this;
};

/**
 * Gets the default headers.
 *
 * @return {Array}
 */
Configuration.prototype.getDefaultHeaders = function getDefaultHeaders() {
  return this.defaultHeaders;
};

/**
 * Deletes a default header.
 *
 * @param {String} headerName the header to delete.
 *
 * @return {Configuration}
 */
Configuration.prototype.deleteDefaultHeader = function deleteDefaultHeader(headerName) {
  this.defaultHeaders[headerName] = null;
};

/**
 * Sets the host URI.
 *
 * @param {String} host The host's URI.
 *
 * @return {Configuration}
 */
Configuration.prototype.setHost = function setHost(host) {
  this.host = host;
  return this;
};

/**
 * Gets the host URI.
 *
 * @return {String}
 */
Configuration.prototype.getHost = function getHost() {
  return this.host;
};

/**
 * Sets the API client's user agent.
 *
 * @param {String} userAgent The user agent of the API client.
 *
 * @return {ApiClient}
 */
Configuration.prototype.setUserAgent = function setUserAgent(userAgent) {
  if (typeof userAgent !== 'string') {
    throw new Error('User-agent must be a string.');
  }

  this.userAgent = userAgent;
  return this;
};

Configuration.prototype.setPlatform = function setPlatform(name, version) {
  this.userAgent = "khipu-api-php-client/2.5.0|" + name + "/" + version;
};

/**
 * Gets the API client's user agent.
 *
 * @return {String}
 */
Configuration.prototype.getUserAgent = function getUserAgent() {
  return this.userAgent;
};

/**
 * Sets the HTTP request timeout value.
 *
 * @param {Number} seconds Number of seconds before timing out. Set to 0 for no timeout.
 *
 * @return {ApiClient}
 */
Configuration.prototype.setRequestTimeout = function setRequestTimeout(seconds) {
  if (typeof seconds !== Number || seconds < 0) {
    throw new Error('Timeout value must be numeric and a non-negative number.');
  }

  this.requestTimeout = seconds;
  return this;
};

/**
 * Gets the HTTP request timeout value.
 *
 * @return {String}
 */
Configuration.prototype.getRequestTimeout = function getRequestTimeout() {
  return this.requestTimeout;
};

/**
 * Sets debug flag.
 *
 * @param {Boolean} debug Debug flag.
 *
 * @return {Configuration}
 */
Configuration.prototype.setDebug = function setDebug(debug) {
  this.debug = debug;
  return this;
};

/**
 * Gets the debug flag.
 *
 * @return {Boolean}
 */
Configuration.prototype.getDebug = function getDebug() {
  return this.debug;
};

/**
 * Sets the debug output file name. Set it to null to log to STDOUT.
 *
 * @param {String} debugFile Debug file.
 *
 * @return {Configuration}
 */
Configuration.prototype.setDebugFile = function setDebugFile(debugFile) {
  this.debugFile = debugFile;
  return this;
};

/**
 * Gets the debug output file name.
 *
 * @return {String}
 */
Configuration.prototype.getDebugFile = function getDebugFile() {
  return this.debugFile;
};

/**
 * Sets the temp folder path.
 *
 * @param {String} tempFolderPath Temp folder path.
 *
 * @return {Configuration}
 */
Configuration.prototype.setTempFolderPath = function setTempFolderPath(tempFolderPath) {
  this.tempFolderPath = tempFolderPath;
  return this;
};

/**
 * Gets the temp folder path.
 *
 * @return {String}
 */
Configuration.prototype.getTempFolderPath = function getTempFolderPath() {
  return this.tempFolderPath;
};

/**
 * Sets if SSL verification should be enabled (true) or disabled (false).
 *
 * @param {Boolean} sslVerification True if the certificate should be validated, false otherwise.
 *
 * @return {Configuration}
 */
Configuration.prototype.setSSLVerification = function setSSLVerification(sslVerification) {
  this.sslVerification = sslVerification;
  return this;
};

/**
 * Gets if SSL verification should be enabled (true) or disabled (false).
 *
 * @return {Boolean}
 */
Configuration.prototype.getSSLVerification = function getSSLVerification() {
  return this.sslVerification;
};

/**
 * Gets the default configuration instance.
 *
 * @return {Configuration}
 */
function getDefaultConfiguration() {
  if (!defaultConfiguration) {
    defaultConfiguration = new Configuration();
  }

  return defaultConfiguration;
}

/**
 * Sets the detault configuration instance.
 *
 * @param {Configuration} config An instance of the Configuration Class.
 */
function setDefaultConfiguration(config) {
  if (!(config instanceof Configuration)) {
    throw new Error('The config argument must be an instance of [Configuration]');
  }

  defaultConfiguration = config;
}

/**
 * Gets essential report information for debugging.
 *
 * @return {String}
 */
function toDebugReport() {
  var report = "Node.js SDK (Khipu) Debug Report:\n";
  report += "  OS: " + os.platform() + " " + os.arch() + " " + os.release() + "\n";
  report += "  Node.js Version: " + process.version + "\n";
  report += "  SDK Package Version: " + require('../package.json').apiVersion + "\n";
  report += "  Temp Folder Path: " + getDefaultConfiguration().getTempFolderPath() + "\n";

  return report;
}

Configuration.getDefaultConfiguration = getDefaultConfiguration;
Configuration.setDefaultConfiguration = setDefaultConfiguration;
Configuration.toDebugReport = toDebugReport;

module.exports = exports = Configuration;
