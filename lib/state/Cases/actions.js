"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _actions = _interopRequireDefault(require("../_common/actions"));

var _Select = _interopRequireDefault(require("../Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var add = _actions["default"].add(_ActionTypes["default"].CASES);

var create = _actions["default"].create(_Select["default"].cases.getSubstate, 'cases', _ActionTypes["default"].CASES);

var deleteItem = _actions["default"]["delete"](_Select["default"].cases.getSubstate, 'cases', _ActionTypes["default"].CASES);

var saveEdited = _actions["default"].saveEdited(_Select["default"].cases.getSubstate, 'cases', _ActionTypes["default"].CASES);

var setActiveKey = _actions["default"].setActiveKey(_ActionTypes["default"].CASES);

var setActiveKeys = _actions["default"].setActiveKeys(_ActionTypes["default"].CASES);

var updateEdited = _actions["default"].updateEdited(_Select["default"].cases.getSubstate, _ActionTypes["default"].CASES);

var updateStateFromView = _actions["default"].updateSubstateFromView(_ActionTypes["default"].CASES);

var useKeys = _actions["default"].useKeys(_Select["default"].cases.getSubstate, 'cases', _ActionTypes["default"].CASES);

var useKeysClear = _actions["default"].useKeysClear(_ActionTypes["default"].CASES);

var useIndexed = _actions["default"].useIndexed(_Select["default"].cases.getSubstate, 'cases', _ActionTypes["default"].CASES);

var useIndexedClear = _actions["default"].useIndexedClear(_ActionTypes["default"].CASES);

var refreshUses = _actions["default"].refreshUses(_Select["default"].cases.getSubstate, "cases", _ActionTypes["default"].CASES);

var setActiveKeyAndEnsureDependencies = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('case'));
  };
};

var setActiveKeysAndEnsureDependencies = function setActiveKeysAndEnsureDependencies(keys) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKeys(keys));
    dispatch(options.ensureDependenciesOfActiveMetadataType('case'));
  };
}; // ============ actions ===========
// ============ export ===========


var _default = {
  add: add,
  create: create,
  "delete": deleteItem,
  refreshUses: refreshUses,
  saveEdited: saveEdited,
  setActiveKey: setActiveKeyAndEnsureDependencies,
  setActiveKeys: setActiveKeysAndEnsureDependencies,
  updateEdited: updateEdited,
  updateStateFromView: updateStateFromView,
  useIndexed: useIndexed,
  useIndexedClear: useIndexedClear,
  useKeys: useKeys,
  useKeysClear: useKeysClear
};
exports["default"] = _default;