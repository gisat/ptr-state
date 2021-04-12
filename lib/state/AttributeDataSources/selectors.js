"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _selectors2 = _interopRequireDefault(require("../AttributeData/selectors"));

var _selectors3 = _interopRequireDefault(require("../AttributeRelations/selectors"));

var _reReselect = _interopRequireDefault(require("re-reselect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getSubstate = function getSubstate(state) {
  return state.attributeDataSources;
};

var getAllAsObject = _selectors["default"].getAllAsObject(getSubstate);

var getBatchByFilterOrder = _selectors["default"].getBatchByFilterOrder(getSubstate);

var getByKey = _selectors["default"].getByKey(getSubstate);

var getByKeys = _selectors["default"].getByKeys(getSubstate);

var getFilteredDataSources = (0, _reReselect["default"])([getAllAsObject, _selectors3["default"].getFilteredDataSourceKeysWithFidColumn, _selectors2["default"].getAllAsObject, function (state, filter) {
  return filter;
}], function (dataSources, dataSourcesWithFidColumn, attributeData, filter) {
  if (!_lodash["default"].isEmpty(dataSourcesWithFidColumn) && attributeData && dataSources) {
    var finalDataSources = [];

    _lodash["default"].forEach(dataSourcesWithFidColumn, function (dataSourceWithFidColumn) {
      var key = dataSourceWithFidColumn.attributeDataSourceKey;

      var finalDataSource = _objectSpread({}, dataSources[key]);

      var data = attributeData[key];

      if (data && data.attributeData && data.attributeData.features) {
        finalDataSource.data.features = data.attributeData.features.map(function (feature) {
          var _properties;

          return {
            properties: (_properties = {}, _defineProperty(_properties, dataSourceWithFidColumn.attributeKey, feature.properties[finalDataSource.data.columnName]), _defineProperty(_properties, dataSourceWithFidColumn.fidColumnName, feature.properties[dataSourceWithFidColumn.fidColumnName]), _properties)
          };
        });
      }

      finalDataSources.push({
        dataSource: finalDataSource,
        attributeKey: dataSourceWithFidColumn.attributeKey,
        periodKey: dataSourceWithFidColumn.periodKey,
        fidColumnName: dataSourceWithFidColumn.fidColumnName
      });
    });

    return finalDataSources.length ? finalDataSources : null;
  } else {
    return null;
  }
})(function (state, filter) {
  return JSON.stringify(filter);
});
var getFilteredDataSourcesGroupedByLayerKey = (0, _reReselect["default"])([_selectors3["default"].getFilteredDataSourceKeysWithFidColumnGroupedByLayerKey, getAllAsObject, _selectors2["default"].getAllAsObject, function (state, layersWithFilter, layersState) {
  return layersState;
}], function (dataSourcesDataByLayerKey, dataSources, attributeData, layersState) {
  if (dataSourcesDataByLayerKey && !_lodash["default"].isEmpty(dataSources)) {
    var dataSourcesGroupedByLayerKey = {};

    _lodash["default"].forIn(dataSourcesDataByLayerKey, function (dataSourceKeysAndFidColumns, layerKey) {
      dataSourcesGroupedByLayerKey[layerKey] = [];

      _lodash["default"].forEach(dataSourceKeysAndFidColumns, function (dataSourceKeyAndFidColumn) {
        if (dataSources[dataSourceKeyAndFidColumn.attributeDataSourceKey]) {
          var finalDataSource = _objectSpread({}, dataSources[dataSourceKeyAndFidColumn.attributeDataSourceKey]);

          var data = attributeData[dataSourceKeyAndFidColumn.attributeDataSourceKey];

          if (data && data.attributeData && data.attributeData.features) {
            finalDataSource.data.features = data.attributeData.features.map(function (feature) {
              var _properties2;

              return {
                properties: (_properties2 = {}, _defineProperty(_properties2, dataSourceKeyAndFidColumn.attributeKey, feature.properties[finalDataSource.data.columnName]), _defineProperty(_properties2, dataSourceKeyAndFidColumn.fidColumnName, feature.properties[dataSourceKeyAndFidColumn.fidColumnName]), _properties2)
              };
            });
          }

          dataSourcesGroupedByLayerKey[layerKey].push({
            dataSource: finalDataSource,
            attributeKey: dataSourceKeyAndFidColumn.attributeKey,
            fidColumnName: dataSourceKeyAndFidColumn.fidColumnName
          });
        }
      });
    });

    return dataSourcesGroupedByLayerKey;
  } else {
    return null;
  }
})(function (state, layersWithFilter, layersState, layersStateAsString) {
  return layersStateAsString;
});
/**
 * Collect and prepare data sources grouped by layer key
 *
 * @param state {Object}
 * @param filter {Object}
 *	 @param attributeKey {string}
 *	 @param scopeKey {string}
 *	 @param periodKey {string}
 *	 @param caseKey {string}
 *	 @param scenarioKey {string}
 *	 @param placeKey {string}
 */

var getFiltered = (0, _reselect.createSelector)([getAllAsObject, _selectors3["default"].getDataSourceKeyFiltered],
/**
 * @param dataSources {null | Object} all available data sources
 * @param dataSourceKey {String} Data sources key
 * @return {null | Object} Data source
 */
function (dataSources, dataSourceKey) {
  if (dataSourceKey && dataSources && !_lodash["default"].isEmpty(dataSources) && dataSources[dataSourceKey]) {
    return dataSources[dataSourceKey];
  } else {
    return null;
  }
});
/**
 * Collect and prepare data sources grouped by layer key
 *
 * @param state {Object}
 * @param layers {Array} Collection of layers data. Each object in collection contains filter property (it is used for selecting of relations) and data property (which contains data about layer from map state - e.g. key).
 */

var getFilteredGroupedByLayerKey = (0, _reselect.createSelector)([getAllAsObject, _selectors3["default"].getDataSourceKeysGroupedByLayerKey, _selectors3["default"].getDataSourceRelationsGroupedByLayerKey],
/**
 * @param dataSources {null | Object} all available data sources
 * @param groupedKeys {null | Object} Data sources keys grouped by layer key
 * @return {null | Object} Data sources grouped by layer key
 */
function (dataSources, groupedKeys, groupedRelations) {
  if (groupedKeys) {
    var groupedSources = {};

    _lodash["default"].forIn(groupedKeys, function (keys, layerKey) {
      var sources = [];

      _lodash["default"].map(keys, function (key) {
        if (key && dataSources && !_lodash["default"].isEmpty(dataSources) && dataSources[key] && !_lodash["default"].isEmpty(groupedRelations) && groupedRelations[layerKey]) {
          sources.push(_objectSpread(_objectSpread({}, dataSources[key]), {}, {
            attributeRelationData: _lodash["default"].find(groupedRelations[layerKey], function (o) {
              return o.attributeDataSourceKey === key;
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
var _default = {
  getSubstate: getSubstate,
  getFilteredDataSources: getFilteredDataSources,
  getFilteredDataSourcesGroupedByLayerKey: getFilteredDataSourcesGroupedByLayerKey,
  getFiltered: getFiltered,
  getBatchByFilterOrder: getBatchByFilterOrder,
  getFilteredGroupedByLayerKey: getFilteredGroupedByLayerKey,
  getByKey: getByKey,
  getByKeys: getByKeys
};
exports["default"] = _default;