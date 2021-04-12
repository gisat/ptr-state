"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _actions = _interopRequireDefault(require("../_common/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var useIndexedClear = _actions["default"].useIndexedClear(_ActionTypes["default"].ATTRIBUTE_STATISTICS);

var useIndexedBatch = _actions["default"].useIndexedBatch('attribute', _ActionTypes["default"].ATTRIBUTE_STATISTICS, 'statistic');

function loadFilteredData(filter, componentId) {
  return function (dispatch) {
    return dispatch(useIndexedBatch(null, filter, null, componentId, 'attributeDataSourceKey'));
  };
} // ============ export ===========


var _default = {
  useIndexedClear: useIndexedClear,
  loadFilteredData: loadFilteredData
};
exports["default"] = _default;