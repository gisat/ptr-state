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
  windows: {},
  sets: {}
};
var INITIAL_SET_STATE = {
  orderByHistory: []
};
var INITIAL_WINDOW_STATE = null; // opening/open/closing/closed
// TODO handle sizes in rem

var INITIAL_WINDOW_SETTINGS = {
  minWidth: 100,
  minHeight: 200,
  maxWidth: 500,
  maxHeight: 500,
  width: 200,
  height: 300,
  position: {
    top: 50,
    left: 50
  }
};

var add = function add(state, action) {
  var windows = _objectSpread({}, state.windows);

  windows[action.windowKey] = {
    key: action.windowKey,
    data: {
      state: action.state ? action.state : INITIAL_WINDOW_STATE,
      settings: _objectSpread(_objectSpread({}, INITIAL_WINDOW_SETTINGS), action.settings),
      component: action.component,
      props: action.props
    }
  };

  var sets = _objectSpread({}, state.sets);

  sets[action.setKey] = _objectSpread(_objectSpread({}, INITIAL_SET_STATE), sets[action.setKey]);
  sets[action.setKey].orderByHistory = [].concat(_toConsumableArray(sets[action.setKey].orderByHistory), [action.windowKey]);
  return _objectSpread(_objectSpread({}, state), {}, {
    windows: windows,
    sets: sets
  });
};

var open = function open(state, action) {
  var windows = _objectSpread({}, state.windows);

  windows[action.windowKey] = {
    key: action.windowKey,
    data: _objectSpread(_objectSpread({}, windows[action.windowKey].data), {}, {
      state: 'open'
    })
  };

  var sets = _objectSpread({}, state.sets);

  sets[action.setKey] = _objectSpread(_objectSpread({}, INITIAL_SET_STATE), sets[action.setKey]);
  sets[action.setKey].orderByHistory = [].concat(_toConsumableArray(sets[action.setKey].orderByHistory), [action.windowKey]);
  return _objectSpread(_objectSpread({}, state), {}, {
    windows: windows,
    sets: sets
  });
};

var remove = function remove(state, action) {
  var sets = _objectSpread({}, state.sets);

  if (_lodash["default"].isEmpty(sets) || _lodash["default"].isEmpty(sets[action.setKey]) || !action.windowKey) {
    return state;
  }

  var orderByHistory = _lodash["default"].without(_toConsumableArray(sets[action.setKey].orderByHistory), action.windowKey);

  var windows = _objectSpread({}, state.windows);

  if (windows[action.windowKey]) {
    windows[action.windowKey] = {
      key: action.windowKey,
      data: _objectSpread(_objectSpread({}, windows[action.windowKey].data), {}, {
        state: 'close'
      })
    };
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    windows: windows,
    sets: _objectSpread(_objectSpread({}, sets), {}, _defineProperty({}, action.setKey, {
      orderByHistory: orderByHistory
    }))
  });
};

var top = function top(state, action) {
  var sets = _objectSpread({}, state.sets);

  var orderByHistory = _lodash["default"].without(_toConsumableArray(sets[action.setKey].orderByHistory), action.windowKey);

  orderByHistory.push(action.windowKey);
  return _objectSpread(_objectSpread({}, state), {}, {
    sets: _objectSpread(_objectSpread({}, sets), {}, _defineProperty({}, action.setKey, _objectSpread(_objectSpread({}, sets[action.setKey]), {}, {
      orderByHistory: orderByHistory
    })))
  });
};

var update = function update(state, action) {
  var windows = _objectSpread({}, state.windows);

  windows[action.windowKey] = {
    key: action.windowKey,
    data: _objectSpread(_objectSpread({}, windows[action.windowKey].data), action.data)
  };
  return _objectSpread(_objectSpread({}, state), {}, {
    windows: windows
  });
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"].WINDOWS.ADD:
      return add(state, action);

    case _ActionTypes["default"].WINDOWS.OPEN:
      return open(state, action);

    case _ActionTypes["default"].WINDOWS.REMOVE:
      return remove(state, action);

    case _ActionTypes["default"].WINDOWS.SETS.ADD: // return addSet(state, action);

    case _ActionTypes["default"].WINDOWS.TOP:
      return top(state, action);

    case _ActionTypes["default"].WINDOWS.UPDATE:
      return update(state, action);

    default:
      return state;
  }
};

exports["default"] = _default;