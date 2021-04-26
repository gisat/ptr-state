"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _Select = _interopRequireDefault(require("../Select"));

var _actions = _interopRequireDefault(require("../_common/actions"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var add = _actions["default"].add(_ActionTypes["default"].SCOPES);

var create = _actions["default"].create(_Select["default"].scopes.getSubstate, 'scopes', _ActionTypes["default"].SCOPES);

var deleteItem = _actions["default"]["delete"](_Select["default"].scopes.getSubstate, 'scopes', _ActionTypes["default"].SCOPES);

var saveEdited = _actions["default"].saveEdited(_Select["default"].scopes.getSubstate, 'scopes', _ActionTypes["default"].SCOPES);

var setActiveKey = _actions["default"].setActiveKey(_ActionTypes["default"].SCOPES);

var updateEdited = _actions["default"].updateEdited(_Select["default"].scopes.getSubstate, _ActionTypes["default"].SCOPES);

var useKeys = _actions["default"].useKeys(_Select["default"].scopes.getSubstate, 'scopes', _ActionTypes["default"].SCOPES);

var useKeysClear = _actions["default"].useKeysClear(_ActionTypes["default"].SCOPES);

var useIndexedClear = _actions["default"].useIndexedClear(_ActionTypes["default"].SCOPES);

var useIndexed = _actions["default"].useIndexed(_Select["default"].scopes.getSubstate, 'scopes', _ActionTypes["default"].SCOPES);

var refreshUses = _actions["default"].refreshUses(_Select["default"].scopes.getSubstate, "scopes", _ActionTypes["default"].SCOPES);

var setActiveKeyAndEnsureDependencies = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('scope'));
  };
};

function updateStateFromView(data) {
  return function (dispatch) {
    if (data) {
      if (data && data.byKey) {
        dispatch(add(_lodash["default"].values(data.byKey)));
      }

      if (data && data.activeKey) {
        dispatch(setActiveKeyAndEnsureDependencies(data.activeKey));
      }
    }
  };
} // ============ actions ===========
// ============ export ===========


var _default = {
  add: add,
  create: create,
  "delete": deleteItem,
  refreshUses: refreshUses,
  saveEdited: saveEdited,
  setActiveKey: setActiveKeyAndEnsureDependencies,
  updateEdited: updateEdited,
  updateStateFromView: updateStateFromView,
  useIndexed: useIndexed,
  useIndexedClear: useIndexedClear,
  useKeys: useKeys,
  useKeysClear: useKeysClear
};
exports["default"] = _default;