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
var add = _actions["default"].add(_ActionTypes["default"].LAYER_TEMPLATES);

var create = _actions["default"].create(_Select["default"].layerTemplates.getSubstate, 'layerTemplates', _ActionTypes["default"].LAYER_TEMPLATES);

var deleteItem = _actions["default"]["delete"](_Select["default"].layerTemplates.getSubstate, 'layerTemplates', _ActionTypes["default"].LAYER_TEMPLATES);

var saveEdited = _actions["default"].saveEdited(_Select["default"].layerTemplates.getSubstate, 'layerTemplates', _ActionTypes["default"].LAYER_TEMPLATES);

var setActiveKey = _actions["default"].setActiveKey(_ActionTypes["default"].LAYER_TEMPLATES);

var updateEdited = _actions["default"].updateEdited(_Select["default"].layerTemplates.getSubstate, _ActionTypes["default"].LAYER_TEMPLATES);

var useKeys = _actions["default"].useKeys(_Select["default"].layerTemplates.getSubstate, 'layerTemplates', _ActionTypes["default"].LAYER_TEMPLATES);

var useKeysClear = _actions["default"].useKeysClear(_ActionTypes["default"].LAYER_TEMPLATES);

var useIndexed = _actions["default"].useIndexed(_Select["default"].layerTemplates.getSubstate, 'layerTemplates', _ActionTypes["default"].LAYER_TEMPLATES);

var useIndexedClear = _actions["default"].useIndexedClear(_ActionTypes["default"].LAYER_TEMPLATES);

var clearIndex = _actions["default"].clearIndex(_ActionTypes["default"].LAYER_TEMPLATES);

var setActiveKeyAndEnsureDependencies = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('layerTemplate'));
  };
}; // ============ export ===========


var _default = {
  add: add,
  clearIndex: clearIndex,
  create: create,
  "delete": deleteItem,
  saveEdited: saveEdited,
  setActiveKey: setActiveKeyAndEnsureDependencies,
  updateEdited: updateEdited,
  useIndexed: useIndexed,
  useIndexedClear: useIndexedClear,
  useKeys: useKeys,
  useKeysClear: useKeysClear
};
exports["default"] = _default;