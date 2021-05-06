"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _lodash = _interopRequireDefault(require("lodash"));

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
  screens: {},
  sets: {}
};
var INITIAL_SET_STATE = {
  orderByHistory: [],
  orderBySpace: []
};
var INITIAL_SCREEN_DATA = {
  width: null,
  minActiveWidth: null,
  desiredState: 'open' //open/retracted/closing

};

var add = function add(state, action) {
  var screens = _objectSpread({}, state.screens);

  screens[action.lineage] = {
    lineage: action.lineage,
    data: _objectSpread(_objectSpread({}, INITIAL_SCREEN_DATA), action.data)
  };

  var sets = _objectSpread({}, state.sets);

  sets[action.setKey] = _objectSpread(_objectSpread({}, INITIAL_SET_STATE), sets[action.setKey]);
  sets[action.setKey].orderBySpace = [].concat(_toConsumableArray(sets[action.setKey].orderBySpace), [action.lineage]);
  sets[action.setKey].orderByHistory = [].concat(_toConsumableArray(sets[action.setKey].orderByHistory), [action.lineage]);
  return _objectSpread(_objectSpread({}, state), {}, {
    screens: screens,
    sets: sets
  });
};

var addSet = function addSet(state, action) {
  var sets = _objectSpread({}, state.sets);

  sets[action.setKey] = _objectSpread({}, INITIAL_SET_STATE);
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: sets
  });
};

var close = function close(state, action) {
  var screens = _objectSpread({}, state.screens);

  screens[action.lineage] = {
    lineage: action.lineage,
    data: _objectSpread(_objectSpread({}, screens[action.lineage].data), {}, {
      desiredState: 'closing'
    })
  };
  return _objectSpread(_objectSpread({}, state), {}, {
    screens: screens
  });
};

var open = function open(state, action) {
  var screens = _objectSpread({}, state.screens);

  screens[action.lineage] = {
    lineage: action.lineage,
    data: _objectSpread(_objectSpread({}, screens[action.lineage].data), {}, {
      desiredState: 'open'
    })
  };
  return _objectSpread(_objectSpread({}, state), {}, {
    screens: screens
  });
};

var remove = function remove(state, action) {
  var sets = _objectSpread({}, state.sets);

  var orderByHistory = _lodash["default"].without(_toConsumableArray(sets[action.setKey].orderByHistory), action.lineage);

  var orderBySpace = _lodash["default"].without(_toConsumableArray(sets[action.setKey].orderBySpace), action.lineage);

  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, sets), {}, _defineProperty({}, action.setKey, {
      orderByHistory: orderByHistory,
      orderBySpace: orderBySpace
    }))
  });
};

var removeAllScreensFromSet = function removeAllScreensFromSet(state, action) {
  var sets = _objectSpread({}, state.sets);

  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, sets), {}, _defineProperty({}, action.setKey, {
      orderByHistory: [],
      orderBySpace: []
    }))
  });
};

var retract = function retract(state, action) {
  var screens = _objectSpread({}, state.screens);

  screens[action.lineage] = {
    lineage: action.lineage,
    data: _objectSpread(_objectSpread({}, screens[action.lineage].data), {}, {
      desiredState: 'retracted'
    })
  };
  return _objectSpread(_objectSpread({}, state), {}, {
    screens: screens
  });
};

var topHistory = function topHistory(state, action) {
  var sets = _objectSpread({}, state.sets);

  var orderByHistory = _lodash["default"].without(_toConsumableArray(sets[action.setKey].orderByHistory), action.lineage);

  orderByHistory.push(action.lineage);
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, sets), {}, _defineProperty({}, action.setKey, _objectSpread(_objectSpread({}, sets[action.setKey]), {}, {
      orderByHistory: orderByHistory
    })))
  });
}; // TODO test properly!


var update = function update(state, action) {
  var screens = _objectSpread({}, state.screens);

  screens[action.lineage] = _objectSpread(_objectSpread({}, screens[action.lineage]), {}, {
    data: _objectSpread(_objectSpread({}, screens[action.lineage].data), action.data)
  });

  var sets = _objectSpread({}, state.sets);

  sets[action.setKey] = _objectSpread(_objectSpread({}, INITIAL_SET_STATE), sets[action.setKey]);

  var orderByHistory = _lodash["default"].without(sets[action.setKey].orderByHistory, action.lineage);

  orderByHistory.push(action.lineage);
  sets[action.setKey].orderByHistory = orderByHistory;

  var alreadyInOrder = _lodash["default"].find(sets[action.setKey].orderBySpace, function (lineage) {
    return lineage === action.lineage;
  });

  if (!alreadyInOrder) {
    var orderBySpace = _lodash["default"].without(sets[action.setKey].orderBySpace, action.lineage);

    orderBySpace.push(action.lineage);
    sets[action.setKey].orderBySpace = orderBySpace;
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    screens: screens,
    sets: sets
  });
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"].SCREENS.ADD:
      return add(state, action);

    case _ActionTypes["default"].SCREENS.CLOSE:
      return close(state, action);

    case _ActionTypes["default"].SCREENS.OPEN:
      return open(state, action);

    case _ActionTypes["default"].SCREENS.REMOVE:
      return remove(state, action);

    case _ActionTypes["default"].SCREENS.REMOVE_ALL:
      return removeAllScreensFromSet(state, action);

    case _ActionTypes["default"].SCREENS.RETRACT:
      return retract(state, action);

    case _ActionTypes["default"].SCREENS.SETS.ADD:
      return addSet(state, action);

    case _ActionTypes["default"].SCREENS.TOP_HISTORY:
      return topHistory(state, action);

    case _ActionTypes["default"].SCREENS.UPDATE:
      return update(state, action);

    default:
      return state;
  }
};

exports["default"] = _default;