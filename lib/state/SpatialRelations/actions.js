"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _Select = _interopRequireDefault(require("../Select"));

var _actions = _interopRequireDefault(require("../_common/actions"));

var _lodash = _interopRequireDefault(require("lodash"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _actions2 = _interopRequireDefault(require("../SpatialDataSources/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var useIndexedRegister = function useIndexedRegister(componentId, filterByActive, filter, order, start, length) {
  return _actions["default"].useIndexedRegister(_ActionTypes["default"].SPATIAL_RELATIONS, componentId, filterByActive, filter, order, start, length);
};

var ensureIndexed = function ensureIndexed(filter, order, start, length) {
  return _actions["default"].ensureIndexed(_Select["default"].spatialRelations.getSubstate, 'spatial', filter, order, start, length, _ActionTypes["default"].SPATIAL_RELATIONS, 'relations');
};

var add = _actions["default"].add(_ActionTypes["default"].SPATIAL_RELATIONS);

var useIndexedClearAll = _actions["default"].useIndexedClearAll(_ActionTypes["default"].SPATIAL_RELATIONS);

function ensureIndexedAndEnsureDependencies(filter, order, start, length, componentId, noStatistic) {
  return function (dispatch, getState) {
    dispatch(_actions["default"].ensureIndexed(_Select["default"].spatialRelations.getSubstate, 'spatial', filter, order, start, length, _ActionTypes["default"].SPATIAL_RELATIONS, 'relations')).then(function () {
      var filteredRelations = _Select["default"].spatialRelations.getFilteredData(getState(), filter);

      if (filteredRelations) {
        var dataSourceKeys = _lodash["default"].map(filteredRelations, function (relation) {
          return relation.spatialDataSourceKey;
        });

        var uniqueDataSourcesKeys = _lodash["default"].uniq(dataSourceKeys);
        /* Ensure spatial data sources */
        // TODO component id?


        if (uniqueDataSourcesKeys) {
          dispatch(_actions2["default"].useKeys(uniqueDataSourcesKeys, componentId)).then(function () {// TODO load data for vector data sources
          });
        }
      }
    })["catch"](function (err) {
      dispatch(_actions["default"].actionGeneralError(err));
    });
  };
}

function ensureIndexesWithFilterByActive(filterByActive) {
  return function (dispatch, getState) {
    var state = getState();

    var usedIndexes = _selectors["default"].getUsesWithActiveDependency(_Select["default"].spatialRelations.getSubstate)(state, filterByActive); // TODO pass componentId


    _lodash["default"].each(usedIndexes, function (usedIndex) {
      _lodash["default"].each(usedIndex.uses, function (use) {
        dispatch(ensureIndexedAndEnsureDependencies(usedIndex.filter, usedIndex.order, use.start, use.length));
      });
    });
  };
} // ============ export ===========


var _default = {
  add: add,
  useIndexedRegister: useIndexedRegister,
  useIndexedClearAll: useIndexedClearAll,
  ensureIndexed: ensureIndexed,
  ensureIndexesWithFilterByActive: ensureIndexesWithFilterByActive
};
exports["default"] = _default;