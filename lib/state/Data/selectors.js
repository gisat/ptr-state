"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _recompute = require("@jvitela/recompute");

var _lodash = require("lodash");

var _fastStringify = _interopRequireDefault(require("fast-stringify"));

var _ptrUtils = require("@gisatcz/ptr-utils");

var _selectors = _interopRequireDefault(require("./AttributeRelations/selectors"));

var _selectors2 = _interopRequireDefault(require("./AttributeDataSources/selectors"));

var _selectors3 = _interopRequireDefault(require("./AttributeData/selectors"));

var _selectors4 = _interopRequireDefault(require("./Components/selectors"));

var _selectors5 = _interopRequireDefault(require("./SpatialRelations/selectors"));

var _selectors6 = _interopRequireDefault(require("./SpatialDataSources/selectors"));

var _selectors7 = _interopRequireDefault(require("./SpatialData/selectors"));

var _helpers = require("./helpers");

var _recomputeHelpers = require("../_common/recomputeHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tilesCache = new _ptrUtils.CacheFifo(1000);
/**
 * @param dataSourceKey {string} uuid
 * @param fidColumnName {string} name of property used as feature identifier
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where key is attribute data source key and value is matching attribute key
 */

var getFeatures = (0, _recompute.createSelector)(function (dataSourceKey, fidColumnName, attributeDataSourceKeyAttributeKeyPairs) {
  var data = _selectors7["default"].getByDataSourceKeyObserver(dataSourceKey);

  var attributesByDataSourceKey = null;

  if (attributeDataSourceKeyAttributeKeyPairs) {
    attributesByDataSourceKey = _selectors3["default"].getDataByDataSourceKeys(Object.keys(attributeDataSourceKeyAttributeKeyPairs));
  }

  if (data) {
    return (0, _lodash.map)(data, function (feature, key) {
      var properties = _defineProperty({}, fidColumnName, key);

      if (attributesByDataSourceKey) {
        (0, _lodash.forIn)(attributesByDataSourceKey, function (features, attributeDataSourceKey) {
          var attributeValue = features[key];

          if (attributeValue) {
            properties[attributeDataSourceKeyAttributeKeyPairs[attributeDataSourceKey]] = attributeValue;
          }
        });
      }

      return {
        type: 'Feature',
        key: key,
        geometry: feature.geometry,
        properties: properties
      };
    });
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * Assemble vector data for single tile
 * @param dataSourceKey {string} uuid
 * @param fidColumnName {string} name of property used as feature identifier
 * @param level {number}
 * @param tile {Array} tile definition point
 * @param spatialRelationsFilter {Object} getSpatialRelationsFilterFromLayerState
 * @param attributeRelationsFilter {Object} getAttributeRelationsFilterFromLayerState
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where key is attribute data source key and value is matching attribute key
 * @param styleKey {string} uuid
 * @param attributeDataFilter {Object} Filter object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {Object} populated tile (with feature's geometries and attributes)
 */

var getTile = (0, _recompute.createSelector)(function (spatialDataSourceKey, fidColumnName, level, tile, spatialRelationsFilter, attributeRelationsFilter, attributeDataSourceKeyAttributeKeyPairs, styleKey, attributeDataFilter) {
  // Get all data for given key. It caused performance issues when the data was passed as a parameter
  var spatialDataForDataSource = _selectors7["default"].getByDataSourceKeyObserver(spatialDataSourceKey);

  if (spatialDataForDataSource) {
    var tileString = (0, _helpers.tileAsString)(tile);
    var cacheParams = {
      attributeRelationsFilter: attributeRelationsFilter,
      attributeDataFilter: attributeDataFilter,
      spatialRelationsFilter: spatialRelationsFilter,
      level: level,
      tileString: tileString,
      spatialDataSourceKey: spatialDataSourceKey,
      styleKey: styleKey
    };

    var indexedFeatureKeys = _selectors7["default"].getIndexedFeatureKeys(spatialRelationsFilter, level, tileString, spatialDataSourceKey);

    var indexedFeatureKeysByAttributeDataSourceKeys = _selectors3["default"].getSpatiallyIndexedFeatureKeysByDataSourceKeys(attributeDataFilter, level, tileString);

    var cacheKey = (0, _fastStringify["default"])({
      cacheParams: cacheParams,
      indexedFeatureKeys: indexedFeatureKeys,
      indexedFeatureKeysByAttributeDataSourceKeys: indexedFeatureKeysByAttributeDataSourceKeys
    });
    var cache = tilesCache.findByKey(cacheKey);

    if (cache) {
      return cache.data;
    } else {
      if (indexedFeatureKeys !== null && indexedFeatureKeys !== void 0 && indexedFeatureKeys.length) {
        var features = [];
        indexedFeatureKeys.forEach(function (key) {
          var _spatialDataForDataSo, _spatialDataForDataSo2, _spatialDataForDataSo3;

          var properties = _defineProperty({}, fidColumnName, key); // TODO what if some geometries is missing


          var geometry = ((_spatialDataForDataSo = spatialDataForDataSource[key]) === null || _spatialDataForDataSo === void 0 ? void 0 : _spatialDataForDataSo.geometry) || ((_spatialDataForDataSo2 = spatialDataForDataSource[key]) === null || _spatialDataForDataSo2 === void 0 ? void 0 : (_spatialDataForDataSo3 = _spatialDataForDataSo2.geometries) === null || _spatialDataForDataSo3 === void 0 ? void 0 : _spatialDataForDataSo3[level]);

          if (attributeDataSourceKeyAttributeKeyPairs) {
            var attributes = _selectors3["default"].getAttributesByDataSourceKeysForFeatureKey(attributeDataSourceKeyAttributeKeyPairs, key);

            if (attributes) {
              properties = _objectSpread(_objectSpread({}, properties), attributes);
            }
          }

          if (geometry) {
            features.push({
              type: 'Feature',
              key: key,
              geometry: geometry,
              properties: properties
            });
          }
        });
        var data = {
          features: features.length ? features : null,
          tile: tileString,
          level: level
        };
        tilesCache.addOrUpdate({
          cacheKey: cacheKey,
          data: data
        });
        return data;
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * Assemble vector data for all tiles
 * @param dataSourceKey {string} uuid
 * @param fidColumnName {string} name of property used as feature identifier
 * @param level {number}
 * @param tiles {Array} list of tiles definition points
 * @param spatialRelationsFilter {Object} getSpatialRelationsFilterFromLayerState
 * @param attributeRelationsFilter {Object} getAttributeRelationsFilterFromLayerState
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where key is attribute data source key and value is matching attribute key
 * @param styleKey {string} uuid
 * @param attributeDataFilter {Object} Filter object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {Array} a collection of populated tiles (with feature's geometries and attributes)
 */

var getTiles = (0, _recompute.createSelector)(function (dataSourceKey, fidColumnName, level, tiles, spatialRelationsFilter, attributeRelationsFilter, attributeDataSourceKeyAttributeKeyPairs, styleKey, attributeDataFilter) {
  if (tiles !== null && tiles !== void 0 && tiles.length) {
    var populatedTiles = [];
    (0, _lodash.forEach)(tiles, function (tile) {
      var populatedTile = getTile(dataSourceKey, fidColumnName, level, tile, spatialRelationsFilter, attributeRelationsFilter, attributeDataSourceKeyAttributeKeyPairs, styleKey, attributeDataFilter);

      if (populatedTile) {
        populatedTiles.push(populatedTile);
      }
    });
    return populatedTiles.length ? populatedTiles : null;
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
var _default = {
  getFeatures: getFeatures,
  getTile: getTile,
  getTiles: getTiles,
  attributeData: _selectors3["default"],
  attributeDataSources: _selectors2["default"],
  attributeRelations: _selectors["default"],
  components: _selectors4["default"],
  spatialData: _selectors7["default"],
  spatialDataSources: _selectors6["default"],
  spatialRelations: _selectors5["default"]
};
exports["default"] = _default;