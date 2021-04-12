"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _Select = _interopRequireDefault(require("../Select"));

var _actions = _interopRequireDefault(require("../_common/actions"));

var _actions2 = _interopRequireDefault(require("../Attributes/actions"));

var _actions3 = _interopRequireDefault(require("../AttributeData/actions"));

var _actions4 = _interopRequireDefault(require("../AttributeStatistics/actions"));

var _actions5 = _interopRequireDefault(require("../AttributeDataSources/actions"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _lodash = _interopRequireDefault(require("lodash"));

var _ptrUtils = require("@gisatcz/ptr-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var useIndexedRegister = function useIndexedRegister(componentId, filterByActive, filter, order, start, length) {
  return _actions["default"].useIndexedRegister(_ActionTypes["default"].ATTRIBUTE_RELATIONS, componentId, filterByActive, filter, order, start, length);
};

var useIndexed = _actions["default"].useIndexed(_Select["default"].attributeRelations.getSubstate, 'attribute', _ActionTypes["default"].ATTRIBUTE_RELATIONS, 'relations');

var useIndexedClearAll = _actions["default"].useIndexedClearAll(_ActionTypes["default"].ATTRIBUTE_RELATIONS);

var ensureIndexed = function ensureIndexed(filter, order, start, length) {
  return _actions["default"].ensureIndexed(_Select["default"].attributeRelations.getSubstate, 'attribute', filter, order, start, length, _ActionTypes["default"].ATTRIBUTE_RELATIONS, 'relations');
}; // ============ actions ===========


function ensureIndexedSpecific(filter, order, start, length, componentId, noStatistic) {
  return function (dispatch, getState) {
    dispatch(_actions["default"].ensureIndexed(_Select["default"].attributeRelations.getSubstate, 'attribute', filter, order, start, length, _ActionTypes["default"].ATTRIBUTE_RELATIONS, 'relations')).then(function () {
      var filteredRelations = _Select["default"].attributeRelations.getFilteredRelations(getState(), filter);

      if (filteredRelations) {
        var dataSourceKeys = _lodash["default"].map(filteredRelations, function (relation) {
          return relation.attributeDataSourceKey;
        });

        var attributeKeys = _lodash["default"].map(filteredRelations, function (relation) {
          return relation.attributeKey;
        });

        var fidColumnNames = null;
        var attributeDataSourceKeys = [];
        filteredRelations.map(function (relation) {
          fidColumnNames = relation.fidColumnName; // TODO is fidColumnName still the same

          attributeDataSourceKeys.push(relation.attributeDataSourceKey);
        });

        var uniqueAtributeDataSourceKeys = _lodash["default"].uniq(attributeDataSourceKeys);

        var attributeDataFilter = {
          fidColumnName: fidColumnNames,
          attributeDataSourceKey: {
            "in": uniqueAtributeDataSourceKeys
          }
        };
        var statisticsFilter = {
          percentile: _ptrUtils.statistics.quartilePercentiles,
          attributeDataSourceKey: {
            "in": uniqueAtributeDataSourceKeys
          }
        };
        /* use attributes */

        if (attributeKeys && attributeKeys.length) {
          var uniqueKeys = _lodash["default"].uniq(attributeKeys);

          dispatch(_actions2["default"].useKeys(uniqueKeys, componentId));
        }
        /* use attribute data sources */


        dispatch(_actions5["default"].useKeys(dataSourceKeys, componentId));
        /* use attribute statistics */

        /* TODO use indexed? */

        var existingStatisticsSource = _Select["default"].attributeStatistics.getBatchByFilterOrder(getState(), statisticsFilter, null);

        if (!noStatistic && !existingStatisticsSource) {
          dispatch(_actions4["default"].loadFilteredData(statisticsFilter, componentId));
        }
        /* use attribute data */


        var existingSource = _Select["default"].attributeData.getBatchByFilterOrder(getState(), attributeDataFilter, null);

        if (!existingSource) {
          dispatch(_actions3["default"].loadFilteredData(attributeDataFilter, componentId));
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

    var usedIndexes = _selectors["default"].getUsesWithActiveDependency(_Select["default"].attributeRelations.getSubstate)(state, filterByActive); // TODO pass componentId


    _lodash["default"].each(usedIndexes, function (usedIndex) {
      _lodash["default"].each(usedIndex.uses, function (use) {
        dispatch(ensureIndexedSpecific(usedIndex.filter, usedIndex.order, use.start, use.length)); // dispatch(ensureIndexedSpecificForLegend(usedIndex.filter, usedIndex.order, use.start, use.length))
      });
    });
  };
} // ============ export ===========


var _default = {
  useIndexed: useIndexed,
  useIndexedClearAll: useIndexedClearAll,
  useIndexedRegister: useIndexedRegister,
  ensureIndexed: ensureIndexed,
  ensureIndexesWithFilterByActive: ensureIndexesWithFilterByActive,
  // TODO join with ensure indexed
  ensureIndexedSpecific: ensureIndexedSpecific
};
exports["default"] = _default;