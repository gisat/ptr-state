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
var useKeys = _actions["default"].useKeys(_Select["default"].attributeDataSources.getSubstate, 'attribute', _ActionTypes["default"].ATTRIBUTE_DATA_SOURCES, 'dataSources');

var useKeysClear = _actions["default"].useKeysClear(_ActionTypes["default"].ATTRIBUTE_DATA_SOURCES); // ============ export ===========


var _default = {
  useKeys: useKeys,
  useKeysClear: useKeysClear
};
exports["default"] = _default;