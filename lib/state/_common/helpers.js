"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Return index for given filter and order
 * @param indexes {Array} list of indexes
 * @param filter {Object}
 * @param order {Array}
 */
var getIndex = (0, _reReselect["default"])([function (indexes) {
  return indexes;
}, function (indexes, filter) {
  return filter;
}, function (indexes, filter, order) {
  return order;
}], function (indexes, filter, order) {
  if (indexes) {
    var index = (0, _lodash.find)(indexes, function (index) {
      return isCorrespondingIndex(index, filter, order);
    });
    return index ? index : null;
  } else {
    return null;
  }
})(function (indexes, filter, order) {
  return "".concat(JSON.stringify(filter)).concat(JSON.stringify(order));
});
/**
 * Remove duplicate indexes from given indexes. Returns new Array.
 * @param {Array} indexes Array of indexes where can index duplicate.
 * @returns {Array} unique indexes
 */

function getUniqueIndexes(indexes) {
  if (!(0, _lodash.isEmpty)(indexes)) {
    return indexes.reduce(function (uniqueIndexes, index) {
      if ((0, _lodash.find)(uniqueIndexes, function (i) {
        return i && isCorrespondingIndex(index, i.filter, i.order);
      })) {
        return uniqueIndexes;
      }

      return [].concat(_toConsumableArray(uniqueIndexes), [index]);
    }, []);
  } else {
    return null;
  }
}
/**
 * Remove index from given indexes that fit to filter and order.
 * If index does not exists under filter, same instance of indexes has return.
 * @param indexes {Array} Array of indexes
 * @param filter {Object}
 * @param order {Array}
 * @return {Array} New instance of indexes
 */


function removeIndex() {
  var indexes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var filter = arguments.length > 1 ? arguments[1] : undefined;
  var order = arguments.length > 2 ? arguments[2] : undefined;

  if (indexes && !(0, _lodash.isEmpty)(indexes)) {
    var clearedIndexes = (0, _lodash.reduce)(indexes, function (acc, index) {
      var indexToBeCleared = isCorrespondingIndex(index, filter, order);

      if (indexToBeCleared) {
        return acc;
      } else {
        return [].concat(_toConsumableArray(acc), [index]);
      }
    }, []);

    if (clearedIndexes.length === indexes.length) {
      return indexes;
    } else {
      return clearedIndexes;
    }
  } else {
    return indexes;
  }
}
/**
 * Create set of updated indexes state based on current state and given indexUpdate.
 * It produce updated indexes state in case of existing index for given filter and order.
 * If index with filter and order is not in the state yet, its add to indexes state.
 * @param state {Object}
 * @param filter {Object}
 * @param order {Array}
 * @param indexUpdate {Array}
 * @param changedOn {string}
 * @param indexesPath {string} name of a property where indexes are stored
 */


function getUpdatedIndexes(state, filter, order, indexUpdate, changedOn) {
  var indexesPath = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'indexes';
  var indexes = [];
  var selectedIndex = {};

  if (state[indexesPath]) {
    state[indexesPath].forEach(function (index) {
      if ((0, _lodash.isEqual)(index.filter, filter) && (0, _lodash.isEqual)(index.order, order)) {
        selectedIndex = index;
      } else {
        indexes.push(index);
      }
    });
  }

  var index;

  if (indexUpdate.length) {
    index = _objectSpread({}, selectedIndex.index);
    indexUpdate.forEach(function (model, i) {
      if (model.key) {
        index[i] = model.key;
      } else {
        //spatial data by spatialDataSourceKey, levels and tiles
        //update spatialDataSourceKey
        for (var _i = 0, _Object$entries = Object.entries(model); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              level = _Object$entries$_i[0],
              dataByTiles = _Object$entries$_i[1];

          if (index.hasOwnProperty(level) && index[level]) {
            //update data on level
            index[level] = _objectSpread(_objectSpread({}, index[level]), dataByTiles);
          } else {
            index[level] = _objectSpread({}, dataByTiles);
          }
        }
      }
    });
  }

  selectedIndex = {
    filter: selectedIndex.filter || filter,
    order: selectedIndex.order || order,
    changedOn: changedOn,
    index: index || selectedIndex.index
  };
  indexes.push(selectedIndex);
  return indexes;
}
/**
 * Extend object "currentByDataSourceKey" by "update". Return new instance.
 * @param {Object} currentByDataSourceKey
 * @param {Object} update
 * @return {Object}
 */


