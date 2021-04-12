"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _recompute = require("@jvitela/recompute");

var _selectors = _interopRequireDefault(require("../../_common/selectors"));

var _helpers = _interopRequireDefault(require("../../_common/helpers"));

var _recomputeHelpers = require("../../_common/recomputeHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.data.attributeData;
};

var getIndex = _selectors["default"].getIndexByPath(getSubstate); // Recompute observers ---------------------------------------------------------


var getAllAsObjectObserver = (0, _recompute.createObserver)(function (state) {
  return getSubstate(state).byDataSourceKey;
});
var getIndexesObserver = (0, _recompute.createObserver)(function (state) {
  return getSubstate(state).indexes;
});
var getSpatialIndexesObserver = (0, _recompute.createObserver)(function (state) {
  return getSubstate(state).spatialIndexes;
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

  if (indexes && !(0, _lodash.isEmpty)(indexes)) {
    return _helpers["default"].getIndex(indexes, filter, order);
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * It returns whole spatial index for given filter & order
 * @param {Object} filter
 * @param {Array} order
 * @return {Object} index
 */

var getSpatialIndex_recompute = (0, _recompute.createSelector)(function (filter, order) {
  var indexes = getSpatialIndexesObserver();

  if (indexes && !(0, _lodash.isEmpty)(indexes)) {
    return _helpers["default"].getIndex(indexes, filter, order);
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * It returns attributes data (an object containing featureKey-attributeValue pairs) grouped by data source key
 * @param dataSourceKeys {Array}
 * @return {Object}
 */

var getDataByDataSourceKeys = (0, _recompute.createSelector)(function (dataSourceKeys) {
  if (dataSourceKeys) {
    var data = {};
    (0, _lodash.forEach)(dataSourceKeys, function (key) {
      var attributes = getByDataSourceKeyObserver(key);

      if (attributes && !(0, _lodash.isEmpty)(attributes)) {
        data[key] = attributes;
      }
    });
    return !(0, _lodash.isEmpty)(data) ? data : null;
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * It returns attribute values for given feature key grouped by data source key
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where the key is attribute data source key and the value is matching attribute key
 * @param featureKey {string | number}
 * @return {Object} attributeDataSource key - attribute value pairs
 */

var getAttributesByDataSourceKeysForFeatureKey = (0, _recompute.createSelector)(function (attributeDataSourceKeyAttributeKeyPairs, featureKey) {
  if (attributeDataSourceKeyAttributeKeyPairs && featureKey) {
    var dataSourceKeys = Object.keys(attributeDataSourceKeyAttributeKeyPairs);
    var dataByDataSourceKey = getDataByDataSourceKeys(dataSourceKeys);

    if (dataByDataSourceKey) {
      var attributes = {};
      (0, _lodash.forIn)(dataByDataSourceKey, function (dataSourceData, dataSourceKey) {
        if (dataSourceData.hasOwnProperty(featureKey)) {
          var value = dataSourceData[featureKey];
          var attributeKey = attributeDataSourceKeyAttributeKeyPairs[dataSourceKey];

          if (attributeKey) {
            attributes[attributeKey] = value;
          }
        }
      });
      return !(0, _lodash.isEmpty)(attributes) ? attributes : null;
    } else {
      return null;
    }
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * It returns indexed feature keys grouped by attribute data source keys
 * @param {Object} filter
 * @param {number} level
 * @param {string} tile
 * @return {Object}
 */

var getSpatiallyIndexedFeatureKeysByDataSourceKeys = (0, _recompute.createSelector)(function (filter, level, tile) {
  var spatialIndex = getSpatialIndex_recompute(filter, null);

  if (spatialIndex !== null && spatialIndex !== void 0 && spatialIndex.index && !(0, _lodash.isEmpty)(spatialIndex)) {
    var _spatialIndex$index$l;

    var featureKeysByDataSourceKeys = (_spatialIndex$index$l = spatialIndex.index[level]) === null || _spatialIndex$index$l === void 0 ? void 0 : _spatialIndex$index$l[tile];
    return featureKeysByDataSourceKeys || null;
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
    var index = getSpatialIndex_recompute(filter, null);

    if (index) {
      var _index$index$level;

      var loading = index === null || index === void 0 ? void 0 : (_index$index$level = index.index[level]) === null || _index$index$level === void 0 ? void 0 : _index$index$level[tile];
      return loading === true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
var _default = {
  getAllAsObjectObserver: getAllAsObjectObserver,
  getByDataSourceKeyObserver: getByDataSourceKeyObserver,
  getIndex: getIndex,
  getIndex_recompute: getIndex_recompute,
  getIndexesObserver: getIndexesObserver,
  getSpatialIndex_recompute: getSpatialIndex_recompute,
  getSpatialIndexesObserver: getSpatialIndexesObserver,
  getDataByDataSourceKeys: getDataByDataSourceKeys,
  getAttributesByDataSourceKeysForFeatureKey: getAttributesByDataSourceKeysForFeatureKey,
  getSpatiallyIndexedFeatureKeysByDataSourceKeys: getSpatiallyIndexedFeatureKeysByDataSourceKeys,
  isTileLoading: isTileLoading,
  getSubstate: getSubstate
};
exports["default"] = _default;