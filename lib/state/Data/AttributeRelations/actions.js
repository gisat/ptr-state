"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _actions = _interopRequireDefault(require("../../_common/actions"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
 * Create new index based on given level and tiles with loading indicator.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} level
 * @param {Array.[Array]} tiles
 */


function addLoadingIndex(pagination, filter, order) {
  var changedOn = null; //Fake new data object for common action

  var data = _lodash["default"].reduce(_toConsumableArray(Array(pagination.limit)), function (acc, val) {
    //Use key = true as a loading identificator
    return [].concat(_toConsumableArray(acc), [{
      key: true
    }]);
  }, []); // filter, order, data, start, count, changedOn


  return addIndexAction(filter, order, data, pagination.offset + 1, null, changedOn);
} // ============ actions ============


var actionUpdateStore = function actionUpdateStore(data) {
  return {
    type: _ActionTypes["default"].DATA.ATTRIBUTE_RELATIONS.UPDATE_STORE,
    data: data
  };
};

function addIndexAction(filter, order, data, start, count, changedOn) {
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