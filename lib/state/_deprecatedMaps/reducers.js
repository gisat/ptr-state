"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = tasksReducer;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _lodash = _interopRequireDefault(require("lodash"));

var _ptrUtils = require("@gisatcz/ptr-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_VIEW = {
  center: {
    lat: 50.1,
    lon: 14.5
  },
  boxRange: 100000,
  roll: 0,
  tilt: 0,
  heading: 0,
  elevationExaggeration: 0
};
var INITIAL_LAYER_STATE = {
  key: null,
  layerTemplate: null,
  style: null,
  opacity: 100
};
var INITIAL_MAP_STATE = {
  key: null,
  name: null,
  data: {
    backgroundLayer: null,
    layers: null,
    metadataModifiers: null,
    worldWindNavigator: null,
    // TODO deprecated
    view: null,
    filterByActive: null
  }
};
var INITIAL_SET_STATE = {
  key: null,
  maps: [],
  sync: {
    location: false,
    // TODO deprecated
    center: false,
    roll: false,
    range: false,
    tilt: false,
    heading: false,
    elevation: false
  },
  data: {
    backgroundLayer: null,
    layers: null,
    metadataModifiers: null,
    worldWindNavigator: null,
    // TODO deprecated
    view: null,
    filterByActive: null
  }
};
var INITIAL_STATE = {
  activeSetKey: null,
  activeMapKey: null,
  maps: {},
  sets: {}
}; // helpers

var getSetByKey = function getSetByKey(state, setKey) {
  return state.sets[setKey];
};

var getMapByKey = function getMapByKey(state, mapKey) {
  return state.maps[mapKey];
}; // reducers


var setInitial = function setInitial() {
  return _objectSpread({}, INITIAL_STATE);
};

var setActiveMapKey = function setActiveMapKey(state, mapKey) {
  return _objectSpread(_objectSpread({}, state), {}, {
    activeMapKey: mapKey
  });
};

var setSetActiveMapKey = function setSetActiveMapKey(state, setKey, mapKey) {
  var setToUpdate = getSetByKey(state, setKey);
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, setToUpdate), {}, {
      activeMapKey: mapKey
    })))
  });
};

var setActiveSetKey = function setActiveSetKey(state, setKey) {
  return _objectSpread(_objectSpread({}, state), {}, {
    activeSetKey: setKey
  });
};

var addSet = function addSet(state, setState) {
  var mergedSetState = _lodash["default"].merge(_lodash["default"].cloneDeep(INITIAL_SET_STATE), setState); //FIXME - může být?


  var newSets = _objectSpread({}, state.sets);

  newSets[mergedSetState.key] = mergedSetState;
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread({}, newSets)
  });
};

var removeSet = function removeSet(state, setKey) {
  var withoutSetKey = _ptrUtils.stateManagement.removeItemByKey(state.sets, setKey);

  return _objectSpread(_objectSpread({}, state), {}, {
    sets: withoutSetKey
  });
};

var setSetSync = function setSetSync(state, setKey, syncData) {
  var setToUpdate = getSetByKey(state, setKey);
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, setToUpdate), {}, {
      sync: _objectSpread(_objectSpread({}, setToUpdate.sync), syncData)
    })))
  });
};

var setSetMaps = function setSetMaps(state, setKey, maps) {
  var setToUpdate = getSetByKey(state, setKey);
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, setToUpdate), {}, {
      maps: maps
    })))
  });
};

var addMapKeyToSet = function addMapKeyToSet(state, setKey, mapKey) {
  var setToUpdate = getSetByKey(state, setKey);
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, setToUpdate), {}, {
      maps: [].concat(_toConsumableArray(setToUpdate.maps), [mapKey])
    })))
  });
};

var removeMapKeyFromSet = function removeMapKeyFromSet(state, setKey, mapKey) {
  var setToUpdate = getSetByKey(state, setKey);
  var mapIndex = setToUpdate.maps.indexOf(mapKey);
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, setToUpdate), {}, {
      maps: _ptrUtils.stateManagement.removeItemByIndex(setToUpdate.maps, mapIndex)
    })))
  });
};

