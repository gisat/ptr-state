"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _reReselect = _interopRequireDefault(require("re-reselect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getSubstate = function getSubstate(state) {
  return state.attributeRelations;
};

var getAll = _selectors["default"].getAll(getSubstate);

var getIndexed = _selectors["default"].getIndexed(getSubstate);

var getFilteredDataSourceKeysWithFidColumn = (0, _reReselect["default"])([getAll, function (state, filter) {
  return filter;
}], function (relations, filter) {
  if (relations && relations.length) {
    // TODO more sophisticated filtering
    var attributeKeys = filter.attributeKey["in"] || [filter.attributeKey];

    var filterWithoutAttributes = _lodash["default"].omit(filter, 'attributeKey');

    var preFilteredRelations = _lodash["default"].filter(relations, {
      'data': filterWithoutAttributes
    });

    var filteredRelations = _lodash["default"].filter(preFilteredRelations, function (relation) {
      if (relation.data.attributeKey) {
        return !!_lodash["default"].includes(attributeKeys, relation.data.attributeKey);
      } else {
        return true;
      }
    });

    if (filteredRelations.length) {
      return filteredRelations.map(function (relation) {
        return {
          attributeDataSourceKey: relation.data.attributeDataSourceKey,
          attributeKey: relation.data.attributeKey,
          periodKey: relation.data.periodKey,
          fidColumnName: relation.data.fidColumnName
        };
      });
    } else {
      return null;
    }
  } else {
    return null;
  }
})(function (state, filter) {
  return JSON.stringify(filter);
});
var getFilteredDataSourceKeysWithFidColumnGroupedByLayerKey = (0, _reReselect["default"])([getAll, function (state, layersWithFilter) {
  return layersWithFilter;
}, function (state, layersWithFilter, layersState) {
  return layersState;
}], function (relations, layersWithFilter, layersState) {
  if (relations && relations.length) {
    var filteredGroupedByLayerKey = {};

    _lodash["default"].forEach(layersWithFilter, function (layer) {
      var layerState = _lodash["default"].find(layersState, {
        key: layer.key
      });

      var attributeKeys = layerState.attributeKeys;

      if (attributeKeys) {
        // TODO more sophisticated filtering
        var preFilteredRelations = _lodash["default"].filter(relations, {
          'data': layer.attributeFilter
        });

        var filteredRelations = _lodash["default"].filter(preFilteredRelations, function (relation) {
          if (relation.data.attributeKey) {
            return !!_lodash["default"].includes(attributeKeys, relation.data.attributeKey);
          } else {
            return true;
          }
        });

        if (filteredRelations.length) {
          filteredGroupedByLayerKey[layer.key] = filteredRelations.map(function (relation) {
            return {
              attributeDataSourceKey: relation.data.attributeDataSourceKey,
              attributeKey: relation.data.attributeKey,
              fidColumnName: relation.data.fidColumnName
            };
          });
        }
      } else {
        return null;
      }
    });

    return !_lodash["default"].isEmpty(filteredGroupedByLayerKey) ? filteredGroupedByLayerKey : null;
  } else {
    return null;
  }
})(function (state, layersWithFilter, layersState, layersStateAsString) {
  return layersStateAsString;
}); // DEPRECATED ---------------------

