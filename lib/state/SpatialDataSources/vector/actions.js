"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _lodash = _interopRequireDefault(require("lodash"));

var _path = _interopRequireDefault(require("path"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _Select = _interopRequireDefault(require("../../Select"));

var _actions = _interopRequireDefault(require("../../_common/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TTL = 3;

var useKeys = _actions["default"].useKeys(_Select["default"].spatialDataSources.vector.getSubstate, 'spatial', _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR, 'data');

var useKeysClear = _actions["default"].useKeysClear(_ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR);

var useIndexed = _actions["default"].useIndexed(_Select["default"].spatialDataSources.vector.getSubstate, 'spatial', _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR, 'data');

var useIndexedBatch = _actions["default"].useIndexedBatch('spatial', _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR, 'data');

var useIndexedClear = _actions["default"].useIndexedClear(_ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR);

var clearIndex = _actions["default"].clearIndex(_ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR);

var addBatch = _actions["default"].addBatch(_ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR);

var addBatchIndex = _actions["default"].addBatchIndex(_ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR); // ============ creators ===========


function loadLayerData(filter, componentId) {
  return function (dispatch, getState) {
    var additionalParams = {};

    var geometriesAccuracy = _Select["default"].app.getLocalConfiguration(getState(), 'geometriesAccuracy');

    if (geometriesAccuracy) {
      additionalParams.transformation = {
        snapToGrid: {
          size: geometriesAccuracy
        },
        transform: 4326
      };
    }

    return dispatch(useIndexedBatch(null, filter, null, componentId, 'spatialDataSourceKey', additionalParams));
  };
} // ============ export ===========


var _default = {
  addBatch: addBatch,
  addBatchIndex: addBatchIndex,
  loadLayerData: loadLayerData,
  useKeys: useKeys,
  useKeysClear: useKeysClear,
  useIndexed: useIndexed,
  useIndexedClear: useIndexedClear,
  clearIndex: clearIndex
};
exports["default"] = _default;