"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _Select = _interopRequireDefault(require("../../state/Select"));

var _actions = _interopRequireDefault(require("../_common/actions"));

var _helpers = _interopRequireDefault(require("../_common/helpers"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _ptrUtils = require("@gisatcz/ptr-utils");

var _actions2 = _interopRequireDefault(require("../LayerTemplates/actions"));

var _actions3 = _interopRequireDefault(require("../Areas/actions"));

var _actions4 = _interopRequireDefault(require("../Selections/actions"));

var _actions5 = _interopRequireDefault(require("../SpatialRelations/actions"));

var _actions6 = _interopRequireDefault(require("../AreaRelations/actions"));

var _actions7 = _interopRequireDefault(require("../SpatialDataSources/actions"));

var _actions8 = _interopRequireDefault(require("../SpatialData/actions"));

var _actions9 = _interopRequireDefault(require("../Attributes/actions"));

var _actions10 = _interopRequireDefault(require("../AttributeRelations/actions"));

var _actions11 = _interopRequireDefault(require("../AttributeDataSources/actions"));

var _actions12 = _interopRequireDefault(require("../AttributeData/actions"));

var _actions13 = _interopRequireDefault(require("../Styles/actions"));

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

var actionGeneralError = _actions["default"].actionGeneralError;

var setInitial = _actions["default"].setInitial(_ActionTypes["default"].MAPS);
/*
Table of contents
	- creators
	- deprecated creators
	- actions
	- deprecated actions
	- exports
*/

/* ==================================================
 * CREATORS
 * ================================================== */


var setActiveMapKey = function setActiveMapKey(mapKey) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (mapByKey) {
      var activeMapKey = _Select["default"]._deprecatedMaps.getActiveMapKey(state);

      if (mapKey !== activeMapKey) {
        dispatch(actionSetActiveMapKey(mapKey));

        var setByMapKey = _Select["default"]._deprecatedMaps.getMapSetByMapKey(state, mapKey);

        if (setByMapKey) {
          dispatch(setActiveSetKey(setByMapKey.key));
        }
      }
    } else {
      return dispatch(actionGeneralError("Can not set mapKey ".concat(mapKey, " as active, because map with this key dont exists.")));
    }
  };
};

var setMapSetActiveMapKey = function setMapSetActiveMapKey(mapKey) {
  return function (dispatch, getState) {
    var set = _Select["default"]._deprecatedMaps.getMapSetByMapKey(getState(), mapKey);

    if (set) {
      dispatch(actionSetMapSetActiveMapKey(set.key, mapKey));
    }
  };
};

var setActiveSetKey = function setActiveSetKey(setKey) {
  return function (dispatch, getState) {
    var state = getState();

    var setByKey = _Select["default"]._deprecatedMaps.getMapSetByKey(state, setKey);

    if (setByKey) {
      var activeSetKey = _Select["default"]._deprecatedMaps.getActiveSetKey(state);

      if (setKey !== activeSetKey) {
        return dispatch(actionSetActiveSetKey(setKey));
      }
    } else {
      return dispatch(actionGeneralError("Can not set setKey ".concat(setKey, " as active, because set with this key dont exists.")));
    }
  };
};

var addSet = function addSet(set) {
  return function (dispatch, getState) {
    var state = getState();
    var setKey = set.key;

    if (!setKey) {
      return dispatch(actionGeneralError("Undefined setKey for set ".concat(set)));
    } else {
      var setByKey = _Select["default"]._deprecatedMaps.getMapSetByKey(state, setKey);

      if (setByKey) {
        return dispatch(actionGeneralError("Set with given setKey (".concat(setKey, ") already exists ").concat(setByKey)));
      } else {
        dispatch(actionAddSet(set)); //if no set is active, set set as active

        var activeSetKey = _Select["default"]._deprecatedMaps.getActiveSetKey(state);

        if (!activeSetKey) {
          dispatch(actionSetActiveSetKey(setKey));
        }
      }
    }
  };
};
/**
 * {Object} layerTreesFilter
 * {Array} mapKeys
 */


var addLayersToMaps = function addLayersToMaps(layerTreesFilter, mapKeys, useActiveMetadataKeys) {
  return function (dispatch, getState) {
    var state = getState(); // getIndexed

    var layerTreesData = _Select["default"].layerTrees.getByFilterOrder(state, layerTreesFilter, null);

    if (layerTreesData) {
      //BE should return only one record, but could be bore fore scopeKey and applicationKey. 
      //Take last record
      var lastLTdata = layerTreesData[layerTreesData.length - 1]; //parse to map state

      if (lastLTdata && lastLTdata.data && lastLTdata.data.structure && lastLTdata.data.structure.length > 0) {
        var layerTreeStructure = lastLTdata.data.structure;
        dispatch(addTreeLayers(layerTreeStructure, 'layers', mapKeys, useActiveMetadataKeys));
        dispatch(addTreeLayers(layerTreeStructure, 'backgroundLayers', mapKeys, useActiveMetadataKeys));
      }
    }
  };
};

var addTreeLayers = function addTreeLayers(treeLayers, layerTreeBranchKey, mapKeys, useActiveMetadataKeys) {
  return function (dispatch, getState) {
    var state = getState(); //no array but object

    var flattenLT = _ptrUtils.layerTree.getFlattenLayers(treeLayers[0][layerTreeBranchKey]);

    var visibleLayers = flattenLT.filter(function (l) {
      return l.visible;
    }); //add all visible layers in layerTree to map

    var visibleLayersKeys = visibleLayers.map(function (l) {
      return l.key;
    });

    if (mapKeys) {
      mapKeys.forEach(function (mapKey) {
        // check if layer in map
        var layersState = _Select["default"]._deprecatedMaps.getLayersStateByMapKey_deprecated(state, mapKey, useActiveMetadataKeys); // clean templateKeys found in map


        var uniqVisibleLayersKeys = layersState ? visibleLayersKeys.filter(function (lk) {
          return !layersState.some(function (ls) {
            return ls.layer && ls.layer.layerTemplate === lk;
          });
        }) : visibleLayersKeys;
        uniqVisibleLayersKeys.forEach(function (layerKey) {
          var zIndex = _ptrUtils.layerTree.getLayerZindex(treeLayers[0], layerKey);

          var layer = {
            layerTemplate: layerKey
          };

          switch (layerTreeBranchKey) {
            case 'backgroundLayers':
              return dispatch(setMapBackgroundLayer(mapKey, layer, zIndex));

            case 'layers':
              return dispatch(addLayer(mapKey, layer, zIndex, useActiveMetadataKeys));

            default:
              return dispatch(addLayer(mapKey, layer, zIndex, useActiveMetadataKeys));
          }
        });
      });
    }
  };
};

