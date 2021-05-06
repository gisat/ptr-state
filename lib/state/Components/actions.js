"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _actions = _interopRequireDefault(require("../_common/actions"));

var _Select = _interopRequireDefault(require("../Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var updateStore = _actions["default"].updateStore(_Select["default"].components.getSubstate, _ActionTypes["default"].COMPONENTS); // ============ creators ===========


function update(component, data) {
  return function (dispatch) {
    dispatch(actionUpdate(component, data));
  };
} // ============ actions ===========


function actionUpdate(component, data) {
  return {
    type: _ActionTypes["default"].COMPONENTS.UPDATE,
    component: component,
    update: data
  };
}

function actionSet(component, path, value) {
  return {
    type: _ActionTypes["default"].COMPONENTS.SET,
    component: component,
    path: path,
    value: value
  };
} // ============ export ===========


var _default = {
  update: update,
  updateStateFromView: updateStore,
  updateStore: updateStore,
  set: actionSet
};
exports["default"] = _default;