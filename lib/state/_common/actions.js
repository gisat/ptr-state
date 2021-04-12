"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireWildcard(require("lodash"));

var _path = _interopRequireDefault(require("path"));

var _moment = _interopRequireDefault(require("moment"));

var _request = _interopRequireDefault(require("./request"));

var _helpers = _interopRequireDefault(require("./helpers"));

var _selectors = _interopRequireDefault(require("./selectors"));

var _Select = _interopRequireDefault(require("../Select"));

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _ptrUtils = require("@gisatcz/ptr-utils");

var _ptrCore = require("@gisatcz/ptr-core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_CATEGORY_PATH = 'metadata'; // ============ factories ===========

var add = function add(action) {
  return function (data) {
    return function (dispatch) {
      if (!_lodash["default"].isArray(data)) data = [data];
      dispatch(action(data));
    };
  };
};

var addIndex = function addIndex(action) {
  return function (filter, order, count, start, data, changedOn) {
    return function (dispatch) {
      dispatch(action(filter, order, count, start, data, changedOn));
    };
  };
};

var apiDelete = function apiDelete(dataType, categoryPath, data) {
  return function (dispatch, getState) {
    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(getState());

    var apiPath = 'rest/' + categoryPath;
    var payload = {
      data: _defineProperty({}, dataType, data)
    };
    return (0, _request["default"])(localConfig, apiPath, 'DELETE', null, payload).then(function (result) {
      if (result.errors && result.errors[dataType] || result.data && !result.data[dataType]) {
        dispatch(actionGeneralError(result.errors[dataType] || new Error('no data')));
      } else {
        var itemsDeleted = result.data[dataType];

        if (itemsDeleted.length > 0) {
          return result;
        } else {
          console.warn("No data updated for ".concat(dataType, " metadata type"));
        }
      }
    })["catch"](function (error) {
      dispatch(actionGeneralError(error));
    });
  };
};

var apiUpdate = function apiUpdate(getSubstate, dataType, actionTypes, categoryPath, editedData) {
  return function (dispatch, getState) {
    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(getState());

    var apiPath = 'rest/' + categoryPath;
    var payload = {
      data: _defineProperty({}, dataType, editedData)
    };
    return (0, _request["default"])(localConfig, apiPath, 'PUT', null, payload).then(function (result) {
      if (result.errors && result.errors[dataType] || result.data && !result.data[dataType]) {
        dispatch(actionGeneralError(result.errors[dataType] || new Error('no data')));
      } else {
        dispatch(receiveUpdated(getSubstate, actionTypes, result, dataType, categoryPath));
      }
    })["catch"](function (error) {
      dispatch(actionGeneralError(error));
    });
  };
};

var updateEdited = function updateEdited(getSubstate, actionTypes) {
  return function (modelKey, key, value) {
    return function (dispatch, getState) {
      if (!getSubstate) {
        return dispatch(actionGeneralError('common/actions#updateEdited: setSubstate parameter is missing!'));
      }

      if (!actionTypes) {
        return dispatch(actionGeneralError('common/actions#updateEdited: actionTypes parameter is missing!'));
      }

      if (!modelKey) {
        return dispatch(actionGeneralError('common/actions#updateEdited: Model key is missing!'));
      }

      if (!key) {
        return dispatch(actionGeneralError('common/actions#updateEdited: Property key is missing!'));
      }

      var originalModel = _selectors["default"].getByKey(getSubstate)(getState(), modelKey); // delete property from edited, if the value in update is the same as in state
      //TODO - test


      if (originalModel && (value === originalModel.data[key] || (0, _lodash.isEqual)(originalModel.data[key], value))) {
        dispatch(actionRemovePropertyFromEdited(actionTypes, modelKey, key));
      } else {
        dispatch(actionUpdateEdited(actionTypes, [{
          key: modelKey,
          data: _defineProperty({}, key, value)
        }]));
      }
    };
  };
};

var updateStore = function updateStore(getSubstate, actionTypes) {
  return function (data) {
    return function (dispatch) {
      dispatch(actionUpdateStore(actionTypes, data));
    };
  };
};

var removePropertyFromEdited = function removePropertyFromEdited(actionTypes) {
  return function (modelKey, key) {
    return dispatch(actionRemovePropertyFromEdited(actionTypes, modelKey, key));
  };
};

var deleteItem = function deleteItem(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (item) {
    return function (dispatch, getState) {
      if (!item) {
        return dispatch(actionGeneralError('common/actions#deleteItem: item to delete is missing!'));
      }

      if (!item.key) {
        return dispatch(actionGeneralError('common/actions#deleteItem: item key to delete is missing!'));
      } //dispatch deleting?
      //TODO


      return dispatch(apiDelete(dataType, categoryPath, [{
        key: item.key
      }])).then(function (result) {
        var data = result.data[dataType];
        var deletedKeys = data.map(function (d) {
          return d.key;
        }); //Check if item deleted

        if ((0, _lodash.isEqual)(deletedKeys, [item.key])) {
          // mark deleted items by "deleted" date
          var deleteDate = (0, _moment["default"])(new Date().toISOString()).utc().format();
          deletedKeys.forEach(function (key) {
            dispatch(actionMarkAsDeleted(actionTypes, key, deleteDate));
          }); // remove dependencies in all edited metadata

          dispatch(actionRemovePropertyValuesFromAllEdited(dataType, deletedKeys)); // TODO check original metadata dependencies
          //refresh proper indexes

          var state = getState();
          var indexes = _selectors["default"].getIndexesByFilteredItem(getSubstate)(state, item) || [];

          if (!_lodash["default"].isEmpty(indexes)) {
            indexes.forEach(function (index) {
              if (index) {
                //invalidate data
                dispatch(actionClearIndex(actionTypes, index.filter, index.order)); //refresh data

                dispatch(refreshIndex(getSubstate, dataType, index.filter, index.order, actionTypes, categoryPath));
              }
            });
          }
        } else {
          //error
          return dispatch(actionGeneralError('common/actions#deleteItem: Deleted key is not equal to key to delete!'));
        }
      });
    };
  };
};

var saveEdited = function saveEdited(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (key) {
    return function (dispatch, getState) {
      if (!getSubstate) {
        return dispatch(actionGeneralError('common/actions#saveEdited: setSubstate parameter is missing!'));
      }

      if (!dataType) {
        return dispatch(actionGeneralError('common/actions#saveEdited: dataType parameter is missing!'));
      }

      if (!actionTypes) {
        return dispatch(actionGeneralError('common/actions#saveEdited: actionTypes parameter is missing!'));
      }

      if (!key) {
        return dispatch(actionGeneralError('common/actions#saveEdited: Model key is missing!'));
      }

      var state = getState();

      var saved = _selectors["default"].getByKey(getSubstate)(state, key);

      var edited = _selectors["default"].getEditedByKey(getSubstate)(state, key);

      if (saved) {
        // update
        return dispatch(apiUpdate(getSubstate, dataType, actionTypes, categoryPath, [edited]));
      } else {
        // create
        debugger;
      }
    };
  };
};

var useKeys = function useKeys(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (keys, componentId) {
    return function (dispatch, getState) {
      var state = getState();

      var isRegistered = _selectors["default"].haveAllKeysRegisteredUse(getSubstate)(state, componentId, keys);

      if (!isRegistered) {
        dispatch(actionUseKeysRegister(actionTypes, componentId, keys));
      }

      return dispatch(ensureKeys(getSubstate, dataType, actionTypes, keys, categoryPath));
    };
  };
};

var useIndexed = function useIndexed(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (filterByActive, filter, order, start, length, componentId) {
    return function (dispatch, getState) {
      dispatch(actionUseIndexedRegister(actionTypes, componentId, filterByActive, filter, order, start, length));
      var state = getState();

      var activeKeys = _selectors["default"].getAllActiveKeys(state);

      var fullFilter = _helpers["default"].mergeFilters(activeKeys, filterByActive, filter);

      return dispatch(ensureIndexed(getSubstate, dataType, fullFilter, order, start, length, actionTypes, categoryPath));
    };
  };
};
/**
 * If not refresh data, call clearIndex to invalidate data.
 */


function refreshIndex(getSubstate, dataType, filter, order, actionTypes) {
  var categoryPath = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : DEFAULT_CATEGORY_PATH;
  return function (dispatch, getState) {
    var state = getState();

    var usesForIndex = _selectors["default"].getUsedIndexPage(getSubstate)(state, filter, order);

    if (usesForIndex) {
      _lodash["default"].each(usesForIndex.uses, function (use) {
        dispatch(ensureIndexed(getSubstate, dataType, usesForIndex.filter, usesForIndex.order, use.start, use.length, actionTypes, categoryPath));
      });
    }
  };
}

function receiveIndexed(actionTypes, result, dataType, filter, order, start) {
  return function (dispatch) {
    // add data to store
    if (result.data[dataType].length) {
      dispatch(actionAdd(actionTypes, result.data[dataType], filter));
    } // add to index


    dispatch(actionAddIndex(actionTypes, filter, order, result.total, start, result.data[dataType], result.changes && result.changes[dataType]));
  };
}

function requestWrapper(apiPath, method, query, payload, successAction, errorAction) {
  return function (dispatch, getState) {
    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(getState());

    (0, _request["default"])(localConfig, apiPath, method, query, payload).then(function (result) {
      dispatch(successAction(result.data));
    })["catch"](function (error) {
      dispatch(errorAction(error));
    });
  };
}

function create(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (key, appKey) {
    return function (dispatch, getState) {
      var state = getState();

      var apiPath = _path["default"].join('rest', categoryPath);

      var localConfig = _Select["default"].app.getCompleteLocalConfiguration(state);

      var applicationKey = null;

      if (appKey) {
        applicationKey = appKey;
      } else {
        var currentAppKey = _Select["default"].app.getKey(state);

        if (currentAppKey) {
          applicationKey = currentAppKey;
        }
      }

      var payload = getCreatePayload(dataType, key, applicationKey);
      return (0, _request["default"])(localConfig, apiPath, 'POST', null, payload).then(function (result) {
        if (result.errors && result.errors[dataType] || result.data && !result.data[dataType]) {
          dispatch(actionGeneralError(result.errors[dataType] || new Error('no data')));
        } else {
          var items = result.data[dataType];
          dispatch(actionAdd(actionTypes, items));
          var indexes = [];
          items.forEach(function (item) {
            indexes = indexes.concat(_selectors["default"].getIndexesByFilteredItem(getSubstate)(getState(), item)) || [];
          });

          var uniqueIndexes = _helpers["default"].getUniqueIndexes(indexes);

          if (!_lodash["default"].isEmpty(uniqueIndexes)) {
            uniqueIndexes.forEach(function (index) {
              if (index) {
                //invalidate data
                dispatch(actionClearIndex(actionTypes, index.filter, index.order)); //refresh data

                dispatch(refreshIndex(getSubstate, dataType, index.filter, index.order, actionTypes, categoryPath));
              }
            });
          }
        }
      })["catch"](function (error) {
        dispatch(actionGeneralError(error));
      });
    };
  };
}

function ensureKeys(getSubstate, dataType, actionTypes, keys) {
  var categoryPath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : DEFAULT_CATEGORY_PATH;
  return function (dispatch, getState) {
    var state = getState();

    var PAGE_SIZE = _Select["default"].app.getLocalConfiguration(state, 'requestPageSize') || _ptrCore.configDefaults.requestPageSize;

    var keysToLoad = _selectors["default"].getKeysToLoad(getSubstate)(state, keys);

    var promises = [];

    if (keysToLoad) {
      keysToLoad = _lodash["default"].chunk(keysToLoad, PAGE_SIZE);

      _lodash["default"].each(keysToLoad, function (keysToLoadPage) {
        promises.push(dispatch(loadKeysPage(dataType, actionTypes, keysToLoadPage, categoryPath)));
      });
    }

    return Promise.all(promises);
  };
}

function ensureIndexed(getSubstate, dataType, filter, order, start, length, actionTypes) {
  var categoryPath = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : DEFAULT_CATEGORY_PATH;
  return function (dispatch, getState) {
    var state = getState();

    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(state);

    var PAGE_SIZE = localConfig.requestPageSize || _ptrCore.configDefaults.requestPageSize;

    var total = _selectors["default"].getIndexTotal(getSubstate)(state, filter, order);

    var changedOn = _selectors["default"].getIndexChangedOn(getSubstate)(state, filter, order);

    if (total != null) {
      // we have existing index, we only load what we don't have
      var indexPage = _selectors["default"].getIndexPage(getSubstate)(state, filter, order, start, length) || {};

      var pages = _lodash["default"].chunk(Object.values(indexPage), PAGE_SIZE);

      var promises = pages.map(function (page, i) {
        var loadedKeys = page.filter(function (v) {
          return v != null;
        });

        if (loadedKeys.length === page.length) {
          return; // page is already loaded
        }

        var completeFilter = loadedKeys.length ? _objectSpread(_objectSpread({}, filter), {}, {
          key: {
            notin: loadedKeys
          }
        }) : filter;
        return dispatch(loadIndexedPage(dataType, completeFilter, order, start + i * PAGE_SIZE, changedOn, actionTypes, categoryPath))["catch"](function (err) {
          if (err.message === 'Index outdated') {
            dispatch(refreshIndex(getSubstate, dataType, filter, order, actionTypes, categoryPath));
          }
        });
      });
      return Promise.all(promises);
    } else {
      // we don't have index, we need to load everything
      return dispatch(loadIndexedPage(dataType, filter, order, start, changedOn, actionTypes, categoryPath)).then(function (response) {
        // check success to make sure it's our error from BE and not anything broken in render chain
        if (response && response.message && response.success === false) {// do nothing
        } else {
          // remaining pages
          if (length > PAGE_SIZE) {
            return dispatch(ensureIndexed(getSubstate, dataType, filter, order, start + PAGE_SIZE, length - PAGE_SIZE, actionTypes, categoryPath));
          } // else already done

        }
      })["catch"](function (err) {
        if (err.message === 'Index outdated') {
          dispatch(refreshIndex(getSubstate, dataType, filter, order, actionTypes, categoryPath));
        } else {
          throw new Error("_common/actions#ensure: ".concat(err));
        }
      });
    }
  };
}

function loadKeysPage(dataType, actionTypes, keys) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (dispatch, getState) {
    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(getState());

    var apiPath = getAPIPath(categoryPath, dataType);
    var payload = {
      filter: {
        key: {
          "in": keys
        }
      }
    };
    return (0, _request["default"])(localConfig, apiPath, 'POST', null, payload).then(function (result) {
      if (result.errors && result.errors[dataType] || result.data && !result.data[dataType]) {
        throw new Error(result.errors[dataType] || 'no data');
      } else {
        dispatch(receiveKeys(actionTypes, result, dataType, keys));
      }
    })["catch"](function (error) {
      dispatch(actionGeneralError(error));
      return error;
    });
  };
}