var setSetView = function setSetView(state, setKey) {
  var view = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : INITIAL_VIEW;

  var mergedView = _objectSpread(_objectSpread({}, INITIAL_VIEW), view);

  var setToUpdate = getSetByKey(state, setKey);
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, setToUpdate), {}, {
      data: _objectSpread(_objectSpread({}, setToUpdate.data), {}, {
        view: mergedView
      })
    })))
  });
};

var updateSetView = function updateSetView(state, setKey, updates) {
  if (updates && !_lodash["default"].isEmpty(updates)) {
    return _objectSpread(_objectSpread({}, state), {}, {
      sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, state.sets[setKey]), {}, {
        data: _objectSpread(_objectSpread({}, state.sets[setKey].data), {}, {
          view: state.sets[setKey].data.view ? _objectSpread(_objectSpread({}, state.sets[setKey].data.view), updates) : updates
        })
      })))
    });
  } else {
    return state;
  }
};
/**
 * Add new map state. Rewrite map state if exist.
 * */


var addMap = function addMap(state) {
  var mapState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INITIAL_MAP_STATE;

  var mergedMapState = _lodash["default"].merge(_lodash["default"].cloneDeep(INITIAL_MAP_STATE), mapState);

  return _objectSpread(_objectSpread({}, state), {}, {
    maps: _objectSpread(_objectSpread({}, state.maps), {}, _defineProperty({}, mergedMapState.key, mergedMapState))
  });
};

var removeMap = function removeMap(state, mapKey) {
  var newMaps = _ptrUtils.stateManagement.removeItemByKey(state.maps, mapKey);

  var newMapsState = _objectSpread(_objectSpread({}, state), {}, {
    maps: newMaps
  }); //If mapKey is in sets, then remove it from each


  for (var _i = 0, _Object$entries = Object.entries(state.sets); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (value.maps.includes(mapKey)) {
      newMapsState = _objectSpread({}, removeMapKeyFromSet(newMapsState, value.key, mapKey));
    }
  }

  return newMapsState;
};

var setMapName = function setMapName(state, mapKey, name) {
  var mapState = getMapByKey(state, mapKey);
  return _objectSpread(_objectSpread({}, state), {}, {
    maps: _defineProperty({}, mapKey, _objectSpread(_objectSpread({}, mapState), {}, {
      name: name
    }))
  });
};

var setMapLayerHoveredFeatureKeys = function setMapLayerHoveredFeatureKeys(state, mapKey, layerKey, hoveredFeatureKeys) {
  var mapState = getMapByKey(state, mapKey);
  var layerIndex = mapState.data.layers.findIndex(function (l) {
    return l.key === layerKey;
  });

  var layerState = _lodash["default"].find(mapState.data.layers, function (layer) {
    return layer.key === layerKey;
  });

  if (layerState) {
    var newLayerState = _objectSpread(_objectSpread({}, layerState), {}, {
      options: _objectSpread(_objectSpread({}, layerState.options), {}, {
        hovered: layerState.options.hovered ? _objectSpread(_objectSpread({}, layerState.options.hovered), {}, {
          keys: hoveredFeatureKeys
        }) : {
          keys: hoveredFeatureKeys
        }
      })
    });

    var updatedLayers = _ptrUtils.stateManagement.replaceItemOnIndex(mapState.data.layers, layerIndex, newLayerState);

    return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
      data: _objectSpread(_objectSpread({}, mapState.data), {}, {
        layers: updatedLayers
      })
    }));
  } else {
    return state;
  }
};

