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
var create = _actions["default"].create(_Select["default"].attributes.getSubstate, 'attributes', _ActionTypes["default"].ATTRIBUTES);

var refreshUses = _actions["default"].refreshUses(_Select["default"].attributes.getSubstate, "attributes", _ActionTypes["default"].ATTRIBUTES);

var deleteItem = _actions["default"]["delete"](_Select["default"].attributes.getSubstate, 'attributes', _ActionTypes["default"].ATTRIBUTES);

var saveEdited = _actions["default"].saveEdited(_Select["default"].attributes.getSubstate, 'attributes', _ActionTypes["default"].ATTRIBUTES);

var setActiveKey = _actions["default"].setActiveKey(_ActionTypes["default"].ATTRIBUTES);

var setActiveKeys = _actions["default"].setActiveKeys(_ActionTypes["default"].ATTRIBUTES);

var updateEdited = _actions["default"].updateEdited(_Select["default"].attributes.getSubstate, _ActionTypes["default"].ATTRIBUTES);

var updateStore = _actions["default"].updateStore(_Select["default"].attributes.getSubstate, _ActionTypes["default"].ATTRIBUTES);

var useIndexed = _actions["default"].useIndexed(_Select["default"].attributes.getSubstate, 'attributes', _ActionTypes["default"].ATTRIBUTES);

var useIndexedClear = _actions["default"].useIndexedClear(_ActionTypes["default"].ATTRIBUTES);

var useKeys = _actions["default"].useKeys(_Select["default"].attributes.getSubstate, 'attributes', _ActionTypes["default"].ATTRIBUTES);

var useKeysClear = _actions["default"].useKeysClear(_ActionTypes["default"].ATTRIBUTES);

var updateStateFromView = _actions["default"].updateSubstateFromView(_ActionTypes["default"].ATTRIBUTES);

var setActiveKeyAndEnsureDependencies = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('attribute'));
  };
};

var setActiveKeysAndEnsureDependencies = function setActiveKeysAndEnsureDependencies(keys) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKeys(keys));
    dispatch(options.ensureDependenciesOfActiveMetadataType('attribute'));
  };
}; // ============ export ===========


var _default = {
  create: create,
  "delete": deleteItem,
  updateStateFromView: updateStateFromView,
  refreshUses: refreshUses,
  saveEdited: saveEdited,
  setActiveKey: setActiveKeyAndEnsureDependencies,
  setActiveKeys: setActiveKeysAndEnsureDependencies,
  updateEdited: updateEdited,
  updateStore: updateStore,
  useIndexed: useIndexed,
  useIndexedClear: useIndexedClear,
  useKeys: useKeys,
  useKeysClear: useKeysClear
};
exports["default"] = _default;