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
var add = _actions["default"].add(_ActionTypes["default"].PERIODS);

var create = _actions["default"].create(_Select["default"].periods.getSubstate, 'periods', _ActionTypes["default"].PERIODS);

var deleteItem = _actions["default"]["delete"](_Select["default"].periods.getSubstate, 'periods', _ActionTypes["default"].PERIODS);

var saveEdited = _actions["default"].saveEdited(_Select["default"].periods.getSubstate, 'periods', _ActionTypes["default"].PERIODS);

var setActiveKey = _actions["default"].setActiveKey(_ActionTypes["default"].PERIODS);

var setActiveKeys = _actions["default"].setActiveKeys(_ActionTypes["default"].PERIODS);

var updateEdited = _actions["default"].updateEdited(_Select["default"].periods.getSubstate, _ActionTypes["default"].PERIODS);

var updateStateFromView = _actions["default"].updateSubstateFromView(_ActionTypes["default"].PERIODS);

var useKeys = _actions["default"].useKeys(_Select["default"].periods.getSubstate, 'periods', _ActionTypes["default"].PERIODS);

var useKeysClear = _actions["default"].useKeysClear(_ActionTypes["default"].PERIODS);

var useIndexed = _actions["default"].useIndexed(_Select["default"].periods.getSubstate, 'periods', _ActionTypes["default"].PERIODS);

var useIndexedClear = _actions["default"].useIndexedClear(_ActionTypes["default"].PERIODS);

var refreshUses = _actions["default"].refreshUses(_Select["default"].periods.getSubstate, "periods", _ActionTypes["default"].PERIODS);

var setActiveKeyAndEnsureDependencies = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('period'));
  };
};

var setActiveKeysAndEnsureDependencies = function setActiveKeysAndEnsureDependencies(keys) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKeys(keys));
    dispatch(options.ensureDependenciesOfActiveMetadataType('period'));
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