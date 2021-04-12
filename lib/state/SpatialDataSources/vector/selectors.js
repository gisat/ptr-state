"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _selectors = _interopRequireDefault(require("../../_common/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.spatialVectorDataSources;
};

var getAll = _selectors["default"].getAll(getSubstate);

var getAllAsObject = _selectors["default"].getAllAsObject(getSubstate);

var getByKey = _selectors["default"].getByKey(getSubstate);

var getBatchByFilterOrder = _selectors["default"].getBatchByFilterOrder(getSubstate);

var getDataByKey = _selectors["default"].getDataByKey(getSubstate);

var getEditedFeatures = function getEditedFeatures(state) {
  return state.spatialDataSources.vector.editedFeaturesBySourceKey;
};

var noMemoGetFeaturesBySourceKey = function noMemoGetFeaturesBySourceKey(state, props) {
  return state.spatialDataSources.vector.featuresBySourceKey[props.dataSourceKey];
};

var noMemoGetEditedFeaturesBySourceKey = function noMemoGetEditedFeaturesBySourceKey(state, props) {
  return state.spatialDataSources.vector.editedFeaturesBySourceKey[props.dataSourceKey];
};

var noMemoGetSelectedFeaturesKeysBySourceKey = function noMemoGetSelectedFeaturesKeysBySourceKey(state, props) {
  return state.spatialDataSources.vector.selectedFeaturesKeysBySourceKey[props.dataSourceKey];
};

var noMemoGetSelectedFeaturesBySourceKey = function noMemoGetSelectedFeaturesBySourceKey(state, props) {
  return _lodash["default"].filter(noMemoGetFeaturesBySourceKey(state, props), function (feature) {
    return _lodash["default"].includes(noMemoGetSelectedFeaturesKeysBySourceKey(state, props), feature.key);
  });
};

var _default = {
  noMemoGetFeaturesBySourceKey: noMemoGetFeaturesBySourceKey,
  noMemoGetEditedFeaturesBySourceKey: noMemoGetEditedFeaturesBySourceKey,
  noMemoGetSelectedFeaturesBySourceKey: noMemoGetSelectedFeaturesBySourceKey,
  getBatchByFilterOrder: getBatchByFilterOrder,
  getSubstate: getSubstate,
  getEditedFeatures: getEditedFeatures,
  getAll: getAll,
  getAllAsObject: getAllAsObject,
  getByKey: getByKey,
  getDataByKey: getDataByKey
};
exports["default"] = _default;