"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _lodash = _interopRequireDefault(require("lodash"));

var _ptrUtils = require("@gisatcz/ptr-utils");

var _ptrCore = require("@gisatcz/ptr-core");

var _ptrTileGrid = require("@gisatcz/ptr-tile-grid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* === HELPERS ======================================================================= */

/**
 * Get background layer in 'layer' format
 */
var getBackgroundLayerAsLayer = (0, _reReselect["default"])([function (backgroundLayer) {
  return backgroundLayer;
}], function (backgroundLayer) {
  if (backgroundLayer) {
    return _objectSpread(_objectSpread({}, backgroundLayer), {}, {
      key: 'pantherBackgroundLayer'
    });
  } else {
    return null;
  }
})(function (backgroundLayer) {
  return JSON.stringify(backgroundLayer);
});
/**
 * Merge background layer definition with layers to one collection
 */

var mergeBackgroundLayerWithLayers = (0, _reReselect["default"])([function (backgroundLayer) {
  return getBackgroundLayerAsLayer(backgroundLayer);
}, function (backgroundLayer, layers) {
  return layers;
}], function (backgroundLayer, layers) {
  var finalLayers = layers || [];

  if (backgroundLayer) {
    finalLayers = [backgroundLayer].concat(_toConsumableArray(finalLayers));
  }

  return finalLayers.length ? finalLayers : null;
})(function (backgroundLayer, layers) {
  return "".concat(JSON.stringify(backgroundLayer), "_").concat(JSON.stringify(layers));
});
/**
 * Merge given modifiers with layer's modifiers & given filterByActive with layer's filter by active and add it to the layer state
 *
 * @param layers {Object} layers state
 * @param metadataModifiers {Object} modifiers like scopeKey, placeKey
 * @param filterByActive {{scope: bool, place: bool, period: bool,  scenario: bool, case: bool}}
 * @return {Object} Final layer state definition
 */

var mergeModifiersAndFilterByActiveToLayerStructure = function mergeModifiersAndFilterByActiveToLayerStructure(layers, metadataModifiers, filterByActive) {
  return layers.map(function (layer) {
    var layerMetadataModifiers = layer.metadataModifiers && metadataModifiers ? _objectSpread(_objectSpread({}, metadataModifiers), layer.metadataModifiers) : metadataModifiers || layer.metadataModifiers || null;
    var layerFilterByActive = layer.filterByActive && filterByActive ? _objectSpread(_objectSpread({}, filterByActive), layer.filterByActive) : filterByActive || layer.filterByActive || null;
    return _objectSpread(_objectSpread({}, layer), {}, {
      metadataModifiers: layerMetadataModifiers,
      filterByActive: layerFilterByActive
    });
  });
};
/**
 * It returns merged view from map and associated map set based on synced params
 * @param map {Object}
 * @param set {Object}
 * @return {Object|unknown} final map view
 */


var getView = function getView(map, set) {
  if (map) {
    if (set) {
      var _map$data, _set$data;

      var mapView = (_map$data = map.data) === null || _map$data === void 0 ? void 0 : _map$data.view; // omit synced view params from map

      if (set.sync && !_lodash["default"].isEmpty(set.sync)) {
        mapView = _lodash["default"].omitBy(mapView, function (viewValue, viewKey) {
          return set.sync[viewKey];
        });
      }

      var mapSetView = (_set$data = set.data) === null || _set$data === void 0 ? void 0 : _set$data.view;
      return _ptrUtils.map.view.mergeViews(_ptrCore.mapConstants.defaultMapView, mapSetView, mapView);
    } else {
      var _map$data2;

      var view = (_map$data2 = map.data) === null || _map$data2 === void 0 ? void 0 : _map$data2.view;
      return _ptrUtils.map.view.mergeViews(_ptrCore.mapConstants.defaultMapView, view);
    }
  } else {
    return null;
  }
};
/**
 * Get zoom level of current view represented by mapWidth, mapHeight and boxRange.
 */


var getZoomLevel = (0, _reReselect["default"])([function (mapWidth) {
  return mapWidth;
}, function (mapWidth, mapHeight) {
  return mapHeight;
}, function (mapWidth, mapHeight, boxRange) {
  return boxRange;
}], function (mapWidth, mapHeight, boxRange) {
  var viewportRange = _ptrUtils.map.view.getMapViewportRange(mapWidth, mapHeight);

  var levelBoxRange = _ptrUtils.map.view.getNearestZoomLevelBoxRange(mapWidth, mapHeight, boxRange);

  return _ptrTileGrid.grid.getLevelByViewport(levelBoxRange, viewportRange);
})(function (mapWidth, mapHeight, boxRange) {
  return "".concat(mapWidth).concat(mapHeight).concat(boxRange);
});
/**
 * Get tiles intersected by map extent.
 * Map extent is represented by mapWidth, mapHeight, center and boxRange.
 */

var getTiles = (0, _reReselect["default"])([function (mapWidth) {
  return mapWidth;
}, function (mapWidth, mapHeight) {
  return mapHeight;
}, function (mapWidth, mapHeight, center) {
  return center;
}, function (mapWidth, mapHeight, center, boxRange) {
  return boxRange;
}], function (mapWidth, mapHeight, center, boxRange) {
  if (mapWidth && mapHeight && center && boxRange) {
    var levelBoxRange = _ptrUtils.map.view.getNearestZoomLevelBoxRange(mapWidth, mapHeight, boxRange);

    var tileGrid = _ptrTileGrid.grid.getTileGrid(mapWidth, mapHeight, levelBoxRange, center, true);

    return tileGrid.flat(1);
  } else {
    return null;
  }
})(function (mapWidth, mapHeight, center, boxRange) {
  return "".concat(mapWidth).concat(mapHeight).concat(center === null || center === void 0 ? void 0 : center.lon).concat(center === null || center === void 0 ? void 0 : center.lat).concat(boxRange);
});
var _default = {
  getBackgroundLayerAsLayer: getBackgroundLayerAsLayer,
  getTiles: getTiles,
  getView: getView,
  getZoomLevel: getZoomLevel,
  mergeBackgroundLayerWithLayers: mergeBackgroundLayerWithLayers,
  mergeModifiersAndFilterByActiveToLayerStructure: mergeModifiersAndFilterByActiveToLayerStructure
};
exports["default"] = _default;