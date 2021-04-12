"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selectors = _interopRequireDefault(require("../../_common/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.areas.areaTreeLevels;
};

var getAll = _selectors["default"].getAll(getSubstate);

var getAllAsObject = _selectors["default"].getAllAsObject(getSubstate);

var getActiveKey = _selectors["default"].getActiveKey(getSubstate);

var getActive = _selectors["default"].getActive(getSubstate);

var _default = {
  getAll: getAll,
  getAllAsObject: getAllAsObject,
  getActiveKey: getActiveKey,
  getActive: getActive,
  getSubstate: getSubstate
};
exports["default"] = _default;