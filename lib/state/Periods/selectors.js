"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.periods;
};

var getAll = _selectors["default"].getAll(getSubstate);

var getAllAsObject = _selectors["default"].getAllAsObject(getSubstate);

var getActive = _selectors["default"].getActive(getSubstate);

var getActiveKey = _selectors["default"].getActiveKey(getSubstate);

var getActiveKeys = _selectors["default"].getActiveKeys(getSubstate);

var getActiveModels = _selectors["default"].getActiveModels(getSubstate);

var getByKey = _selectors["default"].getByKey(getSubstate);

var getByKeys = _selectors["default"].getByKeys(getSubstate);

var getByKeysAsObject = _selectors["default"].getByKeysAsObject(getSubstate);

var getDataByKey = _selectors["default"].getDataByKey(getSubstate);

var getDeletePermissionByKey = _selectors["default"].getDeletePermissionByKey(getSubstate);

var getEditedActive = _selectors["default"].getEditedActive(getSubstate);

var getEditedAll = _selectors["default"].getEditedAll(getSubstate);

var getEditedAllAsObject = _selectors["default"].getEditedAllAsObject(getSubstate);

var getEditedByKey = _selectors["default"].getEditedByKey(getSubstate);

var getEditedDataByKey = _selectors["default"].getEditedDataByKey(getSubstate);

var getEditedKeys = _selectors["default"].getEditedKeys(getSubstate);

var getIndexed = _selectors["default"].getIndexed(getSubstate);

var getStateToSave = _selectors["default"].getStateToSave(getSubstate);

var getUpdatePermissionByKey = _selectors["default"].getUpdatePermissionByKey(getSubstate);

var getUsedKeysForComponent = _selectors["default"].getUsedKeysForComponent(getSubstate);

var haveAllKeysRegisteredUse = _selectors["default"].haveAllKeysRegisteredUse(getSubstate);
/**
 * Both start and end time must be defined, otherwise all available periods are returned.
 */

/**
 * Get periods which are between defined bounds
 * @param state {Object}
 * @param limitStart {string} moment-like time string
 * @param limitEnd {string} moment-like time string
 * @param {Object} Models
 */


var getAsObjectByFullPeriod = (0, _reReselect["default"])([getAllAsObject, function (state, limitStart) {
  return limitStart;
}, function (state, limitStart, limitEnd) {
  return limitEnd;
}], function (periods, limitStart, limitEnd) {
  if (periods && limitStart && limitEnd) {
    var selectedPeriods = (0, _lodash.pickBy)(periods, function (period) {
      var _period$data, _period$data2;

      var periodStart = (_period$data = period.data) === null || _period$data === void 0 ? void 0 : _period$data.start;
      var periodEnd = (_period$data2 = period.data) === null || _period$data2 === void 0 ? void 0 : _period$data2.end;

      if (periodStart && periodEnd) {
        return (0, _moment["default"])(periodStart).isBetween(limitStart, limitEnd, null, '[]') && (0, _moment["default"])(periodEnd).isBetween(limitStart, limitEnd, null, '[]');
      } else if (periodStart) {
        return (0, _moment["default"])(periodStart).isBetween(limitStart, limitEnd, null, '[]');
      } else if (periodEnd) {
        return (0, _moment["default"])(periodEnd).isBetween(limitStart, limitEnd, null, '[]');
      } else {
        return false;
      }
    });
    return (0, _lodash.isEmpty)(selectedPeriods) ? null : selectedPeriods;
  } else {
    return null;
  }
})(function (state, limitStart, limitEnd) {
  return "".concat(limitStart, "_").concat(limitEnd);
});
var _default = {
  getActive: getActive,
  getActiveKey: getActiveKey,
  getActiveKeys: getActiveKeys,
  getActiveModels: getActiveModels,
  getAll: getAll,
  getAllAsObject: getAllAsObject,
  getByKey: getByKey,
  getByKeys: getByKeys,
  getByKeysAsObject: getByKeysAsObject,
  getAsObjectByFullPeriod: getAsObjectByFullPeriod,
  getDataByKey: getDataByKey,
  getDeletePermissionByKey: getDeletePermissionByKey,
  getEditedActive: getEditedActive,
  getEditedAll: getEditedAll,
  getEditedAllAsObject: getEditedAllAsObject,
  getEditedByKey: getEditedByKey,
  getEditedDataByKey: getEditedDataByKey,
  getEditedKeys: getEditedKeys,
  getIndexed: getIndexed,
  getStateToSave: getStateToSave,
  getSubstate: getSubstate,
  getUpdatePermissionByKey: getUpdatePermissionByKey,
  getUsedKeysForComponent: getUsedKeysForComponent,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse
};
exports["default"] = _default;