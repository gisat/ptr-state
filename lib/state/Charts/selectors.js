"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _selectors = _interopRequireDefault(require("../AttributeData/selectors"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO test all selectors
var getAllChartsAsObject = function getAllChartsAsObject(state) {
  return state.charts.charts;
};

var getChartByKey = function getChartByKey(state, key) {
  return state.charts.charts[key];
};

var getSetByKey = function getSetByKey(state, key) {
  return state.charts.sets[key];
};

var getChartsBySetKeyAsObject = (0, _reselect.createSelector)([getSetByKey, getAllChartsAsObject], function (set, charts) {
  if (set && set.charts && set.charts.length) {
    var setCharts = {};

    _lodash["default"].each(set.charts, function (key) {
      setCharts[key] = charts[key];
    });

    return setCharts;
  } else {
    return null;
  }
}); // TODO other metadata types

var getMetadataActiveKeys = function getMetadataActiveKeys(state) {
  return {
    activeScopeKey: state.scopes.activeKey,
    activePeriodKey: state.periods.activeKey,
    activePeriodKeys: state.periods.activeKeys,
    activeAttributeKey: state.attributes.activeKey
  };
};

var getChartConfiguration = (0, _reReselect["default"])([getChartByKey, getMetadataActiveKeys, function (state, chart, useActiveMetadataKeys) {
  return useActiveMetadataKeys;
}], function (chart, activeKeys, useActiveMetadataKeys) {
  if (chart && activeKeys) {
    var filters = getFiltersForUse(chart.data, activeKeys, useActiveMetadataKeys);
    return _objectSpread(_objectSpread({}, chart), filters);
  } else {
    return null;
  }
})(function (state, chart) {
  return "".concat(chart && chart.key);
});
var getDataForChart = (0, _reReselect["default"])([_selectors["default"].getFilteredGroupedByFid, function (state, filter, chartKey) {
  return chartKey;
}], function (data, chartKey) {
  if (chartKey && data) {
    return data;
  } else {
    return null;
  }
})(function (state, filter, chartKey) {
  return "".concat(JSON.stringify(filter), ":").concat(chartKey);
});
var getNamesForChart = (0, _reReselect["default"])([_selectors["default"].getNamesByFid, function (state, filter, cacheKey) {
  return cacheKey;
}], function (data, cacheKey) {
  if (cacheKey && data) {
    return data;
  } else {
    return null;
  }
})(function (state, filter, cacheKey) {
  return "".concat(JSON.stringify(filter), ":").concat(cacheKey);
});
/* helpers */

/**
 * Prepare filters for use from layers state
 * @param data {Object} chart data
 * @param activeKeys {Object} Metadata active keys
 * @param useActiveMetadataKeys {Object} Metadata active keys
 * @return {{filter, filterByActive, mergedFilter, data}}
 */
// TODO other metadata types

function getFiltersForUse(data, activeKeys, useActiveMetadataKeys) {
  var filter = {};
  var filterByActive = {};
  var mergedFilter = {};

  if (data && data.hasOwnProperty('scope')) {
    filter.scopeKey = data.scope;
  } else if (useActiveMetadataKeys && useActiveMetadataKeys.scope) {
    filterByActive.scope = true;

    if (activeKeys && activeKeys.activeScopeKey) {
      mergedFilter.scopeKey = activeKeys.activeScopeKey;
    }
  }

  if (data && data.hasOwnProperty('periods')) {
    if (data.periods.length > 1) {
      filter.periodKey = {
        "in": data.periods
      };
    } else {
      filter.periodKey = data.periods[0];
    }
  } else if (useActiveMetadataKeys && useActiveMetadataKeys.period) {
    filterByActive.period = true;

    if (activeKeys && activeKeys.activePeriodKey) {
      mergedFilter.periodKey = activeKeys.activePeriodKey;
    } else if (activeKeys && activeKeys.activePeriodKeys) {
      mergedFilter.periodKey = {
        "in": activeKeys.activePeriodKeys
      };
    }
  }

  if (data && data.hasOwnProperty('attributes')) {
    if (data.attributes.length > 1) {
      filter.attributeKey = {
        "in": data.attributes
      };
    } else {
      filter.attributeKey = data.attributes[0];
    }
  } else if (useActiveMetadataKeys && useActiveMetadataKeys.attribute) {
    filterByActive.attribute = true;

    if (activeKeys && activeKeys.activeAttributeKey) {
      mergedFilter.attributeKey = activeKeys.activeAttributeKey;
    } else if (activeKeys && activeKeys.activeAttributeKeys) {
      mergedFilter.attributeKey = {
        "in": activeKeys.activeAttributeKeys
      };
    }
  }

  if (data && data.hasOwnProperty('layerTemplate')) {
    filter.layerTemplateKey = data.layerTemplate;
  }

  mergedFilter = _objectSpread(_objectSpread({}, filter), mergedFilter);
  return {
    filter: filter,
    filterByActive: filterByActive,
    mergedFilter: mergedFilter
  };
}

var _default = {
  getChartConfiguration: getChartConfiguration,
  getChartsBySetKeyAsObject: getChartsBySetKeyAsObject,
  getDataForChart: getDataForChart,
  getNamesForChart: getNamesForChart,
  getSetByKey: getSetByKey
};
exports["default"] = _default;