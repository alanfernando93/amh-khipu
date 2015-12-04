'use strict';

function ApiException(message, code, responseHeaders, responseObject) {
  this.responseHeaders = responseHeaders;
  this.responseBody = responseObject;
  this.name = 'ApiExpception';
  this.message = message;
  this.code = code;

  this.stack = (new Error()).stack;
}

ApiException.prototype = Object.create(Error.prototype);

ApiException.prototype.constructor = ApiException;

module.exports = exports = ApiException;
