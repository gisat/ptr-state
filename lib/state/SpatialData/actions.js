"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _Select = _interopRequireDefault(require("../Select"));

var _actions = _interopRequireDefault(require("../_common/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useIndexed = _actions["default"].useIndexed(_Select["default"].spatialData.getSubstate, 'spatial', _ActionTypes["default"].SPATIAL_DATA, 'data'); // ============ creators ===========
// ============ export ===========


var _default = {
  useIndexed: useIndexed
};
exports["default"] = _default;