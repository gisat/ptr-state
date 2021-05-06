"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash"));

var _recompute = require("@jvitela/recompute");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getKey = function getKey(state) {
  return state.app.key;
};

var getCompleteConfiguration = function getCompleteConfiguration(state) {
  return state.app.configuration;
};

var getCompleteLocalConfiguration = function getCompleteLocalConfiguration(state) {
  var _state$app;

  return (_state$app = state.app) === null || _state$app === void 0 ? void 0 : _state$app.localConfiguration;
};

var getCompleteLocalConfigurationObserver = (0, _recompute.createObserver)(getCompleteLocalConfiguration);
var getConfiguration = (0, _reselect.createSelector)([getCompleteConfiguration, function (state, path) {
  return path;
}], function (configuration, path) {
  return _lodash["default"].get(configuration, path, null);
});
var getLocalConfiguration = (0, _reselect.createSelector)([getCompleteLocalConfiguration, function (state, path) {
  return path;
}], function (localConfiguration, path) {
  return _lodash["default"].get(localConfiguration, path, null);
});
var _default = {
  getKey: getKey,
  getConfiguration: getConfiguration,
  getCompleteConfiguration: getCompleteConfiguration,
  getLocalConfiguration: getLocalConfiguration,
  getCompleteLocalConfiguration: getCompleteLocalConfiguration,
  getCompleteLocalConfigurationObserver: getCompleteLocalConfigurationObserver
};
exports["default"] = _default;