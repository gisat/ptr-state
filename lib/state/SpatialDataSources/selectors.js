"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _lodash = _interopRequireDefault(require("lodash"));

var _selectors = _interopRequireDefault(require("./vector/selectors"));

var _selectors2 = _interopRequireDefault(require("../_common/selectors"));

var _selectors3 = _interopRequireDefault(require("../AreaRelations/selectors"));

var _selectors4 = _interopRequireDefault(require("../SpatialRelations/selectors"));

var _selectors5 = _interopRequireDefault(require("../SpatialData/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getSubstate = function getSubstate(state) {
  return state.spatialDataSources;
};

var getAllAsObject = _selectors2["default"].getAllAsObject(getSubstate);

var getByKeys = _selectors2["default"].getByKeys(getSubstate);

var getByKey = _selectors2["default"].getByKey(getSubstate);

var getFilteredSourcesGroupedByLayerKey = (0, _reReselect["default"])([getAllAsObject, _selectors4["default"].getFilteredDataSourceKeysGroupedByLayerKey, _selectors3["default"].getFilteredDataSourceKeysGroupedByLayerKey, _selectors5["default"].getAllAsObject], function (dataSources, spatialRelationsDataSourceKeysGroupedByLayerKey, areaRelationsDataSourceKeysGroupedByLayerKey, spatialData) {
  var dataSourceKeysGroupedByLayerKey = {};

  if (areaRelationsDataSourceKeysGroupedByLayerKey) {
    dataSourceKeysGroupedByLayerKey = _objectSpread(_objectSpread({}, dataSourceKeysGroupedByLayerKey), areaRelationsDataSourceKeysGroupedByLayerKey);
  }

  if (spatialRelationsDataSourceKeysGroupedByLayerKey) {
    dataSourceKeysGroupedByLayerKey = _objectSpread(_objectSpread({}, dataSourceKeysGroupedByLayerKey), spatialRelationsDataSourceKeysGroupedByLayerKey);
  }

  if (dataSourceKeysGroupedByLayerKey && !_lodash["default"].isEmpty(dataSources)) {
    var dataSourcesGroupedByLayerKey = {};

    _lodash["default"].forIn(dataSourceKeysGroupedByLayerKey, function (dataSourceKeysAndFidColumns, layerKey) {
      dataSourcesGroupedByLayerKey[layerKey] = [];

      _lodash["default"].forEach(dataSourceKeysAndFidColumns, function (dataSourceKeyAndFidColumn) {
        if (dataSources[dataSourceKeyAndFidColumn.spatialDataSourceKey]) {
          var finalDataSource = _objectSpread({}, dataSources[dataSourceKeyAndFidColumn.spatialDataSourceKey]);

          var data = spatialData[dataSourceKeyAndFidColumn.spatialDataSourceKey];

          if (data && data.spatialData && data.spatialData.features) {
            finalDataSource.data.features = data.spatialData.features;
          }

          dataSourcesGroupedByLayerKey[layerKey].push({
            dataSource: finalDataSource,
            fidColumnName: dataSourceKeyAndFidColumn.fidColumnName
          });
        }
      });
    });

    return dataSourcesGroupedByLayerKey;
  } else {
    return null;
  }
})(function (state, layers) {
  return JSON.stringify(layers);
});
/**************************************************
 DEPRECATED
 **************************************************/

/**
 * Collect and prepare data sources grouped by layer key
 *
 * @param state {Object}
 * @param layers {Array} Collection of layers data. Each object in collection contains filter property (it is used for selecting of relations) and data property (which contains data about layer from map state - e.g. key).
 */

var getFilteredGroupedByLayerKey = (0, _reselect.createSelector)([getAllAsObject, _selectors4["default"].getDataSourceKeysGroupedByLayerKey, _selectors4["default"].getDataSourceRelationsGroupedByLayerKey],
/**
 * @param dataSources {null | Object} all available data sources
 * @param groupedKeys {null | Object} Data sources keys grouped by layer key
 * @return {null | Object} Data sources grouped by layer key
 */
function (dataSources, groupedKeys, groupedRelations) {
  if (groupedKeys && Object.keys(dataSources).length) {
    var groupedSources = {};

    _lodash["default"].forIn(groupedKeys, function (keys, layerKey) {
      var sources = [];
      keys.forEach(function (key) {
        if (key && dataSources && !_lodash["default"].isEmpty(dataSources) && dataSources[key] && !_lodash["default"].isEmpty(groupedRelations) && groupedRelations[layerKey]) {
          sources.push(_objectSpread(_objectSpread({}, dataSources[key]), {}, {
            spatialRelationData: _lodash["default"].find(groupedRelations[layerKey], function (o) {
              return o.spatialDataSourceKey === key;
            }) || null
          }));
        } else {
          sources.push(null);
        }
      });
      groupedSources[layerKey] = sources;
    });

    return groupedSources;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param filter {Object}
 * @returns {Array|null}
 */

var getFilteredData = (0, _reselect.createSelector)([getAllAsObject, function (state, filter) {
  return filter;
}], function (spatialDataSources, filter) {
  if (spatialDataSources && spatialDataSources.length > 0 && filter && !_lodash["default"].isEmpty(filter)) {
    return _lodash["default"].filter(spatialDataSources, filter);
  } else {
    return null;
  }
});
var _default = {
  getSubstate: getSubstate,
  getByKey: getByKey,
  getByKeys: getByKeys,
  getFilteredSourcesGroupedByLayerKey: getFilteredSourcesGroupedByLayerKey,
  // Deprecated
  getFilteredGroupedByLayerKey: getFilteredGroupedByLayerKey,
  getFilteredData: getFilteredData,
  vector: _selectors["default"]
};
exports["default"] = _default;