var setMapLayerSelection = function setMapLayerSelection(state, mapKey, layerKey, selectionKey) {
  var _mapState$data;

  var mapState = getMapByKey(state, mapKey);

  var layerState = _lodash["default"].find(mapState === null || mapState === void 0 ? void 0 : (_mapState$data = mapState.data) === null || _mapState$data === void 0 ? void 0 : _mapState$data.layers, function (layer) {
    return layer.key === layerKey;
  });

  if (layerState) {
    var updatedLayers = mapState.data.layers.map(function (item) {
      if (item.key === layerKey) {
        return _objectSpread(_objectSpread({}, layerState), {}, {
          options: _objectSpread(_objectSpread({}, layerState.options), {}, {
            selected: layerState.options.selected ? _objectSpread(_objectSpread({}, layerState.options.selected), {}, _defineProperty({}, selectionKey, {})) : _defineProperty({}, selectionKey, {})
          })
        });
      } else {
        return item;
      }
    });
    return _objectSpread(_objectSpread({}, state), {}, {
      maps: _objectSpread(_objectSpread({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread(_objectSpread({}, state.maps[mapKey]), {}, {
        data: _objectSpread(_objectSpread({}, state.maps[mapKey].data), {}, {
          layers: updatedLayers
        })
      })))
    });
  } else {
    return state;
  }
};

var setMapLayerStyle = function setMapLayerStyle(state, mapKey, layerKey, style) {
  var _mapState$data2;

  var mapState = getMapByKey(state, mapKey);

  var layerState = _lodash["default"].find(mapState === null || mapState === void 0 ? void 0 : (_mapState$data2 = mapState.data) === null || _mapState$data2 === void 0 ? void 0 : _mapState$data2.layers, function (layer) {
    return layer.key === layerKey;
  });

  if (layerState) {
    var updatedLayers = mapState.data.layers.map(function (item) {
      if (item.key === layerKey) {
        return _objectSpread(_objectSpread({}, layerState), {}, {
          options: _objectSpread(_objectSpread({}, layerState.options), {}, {
            style: style
          })
        });
      } else {
        return item;
      }
    });
    return _objectSpread(_objectSpread({}, state), {}, {
      maps: _objectSpread(_objectSpread({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread(_objectSpread({}, state.maps[mapKey]), {}, {
        data: _objectSpread(_objectSpread({}, state.maps[mapKey].data), {}, {
          layers: updatedLayers
        })
      })))
    });
  } else {
    return state;
  }
};

var clearMapLayersSelection = function clearMapLayersSelection(state, mapKey, selectionKey) {
  var mapState = getMapByKey(state, mapKey);

  var updatedLayers = _lodash["default"].map(_toConsumableArray(mapState.data.layers), function (layer) {
    var _layer$options, _layer$options$select;

    if ((_layer$options = layer.options) !== null && _layer$options !== void 0 && (_layer$options$select = _layer$options.selected) !== null && _layer$options$select !== void 0 && _layer$options$select[selectionKey]) {
      delete layer.options.selected[selectionKey];
    }

    return layer;
  });

  return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
    data: _objectSpread(_objectSpread({}, mapState.data), {}, {
      layers: updatedLayers
    })
  }));
};

var setMap = function setMap(state) {
  var mapState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INITIAL_MAP_STATE;

  var mergedMapState = _lodash["default"].merge(_lodash["default"].cloneDeep(INITIAL_MAP_STATE), mapState); //todo where is this used & is the merge always ok?


  return _objectSpread(_objectSpread({}, state), {}, {
    maps: _objectSpread(_objectSpread({}, state.maps), {}, _defineProperty({}, mergedMapState.key, _objectSpread({}, mergedMapState)))
  });
};

