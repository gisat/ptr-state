"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _actions = _interopRequireDefault(require("../../_common/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var actionTypes = _ActionTypes["default"].DATA.SPATIAL_RELATIONS;

var addIndex = _actions["default"].addIndex(actionTypes);

var add = _actions["default"].add(actionTypes); // ============ creators ===========

/**
 * It ensure adding index and adding received spatialRelations from BE.
 * Add relations to state only when spatialRelations received, in case of empty spatialRelations it adds only index.
 * @param {Object} spatialRelations Object received from BE.
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn
 */


function receiveIndexed(spatialRelations, filter, order, start, total, changes) {
  return function (dispatch) {
    // add spatialRelations to store
    // There should be check if relation is already in the store.
    if (spatialRelations.length) {
      dispatch(add(spatialRelations, filter));
    } // add to index


    dispatch(addIndex(filter, order, total, start, spatialRelations, changes));
  };
} // ============ actions ============
// ============ export ===========


var _default = {
  receiveIndexed: receiveIndexed
};
exports["default"] = _default;