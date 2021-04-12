"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _lodash = _interopRequireDefault(require("lodash"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _selectors2 = _interopRequireDefault(require("../AttributeRelations/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var getSubstate = function getSubstate(state) {
  return state.attributeData;
};

var getAllAsObject = _selectors["default"].getAllAsObject(getSubstate);

var getBatchByFilterOrder = _selectors["default"].getBatchByFilterOrder(getSubstate);

var getByKey = _selectors["default"].getByKey(getSubstate); // DEPRECATED -------------------------------------------

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


var getFiltered = (0, _reselect.createSelector)([getAllAsObject, _selectors2["default"].getDataSourceKeyFiltered],
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
var getFilteredGroupedByFid = (0, _reReselect["default"])([getAllAsObject, _selectors2["default"].getDataSourcesFromFilteredRelations], function (allDataSources, filtered) {
  if (allDataSources && !_lodash["default"].isEmpty(allDataSources) && filtered) {
    var data = {};

    _lodash["default"].map(filtered, function (filteredSource) {
      var source = allDataSources[filteredSource.attributeDataSourceKey];
      var keySource = filteredSource.fidColumnName;
      var nameSource = filteredSource.fidColumnName;

      if (source && source.attributeData && source.attributeData.features) {
        var features = source.attributeData.features;

        _lodash["default"].map(features, function (feature) {
          var key = feature.properties[keySource];

          var _feature$properties = feature.properties,
              keyName = _feature$properties[keySource],
              props = _objectWithoutProperties(_feature$properties, [keySource].map(_toPropertyKey));

          var values = [];
          var existingKey = data[key];

          _lodash["default"].map(props, function (value, key) {
            if (existingKey) {
              existingKey.data.values.push({
                key: key,
                value: value
              });
            } else {
              values.push({
                key: key,
                value: value
              });
            }
          });

          if (!existingKey) {
            data[key] = {
              key: key,
              data: {
                name: feature.properties[nameSource],
                values: values
              }
            };
          }
        });
      }
    });

    return _lodash["default"].values(data);
  } else {
    return null;
  }
})(function (state, mergedFilter) {
  return "".concat(JSON.stringify(mergedFilter));
});
var getNamesByFid = (0, _reReselect["default"])([getAllAsObject, _selectors2["default"].getDataSourcesFromFilteredRelations], function (allDataSources, filtered) {
  if (allDataSources && !_lodash["default"].isEmpty(allDataSources) && filtered) {
    var data = {};

    if (filtered.length === 1) {
      var filteredSource = filtered[0];
      var source = allDataSources[filteredSource.attributeDataSourceKey];
      var keySource = filteredSource.fidColumnName;

      if (source && source.attributeData && source.attributeData.features) {
        var features = source.attributeData.features;

        _lodash["default"].map(features, function (feature) {
          var key = feature.properties[keySource];

          var _feature$properties2 = feature.properties,
              keyName = _feature$properties2[keySource],
              props = _objectWithoutProperties(_feature$properties2, [keySource].map(_toPropertyKey));

          data[key] = {
            key: key,
            data: {
              name: _lodash["default"].values(props)[0]
            }
          };
        });
      }

      return _lodash["default"].values(data);
    } else {
      return null;
    }
  } else {
    return null;
  }
})(function (state, filter, cacheKey) {
  return "".concat(JSON.stringify(filter), ":").concat(JSON.stringify(cacheKey));
});
/**
 * Collect and prepare data sources grouped by layer key
 *
 * @param state {Object}
 * @param layers {Array} Collection of layers data. Each object in collection contains filter property (it is used for selecting of relations) and data property (which contains data about layer from map state - e.g. key).
 */

var getFilteredGroupedByLayerKey = (0, _reselect.createSelector)([getAllAsObject, _selectors2["default"].getDataSourceKeysGroupedByLayerKey, _selectors2["default"].getDataSourceRelationsGroupedByLayerKey],
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
  getAllAsObject: getAllAsObject,
  getByKey: getByKey,
  getFiltered: getFiltered,
  getBatchByFilterOrder: getBatchByFilterOrder,
  getFilteredGroupedByLayerKey: getFilteredGroupedByLayerKey,
  getFilteredGroupedByFid: getFilteredGroupedByFid,
  getNamesByFid: getNamesByFid
};
exports["default"] = _default;