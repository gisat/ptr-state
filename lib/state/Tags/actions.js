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
var create = _actions["default"].create(_Select["default"].tags.getSubstate, 'tags', _ActionTypes["default"].TAGS);

var deleteItem = _actions["default"]["delete"](_Select["default"].tags.getSubstate, 'tags', _ActionTypes["default"].TAGS);

var saveEdited = _actions["default"].saveEdited(_Select["default"].tags.getSubstate, 'tags', _ActionTypes["default"].TAGS);

var updateEdited = _actions["default"].updateEdited(_Select["default"].tags.getSubstate, _ActionTypes["default"].TAGS);

var useKeys = _actions["default"].useKeys(_Select["default"].tags.getSubstate, 'tags', _ActionTypes["default"].TAGS);

var useKeysClear = _actions["default"].useKeysClear(_ActionTypes["default"].TAGS);

var useIndexedClear = _actions["default"].useIndexedClear(_ActionTypes["default"].TAGS);

var useIndexed = _actions["default"].useIndexed(_Select["default"].tags.getSubstate, 'tags', _ActionTypes["default"].TAGS);

var refreshUses = _actions["default"].refreshUses(_Select["default"].tags.getSubstate, "tags", _ActionTypes["default"].TAGS); // ============ actions ===========
// ============ export ===========


var _default = {
  create: create,
  "delete": deleteItem,
  saveEdited: saveEdited,
  updateEdited: updateEdited,
  useKeys: useKeys,
  useKeysClear: useKeysClear,
  refreshUses: refreshUses,
  useIndexed: useIndexed,
  useIndexedClear: useIndexedClear
};
exports["default"] = _default;