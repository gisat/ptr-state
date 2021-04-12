"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _actions = _interopRequireDefault(require("../../_common/actions"));

var _Select = _interopRequireDefault(require("../../Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var setActiveKey = _actions["default"].setActiveKey(_ActionTypes["default"].AREAS.AREA_TREE_LEVELS);

var useIndexed = _actions["default"].useIndexed(_Select["default"].areas.areaTreeLevels.getSubstate, 'areaTreeLevels', _ActionTypes["default"].AREAS.AREA_TREE_LEVELS);

var useKeys = _actions["default"].useKeys(_Select["default"].areas.areaTreeLevels.getSubstate, 'areaTreeLevels', _ActionTypes["default"].AREAS.AREA_TREE_LEVELS);

var refreshUses = _actions["default"].refreshUses(_Select["default"].areas.areaTreeLevels.getSubstate, "areaTreeLevels", _ActionTypes["default"].AREAS.AREA_TREE_LEVELS);

var setActiveKeyAndEnsureDependencies = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('areaTreeLevel'));
  };
}; // ============ actions ===========


function actionClearUseIndexed(componentId) {
  return {
    type: _ActionTypes["default"].AREAS.AREA_TREE_LEVELS.USE.INDEXED.CLEAR,
    componentId: componentId
  };
} // ============ export ===========


var _default = {
  refreshUses: refreshUses,
  setActiveKey: setActiveKeyAndEnsureDependencies,
  useIndexed: useIndexed,
  useIndexedClear: actionClearUseIndexed,
  useKeys: useKeys
};
exports["default"] = _default;