"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

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
  key: null
};
/**
 * @param state
 * @param action
 * @param action.key {string}
 * @return {Object}
 */

var setKey = function setKey(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    key: action.key
  });
};

var setBaseUrl = function setBaseUrl(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    baseUrl: action.url
  });
};

var setLocalConfiguration = function setLocalConfiguration(state, action) {
  var path = action.path.split('.');
  return _objectSpread(_objectSpread({}, state), {}, {
    localConfiguration: setHelper(state.localConfiguration, path, action.value)
  });
};

var updateLocalConfiguration = function updateLocalConfiguration(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    localConfiguration: state.localConfiguration ? _objectSpread(_objectSpread({}, state.localConfiguration), action.update) : action.update
  });
};

function setHelper(state, path, value) {
  var remainingPath = _toConsumableArray(path);

  var currentKey = remainingPath.shift();

  if (remainingPath.length) {
    return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, currentKey, setHelper(state[currentKey], remainingPath, value)));
  } else {
    return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, currentKey, value));
  }
}

var receiveConfiguration = function receiveConfiguration(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    configuration: action.configuration
  });
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"].APP.SET_BASE_URL:
      return setBaseUrl(state, action);

    case _ActionTypes["default"].APP.SET_KEY:
      return setKey(state, action);

    case _ActionTypes["default"].APP.SET_LOCAL_CONFIGURATION:
      return setLocalConfiguration(state, action);

    case _ActionTypes["default"].APP.UPDATE_LOCAL_CONFIGURATION:
      return updateLocalConfiguration(state, action);

    case _ActionTypes["default"].APP.RECEIVE_CONFIGURATION:
      return receiveConfiguration(state, action);

    default:
      return state;
  }
};

exports["default"] = _default;