var removeSet = function removeSet(setKey) {
  return function (dispatch, getState) {
    var state = getState();

    var setByKey = _Select["default"]._deprecatedMaps.getMapSetByKey(state, setKey);

    if (!setByKey) {
      return dispatch(actionGeneralError("No set found for setKey ".concat(setKey, ".")));
    } else {
      return dispatch(actionRemoveSet(setKey));
    }
  };
};

var addMapToSet = function addMapToSet(setKey, mapKey) {
  return function (dispatch, getState) {
    var state = getState();

    var setByKey = _Select["default"]._deprecatedMaps.getMapSetByKey(state, setKey);

    if (!setByKey) {
      return dispatch(actionGeneralError("No set found for setKey ".concat(setKey, ".")));
    } else {
      //check map exist
      if (setByKey.maps && setByKey.maps.includes(mapKey)) {
        return dispatch(actionGeneralError("Set ".concat(setKey, " already contains map ").concat(mapKey, ".")));
      } else {
        dispatch(actionAddMapToSet(setKey, mapKey)); //if no map is active, set map as active

        var activeMapKey = _Select["default"]._deprecatedMaps.getMapSetActiveMapKey(state, setKey);

        if (!activeMapKey) {
          dispatch(setMapSetActiveMapKey(mapKey));
        }
      }
    }
  };
};

var removeMapKeyFromSet = function removeMapKeyFromSet(setKey, mapKey) {
  return function (dispatch, getState) {
    var state = getState();

    var setByKey = _Select["default"]._deprecatedMaps.getMapSetByKey(state, setKey);

    if (!setByKey) {
      return dispatch(actionGeneralError("No set found for setKey ".concat(setKey, ".")));
    } else {
      //check map exist
      if (setByKey.maps && setByKey.maps.includes(mapKey)) {
        var activeMapKey = _Select["default"]._deprecatedMaps.getMapSetActiveMapKey(state, setKey);

        dispatch(actionRemoveMapKeyFromSet(setKey, mapKey));

        if (activeMapKey === mapKey) {
          var mapSetMapKeys = _Select["default"]._deprecatedMaps.getMapSetMapKeys(getState(), setKey);

          if (mapSetMapKeys) {
            dispatch(actionSetMapSetActiveMapKey(setKey, mapSetMapKeys[0]));
          }
        }
      } else {
        return dispatch(actionGeneralError("Set ".concat(setKey, " do not contains map ").concat(mapKey, ".")));
      }
    }
  };
};

var setSetView = function setSetView(setKey, view) {
  return function (dispatch, getState) {
    var state = getState();

    var setByKey = _Select["default"]._deprecatedMaps.getMapSetByKey(state, setKey);

    if (!setByKey) {
      return dispatch(actionGeneralError("No set found for setKey ".concat(setKey, ".")));
    } else {
      return dispatch(actionSetSetView(setKey, view));
    }
  };
};

var setSetSync = function setSetSync(setKey, sync) {
  return function (dispatch, getState) {
    var state = getState();

    var setByKey = _Select["default"]._deprecatedMaps.getMapSetByKey(state, setKey);

    if (!setByKey) {
      return dispatch(actionGeneralError("No set found for setKey ".concat(setKey, ".")));
    } else {
      return dispatch(actionSetSetSync(setKey, sync));
    }
  };
};

var orderSetByMapPeriod = function orderSetByMapPeriod(setKey) {
  return function (dispatch, getState) {
    var state = getState();

    var setMaps = _Select["default"]._deprecatedMaps.getMapSetMapKeys(state, setKey);

    var maps = _Select["default"]._deprecatedMaps.getMapsAsObject(state);

    var periods = _Select["default"].periods.getAllAsObject(state);

    if (setMaps && maps && periods) {
      var extendedSetMaps = setMaps.map(function (mapKey) {
        var map = _lodash["default"].cloneDeep(maps[mapKey]);

        var periodKey = map && map.data && map.data.metadataModifiers && map.data.metadataModifiers.period;

        if (periodKey && periods[periodKey]) {
          map.data.metadataModifiers.period = periods[periodKey].data.period || periods[periodKey].data.nameDisplay;
        }

        return map;
      });

      if (extendedSetMaps && extendedSetMaps.length) {
        var orderedExtendedSetMaps = _lodash["default"].orderBy(extendedSetMaps, ['data.metadataModifiers.period'], ['asc']);

        var orderedMapKeys = orderedExtendedSetMaps.map(function (map) {
          return map.key;
        });
        dispatch(actionSetSetMaps(setKey, orderedMapKeys));
      }
    }
  };
};

var addMap = function addMap(map) {
  return function (dispatch, getState) {
    if (map && !map.key) {
      return dispatch(actionGeneralError("Undefined mapKey for map ".concat(map)));
    } else {
      var state = getState();

      var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, map.key);

      if (mapByKey) {
        return dispatch(actionGeneralError("Map with given mapKey (".concat(map.key, ") already exists ").concat(mapByKey)));
      } else {
        return dispatch(actionAddMap(map));
      }
    }
  };
};

var addMapForPeriod = function addMapForPeriod(periodKey, setKey) {
  return function (dispatch, getState) {
    var state = getState();

    var map = _Select["default"]._deprecatedMaps.getMapByMetadata_deprecated(state, {
      period: periodKey
    });

    if (!map) {
      var mapKey = _ptrUtils.utils.uuid();

      map = {
        key: mapKey,
        data: {
          metadataModifiers: {
            period: periodKey
          }
        }
      };
      dispatch(addMap(map));
    }

    dispatch(addMapToSet(setKey, map.key));
    dispatch(orderSetByMapPeriod(setKey));
  };
};

var removeMap = function removeMap(mapKey) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      var mapSets = _Select["default"]._deprecatedMaps.getMapSets(state);

      if (mapSets) {
        _lodash["default"].each(mapSets, function (mapSet) {
          var mapSetMapKey = _lodash["default"].includes(mapSet.maps, mapKey);

          if (mapSetMapKey) {
            dispatch(removeMapKeyFromSet(mapSet.key, mapKey));
          }
        });
      }

      dispatch(actionRemoveMap(mapKey));
    }
  };
};

