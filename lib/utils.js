'use strict';

/**
 * serializer module.
 * @module lib/serializer
 */

const KhipuException = require('./exception');

module.exports = {

  /**
   * Parses and validates server's response.
   */
  parseResponse: function parseResponse(res, body) {
    var content = {};

    if (body) {
      try {
        content = JSON.parse(body);
      } catch (ex) {
        throw new KhipuException("Malformed response body!", ex.message, res.headers, body);
      }

      if (res.statusCode < 200 || res.statusCode > 299) {
        throw new KhipuException(content.message, res.statusCode, res.headers, content);
      }
    }

    return content;
  },

  /**
   * Alphabetically sorts every property in an object and in any array values.
   */
  sortObject: function sortObject(object) {
    var keys = Object.keys(object);
    var sorted = {};

    var options = {
      sensitivity: 'base'
    };

    function compare(a, b) {
      return a.localeCompare(b, options);
    }

    keys.sort(compare);

    for (var index in keys) {
      if (keys[index]) {
        var key = keys[index];

        if (Array.isArray(object[key])) {
          sorted[key] = object[key].sort(compare);
        } else if (typeof object[key] === 'object') {
          sorted[key] = sortObject(object[key]);
        } else {
          sorted[key] = object[key];
        }
      }
    }

    return sorted;
  }

};
