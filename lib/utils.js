'use strict';

/**
 * serializer module.
 * @module lib/serializer
 */

const KhipuApiException = require('./api-exception');

module.exports = {

  parseResponse: function parseResponse(res, body) {
    var content = {};

    if (body) {
      try {
        content = JSON.parse(body);
      } catch (ex) {
        throw new KhipuApiException("Malformed response body!", ex.message, res.headers, body);
      }

      if (res.statusCode < 200 || res.statusCode > 299) {
        throw new KhipuApiException(content.message, res.statusCode, res.headers, content);
      }
    }

    return content;
  },

  sortObject: function sortObject(object) {
    var keys = Object.keys(object);
    var sorted = {};

    var options = {
      sensitivity: 'base'
    };

    function sorti(a, b) {
      return a.localeCompare(b, options);
    }

    keys.sort(sorti);

    for (var index in keys) {
      if (keys[index]) {
        var key = keys[index];

        if (Array.isArray(object[key])) {
          sorted[key] = object[key].sort(sorti);
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