var removeMapForPeriod = function removeMapForPeriod(periodKey, setKey) {
  return function (dispatch, getState) {
    var state = getState();

    var map = _Select["default"]._deprecatedMaps.getMapByMetadata_deprecated(state, {
      period: periodKey
    });

    if (!map) {
      dispatch(actionGeneralError("No map found for period ".concat(periodKey, ".")));
    } else {
      dispatch(removeMap(map.key));
    }
  };
};

var setMapName = function setMapName(mapKey, name) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      return dispatch(actionSetMapName(mapKey, name));
    }
  };
};

var setMapData = function setMapData(mapKey, data) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      return dispatch(actionSetMapData(mapKey, data));
    }
  };
};

var setMapView = function setMapView(mapKey, view) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      return dispatch(actionSetMapView(mapKey, view));
    }
  };
};

var addLayer = function addLayer(mapKey, layer, index, useActiveMetadataKeys) {
  return function (dispatch, getState) {
    var state = getState();

    if (!layer.key) {
      layer.key = _ptrUtils.utils.uuid();
    }

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      dispatch(actionAddLayer(mapKey, layer, index));
      dispatch(use(mapKey, useActiveMetadataKeys));
    }
  };
};

var addLayers = function addLayers(mapKey, layers) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      return layers.map(function (layer) {
        return dispatch(addLayer(mapKey, layer));
      });
    }
  };
};

var removeLayer = function removeLayer(mapKey, layerKey) {
  return function (dispatch, getState) {
    if (!layerKey) {
      return dispatch(actionGeneralError("Undefined layer key."));
    } else {
      var state = getState();

      var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

      if (!mapByKey) {
        return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
      } else {
        //check if layer exist
        var layer = _Select["default"]._deprecatedMaps.getMapLayerByMapKeyAndLayerKey(state, mapKey, layerKey);

        if (layer) {
          return dispatch(actionRemoveLayer(mapKey, layerKey));
        } else {
          return dispatch(actionGeneralError("No layer (".concat(layerKey, ") found in mapKey ").concat(mapKey, ".")));
        }
      }
    }
  };
};

var removeLayers = function removeLayers(mapKey, layersKeys) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      return layersKeys.map(function (layerKey) {
        return dispatch(removeLayer(mapKey, layerKey));
      });
    }
  };
};

var setLayerIndex = function setLayerIndex(mapKey, layerKey, index) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      dispatch(actionSetLayerIndex(mapKey, layerKey, index));
    }
  };
};

var setLayerHoveredFeatureKeys = function setLayerHoveredFeatureKeys(mapKey, layerKey, hoveredFeatureKeys) {
  return function (dispatch, getState) {
    var state = getState();

    var mapLayer = _Select["default"]._deprecatedMaps.getMapLayerByMapKeyAndLayerKey(state, mapKey, layerKey);

    if (mapLayer) {
      var prevKeys = mapLayer && mapLayer.options && mapLayer.options.hovered && mapLayer.options.hovered.keys;

      if (prevKeys) {
        var prevKeysString = JSON.stringify(_lodash["default"].sortBy(prevKeys));
        var nextKeysString = JSON.stringify(_lodash["default"].sortBy(hoveredFeatureKeys));

        if (prevKeysString !== nextKeysString) {
          dispatch(actionSetMapLayerHoveredFeatureKeys(mapKey, layerKey, hoveredFeatureKeys));
        }
      } else {
        dispatch(actionSetMapLayerHoveredFeatureKeys(mapKey, layerKey, hoveredFeatureKeys));
      }
    } // TODO
    else {
        var set = _Select["default"]._deprecatedMaps.getMapSetByMapKey(state, mapKey);

        if (set) {// let setLayer = Select._deprecatedMaps.getSetLayerBySetKeyAndLayerKey(state, set.key, layerKey);
          // if (setLayer) {
          // 	 dispatch(actionSetSetLayerHoveredFeatureKeys(state, setKey, layerKey, hoveredFeatureKeys));
          // }
        }
      }
  };
}; // TODO refactor - where to decide if selections are enabled


var setLayerSelectedFeatureKeys = function setLayerSelectedFeatureKeys(mapKey, layerKey, selectedFeatureKeys) {
  return function (dispatch, getState) {
    var state = getState();

    var mapLayer = _Select["default"]._deprecatedMaps.getMapLayerByMapKeyAndLayerKey(state, mapKey, layerKey);

    var activeSelectionKey = _Select["default"].selections.getActiveKey(state);

    var selectionKey = activeSelectionKey || _ptrUtils.utils.uuid(); // set selection in selections store


    if (!activeSelectionKey) {
      var defaultSelection = {
        key: selectionKey,
        data: {
          colour: "#00ffff",
          //style: styleKey // TODO???
          featureKeysFilter: {
            keys: selectedFeatureKeys
          }
        }
      };
      dispatch(_actions4["default"].add([defaultSelection]));
      dispatch(_actions4["default"].setActiveKey(selectionKey));
    } else {
      dispatch(_actions4["default"].setActiveSelectionFeatureKeysFilterKeys(selectedFeatureKeys));
    } // TODO it shouldn't be needed since this only clear and set again empty selection object
    // set selection in map store
    // if (mapLayer) {
    // 	dispatch(actionClearSelectionInAllLayers(mapKey, selectionKey));
    // 	dispatch(actionSetMapLayerSelection(mapKey, layerKey, selectionKey));
    // }
    //
    // // TODO
    // else {
    // 	let set = Select._deprecatedMaps.getMapSetByMapKey(state, mapKey);
    // 	if (set) {
    //
    // 	}
    // }

  };
};
/**
 * 
 * Similar like add layer.
 * It enables to set any layer property except layerKey. 
 * Layer object is merged with default layer option.
 */


var setMapLayer = function setMapLayer(mapKey, layerKey, layer) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      //check if layer exist
      var layerExists = _Select["default"]._deprecatedMaps.getMapLayerByMapKeyAndLayerKey(state, mapKey, layerKey);

      if (layerExists) {
        dispatch(actionSetMapLayer(mapKey, layerKey, layer));
      } else {
        return dispatch(actionGeneralError("No layer (".concat(layerKey, ") found in mapKey ").concat(mapKey, ".")));
      }
    }
  };
};

