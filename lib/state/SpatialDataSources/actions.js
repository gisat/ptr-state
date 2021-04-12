"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _Select = _interopRequireDefault(require("../Select"));

var _actions = _interopRequireDefault(require("./vector/actions"));

var _actions2 = _interopRequireDefault(require("../_common/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var useKeys = _actions2["default"].useKeys(_Select["default"].spatialDataSources.getSubstate, 'spatial', _ActionTypes["default"].SPATIAL_DATA_SOURCES, 'dataSources');

var useKeysClear = _actions2["default"].useKeysClear(_ActionTypes["default"].SPATIAL_DATA_SOURCES);

var add = _actions2["default"].add(_ActionTypes["default"].SPATIAL_DATA_SOURCES); // ============ export ===========


var _default = {
  vector: _actions["default"],
  add: add,
  useKeys: useKeys,
  useKeysClear: useKeysClear
};
exports["default"] = _default;