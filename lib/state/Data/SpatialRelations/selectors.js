"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selectors = _interopRequireDefault(require("../../_common/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.data.spatialRelations;
};

var getIndex = _selectors["default"].getIndex(getSubstate);

var _default = {
  getIndex: getIndex
};
exports["default"] = _default;