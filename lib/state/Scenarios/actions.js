"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _actions = _interopRequireDefault(require("../_common/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var add = _actions["default"].add(_ActionTypes["default"].SCENARIOS);

var setActiveKey = _actions["default"].setActiveKey(_ActionTypes["default"].SCENARIOS);

var setActiveKeys = _actions["default"].setActiveKeys(_ActionTypes["default"].SCENARIOS);

var updateStateFromView = _actions["default"].updateSubstateFromView(_ActionTypes["default"].SCENARIOS);

var setActiveKeyAndEnsureDependencies = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('scenario'));
  };
};

var setActiveKeysAndEnsureDependencies = function setActiveKeysAndEnsureDependencies(keys) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKeys(keys));
    dispatch(options.ensureDependenciesOfActiveMetadataType('scenario'));
  };
}; // ============ export ===========


var _default = {
  add: add,
  setActiveKey: setActiveKeyAndEnsureDependencies,
  setActiveKeys: setActiveKeysAndEnsureDependencies,
  updateStateFromView: updateStateFromView
};
exports["default"] = _default;