function getUpdatedByDataSourceKey(currentByDataSourceKey) {
  var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var updated = _objectSpread({}, currentByDataSourceKey);

  for (var _i2 = 0, _Object$entries2 = Object.entries(update); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        key = _Object$entries2$_i[0],
        values = _Object$entries2$_i[1];

    if (updated.hasOwnProperty(key)) {
      updated = _objectSpread(_objectSpread({}, updated), {}, _defineProperty({}, key, _objectSpread(_objectSpread({}, updated[key]), values)));
    } else {
      updated = _objectSpread(_objectSpread({}, updated), {}, _defineProperty({}, key, _objectSpread({}, values)));
    }
  }

  return updated;
}
/**
 * True, if index.filter object and index.order array are deeply equal to given filter and order
 * @param index {Object} existing index
 * @param index.filter {Object}
 * @param index.order {Array}
 * @param filter {Object}
 * @param order {Array}
 * @return {boolean}
 */


function isCorrespondingIndex(index, filter, order) {
  return (0, _lodash.isEqual)(index.filter || null, filter || null) && (0, _lodash.isEqual)(index.order || null, order || null);
}
/**
 * Check if filter fits given filter.
 * Not tested now.
 * Needs farther discusion. It will not be possible test item on complicated geometry filter.
 * @param {*} filter
 * @param {*} item
 * @returns {Boolean}
 */


function itemFitFilter(filter, item) {
  // null filter fit
  if (filter === null) {
    return true;
  }

  var entries = Object.entries(filter);
  return entries.every(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var itemHasFilterKey = item.data && item.data.hasOwnProperty(key);
    var itemHasFilterLinkKey = item.data && item.data.hasOwnProperty("".concat(key, "Key"));

    if (itemHasFilterKey) {
      //apply condition
      //"column0": "hleda se rovnost",
      //"column1": null,
      if (item.data && item.data[key] === value) {
        return true;
      } // "column2": {
      // 	"like": "hleda se podobnost, castecny vyskyt"
      // },


      if ((0, _lodash.isObject)(value) && value['like']) {
        //now we dont deal like filter, refrest indexes
        return true;
      } // "column3": {
      // 	"in": ["existuje", "v", "poli", "prvku"]
      // },


      if ((0, _lodash.isObject)(value) && value['in']) {
        return value["in"].includes(item.data[key]);
      } // "column4": {
      // 	"notin": ["neexistuje", "v", "poli", "prvku"]
      // }


      if ((0, _lodash.isObject)(value) && value['notin']) {
        return !value.notin.includes(item.data[key]);
      }
    } //check if filter contains linking like scopeKey, viewKey, ...


    if (itemHasFilterLinkKey) {
      if (item.data && item.data["".concat(key, "Key")] === value) {
        return true;
      }
    } //if to filter fit return false


    return false;
  });
}
/**
 * Merge stores active keys with filter by active and filter
 * @param activeKeys {Object} {activeScopeKey: 'bbb', activePlaceKeys: ['ddd', 'eee'], ...}
 * @param filterByActive {Object} {scope: true, place: true, ...}
 * @param filter {Object} {scopeKey: 'aaa', placeKey: {in: ['fff']}, ...}
 * @return {Object} merged object which looks like this {scopeKey: 'aaa', placeKey: {in: ['bbb', 'ccc']}, ...}
 */


