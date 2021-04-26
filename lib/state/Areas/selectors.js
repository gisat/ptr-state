"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selectors = _interopRequireDefault(require("./AreaTreeLevels/selectors"));

var _selectors2 = _interopRequireDefault(require("./AreaTrees/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  areaTreeLevels: _selectors["default"],
  areaTrees: _selectors2["default"]
};
exports["default"] = _default;