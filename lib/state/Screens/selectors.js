"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllScreensAsObject = function getAllScreensAsObject(state) {
  return state.screens.screens;
};

var getAllSetsAsObject = function getAllSetsAsObject(state) {
  return state.screens.sets;
};
/**
 * @param state {Object}
 * @param key {string} set key
 */


var getSetByKey = (0, _reselect.createSelector)([getAllSetsAsObject, function (state, key) {
  return key;
}],
/**
 * @param sets {Object} all sets as object
 * @param key {string} set key
 * @return {Object | null} selected object
 */
function (sets, key) {
  if (sets && !_lodash["default"].isEmpty(sets) && key && sets[key]) {
    return sets[key];
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param key {string} set key
 */

var getScreensBySetKey = (0, _reselect.createSelector)([getSetByKey, getAllScreensAsObject],
/**
 * @param set {Object} set
 * @param screens {Object} all screens as object
 * @return {null | Object} selected screen
 */
function (set, screens) {
  if (set) {
    var setScreens = {};

    _lodash["default"].each(set.orderBySpace, function (lineage) {
      setScreens[lineage] = screens[lineage];
    });

    return setScreens;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param screenLineage {string}
 */

var getSetKeyByScreenLineage = (0, _reselect.createSelector)([getAllSetsAsObject, function (state, screenLineage) {
  return screenLineage;
}],
/**
 * @param sets {Object} all sets as object
 * @param lineage {string}
 * @return {string | null} screen set key
 */
function (sets, lineage) {
  var setKey = null;

  _lodash["default"].forIn(sets, function (value, key) {
    if (_lodash["default"].includes(value.orderByHistory, lineage)) {
      setKey = key;
    }
  });

  return setKey;
});
/**
 * @param state {Object}
 * @param screenLineage {string}
 */

var getScreenByLineage = (0, _reselect.createSelector)([getAllScreensAsObject, function (state, lineage) {
  return lineage;
}],
/**
 * @param screens {object} all screens as object
 * @param lineage {string}
 * @return {Object | null} screen
 */
function (screens, lineage) {
  if (screens && !_lodash["default"].isEmpty(screens) && lineage && screens[lineage]) {
    return screens[lineage];
  } else {
    return null;
  }
});
var _default = {
  getScreenByLineage: getScreenByLineage,
  getScreensBySetKey: getScreensBySetKey,
  getSetByKey: getSetByKey,
  getSetKeyByScreenLineage: getSetKeyByScreenLineage
};
exports["default"] = _default;