function mergeFilters(activeKeys, filterByActive, filter) {
  if (activeKeys && filterByActive) {
    var activeKeysFilter = {};

    if (filterByActive.application) {
      if (activeKeys.activeApplicationKey) {
        activeKeysFilter.applicationKey = activeKeys.activeApplicationKey;
      }
    }

    if (filterByActive["case"]) {
      if (activeKeys.activeCaseKey) {
        activeKeysFilter.caseKey = activeKeys.activeCaseKey;
      } else if (activeKeys.activeCaseKeys) {
        activeKeysFilter.caseKey = {
          "in": activeKeys.activeCaseKeys
        };
      }
    }

    if (filterByActive.scope) {
      if (activeKeys.activeScopeKey) {
        activeKeysFilter.scopeKey = activeKeys.activeScopeKey;
      }
    }

    if (filterByActive.scenario) {
      if (activeKeys.activeScenarioKey) {
        activeKeysFilter.scenarioKey = activeKeys.activeScenarioKey;
      } else if (activeKeys.activeScenarioKeys) {
        activeKeysFilter.scenarioKey = {
          "in": activeKeys.activeScenarioKeys
        };
      }
    }

    if (filterByActive.place) {
      if (activeKeys.activePlaceKey) {
        activeKeysFilter.placeKey = activeKeys.activePlaceKey;
      } else if (activeKeys.activePlaceKeys) {
        activeKeysFilter.placeKey = {
          "in": activeKeys.activePlaceKeys
        };
      }
    }

    if (filterByActive.period) {
      if (activeKeys.activePeriodKey) {
        activeKeysFilter.periodKey = activeKeys.activePeriodKey;
      } else if (activeKeys.activePeriodKeys) {
        activeKeysFilter.periodKey = {
          "in": activeKeys.activePeriodKeys
        };
      }
    }

    if (filterByActive.attribute) {
      if (activeKeys.activeAttributeKey) {
        activeKeysFilter.attributeKey = activeKeys.activeAttributeKey;
      } else if (activeKeys.activeAttributeKeys) {
        activeKeysFilter.attributeKey = {
          "in": activeKeys.activeAttributeKeys
        };
      }
    }

    if (filterByActive.layerTemplate) {
      if (activeKeys.activeLayerTemplateKey) {
        activeKeysFilter.layerTemplateKey = activeKeys.activeLayerTemplateKey;
      }
    }

    if (filterByActive.areaTreeLevel) {
      if (activeKeys.activeAreaTreeLevelKey) {
        activeKeysFilter.areaTreeLevelKey = activeKeys.activeAreaTreeLevelKey;
      }
    }

    var finalFilter = _objectSpread(_objectSpread({}, activeKeysFilter), filter);

    return (0, _lodash.isEmpty)(finalFilter) ? null : finalFilter;
  } else {
    return filter;
  }
}
/**
 * Merge metadata defined by key with metadata keys defined by filterByActive
 * @param definedKeys {Object}
 * @param activeKeys {Object}
 * @return {Object|null}
 */


function mergeMetadataKeys(definedKeys, activeKeys) {
  if (definedKeys && activeKeys) {
    return _objectSpread(_objectSpread({}, activeKeys), definedKeys);
  } else {
    return definedKeys || activeKeys || null;
  }
}
/**
 * It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}
 * @param modifiers {Object}
 * @return {Object|null}
 */


function convertModifiersToRequestFriendlyFormat(modifiers) {
  if (modifiers) {
    var modifiersForRequest = {};

    if (modifiers.scopeKey) {
      modifiersForRequest.scopeKey = modifiers.scopeKey;
    }

    if (modifiers.placeKeys) {
      modifiersForRequest.placeKey = {
        "in": modifiers.placeKeys
      };
    } else if (modifiers.placeKey) {
      modifiersForRequest.placeKey = modifiers.placeKey;
    }

    if (modifiers.caseKeys) {
      modifiersForRequest.caseKey = {
        "in": modifiers.caseKeys
      };
    } else if (modifiers.caseKey) {
      modifiersForRequest.caseKey = modifiers.caseKey;
    }

    if (modifiers.scenarioKeys) {
      modifiersForRequest.scenarioKey = {
        "in": modifiers.scenarioKeys
      };
    } else if (modifiers.scenarioKey) {
      modifiersForRequest.scenarioKey = modifiers.scenarioKey;
    }

    if (modifiers.periodKeys) {
      modifiersForRequest.periodKey = {
        "in": modifiers.periodKeys
      };
    } else if (modifiers.periodKey) {
      modifiersForRequest.periodKey = modifiers.periodKey;
    }

    if (modifiers.applicationKey) {
      modifiersForRequest.applicationKey = modifiers.applicationKey;
    }

    return !(0, _lodash.isEmpty)(modifiersForRequest) ? modifiersForRequest : null;
  } else {
    return null;
  }
}
/**
 * Check if given input is natural number
 * @param input
 * @return {boolean}
 */


