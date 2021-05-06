"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _recompute = require("@jvitela/recompute");

var _selectors = _interopRequireDefault(require("../../_common/selectors"));

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _helpers = _interopRequireDefault(require("../../_common/helpers"));

var _recomputeHelpers = require("../../_common/recomputeHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.data.spatialDataSources;
};

var getIndex = _selectors["default"].getIndex(getSubstate);

var getAllAsObject = _selectors["default"].getAllAsObject(getSubstate);

var getIndexesObserver = (0, _recompute.createObserver)(function (state) {
  return _selectors["default"].getIndexes(getSubstate)(state);
});
/**
 * It returns data source model for given key, if exists
 * @param key {string} data source key
 * @return {Object} Data source
 */

var getByKeyObserver = (0, _recompute.createObserver)(function (state, key) {
  var _getSubstate, _getSubstate$byKey;

  return ((_getSubstate = getSubstate(state)) === null || _getSubstate === void 0 ? void 0 : (_getSubstate$byKey = _getSubstate.byKey) === null || _getSubstate$byKey === void 0 ? void 0 : _getSubstate$byKey[key]) || null;
});
/**
 * It returns data source models for given keys, if exist
 * @param keys {Array} data source keys
 * @return {Array} A collection of data sources
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
 * It returns whole index for given filter and order
 * @param filter {Object} Filter object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param order {Array}
 * @return index {Object}
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
 * It returns a collection of indexed data sources for given filter
 * @param filter {Object} Filter object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @return {Array}
 */

var getIndexed_recompute = (0, _recompute.createSelector)(function (filter) {
  var index = getIndex_recompute(filter, null);

  if (index !== null && index !== void 0 && index.index) {
    var keys = Object.values(index.index);

    if (keys) {
      return getByKeys(keys);
    } else {
      return null;
    }
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * It returns a collection of indexed data sources for given filter.
 * @param state {Object}
 * @param filter {Object} Filter object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @return {Array}
 */

var getIndexed = (0, _reReselect["default"])([getIndex, getAllAsObject], function (index, dataSources) {
  if (!(0, _lodash.isEmpty)(index) && index.index) {
    var dataSourceKeys = Object.values(index.index);

    if (!(0, _lodash.isEmpty)(dataSourceKeys)) {
      var filteredDataSources = [];
      dataSourceKeys.forEach(function (dataSourceKey) {
        var dataSource = dataSources[dataSourceKey];

        if (dataSource) {
          filteredDataSources.push(dataSource);
        }
      });

      if (filteredDataSources.length > 0) {
        return filteredDataSources;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
})(function (state, filter) {
  return "".concat(JSON.stringify(filter));
});
var _default = {
  getByKeys: getByKeys,
  getByKeyObserver: getByKeyObserver,
  getIndexesObserver: getIndexesObserver,
  getIndexed: getIndexed,
  getIndexed_recompute: getIndexed_recompute,
  getIndex: getIndex,
  getIndex_recompute: getIndex_recompute
};
exports["default"] = _default;