var setMapData = function setMapData(state, mapKey) {
  var mapData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _objectSpread(_objectSpread({}, state), {}, {
    maps: _objectSpread(_objectSpread({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread(_objectSpread({}, state.maps[mapKey]), {}, {
      data: mapData
    })))
  });
};

var setMapView = function setMapView(state, mapKey) {
  var view = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : INITIAL_VIEW;

  var mergedView = _objectSpread(_objectSpread({}, INITIAL_VIEW), view);

  return _objectSpread(_objectSpread({}, state), {}, {
    maps: _objectSpread(_objectSpread({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread(_objectSpread({}, state.maps[mapKey]), {}, {
      data: _objectSpread(_objectSpread({}, state.maps[mapKey].data), {}, {
        view: mergedView
      })
    })))
  });
};

var updateMapView = function updateMapView(state, mapKey, updates) {
  var mergedView = _objectSpread(_objectSpread({}, state.maps[mapKey].data.view), updates);

  return _objectSpread(_objectSpread({}, state), {}, {
    maps: _objectSpread(_objectSpread({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread(_objectSpread({}, state.maps[mapKey]), {}, {
      data: _objectSpread(_objectSpread({}, state.maps[mapKey].data), {}, {
        view: mergedView
      })
    })))
  });
}; //FIXME - define layer state
//FIXME - unique layer by KEY check?

/**
 * 
 * @param {Object} state 
 * @param {string} mapKey 
 * @param {Object} layerState 
 * @param {number} index - position in map
 */


var addLayer = function addLayer(state, mapKey, layerState, index) {
  var _state$maps, _state$maps$mapKey, _state$maps$mapKey$da;

  var layers = (_state$maps = state.maps) === null || _state$maps === void 0 ? void 0 : (_state$maps$mapKey = _state$maps[mapKey]) === null || _state$maps$mapKey === void 0 ? void 0 : (_state$maps$mapKey$da = _state$maps$mapKey.data) === null || _state$maps$mapKey$da === void 0 ? void 0 : _state$maps$mapKey$da.layers;
  var newLayers;

  if (layers) {
    if (index >= -1) {
      newLayers = layers.slice();
      newLayers.splice(index, 0, layerState);
    } else {
      newLayers = [].concat(_toConsumableArray(layers), [layerState]);
    }
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    maps: _objectSpread(_objectSpread({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread(_objectSpread({}, state.maps[mapKey]), {}, {
      data: _objectSpread(_objectSpread({}, state.maps[mapKey].data), {}, {
        layers: layers ? newLayers : [layerState]
      })
    })))
  });
};

var removeLayer = function removeLayer(state, mapKey, layerKey) {
  var _mapState$data3, _mapState$data3$layer;

  var mapState = getMapByKey(state, mapKey);
  var layerIndex = mapState === null || mapState === void 0 ? void 0 : (_mapState$data3 = mapState.data) === null || _mapState$data3 === void 0 ? void 0 : (_mapState$data3$layer = _mapState$data3.layers) === null || _mapState$data3$layer === void 0 ? void 0 : _mapState$data3$layer.findIndex(function (l) {
    return l.key === layerKey;
  });

  if (layerIndex >= 0) {
    var updatedLayers = mapState.data.layers.filter(function (item, index) {
      return index !== layerIndex;
    });
    return _objectSpread(_objectSpread({}, state), {}, {
      maps: _objectSpread(_objectSpread({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread(_objectSpread({}, state.maps[mapKey]), {}, {
        data: _objectSpread(_objectSpread({}, state.maps[mapKey].data), {}, {
          layers: updatedLayers
        })
      })))
    });
  } else {
    return state;
  }
};

var removeLayers = function removeLayers(state, mapKey) {
  var layersKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var newState = _objectSpread({}, state);

  var _iterator = _createForOfIteratorHelper(layersKeys),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var layerKey = _step.value;
      var withoutLayer = removeLayer(newState, mapKey, layerKey);
      newState = _objectSpread(_objectSpread({}, newState), {}, {
        maps: _objectSpread(_objectSpread({}, newState.maps), {}, _defineProperty({}, mapKey, _objectSpread(_objectSpread({}, newState.maps[mapKey]), {}, {
          data: _objectSpread(_objectSpread({}, newState.maps[mapKey].data), {}, {
            layers: _toConsumableArray(withoutLayer.maps[mapKey].data.layers)
          })
        })))
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return newState;
};

var setLayerIndex = function setLayerIndex(state, mapKey, layerKey, index) {
  var mapState = getMapByKey(state, mapKey);
  var layerIndex = mapState.data.layers.findIndex(function (l) {
    return l.key === layerKey;
  });

  var layerState = _objectSpread({}, mapState.data.layers[layerIndex]);

  var withoutLayer = _ptrUtils.stateManagement.removeItemByIndex(mapState.data.layers, layerIndex);

  var onPosition = _ptrUtils.stateManagement.addItemToIndex(withoutLayer, index, layerState);

  return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
    data: _objectSpread(_objectSpread({}, mapState.data), {}, {
      layers: onPosition
    })
  }));
};

var setMapLayer = function setMapLayer(state, mapKey) {
  var layerState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : INITIAL_LAYER_STATE;
  var layerKey = arguments.length > 3 ? arguments[3] : undefined;

  var mergedLayerState = _lodash["default"].merge(_lodash["default"].cloneDeep(INITIAL_LAYER_STATE), layerState); //FIXME - musí se mergnout se stavem


  var mergedLayerStateWithoutKey = _ptrUtils.stateManagement.removeItemByKey(mergedLayerState, 'key');

  mergedLayerStateWithoutKey['key'] = layerKey;
  var mapState = getMapByKey(state, mapKey);
  var layerIndex = mapState.data.layers.findIndex(function (l) {
    return l.key === layerKey;
  });

  if (layerIndex > -1) {
    var updatedLayers = _ptrUtils.stateManagement.replaceItemOnIndex(mapState.data.layers, layerIndex, mergedLayerStateWithoutKey);

    return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
      data: _objectSpread(_objectSpread({}, mapState.data), {}, {
        layers: updatedLayers
      })
    }));
  } else {
    //error - layer not found
    return state;
  }
};

