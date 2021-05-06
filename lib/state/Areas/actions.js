"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actions = _interopRequireDefault(require("./AreaTreeLevels/actions"));

var _actions2 = _interopRequireDefault(require("./AreaTrees/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  areaTreeLevels: _actions["default"],
  areaTrees: _actions2["default"]
};
exports["default"] = _default;