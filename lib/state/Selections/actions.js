"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actions = _interopRequireDefault(require("../_common/actions"));

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _Select = _interopRequireDefault(require("../Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var add = _actions["default"].add(_ActionTypes["default"].SELECTIONS);

var setActiveKey = _actions["default"].setActiveKey(_ActionTypes["default"].SELECTIONS);

var updateStateFromView = _actions["default"].updateSubstateFromView(_ActionTypes["default"].SELECTIONS);

var setActiveSelectionFeatureKeysFilterKeys = function setActiveSelectionFeatureKeysFilterKeys(selectionKeys) {
  return function (dispatch, getState) {
    var activeSelectionKey = _Select["default"].selections.getActiveKey(getState());

    if (activeSelectionKey && selectionKeys) {
      dispatch(setFeatureKeysFilterKeys(activeSelectionKey, selectionKeys));
    }
  };
};

var updateStateFromViewWithData = function updateStateFromViewWithData(view) {
  return function (dispatch, getState) {
    dispatch(updateStateFromView(view));

    if (view.data) {
      dispatch(add(view.data));
    }
  };
}; // ============ actions ===========


function clearFeatureKeysFilter(key) {
  return {
    type: _ActionTypes["default"].SELECTIONS.CLEAR.FEATURE_KEYS_FILTER,
    key: key
  };
}

function setFeatureKeysFilterKeys(key, featureKeys) {
  return {
    type: _ActionTypes["default"].SELECTIONS.SET.FEATURE_KEYS_FILTER.KEYS,
    key: key,
    featureKeys: featureKeys
  };
}

var _default = {
  add: add,
  clearFeatureKeysFilter: clearFeatureKeysFilter,
  setActiveSelectionFeatureKeysFilterKeys: setActiveSelectionFeatureKeysFilterKeys,
  setActiveKey: setActiveKey,
  updateStateFromView: updateStateFromView,
  updateStateFromViewWithData: updateStateFromViewWithData
};
exports["default"] = _default;