function loadIndexedPage(dataType, filter, order, start, changedOn, actionTypes) {
  var categoryPath = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : DEFAULT_CATEGORY_PATH;
  return function (dispatch, getState) {
    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(getState());

    var PAGE_SIZE = localConfig.requestPageSize || _ptrCore.configDefaults.requestPageSize;
    var apiPath = getAPIPath(categoryPath, dataType);
    var payload = {
      filter: filter && _objectSpread({}, filter),
      offset: start - 1,
      order: order,
      limit: PAGE_SIZE
    };
    return (0, _request["default"])(localConfig, apiPath, 'POST', null, payload).then(function (result) {
      if (result.errors && result.errors[dataType] || result.data && !result.data[dataType]) {
        throw new Error(result.errors[dataType] || 'no data');
      } else if (result.changes && result.changes[dataType] && (0, _moment["default"])(result.changes[dataType]).isAfter(changedOn)) {
        throw new Error('Index outdated');
      } else {
        dispatch(receiveIndexed(actionTypes, result, dataType, filter, order, start));
      }
    })["catch"](function (error) {
      dispatch(actionGeneralError(error));
      return error; //todo do we need to return this
    });
  };
}

function receiveUpdated(getSubstate, actionTypes, result, dataType, categoryPath) {
  return function (dispatch, getState) {
    var data = result.data[dataType];

    if (data.length) {
      var originalData = _selectors["default"].getAllAsObject(getSubstate)(getState());

      dispatch(actionAdd(actionTypes, data));

      var editedData = _selectors["default"].getEditedAllAsObject(getSubstate)(getState());

      var indexes = [];
      data.forEach(function (model) {
        var _editedData$model$key;

        var original = originalData === null || originalData === void 0 ? void 0 : originalData[model.key];
        var edited = editedData === null || editedData === void 0 ? void 0 : (_editedData$model$key = editedData[model.key]) === null || _editedData$model$key === void 0 ? void 0 : _editedData$model$key.data;

        _lodash["default"].forIn(edited, function (value, key) {
          if (model.data[key] === value) {
            dispatch(actionRemovePropertyFromEdited(actionTypes, model.key, key));
          } else if (_lodash["default"].isObject(value)) {
            if (JSON.stringify(value) === JSON.stringify(model.data[key])) {
              dispatch(actionRemovePropertyFromEdited(actionTypes, model.key, key));
            } else if (_lodash["default"].isArray(value) && _lodash["default"].isEmpty(value)) {
              if (_lodash["default"].isEmpty(model.data[key]) || model.data && !model.data[key]) {
                dispatch(actionRemovePropertyFromEdited(actionTypes, model.key, key));
              }
            }
          }
        });

        indexes = indexes.concat(_selectors["default"].getIndexesByFilteredItem(getSubstate)(getState() || [], model));
        indexes = indexes.concat(_selectors["default"].getIndexesByFilteredItem(getSubstate)(getState() || [], original));
      });

      var uniqueIndexes = _helpers["default"].getUniqueIndexes(indexes);

      if (!_lodash["default"].isEmpty(uniqueIndexes)) {
        uniqueIndexes.forEach(function (index) {
          if (index) {
            //invalidate data
            dispatch(actionClearIndex(actionTypes, index.filter, index.order)); //refresh data

            dispatch(refreshIndex(getSubstate, dataType, index.filter, index.order, actionTypes, categoryPath));
          }
        });
      }
    } else {
      console.warn("No data updated for ".concat(dataType, " metadata type"));
    }
  };
}

