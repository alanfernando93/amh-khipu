'use strict';

/**
 * banks module.
 * @module lib/client/banks
 * @see module:lib/configuration
 * @see module:lib/api-exception
 * @see module:lib/api-client
 */

const KhipuClient = require('../client');

const methods = require('../constants/methods');

class KhipuBanks {

  constructor(client) {
    this.client = client || new KhipuClient();
  }

  /**
   * Retrieves banks list.
   *
   * @throws KhipuApiException
   */
  list(callback) {
    var options = {
      method: methods.GET,
      uri: '/banks'
    };

    /* Make the API call */
    this.client.request(options, function (body) {
      if (body && Array.isArray(body.banks)) {
        return callback(body.banks);
      }

      callback(body);
    });
  }

}

module.exports = KhipuBanks;
