"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash"));

var _selectors = _interopRequireDefault(require("../../_common/selectors"));

var _selectors2 = _interopRequireDefault(require("../../Places/selectors"));

var _selectors3 = _interopRequireDefault(require("../../Scenarios/scenarios/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getSubstate = function getSubstate(state) {
  return state.scenarios.cases;
};

var getAll = _selectors["default"].getAll(getSubstate);

var getActiveKey = _selectors["default"].getActiveKey(getSubstate);

var getActive = _selectors["default"].getActive(getSubstate);

var getByKey = _selectors["default"].getByKey(getSubstate);

var getEditedAll = _selectors["default"].getEditedAll(getSubstate);

var getEditedActive = _selectors["default"].getEditedActive(getSubstate);

var activeCaseScenariosLoaded = (0, _reselect.createSelector)([getActive], function (activeCase) {
  return activeCase && activeCase.data && activeCase.data.scenariosLoaded ? activeCase.data.scenariosLoaded : false;
});
/**
 * It should select scenario keys of active case from byKey
 */

var getActiveCaseScenarioKeys = (0, _reselect.createSelector)([getActive], function (activeCase) {
  return activeCase && activeCase.data && activeCase.data.scenarios ? activeCase.data.scenarios : null;
});
/**
 * It should select scenario keys of active case from editedByKey
 */

var getActiveCaseEditedScenarioKeys = (0, _reselect.createSelector)([getEditedActive], function (activeCaseEdited) {
  return activeCaseEdited && activeCaseEdited.data && activeCaseEdited.data.scenarios ? activeCaseEdited.data.scenarios : null;
});
/**
 * It should select scenario models for active case
 */

var getActiveCaseScenarios = (0, _reselect.createSelector)([_selectors3["default"].getAllAsObject, getActiveCaseScenarioKeys], function (scenarios, activeCaseScenarioKeys) {
  if (scenarios && !_lodash["default"].isEmpty(scenarios) && activeCaseScenarioKeys) {
    var selectedModels = _lodash["default"].pick(scenarios, activeCaseScenarioKeys);

    return selectedModels && !_lodash["default"].isEmpty(selectedModels) ? Object.values(selectedModels) : null;
  } else {
    return null;
  }
});
/**
 * It should select keys of edited scenarios for active case
 */

var getActiveCaseScenariosEditedKeys = (0, _reselect.createSelector)([getActive, _selectors3["default"].getEditedKeys], function (activeCase, scenariosEditedKeys) {
  if (activeCase && activeCase.data && activeCase.data.scenarios && scenariosEditedKeys) {
    var commonKeys = _lodash["default"].intersection(activeCase.data.scenarios, scenariosEditedKeys);

    return commonKeys && commonKeys.length ? commonKeys : null;
  } else {
    return null;
  }
});
/**
 * It should select edited scenarios data for active case
 */

var getActiveCaseScenariosEdited = (0, _reselect.createSelector)([_selectors3["default"].getEditedAllAsObject, getActiveCaseScenarioKeys, getActiveCaseEditedScenarioKeys], function (scenariosEdited, activeCaseScenarioKeys, activeCaseEditedScenarioKeys) {
  if (scenariosEdited && !_lodash["default"].isEmpty(scenariosEdited)) {
    var keys = [];

    if (activeCaseScenarioKeys && activeCaseEditedScenarioKeys) {
      keys = [].concat(_toConsumableArray(activeCaseScenarioKeys), _toConsumableArray(activeCaseEditedScenarioKeys));
    } else if (activeCaseScenarioKeys && !activeCaseEditedScenarioKeys) {
      keys = activeCaseScenarioKeys;
    } else if (!activeCaseScenarioKeys && activeCaseEditedScenarioKeys) {
      keys = activeCaseEditedScenarioKeys;
    }

    var selectedEditedModels = _lodash["default"].pick(scenariosEdited, keys);

    return selectedEditedModels && !_lodash["default"].isEmpty(selectedEditedModels) ? Object.values(selectedEditedModels) : null;
  } else {
    return null;
  }
});
/**
 * It should select first edited scenario for active case
 * TODO clarify usage
 */

var getActiveCaseScenarioEdited = (0, _reselect.createSelector)([getActiveCaseScenariosEdited], function (scenariosEdited) {
  if (scenariosEdited && scenariosEdited.length === 1) {
    return scenariosEdited[0];
  } else {
    return null;
  }
});
/**
 * Select all cases for active place
 */

var getActivePlaceCases = (0, _reselect.createSelector)([getAll, _selectors2["default"].getActiveKey], function (cases, activePlaceKey) {
  if (cases && cases.length && activePlaceKey) {
    return _lodash["default"].filter(cases, function (caseItem) {
      return _lodash["default"].includes(caseItem.data.place_ids, activePlaceKey);
    });
  } else {
    return [];
  }
});
var _default = {
  getActive: getActive,
  getActiveKey: getActiveKey,
  getAll: getAll,
  getByKey: getByKey,
  getEditedAll: getEditedAll,
  activeCaseScenariosLoaded: activeCaseScenariosLoaded,
  getActiveCaseEdited: getEditedActive,
  getActiveCaseEditedScenarioKeys: getActiveCaseEditedScenarioKeys,
  getActiveCaseScenarioKeys: getActiveCaseScenarioKeys,
  getActiveCaseScenarioEdited: getActiveCaseScenarioEdited,
  getActiveCaseScenarios: getActiveCaseScenarios,
  getActiveCaseScenariosEdited: getActiveCaseScenariosEdited,
  getActiveCaseScenariosEditedKeys: getActiveCaseScenariosEditedKeys,
  getActivePlaceCases: getActivePlaceCases,
  getSubstate: getSubstate
};
exports["default"] = _default;