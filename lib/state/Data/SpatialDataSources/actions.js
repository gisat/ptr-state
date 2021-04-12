"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _actions = _interopRequireDefault(require("../../_common/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var actionTypes = _ActionTypes["default"].DATA.SPATIAL_DATA_SOURCES;

var addIndex = _actions["default"].addIndex(actionTypes);

var add = _actions["default"].add(actionTypes); // ============ creators ===========

/**
 * It ensure adding index and adding received spatialDataSources from BE.
 * Add dataSources to state only when spatialDataSources received, in case of empty spatialDataSources it adds only index.
 * @param {Object} spatialDataSources Object received from BE.
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn
 */


function receiveIndexed(spatialDataSources, filter, order, start, total, changedOn) {
  return function (dispatch) {
    // add spatialDataSources to store
    // There should be check if spatialDataSources is already in the store.
    if (spatialDataSources.length) {
      dispatch(add(spatialDataSources, filter));
    } // add to index


    dispatch(addIndex(filter, order, total, start, spatialDataSources, changedOn));
  };
} // ============ actions ============
// ============ export ===========


var _default = {
  add: add,
  receiveIndexed: receiveIndexed
};
exports["default"] = _default;