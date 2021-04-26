"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _Select = _interopRequireDefault(require("../Select"));

var _actions = _interopRequireDefault(require("../_common/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var useIndexedRegister = function useIndexedRegister(componentId, filterByActive, filter, order, start, length) {
  return _actions["default"].useIndexedRegister(_ActionTypes["default"].AREA_RELATIONS, componentId, filterByActive, filter, order, start, length);
};

var ensureIndexed = function ensureIndexed(filter, order, start, length) {
  return _actions["default"].ensureIndexed(_Select["default"].areaRelations.getSubstate, 'area', filter, order, start, length, _ActionTypes["default"].AREA_RELATIONS, 'relations');
};

var add = _actions["default"].add(_ActionTypes["default"].AREA_RELATIONS);

var useIndexedClearAll = _actions["default"].useIndexedClearAll(_ActionTypes["default"].AREA_RELATIONS); // ============ export ===========


var _default = {
  add: add,
  useIndexedRegister: useIndexedRegister,
  useIndexedClearAll: useIndexedClearAll,
  ensureIndexed: ensureIndexed
};
exports["default"] = _default;