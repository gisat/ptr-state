"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFetch = setFetch;
exports.resetFetch = resetFetch;
exports["default"] = request;

var _lodash = _interopRequireDefault(require("lodash"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _path = _interopRequireDefault(require("path"));

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TTL = 5;
var DATAPATH = 'data';
/**
 * Fetch implementation used by this module.
 *
 * It can be useful in tests to override this using `setFetch` fn.
 */

var fetch = _isomorphicFetch["default"];
/**
 * Set different fetch implementation. Useful in tests.
 */

function setFetch(_fetch) {
  fetch = _fetch;
}
/**
 * Reset fetch implementation to default one.
 */


function resetFetch() {
  fetch = _isomorphicFetch["default"];
}
/**
 * Request helper. Creates an request to backend.
 * @param localConfig
 * @param apiPath - path to backend endpoint (hostname taken from config)
 * @param method - HTTP method
 * @param query - url query as object
 * @param payload - payload as object
 * @param ttl - (optional) number of tries
 * @param dataPath - (optional) [default: "data"] Path where should data be. If response object does not have data on "dataPath", then return Error.
 * @returns response or error
 */


function request(localConfig, apiPath, method, query, payload, ttl, dataPath) {
  if (_lodash["default"].isUndefined(ttl)) ttl = TTL;
  if (_lodash["default"].isUndefined(dataPath)) dataPath = DATAPATH;

  var url = localConfig.apiBackendProtocol + '://' + _path["default"].join(localConfig.apiBackendHost, localConfig.apiBackendPath, apiPath);

  if (query) {
    url += '?' + _queryString["default"].stringify(query);
  }

  return fetch(url, {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: payload ? JSON.stringify(payload) : null
  }).then(function (response) {
    var contentType = response.headers.get('Content-type');

    if (response.ok && contentType && contentType.indexOf('application/json') !== -1) {
      return response.json().then(function (body) {
        if (dataPath === null || dataPath && _lodash["default"].get(body, dataPath)) {
          return body;
        } else {
          throw new Error('no data returned');
        }
      });
    } else {
      throw new Error('response error');
    }
  }, function (error) {
    if (ttl - 1) {
      request(localConfig, apiPath, method, query, payload, ttl - 1);
    } else {
      throw error;
    }
  });
}