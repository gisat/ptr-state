"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _Select = _interopRequireDefault(require("../Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ============ creators ===========
// TODO add or update
function addOrOpen(setKey, windowKey, settings, component, props) {
  return function (dispatch, getState) {
    var existingWindow = _Select["default"].windows.getWindow(getState(), windowKey);

    if (existingWindow) {
      dispatch(actionOpen(setKey, windowKey));
    } else {
      dispatch(actionAdd(setKey, windowKey, 'open', settings, component, props));
    }
  };
}

function updateSettings(windowKey, settings) {
  return function (dispatch, getState) {
    var window = _Select["default"].windows.getWindow(getState(), windowKey);

    var updatedData = _objectSpread(_objectSpread({}, window.data), {}, {
      settings: _objectSpread(_objectSpread({}, window.data.settings), settings)
    });

    dispatch(actionUpdate(windowKey, updatedData));
  };
} // ============ actions ===========


var actionAdd = function actionAdd(setKey, windowKey, state, settings, component, props) {
  return {
    type: _ActionTypes["default"].WINDOWS.ADD,
    setKey: setKey,
    windowKey: windowKey,
    state: state,
    settings: settings,
    component: component,
    props: props
  };
};

var actionOpen = function actionOpen(setKey, windowKey) {
  return {
    type: _ActionTypes["default"].WINDOWS.OPEN,
    setKey: setKey,
    windowKey: windowKey
  };
};

var actionRemove = function actionRemove(setKey, windowKey) {
  return {
    type: _ActionTypes["default"].WINDOWS.REMOVE,
    setKey: setKey,
    windowKey: windowKey
  };
};

var actionTopWindow = function actionTopWindow(setKey, windowKey) {
  return {
    type: _ActionTypes["default"].WINDOWS.TOP,
    setKey: setKey,
    windowKey: windowKey
  };
};

var actionUpdate = function actionUpdate(windowKey, data) {
  return {
    type: _ActionTypes["default"].WINDOWS.UPDATE,
    windowKey: windowKey,
    data: data
  };
}; // ============ export ===========


var _default = {
  addOrOpen: addOrOpen,
  remove: actionRemove,
  topWindow: actionTopWindow,
  updateSettings: updateSettings
};
exports["default"] = _default;