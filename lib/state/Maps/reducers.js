"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = tasksReducer;
exports.INITIAL_STATE = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _ptrUtils = require("@gisatcz/ptr-utils");

var _lodash = require("lodash");

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

var INITIAL_STATE = {
  activeSetKey: null,
  activeMapKey: null,
  inUse: {
    maps: [],
    sets: []
  },
  maps: {},
  sets: {}
};
exports.INITIAL_STATE = INITIAL_STATE;

var removeMapFromSet = function removeMapFromSet(state, setKey, mapKey) {
  if (setKey && mapKey) {
    var _state$sets$setKey;

    var index = (0, _lodash.indexOf)((_state$sets$setKey = state.sets[setKey]) === null || _state$sets$setKey === void 0 ? void 0 : _state$sets$setKey.maps, mapKey);

    if (index > -1) {
      var updatedMaps = _ptrUtils.stateManagement.removeItemByIndex(state.sets[setKey].maps, index);

      return _objectSpread(_objectSpread({}, state), {}, {
        sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, state.sets[setKey]), {}, {
          maps: updatedMaps
        })))
      });
    } else {
      return state;
    }
  } else {
    return state;
  }
};
/**
 * Set styleKey to the specific layer of the specific map
 * @param state {Object}
 * @param mapKey {string}
 * @param layerKey {string}
 * @param styleKey {string} uuid
 * @return {Object} state
 */


var setMapLayerStyleKey = function setMapLayerStyleKey(state, mapKey, layerKey, styleKey) {
  var _state$maps$mapKey, _state$maps$mapKey$da;

  var layers = (_state$maps$mapKey = state.maps[mapKey]) === null || _state$maps$mapKey === void 0 ? void 0 : (_state$maps$mapKey$da = _state$maps$mapKey.data) === null || _state$maps$mapKey$da === void 0 ? void 0 : _state$maps$mapKey$da.layers;

  if (layers) {
    var updatedLayers = layers.map(function (item) {
      if (item.key === layerKey) {
        return _objectSpread(_objectSpread({}, item), {}, {
          styleKey: styleKey
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
/**
 * Set map width and height
 * @param state {Object}
 * @param mapKey {string}
 * @param width {number} map width in px
 * @param height {number} map height in px
 * @return {Object} state
 */


var setMapViewport = function setMapViewport(state, mapKey, width, height) {
  if (mapKey && width && height) {
    return _objectSpread(_objectSpread({}, state), {}, {
      maps: _objectSpread(_objectSpread({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread(_objectSpread({}, state.maps[mapKey]), {}, {
        data: _objectSpread(_objectSpread({}, state.maps[mapKey].data), {}, {
          viewport: {
            width: width,
            height: height
          }
        })
      })))
    });
  } else {
    return state;
  }
};
/**
 * Set active map of the map set
 * @param state {Object}
 * @param setKey {string}
 * @param mapKey {string}
 * @return {Object} state
 */


var setSetActiveMapKey = function setSetActiveMapKey(state, setKey, mapKey) {
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, state.sets[setKey]), {}, {
      activeMapKey: mapKey
    })))
  });
};
/**
 * Set map set background layer state
 * @param state {Object}
 * @param setKey {string}
 * @param backgroundLayer {Object} background layer state
 * @return {Object} state
 */


var setSetBackgroundLayer = function setSetBackgroundLayer(state, setKey, backgroundLayer) {
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread(_objectSpread({}, state.sets[setKey]), {}, {
      data: _objectSpread(_objectSpread({}, state.sets[setKey].data), {}, {
        backgroundLayer: backgroundLayer
      })
    })))
  });
};
/**
 * Update whole map state
 * @param state {Object}
 * @param data {Object}
 * @return {Object}
 */


var update = function update(state, data) {
  return _objectSpread(_objectSpread({}, state), data);
};
/**
 * Update map view
 * @param state {Object}
 * @param mapKey {string}
 * @param updates {Object} map view updates
 * @return {Object} state
 */


