"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _request = _interopRequireDefault(require("../_common/request"));

var _selectors = _interopRequireDefault(require("./selectors"));

var _actions = _interopRequireDefault(require("../_common/actions"));

var _Select = _interopRequireDefault(require("../Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var loadConfiguration = function loadConfiguration() {
  return function (dispatch, getState) {
    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(getState());

    var apiPath = 'rest/application/filtered/configurations';

    var applicationKey = _selectors["default"].getKey(getState());

    var payload = {
      filter: {
        applicationKey: applicationKey
      }
    };
    return (0, _request["default"])(localConfig, apiPath, 'POST', null, payload).then(function (result) {
      if (result.errors && result.errors.configurations || result.data && !result.data.configurations) {
        dispatch(_actions["default"].actionGeneralError(result.errors.configurations || new Error('no data')));
      } else if (result.data.configurations.length && result.data.configurations[0].data && result.data.configurations[0].data.data) {
        dispatch(actionReceiveConfiguration(result.data.configurations[0].data.data));
      } else {
        dispatch(_actions["default"].actionGeneralError(new Error('empty configuration')));
      }
    })["catch"](function (error) {
      dispatch(_actions["default"].actionGeneralError(error));
    });
  };
}; // ============ actions ===========


var actionSetKey = function actionSetKey(key) {
  return {
    type: _ActionTypes["default"].APP.SET_KEY,
    key: key
  };
};

var actionSetBaseUrl = function actionSetBaseUrl(url) {
  return {
    type: _ActionTypes["default"].APP.SET_BASE_URL,
    url: url
  };
};

var actionSetLocalConfiguration = function actionSetLocalConfiguration(path, value) {
  return {
    type: _ActionTypes["default"].APP.SET_LOCAL_CONFIGURATION,
    path: path,
    value: value
  };
};

var actionUpdateLocalConfiguration = function actionUpdateLocalConfiguration(update) {
  return {
    type: _ActionTypes["default"].APP.UPDATE_LOCAL_CONFIGURATION,
    update: update
  };
};

var actionReceiveConfiguration = function actionReceiveConfiguration(configuration) {
  return {
    type: _ActionTypes["default"].APP.RECEIVE_CONFIGURATION,
    configuration: configuration
  };
}; // ============ export ===========


var _default = {
  add: actionReceiveConfiguration,
  setKey: actionSetKey,
  updateLocalConfiguration: actionUpdateLocalConfiguration,
  setBaseUrl: actionSetBaseUrl,
  setLocalConfiguration: actionSetLocalConfiguration,
  loadConfiguration: loadConfiguration
};
exports["default"] = _default;