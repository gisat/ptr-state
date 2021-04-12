"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selectors = _interopRequireDefault(require("../_common/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.attributeSets;
};

var getAll = _selectors["default"].getAll(getSubstate);

var getAllAsObject = _selectors["default"].getAllAsObject(getSubstate);

var getActiveKey = _selectors["default"].getActiveKeys(getSubstate);

var getActiveKeys = _selectors["default"].getActiveKeys(getSubstate);

var getActiveModels = _selectors["default"].getActiveModels(getSubstate);

var getActive = _selectors["default"].getActive(getSubstate);

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