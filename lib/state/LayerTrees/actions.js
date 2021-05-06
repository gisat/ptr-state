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
var create = _actions["default"].create(_Select["default"].layerTrees.getSubstate, 'layerTrees', _ActionTypes["default"].LAYER_TREES, 'applications');

var deleteItem = _actions["default"]["delete"](_Select["default"].layerTrees.getSubstate, 'layerTrees', _ActionTypes["default"].LAYER_TREES, 'applications');

var saveEdited = _actions["default"].saveEdited(_Select["default"].layerTrees.getSubstate, 'layerTrees', _ActionTypes["default"].LAYER_TREES, 'applications');

var updateEdited = _actions["default"].updateEdited(_Select["default"].layerTrees.getSubstate, _ActionTypes["default"].LAYER_TREES);

var useKeys = _actions["default"].useKeys(_Select["default"].layerTrees.getSubstate, 'layerTrees', _ActionTypes["default"].LAYER_TREES, 'applications');

var useKeysClear = _actions["default"].useKeysClear(_ActionTypes["default"].LAYER_TREES);

var useIndexedClear = _actions["default"].useIndexedClear(_ActionTypes["default"].LAYER_TREES);

var useIndexed = _actions["default"].useIndexed(_Select["default"].layerTrees.getSubstate, 'layerTrees', _ActionTypes["default"].LAYER_TREES, 'applications');

var refreshUses = _actions["default"].refreshUses(_Select["default"].layerTrees.getSubstate, 'layerTrees', _ActionTypes["default"].LAYER_TREES, 'applications');

var updateStateFromView = _actions["default"].updateSubstateFromView(_ActionTypes["default"].LAYER_TREES); // ============ actions ===========


function ensureData(filter, componentId) {
  return function (dispatch) {
    return dispatch(useIndexed(null, filter, null, 1, 100, componentId)).then();
  };
} // ============ export ===========


var _default = {
  create: create,
  "delete": deleteItem,
  ensureData: ensureData,
  refreshUses: refreshUses,
  saveEdited: saveEdited,
  updateEdited: updateEdited,
  updateStateFromView: updateStateFromView,
  useIndexed: useIndexed,
  useIndexedClear: useIndexedClear,
  useKeys: useKeys,
  useKeysClear: useKeysClear
};
exports["default"] = _default;