function receiveKeys(actionTypes, result, dataType, keys) {
  return function (dispatch) {
    // add data to store
    if (result.data[dataType].length) {
      dispatch(actionAdd(actionTypes, result.data[dataType]));
    } // add unreceived keys


    _lodash["default"].remove(keys, function (key) {
      return _lodash["default"].find(result.data[dataType], {
        key: key
      });
    });

    if (keys.length) {
      dispatch(actionAddUnreceivedKeys(actionTypes, keys));
    }
  };
}

function refreshUses(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function () {
    return function (dispatch, getState) {
      dispatch(actionClearIndexes(actionTypes));
      var state = getState();

      var usedKeys = _selectors["default"].getKeysInUse(getSubstate)(state);

      dispatch(ensureKeys(getSubstate, dataType, actionTypes, usedKeys, categoryPath));

      var usedIndexPages = _selectors["default"].getUsedIndexPages(getSubstate)(state);

      var promises = _lodash["default"].flatMap(usedIndexPages, function (usedIndexPage) {
        _lodash["default"].map(usedIndexPage.uses, function (use) {
          return dispatch(ensureIndexed(getSubstate, dataType, usedIndexPage.filter, usedIndexPage.order, use.start, use.length, actionTypes, categoryPath));
        });
      });

      return Promise.all(promises);
    };
  };
}

