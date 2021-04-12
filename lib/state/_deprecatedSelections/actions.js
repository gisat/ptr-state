"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Select = _interopRequireDefault(require("../Select"));

var _lodash = _interopRequireDefault(require("lodash"));

var _actions = _interopRequireDefault(require("../_common/actions"));

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _ptrUtils = require("@gisatcz/ptr-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var add = _actions["default"].add(_ActionTypes["default"]._DEPRECATED_SELECTIONS);

var setActiveKey = _actions["default"].setActiveKey(_ActionTypes["default"]._DEPRECATED_SELECTIONS);

function clearActiveSelection() {
  return function (dispatch, getState) {
    var activeKey = _Select["default"]._deprecatedSelections.getActiveKey(getState());

    if (activeKey) {
      dispatch(setActiveKey(null));
      dispatch(actionRemove([activeKey]));
    }
  };
}

function updateActiveSelection(name, values, areas) {
  return function (dispatch, getState) {
    var active = _Select["default"]._deprecatedSelections.getActive(getState());

    var data = {
      name: name,
      values: values,
      areas: areas
    };

    if (active) {
      var updated = _objectSpread(_objectSpread({}, active), {}, {
        data: _objectSpread(_objectSpread({}, active.data), data)
      });

      dispatch(add(updated));
    } else {
      dispatch(create(data));
    }
  };
}

function create(data) {
  return function (dispatch) {
    var selection = {
      key: _ptrUtils.utils.uuid(),
      data: data
    };
    dispatch(add([selection]));
    dispatch(setActiveKey(selection.key));
  };
}

function updateStateFromView(data) {
  return function (dispatch) {
    if (data) {
      dispatch(actionUpdate(data));
    }
  };
} // ============ actions ===========


function actionRemove(keys) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_SELECTIONS.REMOVE,
    keys: keys
  };
}

var actionUpdate = function actionUpdate(data) {
  return {
    type: _ActionTypes["default"]._DEPRECATED_SELECTIONS.UPDATE_FROM_VIEW,
    data: data
  };
};

var _default = {
  clearActiveSelection: clearActiveSelection,
  updateActiveSelection: updateActiveSelection,
  updateStateFromView: updateStateFromView
};
exports["default"] = _default;