var getAllData = (0, _reselect.createSelector)([getAll], function (relations) {
  if (relations) {
    return _lodash["default"].map(relations, function (relation) {
      return relation.data;
    });
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param filter {Object}
 */

var getFiltered = (0, _reselect.createSelector)([getAllData, function (state, filter) {
  return filter;
}], function (relations, filter) {
  if (relations && relations.length > 0 && filter && !_lodash["default"].isEmpty(filter)) {
    return _lodash["default"].filter(relations, filter);
  } else {
    return null;
  }
});
var getFilteredRelations = (0, _reReselect["default"])([getAllData, function (state, filter) {
  return filter;
}], function (relations, filter) {
  if (relations && relations.length > 0 && filter && !_lodash["default"].isEmpty(filter)) {
    return _lodash["default"].filter(relations, function (relation) {
      var fitsFilter = true;

      _lodash["default"].forIn(filter, function (value, key) {
        if (relation.hasOwnProperty(key)) {
          if (_lodash["default"].isObject(value) && value["in"] && _lodash["default"].isArray(value["in"])) {
            if (!_lodash["default"].includes(value["in"], relation[key])) {
              fitsFilter = false;
            }
          } else if (relation[key] !== value) {
            fitsFilter = false;
          }
        }
      });

      return fitsFilter;
    });
  } else {
    return null;
  }
})(function (state, filter, cacheKey) {
  if (cacheKey) {
    return JSON.stringify(filter) + ':' + JSON.stringify(cacheKey);
  } else {
    return JSON.stringify(filter);
  }
});
var getDataSourcesFromFilteredRelations = (0, _reReselect["default"])([getFilteredRelations], function (filteredRelations) {
  if (filteredRelations) {
    return filteredRelations.map(function (relation) {
      return {
        attributeDataSourceKey: relation.attributeDataSourceKey,
        fidColumnName: relation.fidColumnName
      };
    });
  } else {
    return null;
  }
})(function (state, filter, cacheKey) {
  return "".concat(JSON.stringify(filter), ":").concat(JSON.stringify(cacheKey));
});
/**
 * @param state {Object}
 * @param filter {Object}
 * 
 * filter
 * {
 * 	layerTemplateKey
 *	scopeKey
 *	periodKey
 *	caseKey
 *	scenarioKey
 *	placeKey
 *	attributeKey
 * }
 */

var getDataSourceKeyFiltered = (0, _reselect.createSelector)([getFiltered], function (filteredRelations) {
  if (filteredRelations && !_lodash["default"].isEmpty(filteredRelations)) {
    //relation is only for one data, so return first
    return filteredRelations[0].dataSourceKey;
  } else {
    return null;
  } // if (filteredRelations && filteredRelations.length) {
  // 	return _.find(filteredRelations, relation => relation.dataSourceKey);
  // } else {
  // 	return null;
  // }

});
/**
 * Collect and prepare relations for given filters grouped by layer key
 *
 * @param state {Object}
 * @param layers {Array | null} Collection of layers data. Each object in collection contains filter property (it is used for selecting of relations) and data property (which contains data about layer from map state - e.g. key).
 */

var getFilteredDataGroupedByLayerKey = (0, _reselect.createSelector)([getAllData, function (state, layers) {
  return layers;
}],
/**
 * @param relations {Array | null} list of all relations data
 * @param layers {Array | null}
 * @return {Object | null} Selected relations grouped by layer key
 */
function (relations, layers) {
  if (layers && !_lodash["default"].isEmpty(layers)) {
    var groupedRelations = {};
    layers.forEach(function (layer) {
      if (layer.data && layer.data.key) {
        if (relations) {
          var filteredRelations = _lodash["default"].filter(relations, layer.filter);

          if (!_lodash["default"].isEmpty(filteredRelations)) {
            groupedRelations[layer.data.key] = filteredRelations;
          } else {
            groupedRelations[layer.data.key] = [null];
          }
        } else {
          groupedRelations[layer.data.key] = [null];
        }
      }
    });
    return !_lodash["default"].isEmpty(groupedRelations) ? groupedRelations : null;
  } else {
    return null;
  }
});
/**
 * Collect and prepare data relations grouped by layer key
 *
 * @param state {Object}
 * @param layers {Array | null} Collection of layers data. Each object in collection contains filter property (it is used for selecting of relations) and data property (which contains data about layer from map state - e.g. key).
 */

var getDataSourceRelationsGroupedByLayerKey = (0, _reselect.createSelector)([getFilteredDataGroupedByLayerKey],
/**
 * @param groupedRelations {null | Object} Relations grouped by layer key
 * @return {null | Object} Data sources keys grouped by layer key
 */
function (groupedRelations) {
  if (groupedRelations) {
    var groupedDataSourceKeys = {};

    _lodash["default"].forIn(groupedRelations, function (relationsData, layerKey) {
      groupedDataSourceKeys[layerKey] = relationsData;
    });

    return !_lodash["default"].isEmpty(groupedDataSourceKeys) ? groupedDataSourceKeys : null;
  } else {
    return null;
  }
});
/**
 * Collect and prepare data sources keys grouped by layer key
 *
 * @param state {Object}
 * @param layers {Array | null} Collection of layers data. Each object in collection contains filter property (it is used for selecting of relations) and data property (which contains data about layer from map state - e.g. key).
 */

var getDataSourceKeysGroupedByLayerKey = (0, _reselect.createSelector)([getDataSourceRelationsGroupedByLayerKey],
/**
 * @param groupedRelations {null | Object} Relations grouped by layer key
 * @return {null | Object} Data sources keys grouped by layer key
 */
function (groupedRelations) {
  if (groupedRelations) {
    var groupedRelationsDataSource = {};

    for (var _i = 0, _Object$entries = Object.entries(groupedRelations); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      groupedRelationsDataSource[key] = value.map(function (r) {
        return r ? r.attributeDataSourceKey : null;
      });
    }

    return groupedRelationsDataSource;
  } else {
    return null;
  }
});
var _default = {
  getFilteredDataSourceKeysWithFidColumn: getFilteredDataSourceKeysWithFidColumn,
  getFilteredDataSourceKeysWithFidColumnGroupedByLayerKey: getFilteredDataSourceKeysWithFidColumnGroupedByLayerKey,
  getIndexed: getIndexed,
  getAllData: getAllData,
  getDataSourceKeyFiltered: getDataSourceKeyFiltered,
  getFiltered: getFiltered,
  getFilteredRelations: getFilteredRelations,
  getFilteredDataGroupedByLayerKey: getFilteredDataGroupedByLayerKey,
  getDataSourceRelationsGroupedByLayerKey: getDataSourceRelationsGroupedByLayerKey,
  getDataSourceKeysGroupedByLayerKey: getDataSourceKeysGroupedByLayerKey,
  getDataSourcesFromFilteredRelations: getDataSourcesFromFilteredRelations,
  getSubstate: getSubstate
};
exports["default"] = _default;