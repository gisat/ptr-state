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
var add = _actions["default"].add(_ActionTypes["default"].VIEWS);

var setActiveKey = _actions["default"].setActiveKey(_ActionTypes["default"].VIEWS);

var setActiveKeys = _actions["default"].setActiveKeys(_ActionTypes["default"].VIEWS);

var create = _actions["default"].create(_Select["default"].views.getSubstate, 'views', _ActionTypes["default"].VIEWS, 'views');

var deleteItem = _actions["default"]["delete"](_Select["default"].views.getSubstate, 'views', _ActionTypes["default"].VIEWS, 'views');

var saveEdited = _actions["default"].saveEdited(_Select["default"].views.getSubstate, 'views', _ActionTypes["default"].VIEWS, 'views');

var updateEdited = _actions["default"].updateEdited(_Select["default"].views.getSubstate, _ActionTypes["default"].VIEWS, 'views');

var useKeys = _actions["default"].useKeys(_Select["default"].views.getSubstate, 'views', _ActionTypes["default"].VIEWS, 'views');

var useKeysClear = _actions["default"].useKeysClear(_ActionTypes["default"].VIEWS);

var useIndexedClear = _actions["default"].useIndexedClear(_ActionTypes["default"].VIEWS);

var useIndexed = _actions["default"].useIndexed(_Select["default"].views.getSubstate, 'views', _ActionTypes["default"].VIEWS, 'views');

var refreshUses = _actions["default"].refreshUses(_Select["default"].views.getSubstate, "views", _ActionTypes["default"].VIEWS, 'views'); // ============ actions ===========


var apply = function apply(key, actions) {
  return function (dispatch, getState) {
    return dispatch(_actions["default"].ensureKeys(_Select["default"].views.getSubstate, 'views', _ActionTypes["default"].VIEWS, [key], 'views')).then(function () {
      var data = _Select["default"].views.getDataByKey(getState(), key);

      if (data && data.state) {
        var _data$state$data;

        var actionCreators = [];

        _lodash["default"].each(actions, function (storeActions, key) {
          if (storeActions.hasOwnProperty('updateStateFromView') && data.state[key]) {
            actionCreators.push(storeActions.updateStateFromView(data.state[key]));
          }
        });

        if (actions.data.components && (_data$state$data = data.state.data) !== null && _data$state$data !== void 0 && _data$state$data.components) {
          actionCreators.push(actions.data.components.updateComponentsStateFromView(data.state.data.components));
        }

        if (actions.specific) {
          _lodash["default"].each(actions.specific, function (storeActions, key) {
            if (storeActions.hasOwnProperty('updateStateFromView') && data.state[key]) {
              actionCreators.push(storeActions.updateStateFromView(data.state[key]));
            }
          });
        }

        dispatch(actionCreators);
      } else {
        dispatch(_actions["default"].actionGeneralError("Views#apply: View or state of view doesn't exist! View key: " + key));
      }
    })["catch"](function (err) {
      dispatch(_actions["default"].actionGeneralError('Views#apply: ' + err));
    });
  };
};

var applyAndSetActive = function applyAndSetActive(key, actions) {
  return function (dispatch) {
    return dispatch(apply(key, actions)).then(function () {
      dispatch(setActiveKey(key));
    });
  };
}; // ============ export ===========


var _default = {
  add: add,
  apply: apply,
  applyAndSetActive: applyAndSetActive,
  setActiveKey: setActiveKey,
  setActiveKeys: setActiveKeys,
  create: create,
  "delete": deleteItem,
  saveEdited: saveEdited,
  updateEdited: updateEdited,
  useKeys: useKeys,
  useKeysClear: useKeysClear,
  refreshUses: refreshUses,
  useIndexed: useIndexed,
  useIndexedClear: useIndexedClear
};
exports["default"] = _default;