"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _recompute = require("@jvitela/recompute");

var _lodash = require("lodash");

var getAllByKey = function getAllByKey(state) {
  return state.components;
};

var getAllByKeyObserver = (0, _recompute.createObserver)(getAllByKey);
/**
 * @param state {Object}
 * @param componentKey {string}
 * @return {Object} component data
 */

var getByComponentKey = (0, _reselect.createSelector)([getAllByKey, function (state, key) {
  return key;
}], function (components, key) {
  if (components && key && components[key]) {
    return components[key];
  } else {
    return null;
  }
});
/**
 * @param componentKey {string}
 * @return {Object} component data
 */

var getByComponentKey_recompute = (0, _recompute.createSelector)(function (componentKey) {
  if (componentKey) {
    var components = getAllByKeyObserver();

    if (!(0, _lodash.isEmpty)(components)) {
      return components[componentKey] || null;
    } else {
      return null;
    }
  } else {
    return null;
  }
});
/**
 * Get value from given path
 * @param state {Object}
 * @param componentKey {string}
 * @param path {string}
 * @return {*} value
 */

var get = (0, _reselect.createSelector)([getByComponentKey, function (state, key, path) {
  return path;
}], function (componentState, path) {
  return (0, _lodash.get)(componentState, path, null);
});
var _default = {
  get: get,
  getAllByKeyObserver: getAllByKeyObserver,
  getByComponentKey: getByComponentKey,
  getByComponentKey_recompute: getByComponentKey_recompute,
  getStateToSave: getAllByKey,
  getSubstate: getAllByKey
};
exports["default"] = _default;