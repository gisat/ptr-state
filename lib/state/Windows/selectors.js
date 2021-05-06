"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllSetsAsObject = function getAllSetsAsObject(state) {
  return state.windows.sets;
};

var getAllWindowsAsObject = function getAllWindowsAsObject(state) {
  return state.windows.windows;
};

var getSetByKey = (0, _reselect.createSelector)([getAllSetsAsObject, function (state, key) {
  return key;
}], function (sets, key) {
  return sets && sets[key];
});
var getWindow = (0, _reselect.createSelector)([getAllWindowsAsObject, function (state, key) {
  return key;
}], function (windows, key) {
  return windows && windows[key];
});
var getWindowsBySetKeyAsObject = (0, _reselect.createSelector)([getSetByKey, getAllWindowsAsObject], function (set, windows) {
  if (set && set.orderByHistory && set.orderByHistory.length) {
    var setWindows = {};

    _lodash["default"].each(set.orderByHistory, function (key) {
      setWindows[key] = windows[key];
    });

    return setWindows;
  } else {
    return null;
  }
});
var isOpen = (0, _reselect.createSelector)([getWindow], function (window) {
  return window && window.data && window.data.state === 'open';
});
var _default = {
  getSetByKey: getSetByKey,
  getWindow: getWindow,
  getWindowsBySetKeyAsObject: getWindowsBySetKeyAsObject,
  isOpen: isOpen
};
exports["default"] = _default;