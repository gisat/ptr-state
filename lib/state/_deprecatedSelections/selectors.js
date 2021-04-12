"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selectors = _interopRequireDefault(require("../_common/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state._deprecatedSelections;
};

var getActive = _selectors["default"].getActive(getSubstate);

var getActiveKey = _selectors["default"].getActiveKey(getSubstate);

var _default = {
  getActive: getActive,
  getActiveKey: getActiveKey,
  getSubstate: getSubstate
};
exports["default"] = _default;