function ensureIndexesWithFilterByActive(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (filterByActive) {
    return function (dispatch, getState) {
      var state = getState();

      var usedIndexes = _selectors["default"].getUsesWithActiveDependency(getSubstate)(state, filterByActive);

      var promises = _lodash["default"].flatMap(usedIndexes, function (usedIndex) {
        _lodash["default"].map(usedIndex.uses, function (use) {
          return dispatch(ensureIndexed(getSubstate, dataType, usedIndex.filter, usedIndex.order, use.start, use.length, actionTypes, categoryPath));
        });
      });

      return Promise.all(promises);
    };
  };
}

function updateSubstateFromView(actionTypes) {
  return function (data) {
    return function (dispatch) {
      if (data && data.activeKey) {
        dispatch(actionSetActiveKey(actionTypes, data.activeKey));
      } else if (data && data.activeKeys) {
        dispatch(actionSetActiveKeys(actionTypes, data.activeKeys));
      }
    };
  };
} // ============ common namespace actions ===========


function actionDataSetOutdated() {
  return {
    type: _ActionTypes["default"].COMMON.DATA.SET_OUTDATED
  };
}

function actionRemovePropertyValuesFromAllEdited(dataType, keys) {
  return {
    type: _ActionTypes["default"].COMMON.EDITED.REMOVE_PROPERTY_VALUES,
    dataType: dataType,
    keys: keys
  };
}

