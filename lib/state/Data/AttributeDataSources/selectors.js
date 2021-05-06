"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _recompute = require("@jvitela/recompute");

var _selectors = _interopRequireDefault(require("../../_common/selectors"));

var _recomputeHelpers = require("../../_common/recomputeHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.data.attributeDataSources;
};

var getIndex = _selectors["default"].getIndex(getSubstate);

var getIndex_recompute = _selectors["default"].getIndex_recompute(getSubstate);
/**
 * It returns data source model for given key, if exists
 * @param key {string} data source key
 * @return {Object} attribute data source model
 */


var getByKeyObserver = (0, _recompute.createObserver)(function (state, key) {
  var _getSubstate, _getSubstate$byKey;

  return ((_getSubstate = getSubstate(state)) === null || _getSubstate === void 0 ? void 0 : (_getSubstate$byKey = _getSubstate.byKey) === null || _getSubstate$byKey === void 0 ? void 0 : _getSubstate$byKey[key]) || null;
});
/**
 * It returns data source models for given keys
 * @param keys {Array} data source keys
 * @return {Array} A collection of data source models
 */

var getByKeys = (0, _recompute.createSelector)(function (keys) {
  if (keys !== null && keys !== void 0 && keys.length) {
    var dataSources = [];
    keys.forEach(function (key) {
      var dataSource = getByKeyObserver(key);

      if (dataSource) {
        dataSources.push(dataSource);
      }
    });
    return dataSources.length ? dataSources : null;
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * It returns a collection of indexed data sources for given filter
 * @param filter {Object}
 * @return {Array}
 */

var getIndexed = (0, _recompute.createSelector)(function (filter) {
  var index = getIndex_recompute(filter, null);

  if (index !== null && index !== void 0 && index.index) {
    var keys = Object.values(index.index);

    if (keys !== null && keys !== void 0 && keys.length) {
      return getByKeys(keys);
    } else {
      return null;
    }
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
var _default = {
  getByKeyObserver: getByKeyObserver,
  getByKeys: getByKeys,
  getIndexed: getIndexed,
  getIndex: getIndex,
  getIndex_recompute: getIndex_recompute
};
exports["default"] = _default;