var setMapLayerStyle = function setMapLayerStyle(mapKey, layerKey, style) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      //check if layer exist
      var layerExists = _Select["default"]._deprecatedMaps.getMapLayerByMapKeyAndLayerKey(state, mapKey, layerKey);

      if (layerExists) {
        dispatch(actionSetMapLayerStyle(mapKey, layerKey, style));
      } else {
        return dispatch(actionGeneralError("No layer (".concat(layerKey, ") found in mapKey ").concat(mapKey, ".")));
      }
    }
  };
};
/**
 * 
 * It enables to update any layer property except layerKey. 
 * Layer object is merged with actual layer option.
 */


var updateMapLayer = function updateMapLayer(mapKey, layerKey, layer) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      //check if layer exist
      var layerExists = _Select["default"]._deprecatedMaps.getMapLayerByMapKeyAndLayerKey(state, mapKey, layerKey);

      if (layerExists) {
        dispatch(actionUpdateMapLayer(mapKey, layerKey, layer));
      } else {
        return dispatch(actionGeneralError("No layer (".concat(layerKey, ") found in mapKey ").concat(mapKey, ".")));
      }
    }
  };
};

var updateMapAndSetView = function updateMapAndSetView(mapKey, update) {
  return function (dispatch, getState) {
    var set = _Select["default"]._deprecatedMaps.getMapSetByMapKey(getState(), mapKey);

    var forSet = null;
    var forMap = null;

    if (set && set.sync) {
      // pick key-value pairs that are synced for set
      forSet = _lodash["default"].pickBy(update, function (updateVal, updateKey) {
        return set.sync[updateKey];
      });
      forMap = _lodash["default"].omitBy(update, function (updateVal, updateKey) {
        return set.sync[updateKey];
      });
    } else {
      forMap = update;
    }

    if (forSet && !_lodash["default"].isEmpty(forSet)) {
      //check data integrity
      forSet = _ptrUtils.map.view.ensureViewIntegrity(forSet); //TODO test

      dispatch(actionUpdateSetView(set.key, forSet));
    }

    if (forMap && !_lodash["default"].isEmpty(forMap)) {
      //check data integrity
      forMap = _ptrUtils.map.view.ensureViewIntegrity(forMap); //TODO test

      dispatch(actionUpdateMapView(mapKey, forMap));
    }
  };
};

var updateSetView = function updateSetView(setKey, update) {
  return function (dispatch, getState) {
    var activeMapKey = _Select["default"]._deprecatedMaps.getMapSetActiveMapKey(getState(), setKey);

    dispatch(updateMapAndSetView(activeMapKey, update));
  };
};

var resetViewHeading = function resetViewHeading(mapKey) {
  return function (dispatch, getState) {
    var view = _Select["default"]._deprecatedMaps.getView(getState(), mapKey);

    _ptrUtils.map.resetHeading(view.heading, function (heading) {
      return dispatch(updateMapAndSetView(mapKey, {
        heading: heading
      }));
    });
  };
};

var setMapScope = function setMapScope(mapKey, scope) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      dispatch(actionSetMapScope(mapKey, scope));
    }
  };
};

var setMapScenario = function setMapScenario(mapKey, scenario) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      dispatch(actionSetMapScenario(mapKey, scenario));
    }
  };
};

var setMapPeriod = function setMapPeriod(mapKey, period) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      dispatch(actionSetMapPeriod(mapKey, period));
    }
  };
};

var setMapPlace = function setMapPlace(mapKey, place) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      dispatch(actionSetMapPlace(mapKey, place));
    }
  };
};

var setMapCase = function setMapCase(mapKey, caseKey) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      dispatch(actionSetMapCase(mapKey, caseKey));
    }
  };
};

var setMapBackgroundLayer = function setMapBackgroundLayer(mapKey, backgroundLayer) {
  return function (dispatch, getState) {
    var state = getState();

    if (backgroundLayer && !backgroundLayer.key) {
      backgroundLayer.key = _ptrUtils.utils.uuid();
    }

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      dispatch(actionSetMapBackgroundLayer(mapKey, backgroundLayer));
      dispatch(deprecated_use(mapKey));
    }
  };
};
/**
 * Set (replace) all map layers, and refresh use
 * @param mapKey
 * @param layers - complete layers array
 * @returns {Function}
 */


var setMapLayers = function setMapLayers(mapKey, layers) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      dispatch(actionSetMapLayers(mapKey, layers));
      dispatch(use(mapKey));
    }
  };
};

var setSetBackgroundLayer = function setSetBackgroundLayer(setKey, backgroundLayer) {
  return function (dispatch, getState) {
    var state = getState();

    var setByKey = _Select["default"]._deprecatedMaps.getMapSetByKey(state, setKey);

    if (!setByKey) {
      return dispatch(actionGeneralError("No map set found for setKey ".concat(setKey, ".")));
    } else {
      dispatch(actionSetSetBackgroundLayer(setKey, backgroundLayer));
    }
  };
};

var setSetLayers = function setSetLayers(setKey, layers) {
  return function (dispatch, getState) {
    var state = getState();

    var setByKey = _Select["default"]._deprecatedMaps.getMapSetByKey(state, setKey);

    if (!setByKey) {
      return dispatch(actionGeneralError("No map set found for setKey ".concat(setKey, ".")));
    } else {
      dispatch(actionSetSetLayers(setKey, layers));
    }
  };
};

