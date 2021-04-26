"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _recompute = require("@jvitela/recompute");

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _lodash = require("lodash");

var _helpers = _interopRequireDefault(require("./helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getActiveKey = function getActiveKey(getSubstate) {
  return function (state) {
    return getSubstate(state).activeKey;
  };
};

var getActiveKeys = function getActiveKeys(getSubstate) {
  return function (state) {
    return getSubstate(state).activeKeys;
  };
};

var getAllByKey = function getAllByKey(getSubstate) {
  return function (state) {
    return getSubstate(state).byKey;
  };
};

var getKeysInUse = function getKeysInUse(getSubstate) {
  return function (state) {
    var _getSubstate$inUse;

    return (_getSubstate$inUse = getSubstate(state).inUse) === null || _getSubstate$inUse === void 0 ? void 0 : _getSubstate$inUse.keys;
  };
};

var getIndexesInUse = function getIndexesInUse(getSubstate) {
  return function (state) {
    var _getSubstate$inUse2;

    return (_getSubstate$inUse2 = getSubstate(state).inUse) === null || _getSubstate$inUse2 === void 0 ? void 0 : _getSubstate$inUse2.indexes;
  };
};

var getEditedAllAsObject = function getEditedAllAsObject(getSubstate) {
  return function (state) {
    return getSubstate(state).editedByKey;
  };
};

var getIndexes = function getIndexes(getSubstate) {
  return function (state) {
    return getSubstate(state).indexes;
  };
};
/**
 * Get indexes value from given state on given path.
 * Optional param indexPath has default value "indexes". Call with:
 * state {Object}
 * indexPath {string}
 * @param getSubstate {function}
 * @return {Object} index
 */


var getIndexesByPath = function getIndexesByPath(getSubstate) {
  return function (state) {
    var indexPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'indexes';
    return (0, _lodash.get)(getSubstate(state), indexPath);
  };
};
/**
 * Get all but removed models in byKey
 * @param getSubstate {function}
 * @returns {Object} all models except removed from by key
 */


var getAllNotRemovedAsObject = function getAllNotRemovedAsObject(getSubstate) {
  return (0, _reselect.createSelector)([getAllByKey(getSubstate)], function (byKey) {
    if (byKey) {
      return (0, _lodash.pickBy)(byKey, function (item) {
        return !item.hasOwnProperty('removed');
      });
    } else {
      return null;
    }
  });
};

var getAllAsObject = getAllNotRemovedAsObject;
/**
 * Get all but removed models as a collection
 * @param getSubstate {function}
 * @returns {Array|null} all models except removed as a collection
 */

var getAll = function getAll(getSubstate) {
  return (0, _reselect.createSelector)([getAllAsObject(getSubstate)], function (byKey) {
    return byKey ? Object.values(byKey) : null;
  });
};
/**
 * Get active model
 * @param getSubstate {func}
 * @return {Object} Active model
 */


var getActive = function getActive(getSubstate) {
  return (0, _reselect.createSelector)([getAllAsObject(getSubstate), getActiveKey(getSubstate)], function (models, activeKey) {
    return (models === null || models === void 0 ? void 0 : models[activeKey]) || null;
  });
};
/**
 * Get active models
 * @param getSubstate {func}
 * @return {Array} A collection of active models
 */


var getActiveModels = function getActiveModels(getSubstate) {
  return (0, _reselect.createSelector)([getAllAsObject(getSubstate), getActiveKeys(getSubstate)], function (models, activeKeys) {
    var activeModels = [];

    if (models && !(0, _lodash.isEmpty)(models) && activeKeys && !(0, _lodash.isEmpty)(activeKeys)) {
      activeKeys.map(function (key) {
        var model = models[key];

        if (model) {
          activeModels.push(model);
        }
      });
    }

    return activeModels.length ? activeModels : null;
  });
};
/**
 * Get model with given key. Call with:
 * state {Object}
 * key {string} model key
 * @param getSubstate {function}
 * @return {Object} selected model
 */


var getByKey = function getByKey(getSubstate) {
  return (0, _reReselect["default"])([getAllAsObject(getSubstate), function (state, key) {
    return key;
  }], function (allData, key) {
    if (key && allData && !(0, _lodash.isEmpty)(allData) && allData[key]) {
      return allData[key];
    } else {
      return null;
    }
  })(function (state, key) {
    return key;
  });
};
/**
 * Get models by given keys. Call with:
 * state {Object}
 * keys {Array} model keys
 * @param getSubstate {function}
 * @return {Object} selected models
 */


var getByKeysAsObject = function getByKeysAsObject(getSubstate) {
  return (0, _reReselect["default"])([getAllAsObject(getSubstate), function (state, keys) {
    return keys;
  }], function (allData, keys) {
    if (keys && keys.length && allData && !(0, _lodash.isEmpty)(allData)) {
      var data = (0, _lodash.pick)(allData, keys);
      return (0, _lodash.isEmpty)(data) ? null : data;
    } else {
      return null;
    }
  })(function (state, keys) {
    return "".concat(keys);
  });
};
/**
 * Get models by given keys. Call with:
 * state {Object}
 * keys {Array} model keys
 * @param getSubstate {function}
 * @return {Array} selected models
 */


var getByKeys = function getByKeys(getSubstate) {
  return (0, _reReselect["default"])([getByKeysAsObject(getSubstate)], function (asObject) {
    if (asObject) {
      return Object.values(asObject);
    } else {
      return null;
    }
  })(function (state, keys) {
    return "".concat(keys);
  });
};
/**
 * Get model's data by given keys. Call with:
 * state {Object}
 * keys {Array} model keys
 * @param getSubstate {function}
 * @return {Object} selected model data
 */


var getDataByKey = function getDataByKey(getSubstate) {
  return (0, _reselect.createSelector)([getByKey(getSubstate)], function (model) {
    return (model === null || model === void 0 ? void 0 : model.data) || null;
  });
};
/**
 * True, if current user or guest has a permission to delete the model. Call with:
 * state {Object}
 * key {string}
 * @param getSubstate {function}
 * @return {bool}
 */


var getDeletePermissionByKey = function getDeletePermissionByKey(getSubstate) {
  return (0, _reselect.createSelector)([getByKey(getSubstate)], function (model) {
    var _model$permissions, _model$permissions$ac, _model$permissions2, _model$permissions2$g;

    return (model === null || model === void 0 ? void 0 : (_model$permissions = model.permissions) === null || _model$permissions === void 0 ? void 0 : (_model$permissions$ac = _model$permissions.activeUser) === null || _model$permissions$ac === void 0 ? void 0 : _model$permissions$ac["delete"]) || (model === null || model === void 0 ? void 0 : (_model$permissions2 = model.permissions) === null || _model$permissions2 === void 0 ? void 0 : (_model$permissions2$g = _model$permissions2.guest) === null || _model$permissions2$g === void 0 ? void 0 : _model$permissions2$g["delete"]) || false;
  });
};
/**
 * True, if current user or guest has a permission to update the model. Call with:
 * state {Object}
 * key {string}
 * @param getSubstate {function}
 * @return {bool}
 */


var getUpdatePermissionByKey = function getUpdatePermissionByKey(getSubstate) {
  return (0, _reselect.createSelector)([getByKey(getSubstate)], function (model) {
    var _model$permissions3, _model$permissions3$a, _model$permissions4, _model$permissions4$g;

    return (model === null || model === void 0 ? void 0 : (_model$permissions3 = model.permissions) === null || _model$permissions3 === void 0 ? void 0 : (_model$permissions3$a = _model$permissions3.activeUser) === null || _model$permissions3$a === void 0 ? void 0 : _model$permissions3$a.update) || (model === null || model === void 0 ? void 0 : (_model$permissions4 = model.permissions) === null || _model$permissions4 === void 0 ? void 0 : (_model$permissions4$g = _model$permissions4.guest) === null || _model$permissions4$g === void 0 ? void 0 : _model$permissions4$g.update) || false;
  });
};
/**
 * Get all edited models. Call with:
 * state {Object}
 * @param getSubstate {function}
 * @return {Object}
 */


var getEditedAll = function getEditedAll(getSubstate) {
  return (0, _reselect.createSelector)([getEditedAllAsObject(getSubstate)], function (editedAsObject) {
    return editedAsObject ? Object.values(editedAsObject) : null;
  });
};
/**
 * Get active edited model. Call with:
 * state {Object}
 * @param getSubstate {function}
 * @return {Object} edited active model
 */


var getEditedActive = function getEditedActive(getSubstate) {
  return (0, _reselect.createSelector)([getEditedAllAsObject(getSubstate), getActiveKey(getSubstate)], function (models, activeKey) {
    return (models === null || models === void 0 ? void 0 : models[activeKey]) || null;
  });
};
/**
 * Get edited model with given key. Call with:
 * state {Object}
 * key {string} model key
 * @param getSubstate {function}
 * @return {Object} edited model
 */


var getEditedByKey = function getEditedByKey(getSubstate) {
  return (0, _reReselect["default"])([getEditedAllAsObject(getSubstate), function (state, key) {
    return key;
  }], function (allData, key) {
    if (key && allData && !(0, _lodash.isEmpty)(allData) && allData[key]) {
      return allData[key];
    } else {
      return null;
    }
  })(function (state, key) {
    return key;
  });
};
/**
 * Get edited model's data by given key. Call with:
 * state {Object}
 * keys {Array} model keys
 * @param getSubstate {function}
 * @return {Object} edited model data
 */


var getEditedDataByKey = function getEditedDataByKey(getSubstate) {
  return (0, _reselect.createSelector)([getEditedByKey(getSubstate)], function (model) {
    return (model === null || model === void 0 ? void 0 : model.data) || null;
  });
};
/**
 * Get edited models keys. Call with:
 * state {Object}
 * @param getSubstate {function}
 * @return {Array} edited keys
 */


var getEditedKeys = function getEditedKeys(getSubstate) {
  return (0, _reselect.createSelector)([getEditedAllAsObject(getSubstate)], function (edited) {
    if (edited && !(0, _lodash.isEmpty)(edited)) {
      return Object.keys(edited);
    }

    return null;
  });
};
/**
 * Get whole index by given filter and order. Call with:
 * state {Object}
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {Object} index
 */


var getIndex = function getIndex(getSubstate) {
  return (0, _reselect.createSelector)([getIndexes(getSubstate), function (state, filter) {
    return filter;
  }, function (state, filter, order) {
    return order;
  }], function (indexes, filter, order) {
    return _helpers["default"].getIndex(indexes, filter, order);
  });
};
/**
 * Get whole index by given filter and order and optional indexPath. Call with:
 * state {Object}
 * indexPath {string} [optional]
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {Object} index
 */


var getIndexByPath = function getIndexByPath(getSubstate) {
  return (0, _reselect.createSelector)([getIndexesByPath(getSubstate), function (state, indexPath, filter) {
    return filter;
  }, function (state, indexPath, filter, order) {
    return order;
  }], function (indexes, filter, order) {
    return _helpers["default"].getIndex(indexes, filter, order);
  });
};
/**
 * Get changeOn of filtered index
 * state {Object}
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {string}
 */


var getIndexChangedOn = function getIndexChangedOn(getSubstate) {
  return (0, _reselect.createSelector)([getIndex(getSubstate)], function (index) {
    return (index === null || index === void 0 ? void 0 : index.changedOn) || null;
  });
};
/**
 * Get indexes page. Call with:
 * state {Object}
 * filter {Object}
 * order {Array}
 * start {number} from 1 to n. Default 1.
 * length {number} from 1 to n. If no length specified, then is equal to total
 * @param getSubstate {function}
 * @return {Object} {7: 'key1', 8: null, ...}
 */


var getIndexPage = function getIndexPage(getSubstate) {
  return (0, _reselect.createSelector)([getIndex(getSubstate), function (state, filter, order, start) {
    return start;
  }, function (state, filter, order, start, length) {
    return length;
  }], function (index, start, length) {
    if (index !== null && index !== void 0 && index.index && start && length) {
      var indexed = {};

      for (var o = start; o < start + length && o <= index.count; o++) {
        var key = index.index[o];
        indexed[o] = key ? key : null;
      }

      return indexed;
    } else {
      return null;
    }
  });
};
/**
 * Get indexed models. Call with:
 * state {Object}
 * filterByActive {Object}
 * filter {Object}
 * order {Array}
 * start {number} from 1 to n. Default 1.
 * length {number} from 1 to n. If no length specified, then is equal to total
 * @param getSubstate {function}
 * @return {Array} collection of models
 */


var getIndexed = function getIndexed(getSubstate) {
  return (0, _reReselect["default"])([getAllAsObject(getSubstate), getIndexes(getSubstate), getAllActiveKeys, function (state, filterByActive) {
    return filterByActive;
  }, function (state, filterByActive, filter) {
    return filter;
  }, function (state, filterByActive, filter, order) {
    return order;
  }, function (state, filterByActive, filter, order, start) {
    return start;
  }, function (state, filterByActive, filter, order, start, length) {
    return length;
  }], function (models, indexes, activeKeys, filterByActive, filter, order, start, length) {
    if (models && indexes) {
      var mergedFilter = _helpers["default"].mergeFilters(activeKeys, filterByActive, filter);

      var index = _helpers["default"].getIndex(indexes, mergedFilter, order);

      if (index !== null && index !== void 0 && index.index) {
        var indexedModels = [];
        start = start || 1;
        length = length || index.count;
        var end = Math.min(start + length - 1, index.count);

        for (var i = start; i <= end; i++) {
          var modelKey = index.index[i];

          if (modelKey) {
            var indexedModel = models[modelKey];

            if (indexedModel) {
              indexedModels.push(indexedModel);
            } else {
              indexedModels.push({
                key: modelKey
              });
            }
          } else {
            indexedModels.push(null);
          }
        }

        return indexedModels.length ? indexedModels : null;
      } else {
        return null;
      }
    } else {
      return null;
    }
  })(function (state, filterByActive, filter, order, start, length) {
    return "".concat(JSON.stringify(filterByActive), ":").concat(JSON.stringify(filter), ":").concat(JSON.stringify(order), ":").concat(start, ":").concat(length);
  });
};
/**
 * Get count of indexed items. Call with:
 * state {Object}
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {number}
 */


var getIndexTotal = function getIndexTotal(getSubstate) {
  return (0, _reselect.createSelector)([getIndex(getSubstate)], function (index) {
    if ((index === null || index === void 0 ? void 0 : index.count) > -1) {
      return index.count;
    } else {
      return null;
    }
  });
};
/**
 * Find all indexes in store where item fit their filter.
 * state {Object}
 * item {Object}
 * @param {func} getSubstate
 * @return {Array}
 */


var getIndexesByFilteredItem = function getIndexesByFilteredItem(getSubstate) {
  return (0, _reselect.createSelector)([getIndexes(getSubstate), function (state, item) {
    return item;
  }], function (indexes, item) {
    if (!(0, _lodash.isEmpty)(indexes)) {
      return indexes.filter(function (index) {
        return _helpers["default"].itemFitFilter(index.filter, item);
      });
    } else {
      return null;
    }
  });
};
/**
 * Compare keys with loaded models and return which keys need to be loaded
 * state {Object}
 * keys {Array}
 * @param getSubstate {function}
 * @return {Array} keys to load
 */


var getKeysToLoad = function getKeysToLoad(getSubstate) {
  return (0, _reselect.createSelector)([getAllAsObject(getSubstate), function (state, keys) {
    return keys;
  }], function (models, keys) {
    if (keys && keys.length) {
      if (!models) {
        return keys;
      } else {
        var filteredKeys = keys.filter(function (key) {
          return !models[key] || models[key].outdated;
        });
        return filteredKeys.length ? filteredKeys : null;
      }
    } else {
      return null;
    }
  });
};
/**
 * Get a list of keys used by given component
 * state {Object}
 * componentKey {string}
 * @param getSubstate {function}
 * @return {Array} used keys
 */


var getUsedKeysForComponent = function getUsedKeysForComponent(getSubstate) {
  return (0, _reReselect["default"])([getKeysInUse(getSubstate), function (state, componentKey) {
    return componentKey;
  }], function (usedKeys, componentKey) {
    return usedKeys && componentKey && usedKeys[componentKey] && usedKeys[componentKey].length ? usedKeys[componentKey] : null;
  })(function (state, componentKey) {
    return "".concat(componentKey);
  });
};
/**
 * True, if all given keys are registered for given component
 * state {Object}
 * componentKey {string}
 * keys {Array}
 * @param getSubstate {function}
 * @return {boolean}
 */


var haveAllKeysRegisteredUse = function haveAllKeysRegisteredUse(getSubstate) {
  return (0, _reReselect["default"])([getUsedKeysForComponent(getSubstate), function (state, componentKey, keys) {
    return keys;
  }], function (usedKeys, keys) {
    if (usedKeys && keys !== null && keys !== void 0 && keys.length) {
      var notIncluded = (0, _lodash.difference)(keys, usedKeys);
      return !notIncluded.length;
    } else {
      return false;
    }
  })(function (state, componentKey, keys) {
    return "".concat(componentKey, "_").concat(keys);
  });
};
/**
 * Return all used index pages for given substate
 * @param getSubstate {function}
 * @return {Array} a collection of used pages {filter: Object, order: Array, uses: [{start: number, length: number}]}
 */


var getUsedIndexPages = function getUsedIndexPages(getSubstate) {
  return (0, _reselect.createSelector)([getIndexesInUse(getSubstate), getAllActiveKeys], function (indexedDataUses, activeKeys) {
    var groupedUses = [];
    var finalUsedIndexes = [];

    if (!(0, _lodash.isEmpty)(indexedDataUses)) {
      (0, _lodash.each)(indexedDataUses, function (usedIndexes) {
        usedIndexes.forEach(function (usedIndex) {
          var mergedFilter = _helpers["default"].mergeFilters(activeKeys, usedIndex.filterByActive, usedIndex.filter);

          var existingIndex = (0, _lodash.find)(groupedUses, function (use) {
            return (0, _lodash.isEqual)(use.filter, mergedFilter) && (0, _lodash.isEqual)(use.order, usedIndex.order);
          });

          if (existingIndex) {
            existingIndex.inUse.push({
              start: usedIndex.start,
              length: usedIndex.length
            });
          } else {
            groupedUses.push({
              filter: mergedFilter,
              order: usedIndex.order,
              inUse: [{
                start: usedIndex.start,
                length: usedIndex.length
              }]
            });
          }
        });
      });
    }

    if (!(0, _lodash.isEmpty)(groupedUses)) {
      (0, _lodash.each)(groupedUses, function (groupedUse) {
        var _groupedUse$inUse;

        if (groupedUse !== null && groupedUse !== void 0 && (_groupedUse$inUse = groupedUse.inUse) !== null && _groupedUse$inUse !== void 0 && _groupedUse$inUse.length) {
          var uses = _helpers["default"].mergeIntervals(groupedUse.inUse);

          if (uses) {
            finalUsedIndexes.push({
              filter: groupedUse.filter,
              order: groupedUse.order,
              uses: uses
            });
          }
        }
      });
    }

    return finalUsedIndexes.length ? finalUsedIndexes : null;
  });
};
/**
 * Return used index page for given substate, filter & order. Call with:
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {Object} used page {filter: Object, order: Array, uses: [{start: number, length: number}]}
 */


var getUsedIndexPage = function getUsedIndexPage(getSubstate) {
  return (0, _reReselect["default"])(getUsedIndexPages(getSubstate), function (state, filter) {
    return filter;
  }, function (state, filter, order) {
    return order;
  }, function (usedIndexPages, filter, order) {
    if (usedIndexPages) {
      return (0, _lodash.find)(usedIndexPages, {
        filter: filter,
        order: order
      });
    } else {
      return null;
    }
  })(function (state, filter, order) {
    var stringOrder = JSON.stringify(order);
    var stringFilter = JSON.stringify((0, _lodash.map)(filter, function (value, key) {
      return "".concat(key, ":").concat(value);
    }).sort());
    return "".concat(stringOrder, ":").concat(stringFilter);
  });
};
/**
 * Return all uses with active dependency. Call with:
 * filterByActive {Object}
 * @param getSubstate {function}
 * @return {Array} a collection of used pages {filter: Object, order: Array, uses: [{start: number, length: number}]}
 */


var getUsesWithActiveDependency = function getUsesWithActiveDependency(getSubstate) {
  return (0, _reselect.createSelector)([getIndexesInUse(getSubstate), getAllActiveKeys, function (state, filterByActive) {
    return filterByActive;
  }],
  /**
   * @param indexedDataUses {Object} inUse.indexes
   * @param activeKeys {Object} active keys of all metadata
   * @param filterByActive {Object} given metadata type active key for filtering (e.g. {scope: true})
   */
  function (indexedDataUses, activeKeys, filterByActive) {
    var groupedUses = []; // uses grouped by filter

    var usedIndexes = [];

    if (filterByActive && !(0, _lodash.isEmpty)(indexedDataUses)) {
      // loop through components
      (0, _lodash.map)(indexedDataUses, function (componentUsedIndexes) {
        // loop through uses for component
        (0, _lodash.map)(componentUsedIndexes, function (usedIndex) {
          if ((0, _lodash.reduce)(filterByActive, function (accumulator, value, index) {
            return accumulator && value && usedIndex.filterByActive && usedIndex.filterByActive[index];
          }, true)) {
            // if usedIndex.filterByActive has all the properties of filterByActive
            var mergedFilter = _helpers["default"].mergeFilters(activeKeys, usedIndex.filterByActive, usedIndex.filter);

            var existingIndex = (0, _lodash.find)(groupedUses, function (use) {
              return (0, _lodash.isEqual)(use.filter, mergedFilter) && (0, _lodash.isEqual)(use.order, usedIndex.order);
            });

            if (existingIndex) {
              existingIndex.inUse.push({
                start: usedIndex.start,
                length: usedIndex.length
              });
            } else {
              groupedUses.push({
                filter: mergedFilter,
                order: usedIndex.order,
                inUse: [{
                  start: usedIndex.start,
                  length: usedIndex.length
                }]
              });
            }
          }
        });
      }); // loop through uses grouped by filter and merge intervals

      if (!(0, _lodash.isEmpty)(groupedUses)) {
        (0, _lodash.map)(groupedUses, function (groupedUse) {
          var _groupedUse$inUse2;

          if (groupedUse !== null && groupedUse !== void 0 && (_groupedUse$inUse2 = groupedUse.inUse) !== null && _groupedUse$inUse2 !== void 0 && _groupedUse$inUse2.length) {
            var uses = _helpers["default"].mergeIntervals(groupedUse.inUse);

            if (uses) {
              usedIndexes.push({
                filter: groupedUse.filter,
                order: groupedUse.order,
                uses: uses
              });
            }
          }
        });
      }

      return usedIndexes.length ? usedIndexes : null;
    } else {
      return null;
    }
  });
};
/**
 * Get all data from substore which should be saved (to the view for instance)
 * @param getSubstate {function}
 * @return {Object} substore state to save
 */


var getStateToSave = function getStateToSave(getSubstate) {
  return function (state) {
    var activeKey = getSubstate(state).activeKey;

    if (activeKey) {
      return {
        activeKey: activeKey
      };
    }

    var activeKeys = getSubstate(state).activeKeys;

    if (activeKeys) {
      return {
        activeKeys: activeKeys
      };
    }

    return {};
  };
};
/* 	--- Selectors across stores --------------------------------------------- */

/**
 * Get activeKey/activeKeys from all relevant substores
 * @param state {Object}
 * @return {Object}
 */


var getAllActiveKeys = (0, _reselect.createSelector)([function (state) {
  var _state$scopes;

  return (_state$scopes = state.scopes) === null || _state$scopes === void 0 ? void 0 : _state$scopes.activeKey;
}, function (state) {
  var _state$cases;

  return (_state$cases = state.cases) === null || _state$cases === void 0 ? void 0 : _state$cases.activeKey;
}, function (state) {
  var _state$cases2;

  return (_state$cases2 = state.cases) === null || _state$cases2 === void 0 ? void 0 : _state$cases2.activeKeys;
}, function (state) {
  var _state$scenarios;

  return (_state$scenarios = state.scenarios) === null || _state$scenarios === void 0 ? void 0 : _state$scenarios.activeKey;
}, function (state) {
  var _state$scenarios2;

  return (_state$scenarios2 = state.scenarios) === null || _state$scenarios2 === void 0 ? void 0 : _state$scenarios2.activeKeys;
}, function (state) {
  var _state$places;

  return (_state$places = state.places) === null || _state$places === void 0 ? void 0 : _state$places.activeKey;
}, function (state) {
  var _state$places2;

  return (_state$places2 = state.places) === null || _state$places2 === void 0 ? void 0 : _state$places2.activeKeys;
}, function (state) {
  var _state$periods;

  return (_state$periods = state.periods) === null || _state$periods === void 0 ? void 0 : _state$periods.activeKey;
}, function (state) {
  var _state$periods2;

  return (_state$periods2 = state.periods) === null || _state$periods2 === void 0 ? void 0 : _state$periods2.activeKeys;
}, function (state) {
  var _state$attributes;

  return (_state$attributes = state.attributes) === null || _state$attributes === void 0 ? void 0 : _state$attributes.activeKey;
}, function (state) {
  var _state$attributes2;

  return (_state$attributes2 = state.attributes) === null || _state$attributes2 === void 0 ? void 0 : _state$attributes2.activeKeys;
}, function (state) {
  var _state$layerTemplates;

  return (_state$layerTemplates = state.layerTemplates) === null || _state$layerTemplates === void 0 ? void 0 : _state$layerTemplates.activeKey;
}, function (state) {
  var _state$areas, _state$areas$areaTree;

  return (_state$areas = state.areas) === null || _state$areas === void 0 ? void 0 : (_state$areas$areaTree = _state$areas.areaTreeLevels) === null || _state$areas$areaTree === void 0 ? void 0 : _state$areas$areaTree.activeKey;
}, function (state) {
  var _state$specific;

  return (_state$specific = state.specific) === null || _state$specific === void 0 ? void 0 : _state$specific.apps;
}, function (state) {
  var _state$app;

  return (_state$app = state.app) === null || _state$app === void 0 ? void 0 : _state$app.key;
}], function (activeScopeKey, activeCaseKey, activeCaseKeys, activeScenarioKey, activeScenarioKeys, activePlaceKey, activePlaceKeys, activePeriodKey, activePeriodKeys, activeAttributeKey, activeAttributeKeys, activeLayerTemplateKey, activeAreaTreeLevelKey, apps, appKey) {
  var activeKeys = {
    activeScopeKey: activeScopeKey || null,
    activeCaseKey: activeCaseKey || null,
    activeCaseKeys: activeCaseKeys || null,
    activeScenarioKey: activeScenarioKey || null,
    activeScenarioKeys: activeScenarioKeys || null,
    activePlaceKey: activePlaceKey || null,
    activePlaceKeys: activePlaceKeys || null,
    activePeriodKey: activePeriodKey || null,
    activePeriodKeys: activePeriodKeys || null,
    activeAttributeKey: activeAttributeKey || null,
    activeAttributeKeys: activeAttributeKeys || null,
    activeLayerTemplateKey: activeLayerTemplateKey || null,
    activeAreaTreeLevelKey: activeAreaTreeLevelKey || null
  }; // for BO usage

  if (apps) {
    activeKeys.activeApplicationKey = apps.activeKey;
  } else if (appKey) {
    activeKeys.activeApplicationKey = appKey;
  }

  return activeKeys;
});
/**
 * Get activeKey/activeKeys by filterByActive from all relevant substores
 * @param state {Object}
 * @param filterByActive {Object}
 * @return {Object}
 */

var getActiveKeysByFilterByActive = (0, _reReselect["default"])([getAllActiveKeys, function (state, filterByActive) {
  return filterByActive;
}], function (activeKeys, filterByActive) {
  if (filterByActive && !(0, _lodash.isEmpty)(filterByActive)) {
    var keys = {};

    if (filterByActive.scope && activeKeys.activeScopeKey) {
      keys.scopeKey = activeKeys.activeScopeKey;
    }

    if (filterByActive.place) {
      if (activeKeys.activePlaceKey) {
        keys.placeKey = activeKeys.activePlaceKey;
      } else if (activeKeys.activePlaceKeys) {
        keys.placeKeys = activeKeys.activePlaceKeys;
      }
    }

    if (filterByActive.scenario) {
      if (activeKeys.activeScenarioKey) {
        keys.scenarioKey = activeKeys.activeScenarioKey;
      } else if (activeKeys.activeScenarioKeys) {
        keys.scenarioKeys = activeKeys.activeScenarioKeys;
      }
    }

    if (filterByActive["case"]) {
      if (activeKeys.activeCaseKey) {
        keys.caseKey = activeKeys.activeCaseKey;
      } else if (activeKeys.activeCaseKeys) {
        keys.caseKeys = activeKeys.activeCaseKeys;
      }
    }

    if (filterByActive.period) {
      if (activeKeys.activePeriodKey) {
        keys.periodKey = activeKeys.activePeriodKey;
      } else if (activeKeys.activePeriodKeys) {
        keys.periodKeys = activeKeys.activePeriodKeys;
      }
    }

    if (filterByActive.attribute) {
      if (activeKeys.activeAttributeKey) {
        keys.attributeKey = activeKeys.activeAttributeKey;
      } else if (activeKeys.activeAttributeKeys) {
        keys.attributeKeys = activeKeys.activeAttributeKeys;
      }
    }

    if (filterByActive.layerTemplate && activeKeys.activeLayerTemplateKey) {
      keys.layerTemplateKey = activeKeys.activeLayerTemplateKey;
    }

    if (filterByActive.areaTreeLevel && activeKeys.activeAreaTreeLevelKey) {
      keys.areaTreeLevelKey = activeKeys.activeAreaTreeLevelKey;
    }

    if (filterByActive.application && activeKeys.activeApplicationKey) {
      keys.applicationKey = activeKeys.activeApplicationKey;
    }

    return !(0, _lodash.isEmpty)(keys) ? keys : null;
  } else {
    return null;
  }
})(function (state, filterByActive) {
  return JSON.stringify(filterByActive);
});
/* 	--- Recompute observers -------------------------------------------------- */

/**
 * Get activeKey/activeKeys by filterByActive from all relevant substores. Call with:
 * filterByActive {Object}
 * @return {Object}
 */

var getActiveKeysByFilterByActiveObserver = (0, _recompute.createObserver)(function (state, filterByActive) {
  return getActiveKeysByFilterByActive(state, filterByActive);
});
/**
 * Get all indexes from substore
 * @return {Object}
 */

var getIndexesObserver = (0, _recompute.createObserver)(function (state, getSubstate) {
  return getIndexes(getSubstate)(state);
});
/* --- Recompute selectors -------------------------------------------------- */

/**
 * Get whole index by given filter and order. Call with:
 * filter {Object}
 * order {Array}
 * @return {Object}
 */

var getIndex_recompute = function getIndex_recompute(getSubstate) {
  return (0, _recompute.createSelector)(function (filter, order) {
    var indexes = getIndexesObserver(getSubstate);

    if (indexes) {
      return _helpers["default"].getIndex(indexes, filter, order);
    } else {
      return null;
    }
  });
};
/**
 * Merge metadata modifiers with filter by active.
 * @param metadataModifiers {Object} {placeKey: "uuid", scopeKey: "uuid", ...}
 * @param filterByActive {Object} {place: true, case: true, ...}
 * @param {Object} Merged modifiers
 */


var getMergedModifiers_recompute = (0, _recompute.createSelector)(function (metadataModifiers, filterByActive) {
  // TODO at least a part is the same as in Maps/actions/layerUse?
  // modifiers defined by key
  var metadataDefinedByKey = metadataModifiers ? _objectSpread({}, metadataModifiers) : {}; // Get actual metadata keys defined by filterByActive

  var activeMetadataKeys = getActiveKeysByFilterByActiveObserver(filterByActive); // Merge metadata, metadata defined by key have priority

  return _helpers["default"].mergeMetadataKeys(metadataDefinedByKey, activeMetadataKeys);
});
/**
 * Merge metadata modifiers with filter by active and return it in request-like format
 * @param metadataModifiers {Object}
 * @param filterByActive {Object}
 * @return {Object} Merged modifiers in request-like format
 */

var getMergedModifiersInRequestFormat_recompute = (0, _recompute.createSelector)(function (metadataModifiers, filterByActive) {
  var mergedMetadataKeys = getMergedModifiers_recompute(metadataModifiers, filterByActive); // It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}

  return _helpers["default"].convertModifiersToRequestFriendlyFormat(mergedMetadataKeys);
});
/**
 * Get common filter for data relations
 * @params componentState {Object}
 * @return {Object} relations filter
 */

var getCommmonDataRelationsFilterFromComponentState_recompute = (0, _recompute.createSelector)(function (componentState) {
  var relationsFilter = {};
  var modifiers = getMergedModifiersInRequestFormat_recompute(componentState === null || componentState === void 0 ? void 0 : componentState.metadataModifiers, componentState === null || componentState === void 0 ? void 0 : componentState.filterByActive);

  if (!(0, _lodash.isEmpty)(modifiers)) {
    relationsFilter.modifiers = modifiers;
  } // add layerTemplate od areaTreeLevelKey


  if (componentState !== null && componentState !== void 0 && componentState.layerTemplateKey) {
    relationsFilter.layerTemplateKey = componentState.layerTemplateKey;
  } else if (componentState !== null && componentState !== void 0 && componentState.areaTreeLevelKey) {
    relationsFilter.areaTreeLevelKey = componentState.areaTreeLevelKey;
  }

  return relationsFilter;
});
var _default = {
  getActive: getActive,
  getActiveKey: getActiveKey,
  getActiveKeys: getActiveKeys,
  getActiveModels: getActiveModels,
  getAll: getAll,
  getAllAsObject: getAllAsObject,
  getAllByKey: getAllByKey,
  getByKey: getByKey,
  getByKeysAsObject: getByKeysAsObject,
  getByKeys: getByKeys,
  getDataByKey: getDataByKey,
  getDeletePermissionByKey: getDeletePermissionByKey,
  getEditedActive: getEditedActive,
  getEditedAll: getEditedAll,
  getEditedAllAsObject: getEditedAllAsObject,
  getEditedByKey: getEditedByKey,
  getEditedDataByKey: getEditedDataByKey,
  getEditedKeys: getEditedKeys,
  getIndex: getIndex,
  getIndexByPath: getIndexByPath,
  getIndexed: getIndexed,
  getIndexes: getIndexes,
  getIndexesByPath: getIndexesByPath,
  getIndexChangedOn: getIndexChangedOn,
  getIndexPage: getIndexPage,
  getIndexTotal: getIndexTotal,
  getIndexesByFilteredItem: getIndexesByFilteredItem,
  getKeysInUse: getKeysInUse,
  getKeysToLoad: getKeysToLoad,
  getStateToSave: getStateToSave,
  getUpdatePermissionByKey: getUpdatePermissionByKey,
  getUsedIndexPage: getUsedIndexPage,
  getUsedIndexPages: getUsedIndexPages,
  getUsedKeysForComponent: getUsedKeysForComponent,
  getUsesWithActiveDependency: getUsesWithActiveDependency,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse,
  // selectors across stores
  getActiveKeysByFilterByActive: getActiveKeysByFilterByActive,
  getAllActiveKeys: getAllActiveKeys,
  // recompute observers
  getActiveKeysByFilterByActiveObserver: getActiveKeysByFilterByActiveObserver,
  getIndexesObserver: getIndexesObserver,
  // recompute selectors
  getIndex_recompute: getIndex_recompute,
  getCommmonDataRelationsFilterFromComponentState_recompute: getCommmonDataRelationsFilterFromComponentState_recompute,
  getMergedModifiers_recompute: getMergedModifiers_recompute,
  getMergedModifiersInRequestFormat_recompute: getMergedModifiersInRequestFormat_recompute
};
exports["default"] = _default;