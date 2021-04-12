"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _lodash = _interopRequireDefault(require("lodash"));

var path = _interopRequireWildcard(require("path"));

var _ptrUtils = require("@gisatcz/ptr-utils");

var _helpers = _interopRequireDefault(require("./helpers"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _selectors2 = _interopRequireDefault(require("../LayerTemplates/selectors"));

var _selectors3 = _interopRequireDefault(require("../SpatialDataSources/selectors"));

var _selectors4 = _interopRequireDefault(require("../AttributeData/selectors"));

var _selectors5 = _interopRequireDefault(require("../AttributeDataSources/selectors"));

var _selectors6 = _interopRequireDefault(require("../App/selectors"));

var _selectors7 = _interopRequireDefault(require("../Styles/selectors"));

var _selectors8 = _interopRequireDefault(require("../Selections/selectors"));

var _selectors9 = _interopRequireDefault(require("../Periods/selectors"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultMapView = {
  center: {
    lat: 50.099577,
    lon: 14.425960
  },
  boxRange: 10000000,
  tilt: 0,
  roll: 0,
  heading: 0
};
var mapConstants = {
  defaultMapView: defaultMapView
};
var getBackgroundLayerCache = new _ptrUtils.CacheFifo(10);
var getLayersCache = new _ptrUtils.CacheFifo(10);
/* ===== Basic selectors ==================== */

var getSubstate = function getSubstate(state) {
  return state._deprecatedMaps;
};

var getMapsAsObject = function getMapsAsObject(state) {
  return state._deprecatedMaps.maps;
};

var getMapSetsAsObject = function getMapSetsAsObject(state) {
  return state._deprecatedMaps.sets;
};

var getActiveSetKey = function getActiveSetKey(state) {
  return state._deprecatedMaps.activeSetKey;
};

var getActiveMapKey = function getActiveMapKey(state) {
  return state._deprecatedMaps.activeMapKey;
};

var getActiveMap = (0, _reselect.createSelector)([getMapsAsObject, getActiveMapKey], function (maps, activeKey) {
  if (maps && !_lodash["default"].isEmpty(maps) && activeKey && maps[activeKey]) {
    return maps[activeKey];
  } else {
    return null;
  }
});
var getMaps = (0, _reselect.createSelector)([getMapsAsObject], function (maps) {
  if (maps && !_lodash["default"].isEmpty(maps)) {
    return Object.values(maps);
  } else {
    return null;
  }
});
var getMapSets = (0, _reselect.createSelector)([getMapSetsAsObject], function (sets) {
  if (sets && !_lodash["default"].isEmpty(sets)) {
    return Object.values(sets);
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapByKey = (0, _reReselect["default"])([getMapsAsObject, function (state, key) {
  return key;
}], function (maps, key) {
  if (maps && !_lodash["default"].isEmpty(maps) && key) {
    return maps[key] ? maps[key] : null;
  } else {
    return null;
  }
})(function (state, key) {
  return key;
});
var getMapLayersByMapKey = (0, _reselect.createSelector)([getMapByKey], function (map) {
  return map && map.data && map.data.layers || null;
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetByKey = (0, _reselect.createSelector)([getMapSetsAsObject, function (state, key) {
  return key;
}], function (sets, key) {
  if (sets && !_lodash["default"].isEmpty(sets) && key) {
    return sets[key] ? sets[key] : null;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetByMapKey = (0, _reselect.createSelector)([getMapSets, function (state, mapKey) {
  return mapKey;
}], function (sets, mapKey) {
  if (sets && !_lodash["default"].isEmpty(sets) && mapKey) {
    var setForMap = null;
    sets.forEach(function (set) {
      if (set.maps && _lodash["default"].includes(set.maps, mapKey)) {
        setForMap = set;
      }
    });
    return setForMap;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetMapKeys = (0, _reselect.createSelector)([getMapSetByKey], function (set) {
  if (set && set.maps && set.maps.length) {
    return set.maps;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapBackgroundLayerStateByMapKey = (0, _reselect.createSelector)([getMapByKey], function (map) {
  if (map && map.data && map.data.backgroundLayer) {
    return map.data.backgroundLayer;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapLayersStateByMapKey = (0, _reselect.createSelector)([getMapByKey], function (map) {
  if (map && map.data && map.data.layers) {
    return map.data.layers;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapMetadataModifiersByMapKey = (0, _reselect.createSelector)([getMapByKey], function (map) {
  if (map && map.data && map.data.metadataModifiers) {
    return map.data.metadataModifiers;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapFilterByActiveByMapKey = (0, _reselect.createSelector)([getMapByKey], function (map) {
  if (map && map.data && map.data.filterByActive) {
    return map.data.filterByActive;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetBackgroundLayerStateByMapKey = (0, _reselect.createSelector)([getMapSetByMapKey], function (set) {
  if (set && set.data && set.data.backgroundLayer) {
    return set.data.backgroundLayer;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetLayersStateByMapKey = (0, _reselect.createSelector)([getMapSetByMapKey], function (set) {
  if (set && set.data && set.data.layers) {
    return set.data.layers;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetMetadataModifiersByMapKey = (0, _reselect.createSelector)([getMapSetByMapKey], function (set) {
  if (set && set.data && set.data.metadataModifiers) {
    return set.data.metadataModifiers;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetFilterByActiveByMapKey = (0, _reselect.createSelector)([getMapSetByMapKey], function (set) {
  if (set && set.data && set.data.filterByActive) {
    return set.data.filterByActive;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapSetKey {string}
 */

var getMapSetLayersStateBySetKey = (0, _reselect.createSelector)([getMapSetByKey], function (set) {
  if (set && set.data && set.data.layers) {
    return set.data.layers;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 * @param layerKey {string}
 */

var getMapLayerByMapKeyAndLayerKey = (0, _reselect.createSelector)([getMapLayersStateByMapKey, function (state, mapKey, layerKey) {
  return layerKey;
}], function (layers, layerKey) {
  if (layers && layerKey) {
    return layers.find(function (l) {
      return l.key === layerKey;
    });
  } else {
    return null;
  }
});
/* ===== Combined selectors ==================== */

/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getFilterByActiveByMapKey = (0, _reReselect["default"])([getMapFilterByActiveByMapKey, getMapSetFilterByActiveByMapKey], function (mapFilter, setFilter) {
  return (setFilter || mapFilter) && _objectSpread(_objectSpread({}, setFilter), mapFilter);
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getBackgroundLayerStateByMapKey = (0, _reReselect["default"])([getMapBackgroundLayerStateByMapKey, getMapSetBackgroundLayerStateByMapKey], function (mapBackgroundLayer, setBackgroundLayer) {
  return mapBackgroundLayer || setBackgroundLayer;
})(function (state, mapKey) {
  return "".concat(mapKey);
});
/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged layer state from mapState and mapSetState with metadataModifiers and filterByActive.
 */

var getLayersStateByMapKey = (0, _reReselect["default"])([getMapLayersStateByMapKey, getMapSetLayersStateByMapKey, getMapMetadataModifiersByMapKey, getMapSetMetadataModifiersByMapKey, getFilterByActiveByMapKey], function (mapLayers, setLayers, mapMetadataModifiers, setMetadataModifiers, mapFilterByActive) {
  if (mapLayers || setLayers) {
    var layers = [].concat(_toConsumableArray(setLayers || []), _toConsumableArray(mapLayers || []));
    var modifiers = {};

    if (setMetadataModifiers) {
      modifiers = setMetadataModifiers;
    }

    modifiers = _objectSpread(_objectSpread({}, modifiers), mapMetadataModifiers);
    layers = layers.map(function (layer) {
      var layerMetadataModifiers = layer.metadataModifiers ? _objectSpread(_objectSpread({}, modifiers), layer.metadataModifiers) : modifiers;
      var layerFilterByActive = layer.filterByActive ? _objectSpread(_objectSpread({}, mapFilterByActive), layer.filterByActive) : mapFilterByActive;
      return _objectSpread(_objectSpread({}, layer), {}, {
        metadataModifiers: layerMetadataModifiers,
        filterByActive: layerFilterByActive
      });
    }); // TODO return error for duplicates?

    return _lodash["default"].uniqBy(layers, 'key');
  } else {
    return null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getAllLayersStateByMapKey = (0, _reselect.createSelector)([getBackgroundLayerStateByMapKey, getLayersStateByMapKey], function (backgroundLayer, layers) {
  if (layers || backgroundLayer) {
    layers = layers || [];

    if (backgroundLayer) {
      // TODO do not create new object for background layer on change in layers
      backgroundLayer = _objectSpread(_objectSpread({}, backgroundLayer), {}, {
        key: 'pantherBackgroundLayer'
      });
      return [backgroundLayer].concat(_toConsumableArray(layers));
    }

    return layers;
  } else {
    return null;
  }
});
/**
 * Get active map key for set. Either local, or global.
 *
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetActiveMapKey = (0, _reselect.createSelector)([getActiveMapKey, getMapSetByKey], function (mapKey, set) {
  if (set) {
    var mapKeyInSet = _lodash["default"].includes(set.maps, mapKey);

    return set.activeMapKey || mapKeyInSet && mapKey || null;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getView = (0, _reReselect["default"])([getMapByKey, getMapSetByMapKey], function (map, set) {
  if (map) {
    if (set) {
      var mapView = map.data && map.data.view; // omit synced view params from map

      if (set.sync && !_lodash["default"].isEmpty(set.sync)) {
        mapView = _lodash["default"].omitBy(mapView, function (viewValue, viewKey) {
          return set.sync[viewKey];
        });
      }

      var mapSetView = set.data && set.data.view;

      var view = _ptrUtils.map.view.mergeViews(mapConstants.defaultMapView, mapSetView, mapView);

      return !_lodash["default"].isEmpty(view) ? view : null;
    } else {
      var _view = map.data && map.data.view;

      return _ptrUtils.map.view.mergeViews(mapConstants.defaultMapView, _view);
    }
  } else {
    return null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getViewLimits = (0, _reReselect["default"])([getMapByKey, getMapSetByMapKey], function (map, set) {
  if (map) {
    if (set) {
      var _map$data, _set$data;

      var mapViewLimits = (_map$data = map.data) === null || _map$data === void 0 ? void 0 : _map$data.viewLimits;
      var mapSetViewLimits = (_set$data = set.data) === null || _set$data === void 0 ? void 0 : _set$data.viewLimits;

      var viewLimits = _ptrUtils.map.view.mergeViews(mapSetViewLimits, mapViewLimits);

      return !_lodash["default"].isEmpty(viewLimits) ? viewLimits : null;
    } else {
      var _map$data2;

      return (_map$data2 = map.data) === null || _map$data2 === void 0 ? void 0 : _map$data2.viewLimits;
    }
  } else {
    return null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetView = (0, _reselect.createSelector)([getMapSetByKey], function (set) {
  if (set) {
    var setView = set.data && set.data.view;
    return _ptrUtils.map.view.mergeViews(mapConstants.defaultMapView, setView);
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetViewLimits = (0, _reselect.createSelector)([getMapSetByKey], function (set) {
  var _set$data2;

  return (set === null || set === void 0 ? void 0 : (_set$data2 = set.data) === null || _set$data2 === void 0 ? void 0 : _set$data2.viewLimits) || null;
});
var getMapSetActiveMapView = (0, _reselect.createSelector)([getMapSetActiveMapKey, getMapSetByKey, getMapsAsObject], function (mapKey, set, maps) {
  var map = maps[mapKey];

  if (map) {
    if (set) {
      var mapView = map.data && map.data.view; // omit synced view params from map

      if (set.sync && !_lodash["default"].isEmpty(set.sync)) {
        mapView = _lodash["default"].omitBy(mapView, function (viewValue, viewKey) {
          return set.sync[viewKey];
        });
      }

      var mapSetView = set.data && set.data.view;

      var view = _ptrUtils.map.view.mergeViews(mapConstants.defaultMapView, mapSetView, mapView);

      return !_lodash["default"].isEmpty(view) ? view : null;
    } else {
      var _view2 = map.data && map.data.view;

      return _ptrUtils.map.view.mergeViews(mapConstants.defaultMapView, _view2);
    }
  } else {
    return null;
  }
});
/* ===== Complex selectors ========================= */
// TODO cache?

var getBackgroundLayer = function getBackgroundLayer(state, layerState) {
  if (layerState) {
    if (layerState.type) {
      // TODO helper
      return layerState;
    } else {
      var layerKey = 'pantherBackgroundLayer'; // TODO valid approach to stringify parameter?

      var layersWithFilter = _helpers["default"].getBackgroundLayersWithFilter(state, JSON.stringify(layerState), layerKey);

      var dataSourcesByLayerKey = _selectors3["default"].getFilteredSourcesGroupedByLayerKey(state, layersWithFilter);

      if (dataSourcesByLayerKey && dataSourcesByLayerKey[layerKey]) {
        // TODO experimental
        var cacheKey = JSON.stringify(layersWithFilter);
        var cache = getBackgroundLayerCache.findByKey(cacheKey);
        var layerDataSources = dataSourcesByLayerKey[layerKey];

        if (cache && cache.layersWithFilter === layersWithFilter && cache.layerDataSources === layerDataSources) {
          return cache.mapLayers;
        } else {
          var mapLayers = _lodash["default"].map(dataSourcesByLayerKey[layerKey], function (dataSourceWithFidColumn, index) {
            return _helpers["default"].prepareLayerByDataSourceType(layerKey, dataSourceWithFidColumn.dataSource, dataSourceWithFidColumn.fidColumnName, index);
          });

          getBackgroundLayerCache.addOrUpdate({
            cacheKey: cacheKey,
            layersWithFilter: layersWithFilter,
            layerDataSources: layerDataSources,
            mapLayers: mapLayers
          });
          return mapLayers;
        }
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
}; // TODO cache?

/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Array}
 */


var getMapBackgroundLayer = function getMapBackgroundLayer(state, mapKey) {
  var layerState = getBackgroundLayerStateByMapKey(state, mapKey);
  return getBackgroundLayer(state, layerState);
};
/**
 * Use this function for getting layer deffinition if layer is defined in state.
 * Check if dataSources for layerKey are loaded and defined otherwise return null.
 * Returns object that is input for Layer from @gisatcz/ptr-maps.
 * @param {Object} state App state
 * @param {Object} layerState Merged layer state from mapState and mapSetState with metadataModifiers and filterByActive.
 * @param {Object} dataSourcesByLayerKey dataSources related to layerState.key
 * @param {Object} attributeDataSourcesByLayerKey attributeDataSources related to layerState.key
 * @param {Object} stylesByLayerKey styles related to layerState.key
 * @param {Object} selections selections related to layerState.key
 * @param {Object} layerTemplatesByLayerKey layerTemplates related to layerState.key
 * @param {Object} periodsByLayerKey periods related to layerState.key
 */


var getLayerFromState = function getLayerFromState(state, layerState, dataSourcesByLayerKey, attributeDataSourcesByLayerKey, stylesByLayerKey, selections, layerTemplatesByLayerKey, periodsByLayerKey) {
  var layerKey = layerState.key;
  var dataSources = dataSourcesByLayerKey[layerKey];
  var attributeDataSources = attributeDataSourcesByLayerKey && attributeDataSourcesByLayerKey[layerKey];
  var style = stylesByLayerKey && stylesByLayerKey[layerKey];
  var layerTemplate = layerTemplatesByLayerKey && layerTemplatesByLayerKey[layerKey];
  var period = periodsByLayerKey && periodsByLayerKey[layerKey];
  var layer = null;

  if (dataSources && dataSources.length) {
    dataSources.forEach(function (dataSourceWithFidColumn, index) {
      var dataSource = dataSourceWithFidColumn && dataSourceWithFidColumn.dataSource;
      var fidColumnName = dataSourceWithFidColumn && dataSourceWithFidColumn.fidColumnName; // TODO remove - quick solution for geoinv

      var currentApp = _selectors6["default"].getKey(state);

      if (currentApp === 'tacrGeoinvaze') {
        var apiGeoserverWMSProtocol = _selectors6["default"].getLocalConfiguration(state, 'apiGeoserverWMSProtocol');

        var apiGeoserverWMSHost = _selectors6["default"].getLocalConfiguration(state, 'apiGeoserverWMSHost');

        var apiGeoserverWMSPath = _selectors6["default"].getLocalConfiguration(state, 'apiGeoserverWMSPath');

        if (dataSource && dataSource.data && dataSource.data.layerName && (dataSource.data.type === "vector" || dataSource.data.type === "raster")) {
          layer = {
            key: layerKey + '_' + dataSource.key,
            layerKey: layerKey,
            type: "wms",
            options: {
              url: apiGeoserverWMSProtocol + "://" + path.join(apiGeoserverWMSHost, apiGeoserverWMSPath),
              params: {
                layers: dataSource.data.layerName
              }
            }
          };
        } else {
          layer = _helpers["default"].prepareLayerByDataSourceType(layerKey, dataSource, fidColumnName, index);
        }
      } else if (dataSource && dataSource.data) {
        layer = _helpers["default"].prepareLayerByDataSourceType(layerKey, dataSource, fidColumnName, index, layerState, style, attributeDataSources, selections, layerTemplate, period);
      }
    });
  }

  return layer;
}; // TODO caching is experimental

/**
 * Returns Array of objects that is input for Layer from @gisatcz/ptr-maps.
 * @param {Object} state App state
 * @param {Array} layersState 
 */


var getLayers = function getLayers(state, layersState) {
  // TODO valid approach to stringify parameter?
  var layersStateAsString = JSON.stringify(_helpers["default"].getLayersStateWithoutFeatures(layersState));

  var layersWithFilter = _helpers["default"].getLayersWithFilter(state, layersStateAsString);

  if (layersWithFilter && layersWithFilter.length) {
    var dataSourcesByLayerKey = _selectors3["default"].getFilteredSourcesGroupedByLayerKey(state, layersWithFilter);

    var layerTemplatesByLayerKey = _selectors2["default"].getFilteredTemplatesGroupedByLayerKey(state, layersWithFilter);

    var attributeDataSourcesByLayerKey = _selectors5["default"].getFilteredDataSourcesGroupedByLayerKey(state, layersWithFilter, layersState, layersStateAsString);

    var stylesByLayerKey = _selectors7["default"].getGroupedByLayerKey(state, layersState, layersStateAsString);

    var selections = _selectors8["default"].getAllAsObjectWithStyles(state);

    var periodsByLayerKey = _selectors9["default"].getFilteredGroupedByLayerKey(state, layersWithFilter);

    var cacheKey = JSON.stringify(layersWithFilter);
    var cache = getLayersCache.findByKey(cacheKey);

    if (cache && cache.layersWithFilter === layersWithFilter && cache.dataSourcesByLayerKey === dataSourcesByLayerKey && cache.layerTemplatesByLayerKey === layerTemplatesByLayerKey && cache.stylesByLayerKey === stylesByLayerKey && cache.attributeDataSourcesByLayerKey === attributeDataSourcesByLayerKey && cache.selections === selections && cache.periodsByLayerKey === periodsByLayerKey) {
      return cache.mapLayers;
    } else {
      var mapLayers = [];
      layersState.forEach(function (layerState) {
        if (layerState.layerTemplateKey && dataSourcesByLayerKey && !_lodash["default"].isEmpty(dataSourcesByLayerKey)) {
          var layer = getLayerFromState(state, layerState, dataSourcesByLayerKey, attributeDataSourcesByLayerKey, stylesByLayerKey, selections, layerTemplatesByLayerKey, periodsByLayerKey);

          if (layer) {
            mapLayers.push(layer);
          }
        } else if (layerState.type) {
          var _layerState$options;

          var _layer = (_layerState$options = layerState.options) !== null && _layerState$options !== void 0 && _layerState$options.selected ? _objectSpread(_objectSpread({}, layerState), {}, {
            options: _objectSpread(_objectSpread({}, layerState.options), {}, {
              selected: _helpers["default"].prepareSelection(selections, layerState.options.selected)
            })
          }) : layerState;

          mapLayers.push(_layer);
        }
      });
      getLayersCache.addOrUpdate({
        cacheKey: cacheKey,
        layersWithFilter: layersWithFilter,
        dataSourcesByLayerKey: dataSourcesByLayerKey,
        layerTemplatesByLayerKey: layerTemplatesByLayerKey,
        attributeDataSourcesByLayerKey: attributeDataSourcesByLayerKey,
        mapLayers: mapLayers,
        stylesByLayerKey: stylesByLayerKey,
        selections: selections,
        periodsByLayerKey: periodsByLayerKey
      });
      return mapLayers;
    }

    ;
  } else {
    return null;
  }
}; // TODO cache?

/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Array}
 */


var getMapLayers = function getMapLayers(state, mapKey) {
  var layersState = getLayersStateByMapKey(state, mapKey);
  return getLayers(state, layersState);
};
/* ===============================================
   Deprecated
   =============================================== */


var getMapByMetadata_deprecated = (0, _reselect.createSelector)([getMaps, function (state, metadata) {
  return metadata;
}], function (maps, metadata) {
  if (maps && metadata) {
    var filtered = _lodash["default"].filter(maps, function (map) {
      if (map.data && map.data.metadataModifiers) {
        return _lodash["default"].isMatch(map.data.metadataModifiers, metadata);
      } else {
        return false;
      }
    });

    if (filtered && filtered.length) {
      return filtered[0]; //TODO what if more maps are selected based on filter
    } else {
      return null;
    }
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getNavigator_deprecated = (0, _reselect.createSelector)([getMapByKey, getMapSetByMapKey], function (map, set) {
  if (map) {
    if (set) {
      var mapNavigator = map.data && map.data.worldWindNavigator;
      var mapSetNavigator = set.data && set.data.worldWindNavigator;

      var navigator = _objectSpread(_objectSpread({}, mapSetNavigator), mapNavigator);

      return !_lodash["default"].isEmpty(navigator) ? navigator : null;
    } else {
      var _navigator = map.data && map.data.worldWindNavigator;

      return _navigator && !_lodash["default"].isEmpty(_navigator) ? _navigator : null;
    }
  } else {
    return null;
  }
});
var getMapSetNavigatorRange_deprecated = (0, _reselect.createSelector)([getMapSetByKey], function (set) {
  if (set) {
    return set.data && set.data.worldWindNavigator && set.data.worldWindNavigator.range;
  } else {
    return null;
  }
});
/**
 * Collect and prepare data for map component
 *
 * @param state {Object}
 * @param layers {Array} Collection of layers data. Each object in collection contains filter property (it is used for selecting of relations) and data property (which contains data about layer from map state - e.g. key).
 */

var getLayers_deprecated = (0, _reselect.createSelector)([_selectors3["default"].getFilteredGroupedByLayerKey, _selectors4["default"].getFilteredGroupedByLayerKey, _selectors6["default"].getCompleteLocalConfiguration, function (state, layers) {
  return layers;
}],
/**
 * @param groupedSources {null | Object} Data sources grouped by layer key
 * @param layers {null | Array}
 * @return {null | Array} Collection of layers data for map component
 */
function (groupedSpatialSources, groupedAttributeSources, localConfig, layers) {
  // FIXME - more complex
  if (groupedSpatialSources && groupedAttributeSources && layers) {
    return layers.map(function (layer) {
      return getLayerConfiguration(localConfig, layer, groupedSpatialSources[layer.data.key], groupedAttributeSources[layer.data.key]);
    });
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getBackgroundLayerStateByMapKey_deprecated = (0, _reselect.createSelector)([getMapByKey, getMapSetByMapKey, _selectors["default"].getAllActiveKeys], function (map, set, activeKeys) {
  var layerTemplate = null;
  var filter = {
    place: null,
    period: null,
    "case": null,
    scenario: null
  };

  if (map && map.data && map.data.backgroundLayer) {
    layerTemplate = map.data.backgroundLayer;
  } else if (set && set.data && set.data.backgroundLayer) {
    layerTemplate = set.data.backgroundLayer;
  }

  if (layerTemplate) {
    return getFiltersForUse_deprecated(_objectSpread(_objectSpread({}, filter), {}, {
      layerTemplate: layerTemplate.layerTemplate,
      key: layerTemplate.key
    }), activeKeys);
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getLayersStateByMapKey_deprecated = (0, _reselect.createSelector)([getMapByKey, getMapSetByMapKey, _selectors["default"].getAllActiveKeys, function (state, mapKey, useActiveMetadataKeys) {
  return useActiveMetadataKeys;
}], function (map, mapSet, activeKeys, useActiveMetadataKeys) {
  var setLayers = mapSet && mapSet.data && mapSet.data.layers || null;
  var mapLayers = map && map.data && map.data.layers || null;

  if (map && (mapLayers || setLayers)) {
    var layers = [].concat(_toConsumableArray(setLayers || []), _toConsumableArray(mapLayers || []));
    var modifiers = {};

    if (mapSet) {
      var a = mapSet.data.metadataModifiers;
      modifiers = _objectSpread(_objectSpread({}, modifiers), mapSet.data.metadataModifiers);
    }

    modifiers = _objectSpread(_objectSpread({}, modifiers), map.data.metadataModifiers);
    layers = layers.map(function (layer) {
      return getFiltersForUse_deprecated(_objectSpread(_objectSpread({}, modifiers), layer), activeKeys, useActiveMetadataKeys);
    });
    return layers;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getAllLayersStateByMapKey_deprecated = (0, _reselect.createSelector)([getLayersStateByMapKey_deprecated, getBackgroundLayerStateByMapKey_deprecated], function (layersState, backgroundLayerState) {
  var backgroundLayerData = backgroundLayerState ? [getLayerState(backgroundLayerState)] : [];
  var layersData = layersState ? layersState.map(getLayerState) : [];
  return _construct(Array, _toConsumableArray(layersData).concat(backgroundLayerData));
});
/**
 * @param state {Object}
 * @param mapSetKey {string}
 * @returns {Array<Map> | null}
 */

var getMapsByMapSetKey_deprecated = (0, _reselect.createSelector)([getMapsAsObject, getMapSetMapKeys], function (maps, mapSetMapsKeys) {
  if (maps && !_lodash["default"].isEmpty(maps) && mapSetMapsKeys && !_lodash["default"].isEmpty(mapSetMapsKeys)) {
    return mapSetMapsKeys.map(function (k) {
      return maps[k];
    });
  } else {
    return null;
  }
});
var getLayersStateByMapSetKey_deprecated = (0, _reselect.createSelector)([getMapSetByKey, getMapsByMapSetKey_deprecated, _selectors["default"].getAllActiveKeys], function (mapSet, maps, activeKeys) {
  var mapsLayersState = {};
  var setLayers = mapSet && mapSet.data && mapSet.data.layers || null;

  if (maps) {
    maps.forEach(function (map) {
      var mapLayers = map && map.data && map.data.layers || null;

      if (map && (mapLayers || setLayers)) {
        var layers = [].concat(_toConsumableArray(setLayers || []), _toConsumableArray(mapLayers || []));
        var modifiers = {};

        if (mapSet) {
          var a = mapSet.data.metadataModifiers;
          modifiers = _objectSpread(_objectSpread({}, modifiers), mapSet.data.metadataModifiers);
        }

        modifiers = _objectSpread(_objectSpread({}, modifiers), map.data.metadataModifiers); //TODO
        //specific for FUORE

        var useMetadata = {
          scope: true,
          attribute: true,
          period: true
        };
        layers = layers.map(function (layer) {
          return getFiltersForUse_deprecated(_objectSpread(_objectSpread({}, modifiers), layer), activeKeys, useMetadata);
        });
        mapsLayersState[map.key] = layers;
      }
    });
  }

  return mapsLayersState;
}); // ----- helpers ------

var getLayerState = function getLayerState(layer) {
  return {
    filter: layer.mergedFilter,
    data: layer.layer
  };
};

var getLayerConfiguration = function getLayerConfiguration(localConfig, layer, spatialSourcesForLayer, attributeSourcesForLayer) {
  // let spatialSourcesForLayer = groupedSpatialSources[layer.data.key];
  var layerConfig = null;

  if (spatialSourcesForLayer) {
    //TODO
    //take only first datasource for now
    // spatialSourcesForLayer.forEach(source => {
    [spatialSourcesForLayer[0]].forEach(function (source) {
      var key = "".concat(layer.data.key);
      var mapServerConfig = {
        wmsMapServerUrl: "".concat(localConfig.apiGeoserverWMSProtocol, "://").concat(localConfig.apiGeoserverWMSHost, "/").concat(localConfig.apiGeoserverWMSPath),
        wfsMapServerUrl: "".concat(localConfig.apiGeoserverWFSProtocol, "://").concat(localConfig.apiGeoserverWFSHost, "/").concat(localConfig.apiGeoserverWFSPath)
      };

      if (source) {
        key += "-".concat(source.key);
        layerConfig = _objectSpread(_objectSpread({}, source.data), {}, {
          spatialDataSourceKey: source.key,
          spatialRelationsData: source.spatialRelationData,
          key: key,
          mapServerConfig: mapServerConfig
        });
      } else {
        layerConfig = {
          key: key,
          mapServerConfig: mapServerConfig
        };
      }
    });
  } //add attribute relations data


  if (attributeSourcesForLayer && layerConfig) {
    attributeSourcesForLayer.forEach(function (source) {
      if (source) {
        var attributeLayerTemplateKey = source.attributeRelationData && source.attributeRelationData.layerTemplateKey;

        if (attributeLayerTemplateKey) {
          layerConfig.attributeRelationsData = source.attributeRelationData;
        }
      }
    });
  }

  return layerConfig;
};
/**
 * Prepare filters for use from layers state
 * @param layer {Object} layer state
 * @param activeKeys {Object} Metadata active keys
 * @param useMetadata {Object}
 * @return {{filter, filterByActive, mergedFilter, layer}}
 */


function getFiltersForUse_deprecated(layer, activeKeys, useMetadata) {
  var filter = {};
  var filterByActive = {};
  var mergedFilter = {};

  if (layer && layer.hasOwnProperty('scope')) {
    filter.scopeKey = layer.scope;
  } else if (!useMetadata || useMetadata && useMetadata.scope) {
    filterByActive.scope = true;

    if (activeKeys && activeKeys.activeScopeKey) {
      mergedFilter.scopeKey = activeKeys.activeScopeKey;
    }
  }

  if (layer && layer.hasOwnProperty('place')) {
    filter.placeKey = layer.place;
  } else if (!useMetadata || useMetadata && useMetadata.place) {
    filterByActive.place = true;

    if (activeKeys && activeKeys.activePlaceKey) {
      mergedFilter.placeKey = activeKeys.activePlaceKey;
    }
  }

  if (layer && layer.hasOwnProperty('period')) {
    filter.periodKey = layer.period;
  } else if (!useMetadata || useMetadata && useMetadata.period) {
    filterByActive.period = true;

    if (activeKeys && activeKeys.activePeriodKey) {
      mergedFilter.periodKey = activeKeys.activePeriodKey;
    }
  }

  if (layer && layer.hasOwnProperty('case')) {
    filter.caseKey = layer["case"];
  } else if (!useMetadata || useMetadata && useMetadata["case"]) {
    filterByActive["case"] = true;

    if (activeKeys && activeKeys.activeCaseKey) {
      mergedFilter.caseKey = activeKeys.activeCaseKey;
    }
  }

  if (layer && layer.hasOwnProperty('scenario')) {
    filter.scenarioKey = layer.scenario;
  } else if (!useMetadata || useMetadata && useMetadata.scenario) {
    filterByActive.scenario = true;

    if (activeKeys && activeKeys.activeScenarioKey) {
      mergedFilter.scenarioKey = activeKeys.activeScenarioKey;
    }
  }

  if (layer && layer.hasOwnProperty('layerTemplate')) {
    filter.layerTemplateKey = layer.layerTemplate;
  }

  if (layer && layer.hasOwnProperty('attribute')) {
    filter.attributeKey = layer.attribute;
  } else if (!useMetadata || useMetadata && useMetadata.attribute) {
    filterByActive.attribute = true;

    if (activeKeys && activeKeys.activeAttributeKey) {
      mergedFilter.attributeKey = activeKeys.activeAttributeKey;
    }
  }

  mergedFilter = _objectSpread(_objectSpread({}, filter), mergedFilter);
  return {
    layer: layer ? layer : null,
    filter: filter,
    filterByActive: filterByActive,
    mergedFilter: mergedFilter
  };
}

var _default = {
  getActiveMap: getActiveMap,
  getActiveMapKey: getActiveMapKey,
  getActiveSetKey: getActiveSetKey,
  getAllLayersStateByMapKey: getAllLayersStateByMapKey,
  getBackgroundLayer: getBackgroundLayer,
  getMapBackgroundLayer: getMapBackgroundLayer,
  getBackgroundLayerStateByMapKey: getBackgroundLayerStateByMapKey,
  getFilterByActiveByMapKey: getFilterByActiveByMapKey,
  getLayers: getLayers,
  getMapLayers: getMapLayers,
  getLayersStateByMapKey: getLayersStateByMapKey,
  getMapByKey: getMapByKey,
  getMapLayerByMapKeyAndLayerKey: getMapLayerByMapKeyAndLayerKey,
  getMapLayersByMapKey: getMapLayersByMapKey,
  getMapsAsObject: getMapsAsObject,
  getMapSetActiveMapKey: getMapSetActiveMapKey,
  getMapSetActiveMapView: getMapSetActiveMapView,
  getMapSetByKey: getMapSetByKey,
  getMapSetByMapKey: getMapSetByMapKey,
  getMapSetLayersStateBySetKey: getMapSetLayersStateBySetKey,
  getMapSetMapKeys: getMapSetMapKeys,
  getMapSetView: getMapSetView,
  getMapSetViewLimits: getMapSetViewLimits,
  getMapSets: getMapSets,
  getMapSetsAsObject: getMapSetsAsObject,
  getSubstate: getSubstate,
  getView: getView,
  getViewLimits: getViewLimits,
  // Deprecated
  getAllLayersStateByMapKey_deprecated: getAllLayersStateByMapKey_deprecated,
  getBackgroundLayerStateByMapKey_deprecated: getBackgroundLayerStateByMapKey_deprecated,
  getFiltersForUse_deprecated: getFiltersForUse_deprecated,
  getLayers_deprecated: getLayers_deprecated,
  getLayersStateByMapKey_deprecated: getLayersStateByMapKey_deprecated,
  getLayersStateByMapSetKey_deprecated: getLayersStateByMapSetKey_deprecated,
  getMapByMetadata_deprecated: getMapByMetadata_deprecated,
  getMapSetNavigatorRange_deprecated: getMapSetNavigatorRange_deprecated,
  getNavigator_deprecated: getNavigator_deprecated
};
exports["default"] = _default;