"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var getByAoiKey = function getByAoiKey(state) {
  return state.layerPeriods.byAoiKey;
};

var getByPlaceKey = function getByPlaceKey(state) {
  return state.layerPeriods.byPlaceKey;
};

var getByKey = function getByKey(state) {
  return state.layerPeriods.byKey;
};

var getActiveAoiKey = function getActiveAoiKey(state) {
  return state.aoi.activeKey;
};

var getActivePlaceKey = function getActivePlaceKey(state) {
  return state.places.activeKey;
};

var getActiveLpisCaseKey = function getActiveLpisCaseKey(state) {
  return state.specific.lpisChangeReviewCases.activeCaseKey;
};

var getActiveAoiData = (0, _reselect.createSelector)([getByAoiKey, getActiveAoiKey], function (byAoiKey, activeAoiKey) {
  return byAoiKey[activeAoiKey];
});
var getActivePlaceData = (0, _reselect.createSelector)([getByPlaceKey, getActivePlaceKey], function (byPlaceKey, activePlaceKey) {
  return byPlaceKey[activePlaceKey];
});
var getForActiveLpisCase = (0, _reselect.createSelector)([getByKey, getActiveLpisCaseKey], function (byKey, activeLpisCaseKey) {
  return byKey['lpisCase' + activeLpisCaseKey];
});
var _default = {
  getActiveAoiData: getActiveAoiData,
  getActivePlaceData: getActivePlaceData,
  getForActiveLpisCase: getForActiveLpisCase
};
exports["default"] = _default;