"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selectors = _interopRequireDefault(require("../../_common/selectors"));

var _recompute = require("@jvitela/recompute");

var _lodash = _interopRequireDefault(require("lodash"));

var _recomputeHelpers = require("../../_common/recomputeHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSubstate = function getSubstate(state) {
  return state.data.attributeRelations;
};

var getIndex = _selectors["default"].getIndex(getSubstate);

var getIndex_recompute = _selectors["default"].getIndex_recompute(getSubstate);
/**
 * It returns relation model for given key, if exists
 * @param key {string} relation key
 * @return {Object} attribute relation
 */


var getByKeyObserver = (0, _recompute.createObserver)(function (state, key) {
  var _getSubstate, _getSubstate$byKey;

  return ((_getSubstate = getSubstate(state)) === null || _getSubstate === void 0 ? void 0 : (_getSubstate$byKey = _getSubstate.byKey) === null || _getSubstate$byKey === void 0 ? void 0 : _getSubstate$byKey[key]) || null;
});
/**
 * It returns relation models for given keys
 * @param keys {Array} relation keys
 * @return {Array} A collection of relations
 */

var getByKeys = (0, _recompute.createSelector)(function (keys) {
  if (keys !== null && keys !== void 0 && keys.length) {
    var relations = [];
    keys.forEach(function (key) {
      var relation = getByKeyObserver(key);

      if (relation) {
        relations.push(relation);
      }
    });
    return relations.length ? relations : null;
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * It returns a collection of indexed relations for given filter
 * @param filter {Object}
 * @return {Array}
 */

var getIndexed = (0, _recompute.createSelector)(function (filter) {
  var index = getIndex_recompute(filter, null);

  if (index !== null && index !== void 0 && index.index) {
    // filter only uuids (not true or false values of index)
    var keys = _lodash["default"].filter(Object.values(index.index), function (key) {
      return typeof key === 'string';
    });

    if (keys !== null && keys !== void 0 && keys.length) {
      return getByKeys(keys);
    } else {
      return null;
    }
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
/**
 * It returns key-value pairs, where the key is attribute data source key and the value is attribute key
 * @param filter {Object} attribute relation filter
 * @return {Object}
 */

var getFilteredAttributeDataSourceKeyAttributeKeyPairs = (0, _recompute.createSelector)(function (filter) {
  var relations = getIndexed(filter);

  if (relations) {
    var pairs = {};

    _lodash["default"].forEach(relations, function (relation) {
      pairs[relation.data.attributeDataSourceKey] = relation.data.attributeKey;
    });

    return pairs;
  } else {
    return null;
  }
}, _recomputeHelpers.recomputeSelectorOptions);
var _default = {
  getByKeyObserver: getByKeyObserver,
  getByKeys: getByKeys,
  getFilteredAttributeDataSourceKeyAttributeKeyPairs: getFilteredAttributeDataSourceKeyAttributeKeyPairs,
  getIndexed: getIndexed,
  getIndex: getIndex
};
exports["default"] = _default;