var updateMapLayer = function updateMapLayer(state, mapKey) {
  var layerState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : INITIAL_LAYER_STATE;
  var layerKey = arguments.length > 3 ? arguments[3] : undefined;
  // const mergedLayerState = _.merge(_.cloneDeep(INITIAL_LAYER_STATE), layerState); //FIXME - musí se mergnout se stavem
  var mapState = getMapByKey(state, mapKey);
  var layerIndex = mapState.data.layers.findIndex(function (l) {
    return l.key === layerKey;
  });

  if (layerIndex > -1) {
    layerState['key'] = layerKey;

    var mergedLayerState = _lodash["default"].merge(_lodash["default"].cloneDeep(_objectSpread({}, mapState.data.layers[layerIndex])), layerState);

    var updatedLayers = _ptrUtils.stateManagement.replaceItemOnIndex(mapState.data.layers, layerIndex, mergedLayerState);

    return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
      data: _objectSpread(_objectSpread({}, mapState.data), {}, {
        layers: updatedLayers
      })
    }));
  } else {
    //error - layer not found
    return state;
  }
};

var setMapScope = function setMapScope(state, mapKey, scope) {
  var mapState = getMapByKey(state, mapKey);
  return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
    scope: scope
  }));
};

var setMapPlace = function setMapPlace(state, mapKey, place) {
  var mapState = getMapByKey(state, mapKey);
  return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
    place: place
  }));
};

var setMapScenario = function setMapScenario(state, mapKey, scenario) {
  var mapState = getMapByKey(state, mapKey);
  return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
    scenario: scenario
  }));
};

var setMapCase = function setMapCase(state, mapKey, caseKey) {
  var mapState = getMapByKey(state, mapKey);
  return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
    "case": caseKey
  }));
};

var setMapPeriod = function setMapPeriod(state, mapKey, period) {
  var mapState = getMapByKey(state, mapKey);
  return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
    period: period
  }));
};

var setMapBackgroundLayer = function setMapBackgroundLayer(state, mapKey, backgroundLayer) {
  var mapState = getMapByKey(state, mapKey);
  return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
    data: _objectSpread(_objectSpread({}, mapState.data), {}, {
      backgroundLayer: backgroundLayer
    })
  }));
};

var setMapLayers = function setMapLayers(state, mapKey, layers) {
  var mapState = getMapByKey(state, mapKey);
  return _objectSpread(_objectSpread({}, state), {}, {
    maps: _objectSpread(_objectSpread({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread(_objectSpread({}, mapState), {}, {
      data: _objectSpread(_objectSpread({}, mapState.data), {}, {
        layers: layers
      })
    })))
  });
};

var setSetBackgroundLayer = function setSetBackgroundLayer(state, setKey, backgroundLayer) {
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, state.sets[setKey]), {}, {
      data: _objectSpread(_objectSpread({}, state.sets[setKey].data), {}, {
        backgroundLayer: backgroundLayer
      })
    })))
  });
};

var setSetLayers = function setSetLayers(state, setKey, layers) {
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, state.sets[setKey]), {}, {
      data: _objectSpread(_objectSpread({}, state.sets[setKey].data), {}, {
        layers: layers
      })
    })))
  });
};

