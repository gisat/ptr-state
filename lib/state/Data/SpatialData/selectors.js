"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selectors = _interopRequireDefault(require("../../_common/selectors"));

var _recompute = require("@jvitela/recompute");

var _helpers = _interopRequireDefault(require("../../_common/helpers"));

var _recomputeHelpers = require("../../_common/recomputeHelpers");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.data.spatialData;
};

var getIndex = _selectors["default"].getIndex(getSubstate);

var getIndexesObserver = (0, _recompute.createObserver)(function (state) {
  return _selectors["default"].getIndexes(getSubstate)(state);
});
/**
 * It returns all data for given datasource key
 * @param key {string} data source key
 * @returns {Object} Features as object (by feature key)
 */

var getByDataSourceKeyObserver = (0, _recompute.createObserver)(function (state, key) {
  var _getSubstate, _getSubstate$byDataSo;

  return ((_getSubstate = getSubstate(state)) === null || _getSubstate === void 0 ? void 0 : (_getSubstate$byDataSo = _getSubstate.byDataSourceKey) === null || _getSubstate$byDataSo === void 0 ? void 0 : _getSubstate$byDataSo[key]) || null;
});
/**
 * It returns whole index for given filter & order
 * @param {Object} filter
 * @param {Array} order
 * @return {Object} index
 */

var getIndex_recompute = (0, _recompute.createSelector)(function (filter, order) {
  var indexes = getIndexesObserver();

  if (indexes) {
    return _helpers["default"].getIndex(indexes, filter, order);
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * @param {Object} filter
 * @param {number} level
 * @param {string} tile
 * @param {string} dataSourceKey
 * @return {Array} indexed feature keys
 */

var getIndexedFeatureKeys = (0, _recompute.createSelector)(function (filter, level, tile, dataSourceKey) {
  if ((0, _lodash.isNumber)(level) && tile && dataSourceKey) {
    var _index$index$level, _index$index$level$ti;

    var index = getIndex_recompute(filter, null);
    var featureKeys = index === null || index === void 0 ? void 0 : (_index$index$level = index.index[level]) === null || _index$index$level === void 0 ? void 0 : (_index$index$level$ti = _index$index$level[tile]) === null || _index$index$level$ti === void 0 ? void 0 : _index$index$level$ti[dataSourceKey];
    return featureKeys && featureKeys.length ? featureKeys : null;
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * @param {Object} filter
 * @param {number} level
 * @param {string} tile
 * @param {string} dataSourceKey
 * @return {Array} indexed feature keys
 */

var isTileLoading = (0, _recompute.createSelector)(function (filter, level, tile) {
  if ((0, _lodash.isNumber)(level) && tile) {
    var index = getIndex_recompute(filter, null);

    if (index) {
      var _index$index, _index$index$level2;

      var loading = (_index$index = index.index) === null || _index$index === void 0 ? void 0 : (_index$index$level2 = _index$index[level]) === null || _index$index$level2 === void 0 ? void 0 : _index$index$level2[tile];
      return loading === true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
var _default = {
  getByDataSourceKeyObserver: getByDataSourceKeyObserver,
  getIndex: getIndex,
  getIndex_recompute: getIndex_recompute,
  getIndexesObserver: getIndexesObserver,
  getIndexedFeatureKeys: getIndexedFeatureKeys,
  isTileLoading: isTileLoading
};
exports["default"] = _default;