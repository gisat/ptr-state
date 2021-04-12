"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _Select = _interopRequireDefault(require("../Select"));

var _actions = _interopRequireDefault(require("../_common/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var useIndexed = _actions["default"].useIndexed(_Select["default"].attributeData.getSubstate, 'attribute', _ActionTypes["default"].ATTRIBUTE_DATA, 'data');

var useIndexedClear = _actions["default"].useIndexedClear(_ActionTypes["default"].ATTRIBUTE_DATA);

var useIndexedBatch = _actions["default"].useIndexedBatch('attribute', _ActionTypes["default"].ATTRIBUTE_DATA, 'data');

function loadFilteredData(filter, componentId) {
  return function (dispatch) {
    return dispatch(useIndexedBatch(null, filter, null, componentId, 'attributeDataSourceKey'));
  };
} // ============ export ===========


var _default = {
  useIndexed: useIndexed,
  useIndexedClear: useIndexedClear,
  loadFilteredData: loadFilteredData
};
exports["default"] = _default;