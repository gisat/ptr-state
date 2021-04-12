"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash"));

var _selectors = _interopRequireDefault(require("../../_common/selectors"));

var _selectors2 = _interopRequireDefault(require("../../Maps/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.scenarios.scenarios;
};

var isDefaultSituationActive = function isDefaultSituationActive(state) {
  return state.scenarios.scenarios.defaultSituationActive;
};

var getAll = _selectors["default"].getAll(getSubstate);

var getAllAsObject = _selectors["default"].getAllAsObject(getSubstate);

var getActiveKey = _selectors["default"].getActiveKey(getSubstate);

var getActiveKeys = _selectors["default"].getActiveKeys(getSubstate);

var getActive = _selectors["default"].getActive(getSubstate);

var getActiveScenarios = _selectors["default"].getActiveModels(getSubstate);

var getByKey = _selectors["default"].getByKey(getSubstate);

var getEditedAll = _selectors["default"].getEditedAll(getSubstate);

var getEditedAllAsObject = _selectors["default"].getEditedAllAsObject(getSubstate);

var getEditedByKey = _selectors["default"].getEditedByKey(getSubstate);

var getEditedKeys = _selectors["default"].getEditedKeys(getSubstate);
/**
 * Select spatial data source for scenario (based on source type)
 */


var getPucsScenariosVectorSource = (0, _reselect.createSelector)([function (state, scenarioKey, defaultSituation) {
  return {
    scenarioKey: scenarioKey,
    defaultSituation: defaultSituation
  };
}], function (scenarioData, vectorLayers) {
  var source = null;

  if (scenarioData.scenarioKey && vectorLayers.length) {
    source = _lodash["default"].find(vectorLayers, {
      'scenarioKey': scenarioData.scenarioKey
    });
  } else if (scenarioData.defaultSituation && vectorLayers.length) {
    source = _lodash["default"].find(vectorLayers, {
      'scenarioKey': null
    });
  }

  return source ? source : null;
});
var _default = {
  getActive: getActive,
  getActiveKey: getActiveKey,
  getActiveKeys: getActiveKeys,
  getActiveScenarios: getActiveScenarios,
  getAll: getAll,
  getAllAsObject: getAllAsObject,
  getByKey: getByKey,
  getEditedAll: getEditedAll,
  getEditedAllAsObject: getEditedAllAsObject,
  getEditedByKey: getEditedByKey,
  getEditedKeys: getEditedKeys,
  getSubstate: getSubstate,
  isDefaultSituationActive: isDefaultSituationActive,
  getPucsScenariosVectorSource: getPucsScenariosVectorSource
};
exports["default"] = _default;