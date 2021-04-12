"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Select = _interopRequireDefault(require("../../state/Select"));

var _actions = _interopRequireDefault(require("../AttributeRelations/actions"));

var _actions2 = _interopRequireDefault(require("../_common/actions"));

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setInitial = _actions2["default"].setInitial(_ActionTypes["default"].CHARTS);

var use = function use(chartKey, useActiveMetadataKeys) {
  return function (dispatch, getState) {
    var chart = _Select["default"].charts.getChartConfiguration(getState(), chartKey, useActiveMetadataKeys);

    var componentId = 'chart-' + chartKey;

    if (chart) {
      dispatch(_actions["default"].useIndexedRegister(componentId, chart.filterByActive, chart.mergedFilter, null, 1, 1000));
      dispatch(_actions["default"].ensureIndexedSpecific(chart.mergedFilter, null, 1, 1000, componentId));
    }
  };
};

var useClear = function useClear(chartKey) {
  return function (dispatch) {
    dispatch(_actions2["default"].useIndexedClear(_ActionTypes["default"].ATTRIBUTE_RELATIONS)("chart_".concat(chartKey)));
  };
};

var updateStateFromView = function updateStateFromView(data) {
  return function (dispatch) {
    if (data) {
      dispatch(actionUpdate(data));
    }
  };
}; // ============ actions ===========


var actionUpdate = function actionUpdate(data) {
  return {
    type: _ActionTypes["default"].CHARTS.UPDATE,
    data: data
  };
};

var _default = {
  updateStateFromView: updateStateFromView,
  use: use,
  useClear: useClear,
  setInitial: setInitial
};
exports["default"] = _default;