function actionGeneralError(e) {
  console.error('common/actions error', e);
  return {
    type: 'ERROR'
  };
} // ============ specific store namespace actions ===========


var creator = function creator(action) {
  return function (actionTypes) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return function (dispatch) {
        dispatch(action.apply(void 0, [actionTypes].concat(args)));
      };
    };
  };
};

function action(actionTypes, type, payload) {
  type = type.split('.');

  _lodash["default"].each(type, function (pathSegment) {
    if (!actionTypes.hasOwnProperty(pathSegment)) {
      console.error('common/actions#action: Action not in namespace', type, payload);
      throw new Error('common/actions#action: Action not in namespace');
    }

    actionTypes = actionTypes[pathSegment];
  });

  if (typeof actionTypes !== 'string') throw new Error('common/actions#action: Action type not string');
  return _objectSpread(_objectSpread({}, payload), {}, {
    type: actionTypes
  });
}

function actionAdd(actionTypes, data, filter) {
  if (!_lodash["default"].isArray(data)) data = [data];
  return action(actionTypes, 'ADD', {
    data: data,
    filter: filter
  });
}

function actionAddUnreceivedKeys(actionTypes, keys) {
  if (!_lodash["default"].isArray(keys)) keys = [keys];
  return action(actionTypes, 'ADD_UNRECEIVED', {
    keys: keys
  });
}

