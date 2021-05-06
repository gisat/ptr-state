"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _selectors2 = _interopRequireDefault(require("../Attributes/selectors"));

var _selectors3 = _interopRequireDefault(require("../AttributeSets/selectors"));

var _selectors4 = _interopRequireDefault(require("../Components/selectors"));

var _selectors5 = _interopRequireDefault(require("../Scopes/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.views;
};

var getActive = _selectors["default"].getActive(getSubstate);

var getActiveKey = _selectors["default"].getActiveKey(getSubstate);

var getAll = _selectors["default"].getAll(getSubstate);

var getAllAsObject = _selectors["default"].getAllAsObject(getSubstate);

var getByKey = _selectors["default"].getByKey(getSubstate);

var getByKeys = _selectors["default"].getByKeys(getSubstate);

var getByKeysAsObject = _selectors["default"].getByKeysAsObject(getSubstate);

var getDataByKey = _selectors["default"].getDataByKey(getSubstate);

var getEditedActive = _selectors["default"].getEditedActive(getSubstate);

var getEditedAll = _selectors["default"].getEditedAll(getSubstate);

var getEditedAllAsObject = _selectors["default"].getEditedAllAsObject(getSubstate);

var getEditedByKey = _selectors["default"].getEditedByKey(getSubstate);

var getEditedDataByKey = _selectors["default"].getEditedDataByKey(getSubstate);

var getEditedKeys = _selectors["default"].getEditedKeys(getSubstate);

var getIndexed = _selectors["default"].getIndexed(getSubstate);

var getDeletePermissionByKey = _selectors["default"].getDeletePermissionByKey(getSubstate);

var getUpdatePermissionByKey = _selectors["default"].getUpdatePermissionByKey(getSubstate);

var getUsedKeysForComponent = _selectors["default"].getUsedKeysForComponent(getSubstate);

var haveAllKeysRegisteredUse = _selectors["default"].haveAllKeysRegisteredUse(getSubstate); // TODO add other stores


var getStateToSave = (0, _reselect.createSelector)([_selectors2["default"].getStateToSave, _selectors3["default"].getStateToSave, _selectors4["default"].getStateToSave, _selectors5["default"].getStateToSave], function (attributes, attributeSets, components, scopes) {
  return {
    attributes: attributes,
    attributeSets: attributeSets,
    components: components,
    scopes: scopes
  };
});
var _default = {
  getActive: getActive,
  getActiveKey: getActiveKey,
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