"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("./AreaTreeLevels/reducers"));

var _reducers2 = _interopRequireDefault(require("./AreaTrees/reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _redux.combineReducers)({
  areaTreeLevels: _reducers["default"],
  areaTrees: _reducers2["default"]
});

exports["default"] = _default;