function use(mapKey, backgroundLayer, layers) {
  return function (dispatch, getState) {
    dispatch(useClear(mapKey));
    var state = getState(); // let filterByActive = Select._deprecatedMaps.getFilterByActiveByMapKey(state, mapKey);

    if (backgroundLayer || layers) {
      if (backgroundLayer) {
        backgroundLayer = _objectSpread(_objectSpread({}, backgroundLayer), {}, {
          key: 'pantherBackgroundLayer'
        });
        layers = layers || [];
        layers = [backgroundLayer].concat(_toConsumableArray(layers));
      }
    } else {
      layers = _Select["default"]._deprecatedMaps.getAllLayersStateByMapKey(state, mapKey);
    }

    var activeKeys = _selectors["default"].getAllActiveKeys(state);

    if (layers) {
      var componentId = "map_".concat(mapKey);
      layers.forEach(function (layer) {
        var filter = _objectSpread({}, layer.metadataModifiers);

        if (layer.layerTemplateKey) {
          filter.layerTemplateKey = layer.layerTemplateKey;
          dispatch(_actions2["default"].useKeys([layer.layerTemplateKey], componentId));
        } else if (layer.areaTreeLevelKey) {
          filter.areaTreeLevelKey = layer.areaTreeLevelKey;
          dispatch(_actions3["default"].areaTreeLevels.useKeys([layer.areaTreeLevelKey], componentId));
        }

        var filterByActive = layer.filterByActive || null;

        var mergedFilter = _helpers["default"].mergeFilters(activeKeys, filterByActive, filter);
        /* Ensure spatial relations or area relations */


        if (layer.layerTemplateKey || layer.areaTreeLevelKey || mergedFilter.layerTemplateKey) {
          var action, select;

          if (layer.layerTemplateKey || mergedFilter.layerTemplateKey) {
            action = _actions5["default"];
            select = _Select["default"].spatialRelations;
          } else if (layer.areaTreeLevelKey) {
            action = _actions6["default"];
            select = _Select["default"].areaRelations;
          }

          dispatch(action.useIndexedRegister(componentId, filterByActive, filter, null, 1, 1000));
          dispatch(action.ensureIndexed(mergedFilter, null, 1, 1000)).then(function () {
            /* Ensure spatial data sources */
            var relations = select.getFilteredData(getState(), mergedFilter);

            if (relations && relations.length) {
              var spatialFilters = relations.map(function (relation) {
                return {
                  spatialDataSourceKey: relation.spatialDataSourceKey,
                  fidColumnName: relation.fidColumnName
                };
              });

              var spatialDataSourcesKeys = _lodash["default"].uniq(spatialFilters.map(function (filter) {
                return filter.spatialDataSourceKey;
              }));

              dispatch(_actions7["default"].useKeys(spatialDataSourcesKeys, componentId)).then(function () {
                var dataSources = _Select["default"].spatialDataSources.getByKeys(getState(), spatialDataSourcesKeys);

                if (dataSources) {
                  dataSources.forEach(function (dataSource) {
                    // TODO load raster data?
                    if (dataSource && dataSource.data && dataSource.data.type === 'vector') {
                      var spatialFilter = _lodash["default"].find(spatialFilters, {
                        spatialDataSourceKey: dataSource.key
                      });

                      dispatch(_actions8["default"].useIndexed(null, spatialFilter, null, 1, 1, componentId));
                    }
                  });
                }
              });
            }
          });
        } // Ensure attribute data //todo
        // TODO layer.attributeKey case?
        // TODO handle "key: in {}" case in filters


        if (layer.attributeKeys) {
          dispatch(_actions9["default"].useKeys(layer.attributeKeys, componentId));

          var attributeFilter = _objectSpread(_objectSpread({}, layer.attributeMetadataModifiers), {}, {
            attributeKey: {
              "in": layer.attributeKeys
            }
          });

          if (layer.layerTemplateKey) {
            attributeFilter.layerTemplateKey = layer.layerTemplateKey;
          } else if (layer.areaTreeLevelKey) {
            attributeFilter.areaTreeLevelKey = layer.areaTreeLevelKey;
          }

          var attributeFilterByActive = layer.attributeFilterByActive || null;

          var mergedAttributeFilter = _helpers["default"].mergeFilters(activeKeys, attributeFilterByActive, attributeFilter);

          dispatch(_actions10["default"].useIndexedRegister(componentId, attributeFilterByActive, attributeFilter, null, 1, 2000));
          dispatch(_actions10["default"].ensureIndexed(mergedAttributeFilter, null, 1, 2000)).then(function () {
            /* Ensure data sources */
            var relations = _Select["default"].attributeRelations.getIndexed(getState(), attributeFilterByActive, attributeFilter, null, 1, 2000);

            if (relations && relations.length) {
              var filters = relations.map(function (relation) {
                return {
                  attributeDataSourceKey: relation.data && relation.data.attributeDataSourceKey,
                  fidColumnName: relation.data && relation.data.fidColumnName
                };
              });
              var dataSourcesKeys = filters.map(function (filter) {
                return filter.attributeDataSourceKey;
              });
              dispatch(_actions11["default"].useKeys(dataSourcesKeys, componentId)).then(function () {
                var dataSources = _Select["default"].attributeDataSources.getByKeys(getState(), dataSourcesKeys);

                if (dataSources) {
                  var dataSourceKeys = [];
                  dataSources.forEach(function (dataSource) {
                    dataSourceKeys.push(dataSource.key);
                  }); // TODO fidColumnName!!!

                  var _filter = {
                    attributeDataSourceKey: {
                      "in": dataSourceKeys
                    },
                    fidColumnName: relations[0].data.fidColumnName
                  };
                  dispatch(_actions12["default"].useIndexed(null, _filter, null, 1, 1, componentId));
                }
              });
            }
          });
        }

        if (layer.styleKey) {
          dispatch(_actions13["default"].useKeys([layer.styleKey], componentId));
        }
      });
    }
  };
}

function useClear(mapKey) {
  return function (dispatch) {
    dispatch(_actions["default"].useIndexedClear(_ActionTypes["default"].SPATIAL_RELATIONS)("map_".concat(mapKey)));
    dispatch(_actions["default"].useKeysClear(_ActionTypes["default"].SPATIAL_DATA_SOURCES)("map_".concat(mapKey)));
    dispatch(_actions["default"].useKeysClear(_ActionTypes["default"].LAYER_TEMPLATES)("map_".concat(mapKey)));
    dispatch(_actions["default"].useKeysClear(_ActionTypes["default"].AREAS.AREA_TREE_LEVELS)("map_".concat(mapKey)));
    dispatch(_actions["default"].useKeysClear(_ActionTypes["default"].STYLES)("map_".concat(mapKey)));
  };
}

function updateStateFromView(data) {
  return function (dispatch) {
    if (data) {
      dispatch(actionUpdate(data));
    }
  };
}