var updateMapView = function updateMapView(state, mapKey, updates) {
  if (updates && !(0, _lodash.isEmpty)(updates)) {
    return _objectSpread(_objectSpread({}, state), {}, {
      maps: _objectSpread(_objectSpread({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread(_objectSpread({}, state.maps[mapKey]), {}, {
        data: _objectSpread(_objectSpread({}, state.maps[mapKey].data), {}, {
          view: state.maps[mapKey].data.view ? _objectSpread(_objectSpread({}, state.maps[mapKey].data.view), updates) : updates
        })
      })))
    });
  } else {
    return state;
  }
};
/**
 * Update map set view
 * @param state {Object}
 * @param setKey {string}
 * @param updates {Object} map view updates
 * @return {Object} state
 */


var updateSetView = function updateSetView(state, setKey, updates) {
  if (updates && !(0, _lodash.isEmpty)(updates)) {
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
 * Remove map usage
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} state
 */


var mapUseClear = function mapUseClear(state, mapKey) {
  if (mapKey) {
    var index = (0, _lodash.indexOf)(state.inUse.maps, mapKey);

    if (index > -1) {
      var updatedInUse = _ptrUtils.stateManagement.removeItemByIndex(state.inUse.maps, index);

      return _objectSpread(_objectSpread({}, state), {}, {
        inUse: _objectSpread(_objectSpread({}, state.inUse), {}, {
          maps: updatedInUse
        })
      });
    } else {
      return state;
    }
  } else {
    return state;
  }
};
/**
 * Remove map set usage
 * @param state {Object}
 * @param mapSetKey {string}
 * @return {Object} state
 */


var mapSetUseClear = function mapSetUseClear(state, mapSetKey) {
  if (mapSetKey) {
    var index = (0, _lodash.indexOf)(state.inUse.sets, mapSetKey);

    if (index > -1) {
      var updatedInUse = _ptrUtils.stateManagement.removeItemByIndex(state.inUse.sets, index);

      return _objectSpread(_objectSpread({}, state), {}, {
        inUse: _objectSpread(_objectSpread({}, state.inUse), {}, {
          sets: updatedInUse
        })
      });
    } else {
      return state;
    }
  } else {
    return state;
  }
};
/**
 * Register map usage
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} state
 */


var mapUseRegister = function mapUseRegister(state, mapKey) {
  if (mapKey) {
    return _objectSpread(_objectSpread({}, state), {}, {
      inUse: _objectSpread(_objectSpread({}, state.inUse), {}, {
        maps: [].concat(_toConsumableArray(state.inUse.maps), [mapKey])
      })
    });
  } else {
    return state;
  }
};
/**
 * Register map set usage
 * @param state {Object}
 * @param mapSetKey {string}
 * @return {Object} state
 */


var mapSetUseRegister = function mapSetUseRegister(state, mapSetKey) {
  if (mapSetKey) {
    return _objectSpread(_objectSpread({}, state), {}, {
      inUse: _objectSpread(_objectSpread({}, state.inUse), {}, {
        sets: [].concat(_toConsumableArray(state.inUse.sets), [mapSetKey])
      })
    });
  } else {
    return state;
  }
};

function tasksReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"].MAPS.MAP.LAYERS.SET_STYLE_KEY:
      return setMapLayerStyleKey(state, action.mapKey, action.layerKey, action.styleKey);

    case _ActionTypes["default"].MAPS.MAP.USE.CLEAR:
      return mapUseClear(state, action.mapKey);

    case _ActionTypes["default"].MAPS.MAP.USE.REGISTER:
      return mapUseRegister(state, action.mapKey);

    case _ActionTypes["default"].MAPS.MAP.VIEW.UPDATE:
      return updateMapView(state, action.mapKey, action.update);

    case _ActionTypes["default"].MAPS.MAP.VIEWPORT.SET:
      return setMapViewport(state, action.mapKey, action.width, action.height);

    case _ActionTypes["default"].MAPS.SET.REMOVE_MAP:
      return removeMapFromSet(state, action.setKey, action.mapKey);

    case _ActionTypes["default"].MAPS.SET.SET_ACTIVE_MAP_KEY:
      return setSetActiveMapKey(state, action.setKey, action.mapKey);

    case _ActionTypes["default"].MAPS.SET.SET_BACKGROUND_LAYER:
      return setSetBackgroundLayer(state, action.setKey, action.backgroundLayer);

    case _ActionTypes["default"].MAPS.SET.USE.CLEAR:
      return mapSetUseClear(state, action.mapSetKey);

    case _ActionTypes["default"].MAPS.SET.USE.REGISTER:
      return mapSetUseRegister(state, action.mapSetKey);

    case _ActionTypes["default"].MAPS.SET.VIEW.UPDATE:
      return updateSetView(state, action.setKey, action.update);

    case _ActionTypes["default"].MAPS.UPDATE:
      return update(state, action.data);

    default:
      return state;
  }
}