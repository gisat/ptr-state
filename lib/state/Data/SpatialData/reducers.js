"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.INITIAL_STATE = void 0;

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _reducers = require("../../_common/reducers");

var _lodash = _interopRequireDefault(require("lodash"));

var _helpers = _interopRequireDefault(require("../../_common/helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = _objectSpread(_objectSpread({}, _reducers.DEFAULT_INITIAL_STATE), {}, {
  byDataSourceKey: {}
});

exports.INITIAL_STATE = INITIAL_STATE;

var getEmptyFeature = function getEmptyFeature() {
  return {
    geometries: {}
  };
};
/**
 * Add spatial data
 * @param state {Object}
 * @param action {Object}
 * @param action.key {String} Data source key
 * @param action.level {number} Zoom level
 * @param action.data {Object} Features as object
 * @return {Object}
 */


var add = function add(state, action) {
  var dataSourceKey = action.key;
  var updatedDataForDataSourceKey = getUpdatedDataForDataSourceKey(state, dataSourceKey, action.data, action.level);
  return _objectSpread(_objectSpread({}, state), {}, {
    byDataSourceKey: _objectSpread(_objectSpread({}, state.byDataSourceKey), {}, _defineProperty({}, dataSourceKey, updatedDataForDataSourceKey))
  });
};

var addWithIndex = function addWithIndex(state, action) {
  var updatedByDataSourceKey = getUpdatedByDataSourceKey(state, action.dataByDataSourceKey, action.level);

  var updatedIndexes = _helpers["default"].getUpdatedIndexes(state, action.filter, action.order, action.indexData, action.changedOn);

  return _objectSpread(_objectSpread({}, state), {}, {
    byDataSourceKey: updatedByDataSourceKey,
    indexes: updatedIndexes
  });
};

var addIndex = function addIndex(state, action) {
  var updatedIndexes = _helpers["default"].getUpdatedIndexes(state, action.filter, action.order, action.indexData, action.changedOn);

  return _objectSpread(_objectSpread({}, state), {}, {
    indexes: updatedIndexes
  });
};
/**
 * Remove index that fit to filter and order from state.
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */


var removeIndex = function removeIndex(state, action) {
  var updatedIndexes = _helpers["default"].removeIndex(state.indexes, action.filter, action.order);

  return _objectSpread(_objectSpread({}, state), {}, {
    indexes: updatedIndexes
  });
}; // helpers

/**
 * @param state {Object}
 * @param dataSourceKey {string} uuid
 * @param featuresAsObject {Object}
 * @param level {number}
 * @return {Object}
 */


function getUpdatedDataForDataSourceKey(state, dataSourceKey, featuresAsObject, level) {
  // TODO what about features adding without level?
  var dataFeaturesKeys = Object.keys(featuresAsObject);
  var updatedData = state.byDataSourceKey[dataSourceKey] ? _objectSpread({}, state.byDataSourceKey[dataSourceKey]) : {};
  dataFeaturesKeys.forEach(function (featureKey) {
    if (updatedData.hasOwnProperty(featureKey)) {
      //add just level geometry to existing feature
      updatedData[featureKey].geometries[level] = featuresAsObject[featureKey];
    } else {
      //create new feature with geometry and add to state
      var newFeature = getEmptyFeature();
      newFeature.geometries[level] = featuresAsObject[featureKey];
      updatedData = _objectSpread(_objectSpread({}, updatedData), {}, _defineProperty({}, featureKey, _objectSpread({}, newFeature)));
    }
  });
  return updatedData;
}

function getUpdatedByDataSourceKey(state, dataByDataSourceKey, level) {
  var updatedData = _objectSpread({}, state.byDataSourceKey);

  _lodash["default"].forIn(dataByDataSourceKey, function (data, dataSourceKey) {
    if (!updatedData.hasOwnProperty(dataSourceKey)) {
      updatedData[dataSourceKey] = {};
    }

    var newFeatures = {};

    _lodash["default"].forIn(data, function (geometry, featureKey) {
      var existingFeature = updatedData[dataSourceKey].hasOwnProperty(featureKey);

      if (existingFeature) {
        //add just level geometry to existing feature
        updatedData[dataSourceKey][featureKey].geometries[level] = geometry;
      } else {
        //create new feature with geometry and add to state
        var newFeature = getEmptyFeature();
        newFeature.geometries[level] = geometry;
        newFeatures[featureKey] = newFeature;
      }
    });

    updatedData[dataSourceKey] = _objectSpread(_objectSpread({}, updatedData[dataSourceKey]), newFeatures);
  });

  return updatedData;
}

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"].DATA.SPATIAL_DATA.ADD:
      return add(state, action);

    case _ActionTypes["default"].DATA.SPATIAL_DATA.ADD_WITH_INDEX:
      return addWithIndex(state, action);

    case _ActionTypes["default"].DATA.SPATIAL_DATA.INDEX.ADD:
      return addIndex(state, action);

    case _ActionTypes["default"].DATA.SPATIAL_DATA.INDEX.REMOVE:
      return removeIndex(state, action);

    default:
      return state;
  }
};

exports["default"] = _default;