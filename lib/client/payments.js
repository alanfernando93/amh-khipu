'use strict';

/**
 * banks module.
 * @module lib/client/banks
 * @see module:lib/configuration
 * @see module:lib/api-exception
 * @see module:lib/api-client
 */

const KhipuApiException = require('../api-exception');
const KhipuApiClient = require('../api-client');

class KhipuPaymentsApi {

  constructor(apiClient) {
    if (!apiClient) {
      apiClient = new KhipuApiClient();
    }

    this.apiClient = apiClient;
  }

  /**
   * Retrieves banks list.
   *
   * @return \Khipu\Model\BanksResponse
   *
   * @throws KhipuApiException on unsuccessful response.
   */
  getBanks(callback) {
    var options = {
      method: KhipuApiClient.GET,
      uri: '/banks'
    };

    /* Make the API call */
    this.apiClient.callApi(options, function (err, res, body) {
      if (err) {
        throw new KhipuApiException(err.message, res && res.statusCode, res && res.headers, body);
      }

      body = JSON.parse(body);

      if (res.statusCode < 200 || res.statusCode > 299) {
        throw new KhipuApiException(body.message, res.statusCode, res.headers, body);
      }

      callback(body && Array.isArray(body.banks) ? body.banks : []);
    });
  }

}

module.exports = exports = KhipuPaymentsApi;
