"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _lodash = _interopRequireDefault(require("lodash"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.areaRelations;
};

var getAll = _selectors["default"].getAll(getSubstate);
/**
 * @return {Array|null}
 */


var getAllData = (0, _reselect.createSelector)([getAll], function (relations) {
  if (relations) {
    return _lodash["default"].map(relations, function (relation) {
      return relation.data;
    });
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param filter {Object}
 * @returns {Array|null}
 */

var getFilteredData = (0, _reselect.createSelector)([getAllData, function (state, filter) {
  return filter;
}], function (relations, filter) {
  if (relations && relations.length > 0 && filter && !_lodash["default"].isEmpty(filter)) {
    return _lodash["default"].filter(relations, filter);
  } else {
    return null;
  }
});
/**
 * @returns {Object}
 */

var getFilteredDataSourceKeysGroupedByLayerKey = (0, _reReselect["default"])([getAll, function (state, layers) {
  return layers;
}], function (relations, layers) {
  if (relations && relations.length) {
    var filteredGroupedByLayerKey = {};

    _lodash["default"].forEach(layers, function (layer) {
      var filteredRelations = _lodash["default"].filter(relations, {
        data: layer.filter
      });

      if (filteredRelations.length) {
        filteredGroupedByLayerKey[layer.key] = filteredRelations.map(function (relation) {
          return {
            spatialDataSourceKey: relation.data.spatialDataSourceKey,
            fidColumnName: relation.data.fidColumnName
          };
        });
      }
    });

    return !_lodash["default"].isEmpty(filteredGroupedByLayerKey) ? filteredGroupedByLayerKey : null;
  } else {
    return null;
  }
})(function (state, layers) {
  return JSON.stringify(layers);
});
var _default = {
  getSubstate: getSubstate,
  getFilteredData: getFilteredData,
  getFilteredDataSourceKeysGroupedByLayerKey: getFilteredDataSourceKeysGroupedByLayerKey
};
exports["default"] = _default;