function goToPlace(placeString) {
  return function (dispatch, getState) {
    if (placeString && placeString.length) {
      _ptrUtils.map.getLocationFromPlaceString(placeString).then(function (location) {
        if (location) {
          var mapKey = _Select["default"]._deprecatedMaps.getActiveMapKey(getState());

          dispatch(updateMapAndSetView(mapKey, location)); // TODO temporary solution for old map state

          var navigatorUpdate = {
            range: location.boxRange,
            lookAtLocation: {
              latitude: location.center.lat,
              longitude: location.center.lon
            }
          };
          dispatch(deprecated_updateWorldWindNavigator(mapKey, navigatorUpdate)); // TODO deprecated
        }
      });
    }
  };
}
/* ==================================================
 * DEPRECATED CREATORS
 * ================================================== */


function deprecated_use(mapKey, useActiveMetadataKeys) {
  return function (dispatch, getState) {
    var state = getState();

    var layers = _Select["default"]._deprecatedMaps.getLayersStateByMapKey_deprecated(state, mapKey, useActiveMetadataKeys);

    var backgroundLayer = _Select["default"]._deprecatedMaps.getBackgroundLayerStateByMapKey_deprecated(state, mapKey);

    var finalLayers = [];

    if (backgroundLayer) {
      finalLayers.push(backgroundLayer);
    }

    if (layers) {
      finalLayers = finalLayers.concat(layers);
    }

    if (finalLayers.length) {
      var componentId = "map_".concat(mapKey);
      finalLayers.forEach(function (filters) {
        //assume, that spatial data dont need period
        var spatialRelationsFilter = _lodash["default"].cloneDeep(filters.mergedFilter);

        var spatialRelationsFilterByActive = _lodash["default"].cloneDeep(filters.filterByActive);

        if (spatialRelationsFilter.periodKey) {
          delete spatialRelationsFilter.periodKey;
        }

        if (spatialRelationsFilter.attributeKey) {
          delete spatialRelationsFilter.attributeKey;
        }

        if (spatialRelationsFilterByActive.attribute) {
          delete spatialRelationsFilterByActive.attribute;
        }

        dispatch(_actions5["default"].useIndexedRegister(componentId, spatialRelationsFilterByActive, spatialRelationsFilter, null, 1, 1000));
        dispatch(_actions5["default"].ensureIndexed(spatialRelationsFilter, null, 1, 1000)).then(function () {
          var spatialDataSourcesKeys = _Select["default"].spatialRelations.getDataSourceKeysFiltered(getState(), spatialRelationsFilter);

          if (spatialDataSourcesKeys && spatialDataSourcesKeys.length) {
            dispatch(_actions7["default"].useKeys([spatialDataSourcesKeys[0]], componentId)).then(function () {
              var dataSource = _Select["default"].spatialDataSources.getByKeys(getState(), spatialDataSourcesKeys); //datasource is only one
              //if vector dataSource, then load attribute data


              if (dataSource && dataSource[0] && dataSource[0].data.type === 'vector') {
                var spatialDataSources = _Select["default"].spatialRelations.getFilteredData(getState(), spatialRelationsFilter);

                var spatialFilter = {
                  spatialDataSourceKey: dataSource[0].key,
                  fidColumnName: spatialDataSources[0].fidColumnName
                };

                var spatialData = _Select["default"].spatialDataSources.vector.getBatchByFilterOrder(getState(), spatialFilter, null); //if data already loaded, skip loading


                if (!spatialData) {
                  dispatch(_actions7["default"].vector.loadLayerData(spatialFilter, componentId));
                }

                var attributeFilter = _lodash["default"].cloneDeep(filters.mergedFilter);

                dispatch(_actions10["default"].useIndexedRegister(componentId, filters.filterByActive, attributeFilter, null, 1, 1000));
                dispatch(_actions10["default"].ensureIndexedSpecific(attributeFilter, null, 1, 1000, componentId));
              }
            });
          }
        })["catch"](function (err) {
          dispatch(_actions["default"].actionGeneralError(err));
        }); // TODO register and ensure layer templates
      });
    }
  };
}

;

var deprecated_useClear = function deprecated_useClear(mapKey) {
  return function (dispatch) {
    dispatch(_actions["default"].useIndexedClear(_ActionTypes["default"].SPATIAL_RELATIONS)("map_".concat(mapKey)));
  };
};

var deprecated_checkWorldWindNavigatorIntegrity = function deprecated_checkWorldWindNavigatorIntegrity(WorldWindNavigator) {
  if (WorldWindNavigator.heading && WorldWindNavigator.heading > 360) {
    WorldWindNavigator.heading = WorldWindNavigator.heading - 360;
  }

  if (WorldWindNavigator.heading && WorldWindNavigator.heading < -360) {
    WorldWindNavigator.heading = WorldWindNavigator.heading + 360;
  }

  if (WorldWindNavigator.tilt && WorldWindNavigator.tilt < 0) {
    WorldWindNavigator.tilt = 0;
  }

  if (WorldWindNavigator.tilt && WorldWindNavigator.tilt > 90) {
    WorldWindNavigator.tilt = 90;
  }

  return WorldWindNavigator;
};

var deprecated_setMapWorldWindNavigator = function deprecated_setMapWorldWindNavigator(mapKey, worldWindNavigator) {
  return function (dispatch, getState) {
    var state = getState();

    var mapByKey = _Select["default"]._deprecatedMaps.getMapByKey(state, mapKey);

    if (!mapByKey) {
      return dispatch(actionGeneralError("No map found for mapKey ".concat(mapKey, ".")));
    } else {
      return dispatch(deprecated_actionSetMapWorldWindNavigator(mapKey, worldWindNavigator));
    }
  };
};

var deprecated_setSetWorldWindNavigator = function deprecated_setSetWorldWindNavigator(setKey, worldWindNavigator) {
  return function (dispatch, getState) {
    var state = getState();

    var setByKey = _Select["default"]._deprecatedMaps.getMapSetByKey(state, setKey);

    if (!setByKey) {
      return dispatch(actionGeneralError("No set found for setKey ".concat(setKey, ".")));
    } else {
      return dispatch(deprecated_actionSetSetWorldWindNavigator(setKey, worldWindNavigator));
    }
  };
};

