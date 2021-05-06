"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _actions = _interopRequireDefault(require("../../_common/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var actionTypes = _ActionTypes["default"].DATA.ATTRIBUTE_RELATIONS;

var add = _actions["default"].add(actionTypes);

var addIndex = _actions["default"].addIndex(actionTypes); // ============ creators ===========

/**
 * It ensure adding index and adding or updating received data from BE.
 * Add relations to state only when attributeRelations received, in case of empty attributeRelations it adds only index.
 * @param {Array} attributeRelations Array received from BE contains attributeRelations.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn
 */


function receiveIndexed(attributeRelations, filter, order, start, total, changedOn, limit) {
  return function (dispatch) {
    // add attributeRelations to store
    if (attributeRelations.length) {
      dispatch(add(attributeRelations, filter));
    } // add to index


    dispatch(addIndex(filter, order, total, start, attributeRelations, changedOn, limit));
  };
}
/**
 * Create new index with loading indicator based on pagination.
 * @param {Object} pagination
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 */


function addLoadingIndex(pagination, filter, order) {
  var changedOn = null; // Fake new data object for common action of size same like pagination.limit
  // Action "common.addIndex" needs array of data objects with key to create new index.
  // "data" is a Array of the minimal data for construct index in common actoin.
  // Use key = true as a loading identificator

  var data = new Array(pagination.limit).fill({
    key: true
  }); // filter, order, data, start, count, changedOn

  return actionAddIndex(filter, order, data, pagination.offset + 1, null, changedOn);
} // ============ actions ============


var actionUpdateStore = function actionUpdateStore(data) {
  return {
    type: _ActionTypes["default"].DATA.ATTRIBUTE_RELATIONS.UPDATE_STORE,
    data: data
  };
};

function actionAddIndex(filter, order, data, start, count, changedOn) {
  return {
    type: actionTypes.INDEX.ADD,
    filter: filter,
    order: order,
    data: data,
    start: start,
    count: count,
    changedOn: changedOn
  };
} // ============ export ===========


var _default = {
  receiveIndexed: receiveIndexed,
  addLoadingIndex: addLoadingIndex,
  updateStore: actionUpdateStore
};
exports["default"] = _default;