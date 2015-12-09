'use strict';

/**
 * api-exception module.
 * @module lib/api-exception
 */

const util = require('util');

const INDENT = '    ';

class KhipuException extends Error {

  constructor(message, code, responseHeaders, responseBody) {
    message = '(' + (code || 0) + ') ' + message;

    if (responseHeaders) {
      message += '\n' + INDENT + 'Headers: ';

      try {
        message += JSON.stringify(responseHeaders, null, INDENT);
      } catch (e) {
        message += util.inspect(responseHeaders);
      }
    }

    if (responseBody) {
      message += '\n' + INDENT + 'Body: ';

      try {
        message += JSON.stringify(responseBody, null, INDENT);
      } catch (e) {
        message += util.inspect(responseBody);
      }
    }

    super(message);

    this.name = 'Khipu Expception';
  }

}

module.exports = KhipuException;