var deprecated_updateWorldWindNavigator = function deprecated_updateWorldWindNavigator(mapKey, updates) {
  return function (dispatch, getState) {
    var set = _Select["default"]._deprecatedMaps.getMapSetByMapKey(getState(), mapKey);

    var forSet = {};
    var forMap = {};

    if (set && set.sync) {
      forSet = _lodash["default"].pickBy(updates, function (updateVal, updateKey) {
        if (updateKey === 'lookAtLocation') {
          return set.sync['location'];
        } else {
          return set.sync[updateKey];
        }
      });
      forMap = _lodash["default"].omitBy(updates, function (updateVal, updateKey) {
        if (updateKey === 'lookAtLocation') {
          return set.sync['location'];
        } else {
          return set.sync[updateKey];
        }
      });
    } else {
      forMap = updates;
    }

    if (forSet && !_lodash["default"].isEmpty(forSet)) {
      //check data integrity
      forSet = deprecated_checkWorldWindNavigatorIntegrity(forSet); //TODO test

      dispatch(deprecated_actionUpdateSetWorldWindNavigator(set.key, forSet));
    }

    if (forMap && !_lodash["default"].isEmpty(forMap)) {
      //check data integrity
      forMap = deprecated_checkWorldWindNavigatorIntegrity(forMap); //TODO test

      dispatch(deprecated_actionUpdateMapWorldWindNavigator(mapKey, forMap));
    }
  };
};

var deprecated_resetWorldWindNavigatorHeading = function deprecated_resetWorldWindNavigatorHeading(mapKey, defaultIncrement) {
  return function (dispatch, getState) {
    var mapNavigator = _Select["default"]._deprecatedMaps.getNavigator_deprecated(getState(), mapKey);

    var headingIncrement = 1.0;

    if (Math.abs(mapNavigator.heading) > 60) {
      headingIncrement = 2.0;
    } else if (Math.abs(mapNavigator.heading) > 120) {
      headingIncrement = 3.0;
    } //set shortest direction based on angle


    if (mapNavigator.heading > 0 && mapNavigator.heading < 180 || mapNavigator.heading < 0 && mapNavigator.heading < -180) {
      headingIncrement = -headingIncrement;
    }

    headingIncrement = defaultIncrement || headingIncrement;
    setTimeout(function () {
      var finalHeading;

      if (Math.abs(mapNavigator.heading) > Math.abs(headingIncrement)) {
        finalHeading = mapNavigator.heading + headingIncrement;
        dispatch(deprecated_updateWorldWindNavigator(mapKey, {
          heading: finalHeading
        }));
        dispatch(deprecated_resetWorldWindNavigatorHeading(mapKey, headingIncrement));
      } else {
        finalHeading = 0;
        dispatch(deprecated_updateWorldWindNavigator(mapKey, {
          heading: finalHeading
        }));
      }
    }, 20);
  };
};
/* ==================================================
 * ACTIONS
 * ================================================== */


var actionSetActiveMapKey = function actionSetActiveMapKey(mapKey) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET_ACTIVE_MAP_KEY,
    mapKey: mapKey
  };
};

var actionSetMapSetActiveMapKey = function actionSetMapSetActiveMapKey(setKey, mapKey) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.SET_ACTIVE_MAP_KEY,
    mapKey: mapKey,
    setKey: setKey
  };
};

var actionSetActiveSetKey = function actionSetActiveSetKey(setKey) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET_ACTIVE_SET_KEY,
    setKey: setKey
  };
};

var actionAddSet = function actionAddSet(set) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.ADD,
    set: set
  };
};

var actionRemoveSet = function actionRemoveSet(setKey) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.REMOVE,
    setKey: setKey
  };
};

var actionAddMapToSet = function actionAddMapToSet(setKey, mapKey) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.ADD_MAP,
    setKey: setKey,
    mapKey: mapKey
  };
};

var actionRemoveMapKeyFromSet = function actionRemoveMapKeyFromSet(setKey, mapKey) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.REMOVE_MAP,
    setKey: setKey,
    mapKey: mapKey
  };
};

var actionSetSetView = function actionSetSetView(setKey, view) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.VIEW.SET,
    setKey: setKey,
    view: view
  };
};

var actionUpdateSetView = function actionUpdateSetView(setKey, update) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.VIEW.UPDATE,
    setKey: setKey,
    update: update
  };
};

var actionSetSetSync = function actionSetSetSync(setKey, sync) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.SET_SYNC,
    setKey: setKey,
    sync: sync
  };
};

var actionSetSetMaps = function actionSetSetMaps(setKey, maps) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.SET_MAPS,
    setKey: setKey,
    maps: maps
  };
};

var actionAddMap = function actionAddMap(map) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.MAP.ADD,
    map: map
  };
};

var actionRemoveMap = function actionRemoveMap(mapKey) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.MAP.REMOVE,
    mapKey: mapKey
  };
};

var actionSetMapName = function actionSetMapName(mapKey, name) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.MAP.SET_NAME,
    mapKey: mapKey,
    name: name
  };
};

var actionSetMapData = function actionSetMapData(mapKey, data) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.MAP.SET_DATA,
    mapKey: mapKey,
    data: data
  };
};

var actionSetMapView = function actionSetMapView(mapKey, view) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.MAP.VIEW.SET,
    mapKey: mapKey,
    view: view
  };
};

var actionUpdateMapView = function actionUpdateMapView(mapKey, update) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.MAP.VIEW.UPDATE,
    mapKey: mapKey,
    update: update
  };
};

var actionAddLayer = function actionAddLayer(mapKey, layer, index) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.LAYER.ADD,
    mapKey: mapKey,
    layer: layer,
    index: index
  };
};

var actionRemoveLayer = function actionRemoveLayer(mapKey, layerKey) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.LAYER.REMOVE,
    mapKey: mapKey,
    layerKey: layerKey
  };
};

var actionSetLayerIndex = function actionSetLayerIndex(mapKey, layerKey, index) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.LAYER.SET_INDEX,
    mapKey: mapKey,
    layerKey: layerKey,
    index: index
  };
};

var actionUpdateMapLayer = function actionUpdateMapLayer(mapKey, layerKey, layer) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.LAYER.UPDATE,
    mapKey: mapKey,
    layerKey: layerKey,
    layer: layer
  };
};

var actionSetMapLayer = function actionSetMapLayer(mapKey, layerKey, layer) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.LAYER.SET,
    mapKey: mapKey,
    layerKey: layerKey,
    layer: layer
  };
};

var actionSetMapLayerStyle = function actionSetMapLayerStyle(mapKey, layerKey, style) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.MAP.LAYERS.SET.STYLE,
    mapKey: mapKey,
    layerKey: layerKey,
    style: style
  };
};

