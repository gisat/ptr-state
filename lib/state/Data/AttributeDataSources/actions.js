"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _actions = _interopRequireDefault(require("../../_common/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var actionTypes = _ActionTypes["default"].DATA.ATTRIBUTE_DATA_SOURCES;

var addIndex = _actions["default"].addIndex(actionTypes);

var add = _actions["default"].add(actionTypes); // ============ creators ===========

/**
 * It ensure adding index and adding or updating received data from BE.
 * Add dataSources to state only when attributeDataSources received, in case of empty attributeDataSources it adds only index.
 * @param {Array} attributeDataSources Array received from BE contains attributeDataSource definitions.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn
 */


function receiveIndexed(attributeDataSources, filter, order, start, total, changedOn) {
  return function (dispatch) {
    // add attributeDataSources to store
    if (attributeDataSources.length) {
      dispatch(add(attributeDataSources, filter));
    } // add to index


    dispatch(addIndex(filter, order, total, start, attributeDataSources, changedOn));
  };
} // ============ actions ============


var actionUpdateStore = function actionUpdateStore(data) {
  return {
    type: _ActionTypes["default"].DATA.ATTRIBUTE_DATA_SOURCES.UPDATE_STORE,
    data: data
  };
}; // ============ export ===========


var _default = {
  add: add,
  receiveIndexed: receiveIndexed,
  updateStore: actionUpdateStore
};
exports["default"] = _default;