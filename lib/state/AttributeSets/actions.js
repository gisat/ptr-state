"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _actions = _interopRequireDefault(require("../_common/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var setActiveKeys = _actions["default"].setActiveKeys(_ActionTypes["default"].ATTRIBUTE_SETS); // ============ export ===========


var _default = {
  setActiveKeys: setActiveKeys
};
exports["default"] = _default;