function actionAddIndex(actionTypes, filter, order, count, start, data, changedOn, limit //optional
) {
  return action(actionTypes, 'INDEX.ADD', _objectSpread({
    filter: filter,
    order: order,
    count: count,
    start: start,
    data: data,
    changedOn: changedOn
  }, limit && {
    limit: limit
  }));
}
/**
 * Useful for invalidate data before refresh indexes
 */


function actionClearIndex(actionTypes, filter, order) {
  return action(actionTypes, 'INDEX.CLEAR_INDEX', {
    filter: filter,
    order: order
  });
}

var actionMarkAsDeleted = function actionMarkAsDeleted(actionTypes, key, date) {
  return action(actionTypes, 'MARK_DELETED', {
    key: key,
    date: date
  });
};

function actionClearIndexes(actionTypes) {
  return action(actionTypes, 'INDEX.CLEAR_ALL');
}

function actionDelete(actionTypes, keys) {
  return action(actionTypes, 'DELETE', {
    keys: keys
  });
}

function actionSetActiveKey(actionTypes, key) {
  return action(actionTypes, 'SET_ACTIVE_KEY', {
    key: key
  });
}

function actionSetActiveKeys(actionTypes, keys) {
  return action(actionTypes, 'SET_ACTIVE_KEYS', {
    keys: keys
  });
}

