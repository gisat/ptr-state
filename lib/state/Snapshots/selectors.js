"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selectors = _interopRequireDefault(require("../_common/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.snapshots;
};

var getAll = _selectors["default"].getAll(getSubstate);

var _default = {
  getAll: getAll
};
exports["default"] = _default;