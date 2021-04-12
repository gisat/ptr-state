"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = {
  byKey: null
};

var add = function add(state, action) {
  var _action$data;

  var newData = _objectSpread({}, state.byKey);

  if (action !== null && action !== void 0 && (_action$data = action.data) !== null && _action$data !== void 0 && _action$data.length) {
    action.data.forEach(function (model) {
      newData[model.key] = _objectSpread(_objectSpread({}, newData[model.key]), model);
    });
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    byKey: newData
  });
};

var remove = function remove(state, action) {
  var newData = state.byKey ? _lodash["default"].omit(state.byKey, action.keys) : null;
  return _objectSpread(_objectSpread({}, state), {}, {
    byKey: newData
  });
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"].SNAPSHOTS_ADD:
      return add(state, action);

    case _ActionTypes["default"].SNAPSHOTS_REMOVE:
      return remove(state, action);

    default:
      return state;
  }
};

exports["default"] = _default;