function isNaturalNumber(input) {
  return (0, _lodash.isNumber)(input) && input > 0 && input % 1 === 0;
}
/**
 * @param interval {Object}
 * @return {boolean}
 */


function isInterval(interval) {
  return isNaturalNumber(interval === null || interval === void 0 ? void 0 : interval.start) && isNaturalNumber(interval === null || interval === void 0 ? void 0 : interval.length);
}
/**
 * Return only intervals which really are intervals
 * @param intervals {Array}
 * @return {Array}
 */


function getValidIntervals(intervals) {
  return intervals.filter(function (interval) {
    return isInterval(interval);
  });
}
/**
 * Return sorted intervals
 * @param intervals {Array}
 * @return {Array}
 */


function getSortedValidIntervals(intervals) {
  return (0, _lodash.sortBy)(getValidIntervals(intervals), ['start', 'length']);
}
/**
 * @param earlier {Object} interval
 * @param later {Object} interval
 * @return {boolean}
 */


function areIntervalsOverlappedOrSubsequent(earlier, later) {
  if (isInterval(earlier) && isInterval(later)) {
    return later.start <= earlier.start + earlier.length;
  } else {
    return false;
  }
}
/**
 * Merge relevant intervals together
 * @param intervals {Array}
 * @return {Array}
 */


function mergeIntervals(intervals) {
  var sortedIntervals = getSortedValidIntervals(intervals);

  if (sortedIntervals.length === 0) {
    return null;
  } //merge intervals


  return (0, _lodash.tail)(sortedIntervals).reduce(function (mergedIntervals, interval) {
    var last = mergedIntervals.pop();

    if (areIntervalsOverlappedOrSubsequent(last, interval)) {
      //merge last & current
      var end = Math.max(last.start + last.length, interval.start + interval.length);
      return [].concat(_toConsumableArray(mergedIntervals), [{
        start: last.start,
        length: end - last.start
      }]);
    } else {
      //add both
      return [].concat(_toConsumableArray(mergedIntervals), [last, interval]);
    }
  }, [(0, _lodash.head)(sortedIntervals)]);
}
/**
 * Add keys to index
 * @param index {Object}
 * @param models {Object} Collection of models
 * @param start {Number}
 * @return {Object} index
 */


function registerModelsToIndex(index, models, start) {
  if (models !== null && models !== void 0 && models.length && index && start > -1) {
    models.forEach(function (model, i) {
      index[start + i] = model.key;
    });
    return index;
  } else {
    return index;
  }
}

var _default = {
  convertModifiersToRequestFriendlyFormat: convertModifiersToRequestFriendlyFormat,
  removeIndex: removeIndex,
  getIndex: getIndex,
  getUniqueIndexes: getUniqueIndexes,
  getUpdatedIndexes: getUpdatedIndexes,
  getUpdatedByDataSourceKey: getUpdatedByDataSourceKey,
  mergeFilters: mergeFilters,
  mergeMetadataKeys: mergeMetadataKeys,
  isCorrespondingIndex: isCorrespondingIndex,
  itemFitFilter: itemFitFilter,
  registerModelsToIndex: registerModelsToIndex,
  // intervals
  areIntervalsOverlappedOrSubsequent: areIntervalsOverlappedOrSubsequent,
  isInterval: isInterval,
  isNaturalNumber: isNaturalNumber,
  getValidIntervals: getValidIntervals,
  getSortedValidIntervals: getSortedValidIntervals,
  mergeIntervals: mergeIntervals
};
exports["default"] = _default;