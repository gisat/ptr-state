"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _lodash = _interopRequireWildcard(require("lodash"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getSubstate = function getSubstate(state) {
  return state.spatialRelations;
};

var getAll = _selectors["default"].getAll(getSubstate);

var getByKey = _selectors["default"].getByKey(getSubstate);

var getByKeys = _selectors["default"].getByKeys(getSubstate);
/**
 * @return {Array|null}
 */


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
 * @returns {Array|null}
 */

var getFilteredData = (0, _reselect.createSelector)([getAllData, function (state, filter) {
  return filter;
}], function (relations, filter) {
  if (relations && relations.length > 0 && filter && !_lodash["default"].isEmpty(filter)) {
    return _lodash["default"].filter(relations, filter);
  } else {
    return null;
  }
});
/**
 * @returns {Object}
 */

var getFilteredDataSourceKeysGroupedByLayerKey = (0, _reReselect["default"])([getAll, function (state, layers) {
  return layers;
}], function (relations, layers) {
  if (relations && relations.length) {
    var filteredGroupedByLayerKey = {};

    _lodash["default"].forEach(layers, function (layer) {
      var filteredRelations = _lodash["default"].filter(relations, {
        'data': layer.filter
      });

      if (filteredRelations.length) {
        filteredGroupedByLayerKey[layer.key] = filteredRelations.map(function (relation) {
          return {
            spatialDataSourceKey: relation.data.spatialDataSourceKey,
            fidColumnName: relation.data.fidColumnName
          };
        });
      }
    });

    return !_lodash["default"].isEmpty(filteredGroupedByLayerKey) ? filteredGroupedByLayerKey : null;
  } else {
    return null;
  }
})(function (state, layers) {
  return JSON.stringify(layers);
});
/**
 * @returns {Object}
 */

var getFilteredDataGroupedByLayerTemplateKey = (0, _reReselect["default"])([getAll, function (state, layers) {
  return layers;
}], function (relations, layers) {
  if (relations && relations.length) {
    var filteredGroupedByLayerKey = {};

    _lodash["default"].forEach(layers, function (layer) {
      var filteredRelations = _lodash["default"].filter(relations, {
        'data': layer.filter
      });

      var layerTemplateKey = layer.filter.layerTemplateKey;

      if (layerTemplateKey && filteredRelations.length) {
        filteredGroupedByLayerKey[layerTemplateKey] = filteredRelations;
      }
    });

    return !_lodash["default"].isEmpty(filteredGroupedByLayerKey) ? filteredGroupedByLayerKey : null;
  } else {
    return null;
  }
})(function (state, layersState) {
  return layersState.map(function (l) {
    return l.filter && l.filter.layerTemplateKey;
  }).join(',');
});
/********************************
 DEPRECATED
 ********************************/

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
      var layerKey = layer.key || layer.data && layer.data.key;

      if (layerKey) {
        if (relations && relations.length) {
          var filter = (0, _lodash.cloneDeep)(layer.filter); //TODO
          //sapatial data should not be filtered by period and attributeKey

          delete filter.attributeKey;

          var filteredRelations = _lodash["default"].filter(relations, filter);

          if (!_lodash["default"].isEmpty(filteredRelations)) {
            groupedRelations[layerKey] = filteredRelations;
          } else {
            groupedRelations[layerKey] = [null];
          }
        } else {
          groupedRelations[layerKey] = [null];
        }
      }
    });
    return !_lodash["default"].isEmpty(groupedRelations) ? groupedRelations : null;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param filter {Object}
 */

var getDataSourceKeysFiltered = (0, _reselect.createSelector)([getFilteredData], function (filteredRelations) {
  if (filteredRelations && filteredRelations.length) {
    return _lodash["default"].map(filteredRelations, function (relation) {
      return relation.spatialDataSourceKey;
    });
  } else {
    return null;
  }
});
/**
 * Filter spatialRelationsData by layerTemplateKeys.
 *
 * @param state {Object}
 * @param layerTemplateKeys {Array | null} Array of layerTemplateKeys.
 */

var getDataSourceRelationsByLayerTemplateKeys = (0, _reselect.createSelector)([getAllData, function (state, layerTemplateKeys) {
  return layerTemplateKeys;
}], function (allData, layerTemplateKeys) {
  if (allData && !_lodash["default"].isEmpty(allData) && layerTemplateKeys && !_lodash["default"].isEmpty(layerTemplateKeys)) {
    var filtered = allData.filter(function (i) {
      return layerTemplateKeys.includes(i.layerTemplateKey);
    });
    return !_lodash["default"].isEmpty(filtered) ? filtered : null;
  } else {
    return null;
  }
}); // TODO wtf?

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
        return r ? r.spatialDataSourceKey : null;
      });
    }

    return groupedRelationsDataSource;
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

var getDataSourceRelationsForLayerKey = (0, _reselect.createSelector)([getDataSourceRelationsGroupedByLayerKey, function (state, layers) {
  return layers;
}, //FIXME -> create selector for layers
function (state, layerKey) {
  return layerKey;
}],
/**
 * @param groupedRelations {null | Object} Relations grouped by layer key
 * @return {null | Object} Data sources keys grouped by layer key
 */
function (groupedRelations, layerKey) {
  if (groupedRelations) {
    return groupedRelations[layerKey] || null;
  } else {
    return null;
  }
});
var _default = {
  getSubstate: getSubstate,
  getByKey: getByKey,
  getByKeys: getByKeys,
  getAllData: getAllData,
  getFilteredData: getFilteredData,
  getFilteredDataSourceKeysGroupedByLayerKey: getFilteredDataSourceKeysGroupedByLayerKey,
  getFilteredDataGroupedByLayerTemplateKey: getFilteredDataGroupedByLayerTemplateKey,
  // Deprecated
  getDataSourceKeysFiltered: getDataSourceKeysFiltered,
  getDataSourceKeysGroupedByLayerKey: getDataSourceKeysGroupedByLayerKey,
  getDataSourceRelationsGroupedByLayerKey: getFilteredDataGroupedByLayerKey,
  getDataSourceRelationsByLayerTemplateKeys: getDataSourceRelationsByLayerTemplateKeys,
  getDataSourceRelationsForLayerKey: getDataSourceRelationsForLayerKey,
  getFilteredDataGroupedByLayerKey: getFilteredDataGroupedByLayerKey
};
exports["default"] = _default;