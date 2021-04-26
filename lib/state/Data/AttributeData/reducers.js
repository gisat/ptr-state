"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.INITIAL_STATE = void 0;

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _reducers = _interopRequireWildcard(require("../../_common/reducers"));

var _helpers = _interopRequireDefault(require("../../_common/helpers"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = _objectSpread(_objectSpread({}, _reducers.DEFAULT_INITIAL_STATE), {}, {
  byDataSourceKey: {}
});
/**
 * Add attribute data
 * @param state {Object}
 * @param attributeDataSourceKey {string} attribute data source key
 * @param data {Object} feature key - attribute value pairs
 * @return {Object}
 */


exports.INITIAL_STATE = INITIAL_STATE;

var add = function add(state, attributeDataSourceKey, data) {
  if (attributeDataSourceKey && data) {
    return _objectSpread(_objectSpread({}, state), {}, {
      byDataSourceKey: _objectSpread(_objectSpread({}, state.byDataSourceKey), {}, _defineProperty({}, attributeDataSourceKey, data))
    });
  } else {
    return state;
  }
};
/**
 * Update attribute data for given data source
 * @param state {Object}
 * @param attributeDataSourceKey {string} attribute data source key
 * @param data {Object} feature key - attribute value pairs
 * @return {Object}
 */


var update = function update(state, attributeDataSourceKey, data) {
  if (attributeDataSourceKey && data) {
    return _objectSpread(_objectSpread({}, state), {}, {
      byDataSourceKey: _objectSpread(_objectSpread({}, state.byDataSourceKey), {}, _defineProperty({}, attributeDataSourceKey, state.byDataSourceKey[attributeDataSourceKey] ? _objectSpread(_objectSpread({}, state.byDataSourceKey[attributeDataSourceKey]), data) : data))
    });
  } else {
    return state;
  }
};
/**
 * @param state {Object}
 * @param attributeDataSourceKey {string} uuid
 * @param data {Object} attribute data
 * @param filter {Object}
 * @param order {Array}
 * @param indexData {Array}
 * @param changedOn {string}
 * @return {Object}
 */


var addWithSpatialIndex = function addWithSpatialIndex(state, attributeDataSourceKey, data, filter, order, indexData, changedOn) {
  var byDataSourceKey = _objectSpread(_objectSpread({}, state.byDataSourceKey), {}, _defineProperty({}, attributeDataSourceKey, state.byDataSourceKey[attributeDataSourceKey] ? _objectSpread(_objectSpread({}, state.byDataSourceKey[attributeDataSourceKey]), data) : data));

  var updatedIndexes = _helpers["default"].getUpdatedIndexes(state, filter, order, indexData, changedOn, 'spatialIndexes');

  return _objectSpread(_objectSpread({}, state), {}, {
    byDataSourceKey: byDataSourceKey,
    spatialIndexes: updatedIndexes
  });
};
/**
 * Add data and index in one step to save more mutating state
 * @param state {Object}
 * @param index {Array} ordered index
 * @param data {Object} Object with data
 * @param filter {Array}
 * @param order {Array}
 * @param start {Array}
 * @param total {Array}
 * @param changedOn {string}
 * @return {Object}
 */


var addWithIndex = function addWithIndex(state, index, data, filter, order, start, total, changedOn) {
  // TODO test commonHelpers.getUpdatedByDataSourceKey properly
  var byDataSourceKey = _helpers["default"].getUpdatedByDataSourceKey(state.byDataSourceKey, data); // Fake new data object for common action
  // Action "common.addIndex" needs array of data objects with key to create new index.
  // "newData" is a Array of the minimal data for construct index in common actoin.


  var newData = index.map(function (val) {
    return {
      key: val
    };
  });
  var addIndexAction = {
    filter: filter,
    order: order,
    data: newData,
    start: start,
    count: total,
    changedOn: changedOn
  };

  var stateWithUpdatedIndexes = _reducers["default"].addIndex(state, addIndexAction);

  return _objectSpread(_objectSpread({}, state), {}, {
    byDataSourceKey: byDataSourceKey,
    indexes: stateWithUpdatedIndexes.indexes
  });
};
/**
 * Add spatial index
 * @param state {Object}
 * @param filter {Object}
 * @param order {Array}
 * @param indexData {Array}
 * @param changedOn {string}
 * @return {*&{spatialIndexes: []}}
 */


var addSpatialIndex = function addSpatialIndex(state, filter, order, indexData, changedOn) {
  var updatedIndexes = _helpers["default"].getUpdatedIndexes(state, filter, order, indexData, changedOn, 'spatialIndexes');

  return _objectSpread(_objectSpread({}, state), {}, {
    spatialIndexes: updatedIndexes
  });
};
/**
 * Remove spatial index that fit to filter and order from state.
 * @param {Object} state
 * @param {Object} filter
 * @param {Object} order
 * @return {Object}
 */


var removeSpatialIndex = function removeSpatialIndex(state, filter, order) {
  var updatedIndexes = _helpers["default"].removeIndex(state.spatialIndexes, filter, order);

  return _objectSpread(_objectSpread({}, state), {}, {
    spatialIndexes: updatedIndexes
  });
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"].DATA.ATTRIBUTE_DATA.ADD:
      return add(state, action.key, action.data);

    case _ActionTypes["default"].DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_INDEX:
      return addWithSpatialIndex(state, action.attributeDataSourceKey, action.data, action.filter, action.order, action.indexData, action.changedOn);

    case _ActionTypes["default"].DATA.ATTRIBUTE_DATA.ADD_WITH_INDEX:
      return addWithIndex(state, action.index, action.data, action.filter, action.order, action.start, action.total, action.changedOn);

    case _ActionTypes["default"].DATA.ATTRIBUTE_DATA.UPDATE:
      return update(state, action.key, action.data);

    case _ActionTypes["default"].DATA.ATTRIBUTE_DATA.INDEX.ADD:
      return _reducers["default"].addIndex(state, action);

    case _ActionTypes["default"].DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.ADD:
      return addSpatialIndex(state, action.filter, action.order, action.indexData, action.changedOn);

    case _ActionTypes["default"].DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.REMOVE:
      return removeSpatialIndex(state, action.filter, action.order);

    case _ActionTypes["default"].DATA.ATTRIBUTE_DATA.UPDATE_STORE:
      return _reducers["default"].updateStore(state, action.data);

    default:
      return state;
  }
};

exports["default"] = _default;