var actionSetMapLayerHoveredFeatureKeys = function actionSetMapLayerHoveredFeatureKeys(mapKey, layerKey, hoveredFeatureKeys) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.MAP.LAYERS.SET.HOVERED_FEATURE_KEYS,
    mapKey: mapKey,
    layerKey: layerKey,
    hoveredFeatureKeys: hoveredFeatureKeys
  };
};

var actionSetMapLayerSelection = function actionSetMapLayerSelection(mapKey, layerKey, selectionKey) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.MAP.LAYERS.SET.SELECTION,
    mapKey: mapKey,
    layerKey: layerKey,
    selectionKey: selectionKey
  };
};

var actionClearSelectionInAllLayers = function actionClearSelectionInAllLayers(mapKey, selectionKey) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.MAP.LAYERS.CLEAR.SELECTION,
    mapKey: mapKey,
    selectionKey: selectionKey
  };
};

var actionSetMapBackgroundLayer = function actionSetMapBackgroundLayer(mapKey, backgroundLayer) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET_BACKGROUND_LAYER,
    mapKey: mapKey,
    backgroundLayer: backgroundLayer
  };
};

var actionSetSetBackgroundLayer = function actionSetSetBackgroundLayer(setKey, backgroundLayer) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.SET_BACKGROUND_LAYER,
    setKey: setKey,
    backgroundLayer: backgroundLayer
  };
};

var actionSetSetLayers = function actionSetSetLayers(setKey, layers) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.SET_LAYERS,
    setKey: setKey,
    layers: layers
  };
};

var actionSetMapLayers = function actionSetMapLayers(mapKey, layers) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.SET,
    mapKey: mapKey,
    layers: layers
  };
};

var actionSetMapCase = function actionSetMapCase(mapKey, caseKey) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET_CASE,
    mapKey: mapKey,
    "case": caseKey
  };
};

var actionSetMapScope = function actionSetMapScope(mapKey, scope) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET_SCOPE,
    mapKey: mapKey,
    scope: scope
  };
};

var actionSetMapScenario = function actionSetMapScenario(mapKey, scenario) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET_SCENARIO,
    mapKey: mapKey,
    scenario: scenario
  };
};

var actionSetMapPlace = function actionSetMapPlace(mapKey, place) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET_PLACE,
    mapKey: mapKey,
    place: place
  };
};

var actionSetMapPeriod = function actionSetMapPeriod(mapKey, period) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET_PERIOD,
    mapKey: mapKey,
    period: period
  };
};

var actionUpdate = function actionUpdate(data) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.UPDATE,
    data: data
  };
};
/* ==================================================
 * DEPRECATED ACTIONS
 * ================================================== */


var deprecated_actionSetSetWorldWindNavigator = function deprecated_actionSetSetWorldWindNavigator(setKey, worldWindNavigator) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.WORLD_WIND_NAVIGATOR.SET,
    setKey: setKey,
    worldWindNavigator: worldWindNavigator
  };
};

var deprecated_actionUpdateSetWorldWindNavigator = function deprecated_actionUpdateSetWorldWindNavigator(setKey, worldWindNavigator) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.SET.WORLD_WIND_NAVIGATOR.UPDATE,
    setKey: setKey,
    worldWindNavigator: worldWindNavigator
  };
};

var deprecated_actionSetMapWorldWindNavigator = function deprecated_actionSetMapWorldWindNavigator(mapKey, worldWindNavigator) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.MAP.WORLD_WIND_NAVIGATOR.SET,
    mapKey: mapKey,
    worldWindNavigator: worldWindNavigator
  };
};

var deprecated_actionUpdateMapWorldWindNavigator = function deprecated_actionUpdateMapWorldWindNavigator(mapKey, worldWindNavigator) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_MAPS.MAP.WORLD_WIND_NAVIGATOR.UPDATE,
    mapKey: mapKey,
    worldWindNavigator: worldWindNavigator
  };
}; // ============ export ===========
// TODO better naming


var _default = {
  addLayer: addLayer,
  addLayers: addLayers,
  addLayersToMaps: addLayersToMaps,
  // TODO ???
  addMap: addMap,
  addMapForPeriod: addMapForPeriod,
  addMapToSet: addMapToSet,
  addSet: addSet,
  goToPlace: goToPlace,
  removeLayer: removeLayer,
  removeLayers: removeLayers,
  removeMap: removeMap,
  removeMapForPeriod: removeMapForPeriod,
  removeMapKeyFromSet: removeMapKeyFromSet,
  removeSet: removeSet,
  resetViewHeading: resetViewHeading,
  setActiveMapKey: setActiveMapKey,
  setActiveSetKey: setActiveSetKey,
  setLayerHoveredFeatureKeys: setLayerHoveredFeatureKeys,
  setLayerSelectedFeatureKeys: setLayerSelectedFeatureKeys,
  setLayerIndex: setLayerIndex,
  setMapBackgroundLayer: setMapBackgroundLayer,
  setMapCase: setMapCase,
  setMapData: setMapData,
  setMapLayer: setMapLayer,
  setMapLayerStyle: setMapLayerStyle,
  setMapLayers: setMapLayers,
  setMapName: setMapName,
  setMapPeriod: setMapPeriod,
  setMapPlace: setMapPlace,
  setMapScenario: setMapScenario,
  setMapScope: setMapScope,
  setMapView: setMapView,
  setMapSetActiveMapKey: setMapSetActiveMapKey,
  setSetBackgroundLayer: setSetBackgroundLayer,
  setSetLayers: setSetLayers,
  setSetSync: setSetSync,
  setSetView: setSetView,
  setInitial: setInitial,
  updateMapLayer: updateMapLayer,
  updateStateFromView: updateStateFromView,
  updateMapAndSetView: updateMapAndSetView,
  updateSetView: updateSetView,
  use: use,
  useClear: useClear,
  // Deprecated
  deprecated_resetWorldWindNavigatorHeading: deprecated_resetWorldWindNavigatorHeading,
  deprecated_setMapWorldWindNavigator: deprecated_setMapWorldWindNavigator,
  deprecated_setSetWorldWindNavigator: deprecated_setSetWorldWindNavigator,
  deprecated_updateWorldWindNavigator: deprecated_updateWorldWindNavigator,
  deprecated_use: deprecated_use,
  deprecated_useClear: deprecated_useClear
};
exports["default"] = _default;