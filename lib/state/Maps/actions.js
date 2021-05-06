"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _ptrUtils = require("@gisatcz/ptr-utils");

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _Select = _interopRequireDefault(require("../../state/Select"));

var _actions = _interopRequireDefault(require("../_common/actions"));

var _helpers = _interopRequireDefault(require("../_common/helpers"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _actions2 = _interopRequireDefault(require("../Data/actions"));

var _constants = require("../Data/constants");

var _actions3 = _interopRequireDefault(require("../Styles/actions"));

var _selectorHelpers = _interopRequireDefault(require("./selectorHelpers"));

var _actions4 = _interopRequireDefault(require("../Selections/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* ==================================================
 * CREATORS
 * ================================================== */

/**
 * TODO @vlach1989 tests
 * Add layers at the end of map layers list
 * @param mapKey {string}
 * @param layerStates {Array} A collection, where each object represents state of the layer
 */
var addMapLayers = function addMapLayers(mapKey, layerStates) {
  return function (dispatch, getState) {
    var state = getState();

    var map = _Select["default"].maps.getMapByKey(state, mapKey);

    if (map) {
      dispatch(actionAddMapLayers(mapKey, layerStates));

      var viewport = _Select["default"].maps.getViewportByMapKey(state, mapKey);

      if (viewport) {
        dispatch(use(mapKey, null, null, viewport.width, viewport.height));
      }
    } else {
      dispatch(_actions["default"].actionGeneralError("No map exists for mapKey ".concat(mapKey)));
    }
  };
};
/**
 * TODO @vlach1989 tests
 * Add map layer to the specific position in the list
 * @param mapKey {string}
 * @param layerState {Object}
 * @param index {number} position
 */


var addMapLayerToIndex = function addMapLayerToIndex(mapKey, layerState, index) {
  return function (dispatch, getState) {
    var state = getState();

    var map = _Select["default"].maps.getMapByKey(state, mapKey);

    if (map) {
      dispatch(actionAddMapLayerToIndex(mapKey, layerState, index));

      var viewport = _Select["default"].maps.getViewportByMapKey(state, mapKey);

      if (viewport) {
        dispatch(use(mapKey, null, null, viewport.width, viewport.height));
      }
    } else {
      dispatch(_actions["default"].actionGeneralError("No map exists for mapKey ".concat(mapKey)));
    }
  };
};
/**
 * Remove layer from map
 * @param mapKey {string}
 * @param layerKey {string}
 */


var removeMapLayer = function removeMapLayer(mapKey, layerKey) {
  return function (dispatch, getState) {
    var state = getState();

    var layerState = _Select["default"].maps.getLayerStateByLayerKeyAndMapKey(state, mapKey, layerKey);

    if (layerState) {
      dispatch(actionRemoveMapLayer(mapKey, layerKey));
    } else {
      dispatch(_actions["default"].actionGeneralError("No layer with key ".concat(layerKey, " found for mapKey ").concat(mapKey)));
    }
  };
};
/**
 * Clear use of the map set
 * @param mapSetKey {string}
 */


var mapSetUseClear = function mapSetUseClear(mapSetKey) {
  return function (dispatch, getState) {
    var registered = _Select["default"].maps.isMapSetInUse(getState(), mapSetKey);

    if (registered) {
      dispatch(actionMapSetUseClear(mapSetKey));
    }
  };
};
/**
 * Register use of the map set
 * @param mapSetKey {string}
 */


var mapSetUseRegister = function mapSetUseRegister(mapSetKey) {
  return function (dispatch, getState) {
    var alreadyRegistered = _Select["default"].maps.isMapSetInUse(getState(), mapSetKey);

    if (!alreadyRegistered) {
      dispatch(actionMapSetUseRegister(mapSetKey));
    }
  };
};
/**
 * Clear use of the map
 * @param mapKey {string}
 */


var mapUseClear = function mapUseClear(mapKey) {
  return function (dispatch, getState) {
    var registered = _Select["default"].maps.isMapInUse(getState(), mapKey);

    if (registered) {
      dispatch(actionMapUseClear(mapKey));
    }
  };
};
/**
 * Register use of the map
 * @param mapKey {string}
 */


var mapUseRegister = function mapUseRegister(mapKey) {
  return function (dispatch, getState) {
    var alreadyRegistered = _Select["default"].maps.isMapInUse(getState(), mapKey);

    if (!alreadyRegistered) {
      dispatch(actionMapUseRegister(mapKey));
    }
  };
};
/**
 * @param mapKey {string}
 * @param backgroundLayer {Object} background layer definition
 * @param layers {Object} layers definition
 * @param mapWidth {number} width of map component in px
 * @param mapHeight {number} height of map component in px
 */


function use(mapKey, backgroundLayer, layers, mapWidth, mapHeight) {
  return function (dispatch, getState) {
    dispatch(mapUseRegister(mapKey));
    var state = getState();

    var spatialFilter = _Select["default"].maps.getVisibleTilesByMapKey(state, mapKey, mapWidth, mapHeight); //spatial filter is required for now


    if (!spatialFilter) {
      return;
    } // uncontrolled map - the map is not controlled from store, but layer data is collected based on stored metadata.


    if (backgroundLayer || layers) {
      layers = _selectorHelpers["default"].mergeBackgroundLayerWithLayers(layers, backgroundLayer);
    } // controlled map (with stateMapKey) - the map is completely controlled from store
    else {
        layers = _Select["default"].maps.getAllLayersStateByMapKey(state, mapKey);
      }

    if (layers) {
      layers.forEach(function (layer) {
        // apply layerUse asynchronous on each leyer
        // it cause better FPS and prevent long synchronous tasks
        if (!layer.type) {
          setTimeout(function () {
            dispatch(layerUse(layer, spatialFilter));
          }, 0);
        }
      });
    }
  };
}
/**
 * @param layerState {Object} layer definition
 * @param spatialFilter {{level: number}, {tiles: Array}}
 */


function layerUse(layerState, spatialFilter) {
  return function (dispatch, getState) {
    var state = getState(); // modifiers defined by key

    var metadataDefinedByKey = layerState.metadataModifiers ? _objectSpread({}, layerState.metadataModifiers) : {}; // add layerTemplate od areaTreeLevelKey

    if (layerState.layerTemplateKey) {
      metadataDefinedByKey.layerTemplateKey = layerState.layerTemplateKey; // TODO use layerTemplate here?
    } else if (layerState.areaTreeLevelKey) {
      metadataDefinedByKey.areaTreeLevelKey = layerState.areaTreeLevelKey; // TODO use areaTreeLevelKey here?
    } // Get actual metadata keys defined by filterByActive


    var activeMetadataKeys = layerState.filterByActive ? _selectors["default"].getActiveKeysByFilterByActive(state, layerState.filterByActive) : null; // Merge metadata, metadata defined by key have priority

    var mergedMetadataKeys = _helpers["default"].mergeMetadataKeys(metadataDefinedByKey, activeMetadataKeys); // Decouple modifiers from templates


    var areaTreeLevelKey = mergedMetadataKeys.areaTreeLevelKey,
        layerTemplateKey = mergedMetadataKeys.layerTemplateKey,
        modifiers = _objectWithoutProperties(mergedMetadataKeys, ["areaTreeLevelKey", "layerTemplateKey"]); // It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}


    var modifiersForRequest = _helpers["default"].convertModifiersToRequestFriendlyFormat(modifiers);

    if (layerTemplateKey || areaTreeLevelKey) {
      var _layerState$options, _layerState$options2, _layerState$options3;

      var commonRelationsFilter = {};

      if (areaTreeLevelKey) {
        commonRelationsFilter = _objectSpread(_objectSpread({}, modifiersForRequest && {
          modifiers: modifiersForRequest
        }), {}, {
          areaTreeLevelKey: areaTreeLevelKey
        });
      }

      if (layerTemplateKey) {
        commonRelationsFilter = _objectSpread(_objectSpread({}, modifiersForRequest && {
          modifiers: modifiersForRequest
        }), {}, {
          layerTemplateKey: layerTemplateKey
        });
      }

      if (layerTemplateKey) {
        var order = null;

        var spatialDataSources = _Select["default"].data.spatialDataSources.getIndexed(state, commonRelationsFilter, order);

        var sdsContainsVector = (spatialDataSources === null || spatialDataSources === void 0 ? void 0 : spatialDataSources.some(function (spatialDataSource) {
          var _spatialDataSource$da;

          return _constants.TILED_VECTOR_LAYER_TYPES.includes(spatialDataSource === null || spatialDataSource === void 0 ? void 0 : (_spatialDataSource$da = spatialDataSource.data) === null || _spatialDataSource$da === void 0 ? void 0 : _spatialDataSource$da.type);
        })) || false; // load only dataSources that are supported type

        if (spatialDataSources && !sdsContainsVector) {
          return;
        }
      }

      var styleKey = layerState.styleKey || null; // TODO ensure style here for now

      if (styleKey) {
        dispatch(_actions3["default"].useKeys([layerState.styleKey], layerState.key + '_layerUse'));
      }

      var attributeDataFilterExtension = _objectSpread(_objectSpread(_objectSpread({}, (layerState === null || layerState === void 0 ? void 0 : (_layerState$options = layerState.options) === null || _layerState$options === void 0 ? void 0 : _layerState$options.attributeFilter) && {
        attributeFilter: layerState.options.attributeFilter
      }), (layerState === null || layerState === void 0 ? void 0 : (_layerState$options2 = layerState.options) === null || _layerState$options2 === void 0 ? void 0 : _layerState$options2.dataSourceKeys) && {
        dataSourceKeys: layerState.options.dataSourceKeys
      }), (layerState === null || layerState === void 0 ? void 0 : (_layerState$options3 = layerState.options) === null || _layerState$options3 === void 0 ? void 0 : _layerState$options3.featureKeys) && {
        featureKeys: layerState.options.featureKeys
      });

      dispatch(_actions2["default"].ensure(styleKey, commonRelationsFilter, spatialFilter, attributeDataFilterExtension));
    }
  };
}
/**
 * Ensure indexes with filter by active for each active map
 * @param filterByActive {Object}
 */


function ensureWithFilterByActive(filterByActive) {
  return function (dispatch, getState) {
    var state = getState();

    var activeKeys = _selectors["default"].getAllActiveKeys(state);

    var mapKeys = _Select["default"].maps.getAllMapsInUse(state);

    if (mapKeys && activeKeys) {
      mapKeys.forEach(function (mapKey) {
        var mapViewport = _Select["default"].maps.getViewportByMapKey(state, mapKey);

        if (mapViewport) {
          var width = mapViewport.width,
              height = mapViewport.height;

          var spatialFilter = _Select["default"].maps.getVisibleTilesByMapKey(state, mapKey, width, height);

          if (spatialFilter) {
            var layers = _Select["default"].maps.getAllLayersStateByMapKey(state, mapKey);

            if (layers) {
              layers.forEach(function (layer) {
                if (layer.filterByActive && (0, _lodash.isMatch)(layer.filterByActive, filterByActive)) {
                  // apply layerUse asynchronous on each leyer
                  // it cause better FPS and prevent long synchronous tasks
                  setTimeout(function () {
                    dispatch(layerUse(layer, spatialFilter, activeKeys));
                  }, 0);
                }
              });
            }
          }
        }
      });
    }
  };
}
/**
 * @param mapKey {string}
 * @param layerKey {string}
 * @param selectedFeatureKeys {Array}
 */


function setLayerSelectedFeatureKeys(mapKey, layerKey, selectedFeatureKeys) {
  return function (dispatch, getState) {
    var _layer$options;

    var state = getState();

    var layer = _Select["default"].maps.getLayerStateByLayerKeyAndMapKey(state, mapKey, layerKey);

    if (layer !== null && layer !== void 0 && (_layer$options = layer.options) !== null && _layer$options !== void 0 && _layer$options.selectable) {
      var _layer$options$select;

      var activeSelectionKey = _Select["default"].selections.getActiveKey(state);

      if (activeSelectionKey && (_layer$options$select = layer.options.selected) !== null && _layer$options$select !== void 0 && _layer$options$select.hasOwnProperty(activeSelectionKey)) {
        // TODO possible conflicts if features with same key from different layers are selected
        dispatch(_actions4["default"].setActiveSelectionFeatureKeysFilterKeys(selectedFeatureKeys));
      } else {// TODO what if there is no active selection?
      }
    }
  };
}
/**
 * @param mapKey {string}
 * @param layerKey {string}
 * @param styleKey {string}
 */


function setMapLayerStyleKey(mapKey, layerKey, styleKey) {
  return function (dispatch, getState) {
    var layer = _Select["default"].maps.getLayerStateByLayerKeyAndMapKey(getState(), mapKey, layerKey);

    if (layer) {
      dispatch(actionSetMapLayerStyleKey(mapKey, layerKey, styleKey));
    }
  };
}
/**
 * Set map layer option
 * @param mapKey {string}
 * @param layerKey {string}
 * @param optionKey {string}
 * @param optionValue {*}
 */


function setMapLayerOption(mapKey, layerKey, optionKey, optionValue) {
  return function (dispatch, getState) {
    var layer = _Select["default"].maps.getLayerStateByLayerKeyAndMapKey(getState(), mapKey, layerKey);

    if (layer) {
      dispatch(actionSetMapLayerOption(mapKey, layerKey, optionKey, optionValue));
    } else {
      dispatch(_actions["default"].actionGeneralError("No layer found for mapKey ".concat(mapKey, " and layerKey ").concat(layerKey)));
    }
  };
}
/**
 * @param mapKey {string}
 */


function setMapSetActiveMapKey(mapKey) {
  return function (dispatch, getState) {
    var state = getState();

    var set = _Select["default"].maps.getMapSetByMapKey(state, mapKey);

    if (set) {
      var activeMapKey = _Select["default"].maps.getMapSetActiveMapKey(state, set.key);

      if (activeMapKey !== mapKey) {
        dispatch(actionSetMapSetActiveMapKey(set.key, mapKey));
      }
    }
  };
}
/**
 * @param setKey {string}
 * @param backgroundLayer {Object} background layer definition
 */


function setMapSetBackgroundLayer(setKey, backgroundLayer) {
  return function (dispatch, getState) {
    dispatch(actionSetMapSetBackgroundLayer(setKey, backgroundLayer));

    var maps = _Select["default"].maps.getMapSetMaps(getState(), setKey);

    if (maps) {
      maps.forEach(function (map) {
        var _map$data, _map$data$viewport, _map$data2, _map$data2$viewport;

        // TODO is viewport always defined?
        dispatch(use(map.key, null, null, map === null || map === void 0 ? void 0 : (_map$data = map.data) === null || _map$data === void 0 ? void 0 : (_map$data$viewport = _map$data.viewport) === null || _map$data$viewport === void 0 ? void 0 : _map$data$viewport.width, map === null || map === void 0 ? void 0 : (_map$data2 = map.data) === null || _map$data2 === void 0 ? void 0 : (_map$data2$viewport = _map$data2.viewport) === null || _map$data2$viewport === void 0 ? void 0 : _map$data2$viewport.height));
      });
    }
  };
}
/**
 * Set background layer for map.
 * @param mapKey {string}
 * @param backgroundLayer {Object} background layer definition
 */


function setMapBackgroundLayer(mapKey, backgroundLayer) {
  return function (dispatch, getState) {
    var map = _Select["default"].maps.getMapByKey(getState(), mapKey);

    if (map) {
      dispatch(actionSetMapBackgroundLayer(mapKey, backgroundLayer)); // Call use action only on state controlled layers

      if (!backgroundLayer.type) {
        var _map$data3, _map$data3$viewport, _map$data4, _map$data4$viewport;

        var backgroundLayerState = _Select["default"].maps.getMapBackgroundLayerStateByMapKey(getState(), mapKey);

        var spatialFilter = _Select["default"].maps.getVisibleTilesByMapKey(getState(), mapKey, map === null || map === void 0 ? void 0 : (_map$data3 = map.data) === null || _map$data3 === void 0 ? void 0 : (_map$data3$viewport = _map$data3.viewport) === null || _map$data3$viewport === void 0 ? void 0 : _map$data3$viewport.width, map === null || map === void 0 ? void 0 : (_map$data4 = map.data) === null || _map$data4 === void 0 ? void 0 : (_map$data4$viewport = _map$data4.viewport) === null || _map$data4$viewport === void 0 ? void 0 : _map$data4$viewport.height); //spatial filter is required for now


        if (!spatialFilter || !backgroundLayerState) {
          return;
        }

        dispatch(layerUse(backgroundLayerState, spatialFilter));
      } else {
        return;
      }
    }
  };
}
/**
 * TODO @vlach1989 test
 * @param setKey {string}
 * @param layers {Array} layers definitions
 */


function setMapSetLayers(setKey, layers) {
  return function (dispatch, getState) {
    var set = _Select["default"].maps.getMapSetByKey(getState(), setKey);

    if (set) {
      dispatch(actionSetMapSetLayers(setKey, layers));

      var maps = _Select["default"].maps.getMapSetMaps(getState(), setKey);

      if (maps) {
        maps.forEach(function (map) {
          var _map$data5, _map$data5$viewport, _map$data6, _map$data6$viewport;

          dispatch(use(map.key, null, null, map === null || map === void 0 ? void 0 : (_map$data5 = map.data) === null || _map$data5 === void 0 ? void 0 : (_map$data5$viewport = _map$data5.viewport) === null || _map$data5$viewport === void 0 ? void 0 : _map$data5$viewport.width, map === null || map === void 0 ? void 0 : (_map$data6 = map.data) === null || _map$data6 === void 0 ? void 0 : (_map$data6$viewport = _map$data6.viewport) === null || _map$data6$viewport === void 0 ? void 0 : _map$data6$viewport.height));
        });
      }
    } else {
      dispatch(_actions["default"].actionGeneralError("No set exists for setKey ".concat(setKey)));
    }
  };
}
/**
 * @param setKey {string}
 */


function refreshMapSetUse(setKey) {
  return function (dispatch, getState) {
    var maps = _Select["default"].maps.getMapSetMaps(getState(), setKey);

    if (maps) {
      maps.forEach(function (map) {
        var _map$data7, _map$data7$viewport, _map$data8, _map$data8$viewport;

        // TODO is viewport always defined?
        dispatch(use(map.key, null, null, map === null || map === void 0 ? void 0 : (_map$data7 = map.data) === null || _map$data7 === void 0 ? void 0 : (_map$data7$viewport = _map$data7.viewport) === null || _map$data7$viewport === void 0 ? void 0 : _map$data7$viewport.width, map === null || map === void 0 ? void 0 : (_map$data8 = map.data) === null || _map$data8 === void 0 ? void 0 : (_map$data8$viewport = _map$data8.viewport) === null || _map$data8$viewport === void 0 ? void 0 : _map$data8$viewport.height));
      });
    }
  };
}
/**
 * @param setKey {string}
 * @param mapKey {string}
 */


function removeMapFromSet(setKey, mapKey) {
  return function (dispatch, getState) {
    var state = getState();

    var mapSetMapKeys = _Select["default"].maps.getMapSetMapKeys(state, setKey);

    if (mapSetMapKeys && mapSetMapKeys.includes(mapKey)) {
      var activeMapKey = _Select["default"].maps.getMapSetActiveMapKey(state, setKey);

      dispatch(actionRemoveMapFromSet(setKey, mapKey)); // if map to remove is active at the same time

      if (activeMapKey === mapKey) {
        // check map set map keys again & set first map as active
        var _mapSetMapKeys = _Select["default"].maps.getMapSetMapKeys(getState(), setKey);

        if (!(0, _lodash.isEmpty)(_mapSetMapKeys)) {
          dispatch(actionSetMapSetActiveMapKey(setKey, _mapSetMapKeys[0]));
        }
      }
    }
  };
}
/**
 * @param mapKey {string}
 * @param update {Object} map view fragment
 */


function updateMapAndSetView(mapKey, update) {
  return function (dispatch, getState) {
    var set = _Select["default"].maps.getMapSetByMapKey(getState(), mapKey);

    var forSet, forMap;

    var map = _Select["default"].maps.getMapByKey(getState(), mapKey);

    if (set && set.sync && map) {
      // pick key-value pairs that are synced for set
      forSet = (0, _lodash.pickBy)(update, function (updateVal, updateKey) {
        return set.sync[updateKey];
      });
      forMap = (0, _lodash.omitBy)(update, function (updateVal, updateKey) {
        return set.sync[updateKey];
      });
    } else if (map) {
      forMap = update;
    }

    if (forSet && !(0, _lodash.isEmpty)(forSet)) {
      //check data integrity
      forSet = _ptrUtils.map.view.ensureViewIntegrity(forSet); //TODO test

      dispatch(actionUpdateSetView(set.key, forSet));
    }

    if (forMap && !(0, _lodash.isEmpty)(forMap)) {
      //check data integrity
      forMap = _ptrUtils.map.view.ensureViewIntegrity(forMap); //TODO test

      dispatch(actionUpdateMapView(mapKey, forMap));
    }
  };
}
/**
 * @param setKey {string}
 * @param update {Object} map view fragment
 */


function updateSetView(setKey, update) {
  return function (dispatch, getState) {
    var activeMapKey = _Select["default"].maps.getMapSetActiveMapKey(getState(), setKey);

    if (activeMapKey) {
      dispatch(updateMapAndSetView(activeMapKey, update));
    }
  };
}
/**
 * Update whole maps state from view definition
 * @param data {Object}
 */


function updateStateFromView(data) {
  return function (dispatch) {
    if (data) {
      dispatch(actionUpdate(data));
    }
  };
}

function setMapViewport(mapKey, width, height) {
  return function (dispatch, getState) {
    if (mapKey && (0, _lodash.isNumber)(width) && (0, _lodash.isNumber)(height)) {
      var state = getState();

      var existingMap = _Select["default"].maps.getMapByKey(state, mapKey);

      var currentViewport = _Select["default"].maps.getViewportByMapKey(state, mapKey);

      if (existingMap && (!currentViewport || (currentViewport === null || currentViewport === void 0 ? void 0 : currentViewport.width) !== width || (currentViewport === null || currentViewport === void 0 ? void 0 : currentViewport.height) !== height)) {
        dispatch(actionSetMapViewport(mapKey, width, height));
      }
    }
  };
}
/* ==================================================
 * ACTIONS
 * ================================================== */


var actionAddMapLayers = function actionAddMapLayers(mapKey, layerStates) {
  return {
    type: _ActionTypes["default"].MAPS.MAP.LAYERS.ADD,
    mapKey: mapKey,
    layerStates: layerStates
  };
};

var actionAddMapLayerToIndex = function actionAddMapLayerToIndex(mapKey, layerState, index) {
  return {
    type: _ActionTypes["default"].MAPS.MAP.LAYERS.ADD_TO_INDEX,
    mapKey: mapKey,
    layerState: layerState,
    index: index
  };
};

var actionRemoveMapLayer = function actionRemoveMapLayer(mapKey, layerKey) {
  return {
    type: _ActionTypes["default"].MAPS.MAP.LAYERS.REMOVE_LAYER,
    mapKey: mapKey,
    layerKey: layerKey
  };
};

var actionRemoveMapFromSet = function actionRemoveMapFromSet(setKey, mapKey) {
  return {
    type: _ActionTypes["default"].MAPS.SET.REMOVE_MAP,
    setKey: setKey,
    mapKey: mapKey
  };
};

var actionSetActiveMapKey = function actionSetActiveMapKey(mapKey) {
  return {
    type: _ActionTypes["default"].MAPS.SET_ACTIVE_MAP_KEY,
    mapKey: mapKey
  };
};

var actionSetMapLayerOption = function actionSetMapLayerOption(mapKey, layerKey, optionKey, optionValue) {
  return {
    type: _ActionTypes["default"].MAPS.MAP.LAYERS.SET_OPTION,
    mapKey: mapKey,
    layerKey: layerKey,
    optionKey: optionKey,
    optionValue: optionValue
  };
};

var actionSetMapLayerStyleKey = function actionSetMapLayerStyleKey(mapKey, layerKey, styleKey) {
  return {
    type: _ActionTypes["default"].MAPS.MAP.LAYERS.SET_STYLE_KEY,
    mapKey: mapKey,
    layerKey: layerKey,
    styleKey: styleKey
  };
};

var actionSetMapSetActiveMapKey = function actionSetMapSetActiveMapKey(setKey, mapKey) {
  return {
    type: _ActionTypes["default"].MAPS.SET.SET_ACTIVE_MAP_KEY,
    mapKey: mapKey,
    setKey: setKey
  };
};

var actionSetMapSetBackgroundLayer = function actionSetMapSetBackgroundLayer(setKey, backgroundLayer) {
  return {
    type: _ActionTypes["default"].MAPS.SET.SET_BACKGROUND_LAYER,
    setKey: setKey,
    backgroundLayer: backgroundLayer
  };
};

var actionSetMapBackgroundLayer = function actionSetMapBackgroundLayer(mapKey, backgroundLayer) {
  return {
    type: _ActionTypes["default"].MAPS.MAP.SET_BACKGROUND_LAYER,
    mapKey: mapKey,
    backgroundLayer: backgroundLayer
  };
};

var actionSetMapSetLayers = function actionSetMapSetLayers(setKey, layers) {
  return {
    type: _ActionTypes["default"].MAPS.SET.SET_LAYERS,
    setKey: setKey,
    layers: layers
  };
};

var actionSetMapViewport = function actionSetMapViewport(mapKey, width, height) {
  return {
    type: _ActionTypes["default"].MAPS.MAP.VIEWPORT.SET,
    mapKey: mapKey,
    width: width,
    height: height
  };
};

var actionUpdate = function actionUpdate(data) {
  return {
    type: _ActionTypes["default"].MAPS.UPDATE,
    data: data
  };
};

var actionUpdateMapView = function actionUpdateMapView(mapKey, update) {
  return {
    type: _ActionTypes["default"].MAPS.MAP.VIEW.UPDATE,
    mapKey: mapKey,
    update: update
  };
};

var actionUpdateSetView = function actionUpdateSetView(setKey, update) {
  return {
    type: _ActionTypes["default"].MAPS.SET.VIEW.UPDATE,
    setKey: setKey,
    update: update
  };
};

var actionMapSetUseClear = function actionMapSetUseClear(mapSetKey) {
  return {
    type: _ActionTypes["default"].MAPS.SET.USE.CLEAR,
    mapSetKey: mapSetKey
  };
};

var actionMapSetUseRegister = function actionMapSetUseRegister(mapSetKey) {
  return {
    type: _ActionTypes["default"].MAPS.SET.USE.REGISTER,
    mapSetKey: mapSetKey
  };
};

var actionMapUseClear = function actionMapUseClear(mapKey) {
  return {
    type: _ActionTypes["default"].MAPS.MAP.USE.CLEAR,
    mapKey: mapKey
  };
};

var actionMapUseRegister = function actionMapUseRegister(mapKey) {
  return {
    type: _ActionTypes["default"].MAPS.MAP.USE.REGISTER,
    mapKey: mapKey
  };
}; // ============ export ===========


var _default = {
  addMapLayers: addMapLayers,
  addMapLayerToIndex: addMapLayerToIndex,
  ensureWithFilterByActive: ensureWithFilterByActive,
  layerUse: layerUse,
  mapSetUseClear: mapSetUseClear,
  mapSetUseRegister: mapSetUseRegister,
  mapUseClear: mapUseClear,
  mapUseRegister: mapUseRegister,
  refreshMapSetUse: refreshMapSetUse,
  removeMapFromSet: removeMapFromSet,
  removeMapLayer: removeMapLayer,
  setActiveMapKey: actionSetActiveMapKey,
  setLayerSelectedFeatureKeys: setLayerSelectedFeatureKeys,
  setMapLayerOption: setMapLayerOption,
  setMapLayerStyleKey: setMapLayerStyleKey,
  setMapSetActiveMapKey: setMapSetActiveMapKey,
  setMapBackgroundLayer: setMapBackgroundLayer,
  setMapSetBackgroundLayer: setMapSetBackgroundLayer,
  setMapSetLayers: setMapSetLayers,
  setMapViewport: setMapViewport,
  updateMapAndSetView: updateMapAndSetView,
  updateSetView: updateSetView,
  updateStateFromView: updateStateFromView,
  use: use
};
exports["default"] = _default;