var update = function update(state, data) {
  return _objectSpread(_objectSpread({}, state), data);
};
/* =======================================================
   DEPRECATED
========================================================== */


var INITIAL_WORLDWINDNAVIGATOR = {
  lookAtLocation: {
    latitude: 50.1,
    longitude: 14.5
  },
  range: 100000,
  roll: 0,
  tilt: 0,
  heading: 0,
  elevation: 0
};

var deprecated_setSetWorldWindNavigator = function deprecated_setSetWorldWindNavigator(state, setKey) {
  var worldWindNavigator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : INITIAL_WORLDWINDNAVIGATOR;

  var mergedWorldWindNavigator = _lodash["default"].merge(_lodash["default"].cloneDeep(INITIAL_WORLDWINDNAVIGATOR), worldWindNavigator);

  var setToUpdate = getSetByKey(state, setKey);
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, setToUpdate), {}, {
      data: _objectSpread(_objectSpread({}, setToUpdate.data), {}, {
        worldWindNavigator: mergedWorldWindNavigator
      })
    })))
  });
};

var deprecated_setMapWorldWindNavigator = function deprecated_setMapWorldWindNavigator(state, mapKey) {
  var worldWindNavigator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : INITIAL_WORLDWINDNAVIGATOR;

  var mergedWorldWindNavigator = _lodash["default"].merge(_lodash["default"].cloneDeep(INITIAL_WORLDWINDNAVIGATOR), worldWindNavigator);

  var mapState = getMapByKey(state, mapKey);
  return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
    data: _objectSpread(_objectSpread({}, mapState.data), {}, {
      worldWindNavigator: mergedWorldWindNavigator
    })
  }));
};

var deprecated_updateMapWorldWindNavigator = function deprecated_updateMapWorldWindNavigator(state, mapKey, updates) {
  var mapState = getMapByKey(state, mapKey);
  return setMap(state, _objectSpread(_objectSpread({}, mapState), {}, {
    data: _objectSpread(_objectSpread({}, mapState.data), {}, {
      worldWindNavigator: mapState.data.worldWindNavigator ? _objectSpread(_objectSpread({}, mapState.data.worldWindNavigator), updates) : updates
    })
  }));
};

var deprecated_updateSetWorldWindNavigator = function deprecated_updateSetWorldWindNavigator(state, setKey, updates) {
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, state.sets[setKey]), {}, {
      data: _objectSpread(_objectSpread({}, state.sets[setKey].data), {}, {
        worldWindNavigator: state.sets[setKey].data.worldWindNavigator ? _objectSpread(_objectSpread({}, state.sets[setKey].data.worldWindNavigator), updates) : updates
      })
    })))
  });
};

function tasksReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"]._DEPRECATED_MAPS.SET_INITIAL:
      return setInitial();

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET_ACTIVE_MAP_KEY:
      return setActiveMapKey(state, action.mapKey);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET_ACTIVE_SET_KEY:
      return setActiveSetKey(state, action.setKey);
    //TEST

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.ADD:
      return addSet(state, action.set);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.REMOVE:
      return removeSet(state, action.setKey);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.ADD_MAP:
      return addMapKeyToSet(state, action.setKey, action.mapKey);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.REMOVE_MAP:
      return removeMapKeyFromSet(state, action.setKey, action.mapKey);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.SET_BACKGROUND_LAYER:
      return setSetBackgroundLayer(state, action.setKey, action.backgroundLayer);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.SET_LAYERS:
      return setSetLayers(state, action.setKey, action.layers);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.VIEW.SET:
      return setSetView(state, action.setKey, action.view);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.VIEW.UPDATE:
      return updateSetView(state, action.setKey, action.update);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.SET_ACTIVE_MAP_KEY:
      return setSetActiveMapKey(state, action.setKey, action.mapKey);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.SET_MAPS:
      return setSetMaps(state, action.setKey, action.maps);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.SET_SYNC:
      return setSetSync(state, action.setKey, action.sync);

    case _ActionTypes["default"]._DEPRECATED_MAPS.MAP.ADD:
      return addMap(state, action.map);

    case _ActionTypes["default"]._DEPRECATED_MAPS.MAP.LAYERS.SET.HOVERED_FEATURE_KEYS:
      return setMapLayerHoveredFeatureKeys(state, action.mapKey, action.layerKey, action.hoveredFeatureKeys);

    case _ActionTypes["default"]._DEPRECATED_MAPS.MAP.LAYERS.SET.SELECTION:
      return setMapLayerSelection(state, action.mapKey, action.layerKey, action.selectionKey);

    case _ActionTypes["default"]._DEPRECATED_MAPS.MAP.LAYERS.SET.STYLE:
      return setMapLayerStyle(state, action.mapKey, action.layerKey, action.style);

    case _ActionTypes["default"]._DEPRECATED_MAPS.MAP.LAYERS.CLEAR.SELECTION:
      return clearMapLayersSelection(state, action.mapKey, action.selectionKey);

    case _ActionTypes["default"]._DEPRECATED_MAPS.MAP.REMOVE:
      return removeMap(state, action.mapKey);

    case _ActionTypes["default"]._DEPRECATED_MAPS.MAP.SET_NAME:
      return setMapName(state, action.mapKey, action.name);

    case _ActionTypes["default"]._DEPRECATED_MAPS.MAP.SET_DATA:
      return setMapData(state, action.mapKey, action.data);

    case _ActionTypes["default"]._DEPRECATED_MAPS.MAP.VIEW.SET:
      return setMapView(state, action.mapKey, action.view);

    case _ActionTypes["default"]._DEPRECATED_MAPS.MAP.VIEW.UPDATE:
      return updateMapView(state, action.mapKey, action.update);

    case _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.LAYER.ADD:
      return addLayer(state, action.mapKey, action.layer, action.index);

    case _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.LAYER.REMOVE:
      return removeLayer(state, action.mapKey, action.layerKey);

    case _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.REMOVE_LAYERS:
      return removeLayers(state, action.mapKey, action.layersKeys);

    case _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.LAYER.SET_INDEX:
      return setLayerIndex(state, action.mapKey, action.layerKey, action.index);

    case _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.LAYER.UPDATE:
      return updateMapLayer(state, action.mapKey, action.layer, action.layerKey);

    case _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.LAYER.SET:
      return setMapLayer(state, action.mapKey, action.layer, action.layerKey);

    case _ActionTypes["default"]._DEPRECATED_MAPS.LAYERS.SET:
      return setMapLayers(state, action.mapKey, action.layers);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET_SCOPE:
      return setMapScope(state, action.mapKey, action.scope);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET_SCENARIO:
      return setMapScenario(state, action.mapKey, action.scenario);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET_PERIOD:
      return setMapPeriod(state, action.mapKey, action.period);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET_PLACE:
      return setMapPlace(state, action.mapKey, action.place);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET_CASE:
      return setMapCase(state, action.mapKey, action["case"]);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET_BACKGROUND_LAYER:
      return setMapBackgroundLayer(state, action.mapKey, action.backgroundLayer);

    case _ActionTypes["default"]._DEPRECATED_MAPS.UPDATE:
      return update(state, action.data);
    // deprecated

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.WORLD_WIND_NAVIGATOR.SET:
      return deprecated_setSetWorldWindNavigator(state, action.setKey, action.worldWindNavigator);

    case _ActionTypes["default"]._DEPRECATED_MAPS.SET.WORLD_WIND_NAVIGATOR.UPDATE:
      return deprecated_updateSetWorldWindNavigator(state, action.setKey, action.worldWindNavigator);

    case _ActionTypes["default"]._DEPRECATED_MAPS.MAP.WORLD_WIND_NAVIGATOR.SET:
      return deprecated_setMapWorldWindNavigator(state, action.mapKey, action.worldWindNavigator);

    case _ActionTypes["default"]._DEPRECATED_MAPS.MAP.WORLD_WIND_NAVIGATOR.UPDATE:
      return deprecated_updateMapWorldWindNavigator(state, action.mapKey, action.worldWindNavigator);

    default:
      return state;
  }
}