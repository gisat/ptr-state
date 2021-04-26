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
var setActiveKey = _actions["default"].setActiveKey(_ActionTypes["default"].AREAS.AREA_TREES);

var useIndexed = _actions["default"].useIndexed(_Select["default"].areas.areaTrees.getSubstate, 'areaTrees', _ActionTypes["default"].AREAS.AREA_TREES);

var useKeys = _actions["default"].useKeys(_Select["default"].areas.areaTrees.getSubstate, 'areaTrees', _ActionTypes["default"].AREAS.AREA_TREES);

var refreshUses = _actions["default"].refreshUses(_Select["default"].areas.areaTrees.getSubstate, "areaTrees", _ActionTypes["default"].AREAS.AREA_TREES); // ============ actions ===========


function actionClearUseIndexed(componentId) {
  return {
    type: _ActionTypes["default"].AREAS.AREA_TREES.USE.INDEXED.CLEAR,
    componentId: componentId
  };
} // ============ export ===========


var _default = {
  refreshUses: refreshUses,
  setActiveKey: setActiveKey,
  useIndexed: useIndexed,
  useIndexedClear: actionClearUseIndexed,
  useKeys: useKeys,
  useKeysClear: _actions["default"].useKeysClear(_ActionTypes["default"].AREAS.AREA_TREES)
};
exports["default"] = _default;