function actionRemoveEdited(actionTypes, keys) {
  return action(actionTypes, 'EDITED.REMOVE', {
    keys: keys
  });
}

function actionUpdateEdited(actionTypes, data) {
  return action(actionTypes, 'EDITED.UPDATE', {
    data: data
  });
}

function actionRemovePropertyFromEdited(actionTypes, key, property) {
  return action(actionTypes, 'EDITED.REMOVE_PROPERTY', {
    key: key,
    property: property
  });
}

function actionUseIndexedRegister(actionTypes, componentId, filterByActive, filter, order, start, length) {
  return action(actionTypes, 'USE.INDEXED.REGISTER', {
    componentId: componentId,
    filterByActive: filterByActive,
    filter: filter,
    order: order,
    start: start,
    length: length
  });
}

function actionUseIndexedClear(actionTypes, componentId) {
  return action(actionTypes, 'USE.INDEXED.CLEAR', {
    componentId: componentId
  });
}

function actionUseIndexedClearAll(actionTypes) {
  return action(actionTypes, 'USE.INDEXED.CLEAR_ALL');
}

function actionUpdateStore(actionTypes, data) {
  return action(actionTypes, 'UPDATE_STORE', data);
}

function actionUseKeysClear(actionTypes, componentId) {
  return action(actionTypes, 'USE.KEYS.CLEAR', {
    componentId: componentId
  });
}

function actionUseKeysRegister(actionTypes, componentId, keys) {
  return action(actionTypes, 'USE.KEYS.REGISTER', {
    componentId: componentId,
    keys: keys
  });
} // ============ utilities ===========


var getAPIPath = function getAPIPath() {
  var categoryPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_CATEGORY_PATH;
  var dataType = arguments.length > 1 ? arguments[1] : undefined;
  return _path["default"].join('rest', categoryPath, 'filtered', dataType);
};

var getCreatePayload = function getCreatePayload(datatype) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ptrUtils.utils.uuid();
  var applicationKey = arguments.length > 2 ? arguments[2] : undefined;
  var payload = {
    data: {}
  };
  var model = {
    key: key,
    data: {}
  };

  if (applicationKey) {
    model.data = {
      applicationKey: applicationKey
    };
  }

  payload.data[datatype] = [model];
  return payload;
}; // ============ export ===========


var _default = {
  add: creator(actionAdd),
  action: action,
  addIndex: creator(actionAddIndex),
  actionGeneralError: actionGeneralError,
  apiUpdate: apiUpdate,
  creator: creator,
  create: create,
  "delete": deleteItem,
  ensure: ensureKeys,
  ensureIndexed: ensureIndexed,
  ensureIndexesWithFilterByActive: ensureIndexesWithFilterByActive,
  ensureKeys: ensureKeys,
  loadIndexedPage: loadIndexedPage,
  loadKeysPage: loadKeysPage,
  setActiveKey: creator(actionSetActiveKey),
  setActiveKeys: creator(actionSetActiveKeys),
  receiveUpdated: receiveUpdated,
  receiveIndexed: receiveIndexed,
  receiveKeys: receiveKeys,
  refreshUses: refreshUses,
  removePropertyFromEdited: removePropertyFromEdited,
  request: requestWrapper,
  saveEdited: saveEdited,
  updateSubstateFromView: updateSubstateFromView,
  updateEdited: updateEdited,
  updateStore: updateStore,
  useKeys: useKeys,
  useKeysClear: creator(actionUseKeysClear),
  useIndexed: useIndexed,
  clearIndex: creator(actionClearIndex),
  useIndexedRegister: actionUseIndexedRegister,
  useIndexedClear: creator(actionUseIndexedClear),
  useIndexedClearAll: creator(actionUseIndexedClearAll),
  actionDataSetOutdated: actionDataSetOutdated,
  actionSetActiveKey: actionSetActiveKey
};
exports["default"] = _default;