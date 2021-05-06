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
var add = _actions["default"].add(_ActionTypes["default"].STYLES);

var useIndexed = _actions["default"].useIndexed(_Select["default"].styles.getSubstate, 'styles', _ActionTypes["default"].STYLES);

var useKeys = _actions["default"].useKeys(_Select["default"].styles.getSubstate, 'styles', _ActionTypes["default"].STYLES);

var useKeysClear = _actions["default"].useKeysClear(_ActionTypes["default"].STYLES);

var updateStateFromView = _actions["default"].updateSubstateFromView(_ActionTypes["default"].STYLES); // ============ export ===========
// TODO - common?


var updateStateFromViewWithData = function updateStateFromViewWithData(view) {
  return function (dispatch, getState) {
    dispatch(updateStateFromView(view));

    if (view.data) {
      dispatch(add(view.data));
    }
  };
};

var _default = {
  add: add,
  useIndexed: useIndexed,
  useKeys: useKeys,
  useKeysClear: useKeysClear,
  updateStateFromView: updateStateFromView,
  updateStateFromViewWithData: updateStateFromViewWithData
};
exports["default"] = _default;