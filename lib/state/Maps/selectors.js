"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _recompute = require("@jvitela/recompute");

var _lodash = require("lodash");

var _ptrUtils = require("@gisatcz/ptr-utils");

var _ptrCore = require("@gisatcz/ptr-core");

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _helpers = _interopRequireDefault(require("../_common/helpers"));

var _recomputeHelpers = require("../_common/recomputeHelpers");

var _selectorHelpers = _interopRequireDefault(require("./selectorHelpers"));

var _selectors2 = _interopRequireDefault(require("../App/selectors"));

var _selectors3 = _interopRequireDefault(require("../Data/selectors"));

var _selectors4 = _interopRequireDefault(require("../Selections/selectors"));

var _selectors5 = _interopRequireDefault(require("../Styles/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* === SELECTORS ======================================================================= */
var getSubstate = function getSubstate(state) {
  return state.maps;
};

var getAllMapSetsInUse = function getAllMapSetsInUse(state) {
  return state.maps.inUse.sets;
};

var getAllMapsInUse = function getAllMapsInUse(state) {
  return state.maps.inUse.maps;
};

var getActiveMapKey = function getActiveMapKey(state) {
  return state.maps.activeMapKey;
};

var getMapsAsObject = function getMapsAsObject(state) {
  return state.maps.maps;
};

var getMapSetsAsObject = function getMapSetsAsObject(state) {
  return state.maps.sets;
};

var getActiveMap = (0, _reselect.createSelector)([getMapsAsObject, getActiveMapKey], function (maps, activeMapKey) {
  if (maps && activeMapKey) {
    return maps[activeMapKey];
  } else {
    return null;
  }
});
var isMapSetInUse = (0, _reReselect["default"])([getAllMapSetsInUse, function (state, mapSetKey) {
  return mapSetKey;
}], function (mapSetsInUse, mapSetKey) {
  if (mapSetsInUse.length && mapSetKey) {
    return !!(0, _lodash.includes)(mapSetsInUse, mapSetKey);
  } else {
    return false;
  }
})(function (state, mapSetKey) {
  return mapSetKey ? mapSetKey : '';
});
var isMapInUse = (0, _reReselect["default"])([getAllMapsInUse, function (state, mapKey) {
  return mapKey;
}], function (mapsInUse, mapKey) {
  if (mapsInUse.length && mapKey) {
    return !!(0, _lodash.includes)(mapsInUse, mapKey);
  } else {
    return false;
  }
})(function (state, mapKey) {
  return mapKey ? mapKey : '';
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapByKey = (0, _reselect.createSelector)([getMapsAsObject, function (state, key) {
  return key;
}], function (maps, key) {
  return (maps === null || maps === void 0 ? void 0 : maps[key]) || null;
});
/**
 * @param state {Object}
 */

var getMapSets = (0, _reselect.createSelector)([getMapSetsAsObject], function (sets) {
  if (sets && !(0, _lodash.isEmpty)(sets)) {
    return Object.values(sets);
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 */

var getAllMapSetsMaps = (0, _reselect.createSelector)([getMapSets], function (mapSets) {
  if (mapSets) {
    return (0, _lodash.flatten)(mapSets.map(function (mapSet) {
      return mapSet.maps;
    }));
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetByKey = (0, _reselect.createSelector)([getMapSetsAsObject, function (state, key) {
  return key;
}], function (sets, key) {
  return (sets === null || sets === void 0 ? void 0 : sets[key]) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetByMapKey = (0, _reselect.createSelector)([getMapSets, function (state, mapKey) {
  return mapKey;
}], function (sets, mapKey) {
  if (sets && !(0, _lodash.isEmpty)(sets) && mapKey) {
    return (0, _lodash.find)(sets, function (set) {
      return set.maps && (0, _lodash.includes)(set.maps, mapKey);
    }) || null;
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
    var mapKeyInSet = (0, _lodash.includes)(set.maps, mapKey);
    return set.activeMapKey || mapKeyInSet && mapKey || null;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetActiveMapView = (0, _reReselect["default"])([getMapSetActiveMapKey, getMapSetByKey, getMapsAsObject], function (mapKey, set, maps) {
  var map = maps === null || maps === void 0 ? void 0 : maps[mapKey];

  if (map) {
    return _selectorHelpers["default"].getView(map, set);
  } else {
    return null;
  }
})(function (state, setKey) {
  return setKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getViewByMapKey = (0, _reReselect["default"])([getMapByKey, getMapSetByMapKey], _selectorHelpers["default"].getView)(function (state, mapKey) {
  return mapKey;
});
var getViewByMapKeyObserver = (0, _recompute.createObserver)(getViewByMapKey);
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getViewportByMapKey = (0, _reReselect["default"])([getMapByKey], function (map) {
  var _map$data;

  return (map === null || map === void 0 ? void 0 : (_map$data = map.data) === null || _map$data === void 0 ? void 0 : _map$data.viewport) || null;
})(function (state, mapKey) {
  return mapKey;
});
var getViewportByMapKeyObserver = (0, _recompute.createObserver)(getViewportByMapKey);
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getViewLimitsByMapKey = (0, _reReselect["default"])([getMapByKey, getMapSetByMapKey], function (map, set) {
  if (map) {
    if (set) {
      var _map$data2, _set$data;

      var mapViewLimits = (_map$data2 = map.data) === null || _map$data2 === void 0 ? void 0 : _map$data2.viewLimits;
      var mapSetViewLimits = (_set$data = set.data) === null || _set$data === void 0 ? void 0 : _set$data.viewLimits;
      return mapViewLimits || mapSetViewLimits || null;
    } else {
      var _map$data3;

      return ((_map$data3 = map.data) === null || _map$data3 === void 0 ? void 0 : _map$data3.viewLimits) || null;
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

var getMapSetMapKeys = (0, _reselect.createSelector)([getMapSetByKey], function (set) {
  var _set$maps;

  return set !== null && set !== void 0 && (_set$maps = set.maps) !== null && _set$maps !== void 0 && _set$maps.length ? set.maps : null;
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetMaps = (0, _reselect.createSelector)([getMapsAsObject, getMapSetMapKeys], function (maps, mapKeys) {
  if (!(0, _lodash.isEmpty)(maps) && mapKeys !== null && mapKeys !== void 0 && mapKeys.length) {
    return mapKeys.map(function (key) {
      return maps[key];
    });
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetView = (0, _reselect.createSelector)([getMapSetByKey], function (set) {
  if (set) {
    var _set$data2;

    return _ptrUtils.map.view.mergeViews(_ptrCore.mapConstants.defaultMapView, (_set$data2 = set.data) === null || _set$data2 === void 0 ? void 0 : _set$data2.view);
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetViewLimits = (0, _reselect.createSelector)([getMapSetByKey], function (set) {
  var _set$data3;

  return (set === null || set === void 0 ? void 0 : (_set$data3 = set.data) === null || _set$data3 === void 0 ? void 0 : _set$data3.viewLimits) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapBackgroundLayerStateByMapKey = (0, _reselect.createSelector)([getMapByKey], function (map) {
  var _map$data4;

  return (map === null || map === void 0 ? void 0 : (_map$data4 = map.data) === null || _map$data4 === void 0 ? void 0 : _map$data4.backgroundLayer) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapLayersStateByMapKey = (0, _reselect.createSelector)([getMapByKey], function (map) {
  var _map$data5;

  return (map === null || map === void 0 ? void 0 : (_map$data5 = map.data) === null || _map$data5 === void 0 ? void 0 : _map$data5.layers) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 * @param layerKey {string}
 */

var getMapLayerStateByMapKeyAndLayerKey = (0, _reselect.createSelector)([getMapLayersStateByMapKey, function (state, mapKey, layerKey) {
  return layerKey;
}], function (layers, layerKey) {
  if (layers && layerKey) {
    return layers.find(function (layer) {
      return layer.key === layerKey;
    }) || null;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetBackgroundLayerStateByMapKey = (0, _reselect.createSelector)([getMapSetByMapKey], function (set) {
  var _set$data4;

  return (set === null || set === void 0 ? void 0 : (_set$data4 = set.data) === null || _set$data4 === void 0 ? void 0 : _set$data4.backgroundLayer) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetLayersStateByMapKey = (0, _reselect.createSelector)([getMapSetByMapKey], function (set) {
  var _set$data5;

  return (set === null || set === void 0 ? void 0 : (_set$data5 = set.data) === null || _set$data5 === void 0 ? void 0 : _set$data5.layers) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapMetadataModifiersByMapKey = (0, _reselect.createSelector)([getMapByKey], function (map) {
  var _map$data6;

  return (map === null || map === void 0 ? void 0 : (_map$data6 = map.data) === null || _map$data6 === void 0 ? void 0 : _map$data6.metadataModifiers) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetMetadataModifiersByMapKey = (0, _reselect.createSelector)([getMapSetByMapKey], function (set) {
  var _set$data6;

  return (set === null || set === void 0 ? void 0 : (_set$data6 = set.data) === null || _set$data6 === void 0 ? void 0 : _set$data6.metadataModifiers) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMetadataModifiersByMapKey = (0, _reReselect["default"])([getMapMetadataModifiersByMapKey, getMapSetMetadataModifiersByMapKey], function (mapModifiers, setModifiers) {
  if (mapModifiers && setModifiers) {
    return _objectSpread(_objectSpread({}, setModifiers), mapModifiers);
  } else {
    return setModifiers || mapModifiers || null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapFilterByActiveByMapKey = (0, _reselect.createSelector)([getMapByKey], function (map) {
  var _map$data7;

  return (map === null || map === void 0 ? void 0 : (_map$data7 = map.data) === null || _map$data7 === void 0 ? void 0 : _map$data7.filterByActive) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetFilterByActiveByMapKey = (0, _reselect.createSelector)([getMapSetByMapKey], function (set) {
  var _set$data7;

  return (set === null || set === void 0 ? void 0 : (_set$data7 = set.data) === null || _set$data7 === void 0 ? void 0 : _set$data7.filterByActive) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getFilterByActiveByMapKey = (0, _reReselect["default"])([getMapFilterByActiveByMapKey, getMapSetFilterByActiveByMapKey], function (mapFilter, setFilter) {
  if (mapFilter && setFilter) {
    return _objectSpread(_objectSpread({}, mapFilter), setFilter);
  } else {
    return setFilter || mapFilter || null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getBackgroundLayerStateByMapKey = (0, _reReselect["default"])([getMapBackgroundLayerStateByMapKey, getMapSetBackgroundLayerStateByMapKey], function (mapBackgroundLayer, setBackgroundLayer) {
  return mapBackgroundLayer || setBackgroundLayer || null;
})(function (state, mapKey) {
  return mapKey;
});
var getBackgroundLayerStateByMapKeyObserver = (0, _recompute.createObserver)(getBackgroundLayerStateByMapKey);
/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged mapSetState with metadataModifiers and filterByActive.
 */

var getMapSetLayersStateWithModifiersByMapKey = (0, _reReselect["default"])([getMapSetLayersStateByMapKey, getMapSetMetadataModifiersByMapKey, getMapSetFilterByActiveByMapKey], function (setLayers, metadataModifiers, mapSetFilterByActive) {
  if (setLayers !== null && setLayers !== void 0 && setLayers.length) {
    return _selectorHelpers["default"].mergeModifiersAndFilterByActiveToLayerStructure(setLayers, metadataModifiers, mapSetFilterByActive);
  } else {
    return null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged mapState with metadataModifiers and filterByActive.
 */

var getMapLayersStateWithModifiersByMapKey = (0, _reReselect["default"])([getMapLayersStateByMapKey, getMetadataModifiersByMapKey, getFilterByActiveByMapKey], function (mapLayers, metadataModifiers, mapFilterByActive) {
  if (mapLayers !== null && mapLayers !== void 0 && mapLayers.length) {
    return _selectorHelpers["default"].mergeModifiersAndFilterByActiveToLayerStructure(mapLayers, metadataModifiers, mapFilterByActive);
  } else {
    return null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged layer state from mapState and mapSetState with metadataModifiers and filterByActive.
 */

var getLayersStateByMapKey = (0, _reReselect["default"])([getMapSetLayersStateWithModifiersByMapKey, getMapLayersStateWithModifiersByMapKey], function (setLayers, mapLayers) {
  if (mapLayers && setLayers) {
    return [].concat(_toConsumableArray(setLayers), _toConsumableArray(mapLayers));
  } else if (mapLayers) {
    return mapLayers;
  } else if (setLayers) {
    return setLayers;
  } else {
    return null;
  }
})(function (state, mapKey) {
  return mapKey;
});
var getLayersStateByMapKeyObserver = (0, _recompute.createObserver)(getLayersStateByMapKey);
/**
 * @param state {Object}
 * @param mapKey {string}
 * @param layerKey {string}
 * @return {Object | null}
 */

var getLayerStateByLayerKeyAndMapKey = (0, _reselect.createSelector)([getLayersStateByMapKey, function (state, mapKey, layerKey) {
  return layerKey;
}], function (layers, layerKey) {
  if (layers) {
    var layer = (0, _lodash.find)(layers, function (layer) {
      return layer.key === layerKey;
    });
    return layer || null;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getAllLayersStateByMapKey = (0, _reReselect["default"])([getBackgroundLayerStateByMapKey, getLayersStateByMapKey], function (backgroundLayer, layers) {
  if (layers || backgroundLayer) {
    return _selectorHelpers["default"].mergeBackgroundLayerWithLayers(backgroundLayer, layers);
  } else {
    return null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param layerState {Object}
 */

var getSpatialRelationsFilterFromLayerState = (0, _recompute.createSelector)(function (layerState) {
  if (layerState) {
    // TODO at least a part is the same as in Maps/actions/layerUse?
    var layer = layerState; // modifiers defined by key

    var metadataDefinedByKey = layer.metadataModifiers ? _objectSpread({}, layer.metadataModifiers) : {}; // Get actual metadata keys defined by filterByActive

    var activeMetadataKeys = _selectors["default"].getActiveKeysByFilterByActiveObserver(layer.filterByActive); // Merge metadata, metadata defined by key have priority


    var mergedMetadataKeys = _helpers["default"].mergeMetadataKeys(metadataDefinedByKey, activeMetadataKeys);

    var relationsFilter = {}; // It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}

    relationsFilter.modifiers = _helpers["default"].convertModifiersToRequestFriendlyFormat(mergedMetadataKeys); // add layerTemplate od areaTreeLevelKey

    if (layer.layerTemplateKey) {
      relationsFilter.layerTemplateKey = layer.layerTemplateKey;
    } else if (layer.areaTreeLevelKey) {
      relationsFilter.areaTreeLevelKey = layer.areaTreeLevelKey;
    }

    return relationsFilter;
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * @param {string} mapKey
 * @param {number} mapWidth
 * @param {number} mapHeight
 * @return {{tiles: Array, level: number}}
 */

var getVisibleTilesByMapKey = (0, _reReselect["default"])([getViewByMapKey, function (state, mapKey, mapWidth) {
  return mapWidth;
}, function (state, mapKey, mapWidth, mapHeight) {
  return mapHeight;
}], function (view, mapWidth, mapHeight) {
  if (view !== null && view !== void 0 && view.center && view !== null && view !== void 0 && view.boxRange && mapWidth && mapHeight) {
    var tiles = _selectorHelpers["default"].getTiles(mapWidth, mapHeight, view.center, view.boxRange);

    var level = _selectorHelpers["default"].getZoomLevel(mapWidth, mapHeight, view.boxRange);

    return {
      tiles: tiles,
      level: level
    };
  } else {
    return null;
  }
})(function (state, mapKey, mapWidth, mapHeight) {
  return "".concat(mapKey, "_").concat(mapWidth, "_").concat(mapHeight);
});
/**
 * @param layerState {Object}
 */

var getAttributeDataFilterFromLayerState = (0, _recompute.createSelector)(function (layerState) {
  if (layerState) {
    var commonFilter = _selectors["default"].getCommmonDataRelationsFilterFromComponentState_recompute(layerState);

    if (!(0, _lodash.isEmpty)(commonFilter)) {
      var _layerState$options, _layerState$options2, _layerState$options3;

      var attributeFilter = _objectSpread({}, commonFilter);

      var attributeDataFilterExtension = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, (layerState === null || layerState === void 0 ? void 0 : (_layerState$options = layerState.options) === null || _layerState$options === void 0 ? void 0 : _layerState$options.attributeFilter) && {
        attributeFilter: layerState.options.attributeFilter
      }), (layerState === null || layerState === void 0 ? void 0 : (_layerState$options2 = layerState.options) === null || _layerState$options2 === void 0 ? void 0 : _layerState$options2.dataSourceKeys) && {
        dataSourceKeys: layerState.options.dataSourceKeys
      }), (layerState === null || layerState === void 0 ? void 0 : (_layerState$options3 = layerState.options) === null || _layerState$options3 === void 0 ? void 0 : _layerState$options3.featureKeys) && {
        featureKeys: layerState.options.featureKeys
      }), (layerState === null || layerState === void 0 ? void 0 : layerState.styleKey) && {
        styleKey: layerState.styleKey
      });

      return _objectSpread(_objectSpread({}, attributeFilter), attributeDataFilterExtension);
    } else {
      return null;
    }
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * @param layerState {Object}
 */

var getAttributeRelationsFilterFromLayerState = (0, _recompute.createSelector)(function (layerState) {
  if (layerState) {
    var commonFilter = _selectors["default"].getCommmonDataRelationsFilterFromComponentState_recompute(layerState);

    if (!(0, _lodash.isEmpty)(commonFilter)) {
      var attributeFilter = _objectSpread({}, commonFilter);

      if (layerState.styleKey) {
        // add styleKey
        attributeFilter.styleKey = layerState.styleKey;
      }

      return attributeFilter;
    } else {
      return null;
    }
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * @param spatialDataSource {Object}
 * @param layerState {Object} layer definition from state or passed to the Map component
 * @param layerKey {string} layer unique identifier
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where key is attribute data source key and value is matching attribute key
 * @param mapKey {string} map unique identifier
 * @param spatialRelationsFilter {Object} see getSpatialRelationsFilterFromLayerState
 * @param attributeRelationsFilter {Object} see getAttributeRelationsFilterFromLayerState
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 */

var getFinalLayerByDataSourceAndLayerState = (0, _recompute.createSelector)(function (spatialDataSource, layerState, layerKey, attributeDataSourceKeyAttributeKeyPairs, mapKey, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter) {
  var _spatialDataSource$da = spatialDataSource === null || spatialDataSource === void 0 ? void 0 : spatialDataSource.data,
      attribution = _spatialDataSource$da.attribution,
      nameInternal = _spatialDataSource$da.nameInternal,
      type = _spatialDataSource$da.type,
      fidColumnName = _spatialDataSource$da.fidColumnName,
      geometryColumnName = _spatialDataSource$da.geometryColumnName,
      dataSourceOptions = _objectWithoutProperties(_spatialDataSource$da, ["attribution", "nameInternal", "type", "fidColumnName", "geometryColumnName"]);

  var key = layerState.key,
      name = layerState.name,
      opacity = layerState.opacity,
      styleKey = layerState.styleKey,
      crs = layerState.crs,
      layerStateOptions = layerState.options;
  layerKey = layerKey || key;

  var options = _objectSpread(_objectSpread({}, dataSourceOptions), layerStateOptions);

  if (type === 'wmts') {
    var _dataSourceOptions$ur;

    options.url = dataSourceOptions.url || ((_dataSourceOptions$ur = dataSourceOptions.urls) === null || _dataSourceOptions$ur === void 0 ? void 0 : _dataSourceOptions$ur[0]);
  } else if (type === 'wms') {
    var url = dataSourceOptions.url,
        params = dataSourceOptions.params,
        configuration = dataSourceOptions.configuration,
        rest = _objectWithoutProperties(dataSourceOptions, ["url", "params", "configuration"]);

    var singleTile = configuration && configuration.hasOwnProperty('singleTile') ? configuration.singleTile : false;
    var styles = rest.styles;

    if (url && url.charAt(0) !== 'h') {
      var localConfig = _selectors2["default"].getCompleteLocalConfigurationObserver();

      url = "".concat(localConfig.apiBackendProtocol, "://").concat(localConfig.apiBackendHost, "/").concat(url);
    }

    options = {
      params: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, params), styles && {
        styles: styles
      }), crs && {
        crs: crs
      }), {}, {
        layers: rest.layers.slice(2, -2)
      }),
      singleTile: singleTile,
      url: url
    };
  } else if (type === 'vector' || type === 'tiledVector' || type === 'tiled-vector') {
    var _options, _options2;

    var features,
        tiles = null;

    if (type === 'vector') {
      features = _selectors3["default"].getFeatures(spatialDataSource.key, fidColumnName, attributeDataSourceKeyAttributeKeyPairs);
    } else if (type === 'tiledVector' || type === 'tiled-vector') {
      var view = getViewByMapKeyObserver(mapKey);
      var viewport = getViewportByMapKeyObserver(mapKey);

      var tileList = _selectorHelpers["default"].getTiles(viewport.width, viewport.height, view.center, view.boxRange);

      var level = _selectorHelpers["default"].getZoomLevel(viewport.width, viewport.height, view.boxRange);

      tiles = _selectors3["default"].getTiles(spatialDataSource.key, fidColumnName, level, tileList, spatialRelationsFilter, attributeRelationsFilter, attributeDataSourceKeyAttributeKeyPairs, styleKey, attributeDataFilter);
    }

    var selected = null;
    var style = (_options = options) === null || _options === void 0 ? void 0 : _options.style;

    if ((_options2 = options) !== null && _options2 !== void 0 && _options2.selected) {
      selected = _selectors4["default"].prepareSelectionByLayerStateSelected(options.selected);
    }

    if (!style && styleKey) {
      style = _selectors5["default"].getDefinitionByKey(styleKey);
    }

    options = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, options), selected && {
      selected: selected
    }), style && {
      style: style
    }), features && {
      features: features
    }), tiles && {
      tiles: tiles
    }), {}, {
      fidColumnName: fidColumnName,
      geometryColumnName: geometryColumnName
    });
  }

  return {
    key: layerKey + '_' + spatialDataSource.key,
    layerKey: layerKey,
    opacity: opacity || opacity === 0 ? opacity : 1,
    name: name,
    type: type,
    options: options
  };
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * @param mapKey {string} map unique identifier
 * @param layerState {Object} layer definition in state (see getBackgroundLayerState) or passed to the Map component
 * @return {Array} It returns a list of end format definitions of the background layer (per data source). See: https://gisat.github.io/ > Architecture > System data types > Layers
 */

var getMapBackgroundLayer = (0, _recompute.createSelector)(function (mapKey, layerState) {
  if (!layerState) {
    layerState = getBackgroundLayerStateByMapKeyObserver(mapKey);
  }

  if (layerState) {
    if (layerState.type) {
      return layerState;
    } else {
      var layerKey = 'pantherBackgroundLayer';

      var spatialDataSources = _selectors3["default"].spatialDataSources.getIndexed_recompute(layerState);

      if (spatialDataSources) {
        var layers = (0, _lodash.compact)(spatialDataSources.map(function (dataSource) {
          var _dataSource$data;

          var dataSourceType = dataSource === null || dataSource === void 0 ? void 0 : (_dataSource$data = dataSource.data) === null || _dataSource$data === void 0 ? void 0 : _dataSource$data.type; // TODO currently only wms or wmts is supported; add filterByActive & metadata modifiers to support vectors

          if (dataSourceType === 'wmts' || dataSourceType === 'wms') {
            return getFinalLayerByDataSourceAndLayerState(dataSource, layerState, layerKey);
          } else {
            return null;
          }
        }));
        return layers.length ? layers : null;
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * @param mapKey {string} map unique identifier
 * @param layerState {Object} layer definition in state (see getBackgroundLayerState) or passed to the Map component
 * @return {Array} It returns a list of end format definitions of the background layer (per data source). See: https://gisat.github.io/ > Architecture > System data types > Layers
 */

var getMapLayers = (0, _recompute.createSelector)(function (mapKey, layersState) {
  if (!layersState) {
    layersState = getLayersStateByMapKeyObserver(mapKey);
  }

  if (layersState) {
    var finalLayers = [];
    (0, _lodash.forEach)(layersState, function (layerState) {
      // layer is already defined by the end format suitable for presentational map component
      if (layerState.type) {
        var _layerState$options4;

        if (layerState.type === 'vector' && (_layerState$options4 = layerState.options) !== null && _layerState$options4 !== void 0 && _layerState$options4.selected) {
          layerState = _objectSpread(_objectSpread({}, layerState), {}, {
            options: _objectSpread(_objectSpread({}, layerState.options), {}, {
              selected: _selectors4["default"].prepareSelectionByLayerStateSelected(layerState.options.selected)
            })
          });
        }

        finalLayers.push(layerState);
      } // necessary to assemble data for the end format
      else {
          var spatialRelationsFilter = getSpatialRelationsFilterFromLayerState(layerState);
          var attributeRelationsFilter = getAttributeRelationsFilterFromLayerState(layerState);
          var attributeDataFilter = getAttributeDataFilterFromLayerState(layerState);

          var spatialDataSources = _selectors3["default"].spatialDataSources.getIndexed_recompute(spatialRelationsFilter);

          var attributeDataSourceKeyAttributeKeyPairs = _selectors3["default"].attributeRelations.getFilteredAttributeDataSourceKeyAttributeKeyPairs(attributeRelationsFilter);

          if (spatialDataSources) {
            (0, _lodash.forEach)(spatialDataSources, function (dataSource) {
              finalLayers.push(getFinalLayerByDataSourceAndLayerState(dataSource, layerState, null, attributeDataSourceKeyAttributeKeyPairs, mapKey, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter));
            });
          }
        }
    });
    return finalLayers.length ? finalLayers : null;
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
var _default = {
  isMapInUse: isMapInUse,
  isMapSetInUse: isMapSetInUse,
  getSubstate: getSubstate,
  getActiveMapKey: getActiveMapKey,
  getActiveMap: getActiveMap,
  getAllLayersStateByMapKey: getAllLayersStateByMapKey,
  getAllMapSetsMaps: getAllMapSetsMaps,
  getAllMapsInUse: getAllMapsInUse,
  getAllMapSetsInUse: getAllMapSetsInUse,
  getAttributeDataFilterFromLayerState: getAttributeDataFilterFromLayerState,
  getAttributeRelationsFilterFromLayerState: getAttributeRelationsFilterFromLayerState,
  getBackgroundLayerStateByMapKey: getBackgroundLayerStateByMapKey,
  getFilterByActiveByMapKey: getFilterByActiveByMapKey,
  getFinalLayerByDataSourceAndLayerState: getFinalLayerByDataSourceAndLayerState,
  getLayerStateByLayerKeyAndMapKey: getLayerStateByLayerKeyAndMapKey,
  getLayersStateByMapKey: getLayersStateByMapKey,
  getMetadataModifiersByMapKey: getMetadataModifiersByMapKey,
  getMapBackgroundLayerStateByMapKey: getMapBackgroundLayerStateByMapKey,
  getMapBackgroundLayer: getMapBackgroundLayer,
  getMapByKey: getMapByKey,
  getMapFilterByActiveByMapKey: getMapFilterByActiveByMapKey,
  getMapLayerStateByMapKeyAndLayerKey: getMapLayerStateByMapKeyAndLayerKey,
  getMapLayersStateByMapKey: getMapLayersStateByMapKey,
  getMapLayers: getMapLayers,
  getMapLayersStateWithModifiersByMapKey: getMapLayersStateWithModifiersByMapKey,
  getMapMetadataModifiersByMapKey: getMapMetadataModifiersByMapKey,
  getMapSetActiveMapKey: getMapSetActiveMapKey,
  getMapSetActiveMapView: getMapSetActiveMapView,
  getMapSetBackgroundLayerStateByMapKey: getMapSetBackgroundLayerStateByMapKey,
  getMapSetByMapKey: getMapSetByMapKey,
  getMapSetByKey: getMapSetByKey,
  getMapSetFilterByActiveByMapKey: getMapSetFilterByActiveByMapKey,
  getMapSetLayersStateByMapKey: getMapSetLayersStateByMapKey,
  getMapSetLayersStateWithModifiersByMapKey: getMapSetLayersStateWithModifiersByMapKey,
  getMapSetMetadataModifiersByMapKey: getMapSetMetadataModifiersByMapKey,
  getMapSetMapKeys: getMapSetMapKeys,
  getMapSetMaps: getMapSetMaps,
  getMapSets: getMapSets,
  getMapSetView: getMapSetView,
  getMapSetViewLimits: getMapSetViewLimits,
  getVisibleTilesByMapKey: getVisibleTilesByMapKey,
  getSpatialRelationsFilterFromLayerState: getSpatialRelationsFilterFromLayerState,
  getViewByMapKey: getViewByMapKey,
  getViewportByMapKey: getViewportByMapKey,
  getViewLimitsByMapKey: getViewLimitsByMapKey
};
exports["default"] = _default;