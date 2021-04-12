"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selectors = _interopRequireDefault(require("../_common/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.spatialData;
};

var getAllAsObject = _selectors["default"].getAllAsObject(getSubstate);

var getByKey = _selectors["default"].getByKey(getSubstate);

var _default = {
  getAllAsObject: getAllAsObject,
  getByKey: getByKey,
  getSubstate: getSubstate
};
exports["default"] = _default;