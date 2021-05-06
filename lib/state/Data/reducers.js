"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("./AttributeRelations/reducers"));

var _reducers2 = _interopRequireDefault(require("./AttributeDataSources/reducers"));

var _reducers3 = _interopRequireDefault(require("./AttributeData/reducers"));

var _reducers4 = _interopRequireDefault(require("./Components/reducers"));

var _reducers5 = _interopRequireDefault(require("./SpatialRelations/reducers"));

var _reducers6 = _interopRequireDefault(require("./SpatialDataSources/reducers"));

var _reducers7 = _interopRequireDefault(require("./SpatialData/reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _redux.combineReducers)({
  attributeData: _reducers3["default"],
  attributeDataSources: _reducers2["default"],
  attributeRelations: _reducers["default"],
  components: _reducers4["default"],
  spatialData: _reducers7["default"],
  spatialDataSources: _reducers6["default"],
  spatialRelations: _reducers5["default"]
});

exports["default"] = _default;