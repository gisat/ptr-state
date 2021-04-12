"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _recompute = require("@jvitela/recompute");

var _ptrCore = require("@gisatcz/ptr-core");

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _request = _interopRequireDefault(require("../../_common/request"));

var _actions = _interopRequireDefault(require("../../_common/actions"));

var _actions2 = _interopRequireDefault(require("../AttributeRelations/actions"));

var _actions3 = _interopRequireDefault(require("../AttributeData/actions"));

var _Select = _interopRequireDefault(require("../../Select"));

var _helpers = require("./helpers");

var _helpers2 = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_PAGE_PAGINATION = {
  offset: 0,
  limit: _ptrCore.configDefaults.requestPageSize
};
/**
 * Update whole data.components.components object with given components
 * @param components {Object}
 */

function updateComponentsStateFromView(components) {
  return function (dispatch) {
    if (components) {
      dispatch(actionUpdateComponents(components));
    }
  };
}

function updateComponent(componentKey, update) {
  return function (dispatch, getState) {
    var state = getState();

    var componentState = _Select["default"].data.components.getComponentStateByKey(state, componentKey);

    dispatch(actionUpdateComponents(_defineProperty({}, componentKey, _objectSpread(_objectSpread({}, componentState), update))));
  };
}
/**
 * Ensure load attribute data and relations.
 * Useful if no indexes are registered for relations and attribute data.
 * Function has two phases, it loads data and relations in first and determinate and loads what is missing in second phase.
 * @param {String} componentKey Related component
 * @param {Array?} order Order object for attributes
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {Number} start Position of first asked item after ordered.
 * @param {Number} length How many attribute data asking for.
 * @param {Number} PAGE_SIZE How many attribute data items will be in one request.
 * @param {Boolean} loadRelations Whether to load relations.
 * @param {Boolean} loadData Whether to load attribute data.
 * @param {Object} attributePagination Paginations for attributes {offset: Number, limit: Number}
 * @param {Object} relationsPagination Paginations for relations {offset: Number, limit: Number}
 * @return {function}
 */


function ensureDataAndRelations(componentKey, order, commonFilter, attributeDataFilterExtension, start, length, PAGE_SIZE, loadRelations, loadData, attributePagination, relationsPagination) {
  return function (dispatch, getState) {
    var state = getState();
    (0, _recompute.setState)(state);

    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(state);

    var PAGE_SIZE = (0, _helpers2.getPageSize)(localConfig);
    var RELATIONS_PAGE_SIZE = (0, _helpers2.getPageSize)(localConfig);
    return dispatch(loadIndexedPage(order, commonFilter, attributeDataFilterExtension, !!loadRelations, loadData, relationsPagination, attributePagination)).then(function (response) {
      if (response instanceof Error) {
        return;
        throw response;
      }

      (0, _recompute.setState)(getState());
      var attributeDataIndex = _Select["default"].data.components.getIndexForAttributeDataByComponentKey(componentKey) || [];

      var relationsFilter = _objectSpread({}, commonFilter);

      var attributeRelationsIndex = _Select["default"].data.attributeRelations.getIndex(getState(), relationsFilter) || [];
      var missingAttributesPages = (0, _helpers.getMissingPages)(attributeDataIndex, PAGE_SIZE, start, length);
      var missingRelationsPages = (0, _helpers.getMissingPages)(attributeRelationsIndex, RELATIONS_PAGE_SIZE, 1, null);

      if (missingRelationsPages.length === 0 && missingAttributesPages.length === 0) {
        //nothing to load
        return;
      } else {
        //needs to load more relations or data
        return dispatch(loadMissingRelationsAndData(componentKey, order, commonFilter, attributeDataFilterExtension, missingRelationsPages, missingAttributesPages, start, length, PAGE_SIZE));
      }
    });
  };
}
/**
 * Helper function. Usually second step in requesting data.
 * Load all relations and attributeData based on its remaining page counts.
 * @param {String} componentKey
 * @param {Array?} order Order object for attributes
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {Array} remainingRelationsPages Missing page indexes of ralations defined in array. [0,1,2,3] || [2,5]
 * @param {Array} remainingAttributeDataPages Missing page indexes of attributes defined in array. [0,1,2,3] || [2,5]
 * @param {Array} start Starting position of first requested item. Defualt is 1.
 * @param {Array} length Length of asked attributeData
 * @param {Number} PAGE_SIZE How many attribute data items will be in one request.
 * @return {function} Return promise.
 */


function loadMissingRelationsAndData(componentKey, order, commonFilter, attributeDataFilterExtension, remainingRelationsPages, remainingAttributeDataPages, start, length, PAGE_SIZE) {
  return function (dispatch, getState) {
    var state = getState();
    (0, _recompute.setState)(state);

    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(state);

    var RELATIONS_PAGE_SIZE = (0, _helpers2.getPageSize)(localConfig);
    var promises = [];
    var attributeDataIndex = _Select["default"].data.components.getIndexForAttributeDataByComponentKey(componentKey) || {};
    var attributeCount = attributeDataIndex.count; // load remaining relations pages

    var pagination = 0;
    var loadRelations = true;

    for (var i = 1; i <= remainingRelationsPages.length; i++) {
      var relationsPagination = (0, _helpers.getPagination)(remainingRelationsPages[i - 1], 1, RELATIONS_PAGE_SIZE); //only if missing attribute data pages missing

      var attributePagination = (0, _helpers.getNullishPagination)();
      var loadData = false;

      if (pagination < remainingAttributeDataPages.length) {
        attributePagination = (0, _helpers.getPagination)(remainingAttributeDataPages[i - 1], start, PAGE_SIZE, length, attributeCount);
        loadData = true;
        pagination = i;
      }

      promises.push(dispatch(loadIndexedPage(order, commonFilter, attributeDataFilterExtension, loadRelations, loadData, relationsPagination, //pagination for relations
      attributePagination //pagination for data is same like for relations here
      )));
    } // If its still needed, load remaining data pages


    for (var _i = pagination + 1; _i <= remainingAttributeDataPages.length; _i++) {
      var _relationsPagination = (0, _helpers.getNullishPagination)();

      var _attributePagination = (0, _helpers.getPagination)(remainingAttributeDataPages[_i - 1], start, PAGE_SIZE, length, attributeCount);

      var _loadRelations = false;
      var _loadData = true;
      promises.push(dispatch(loadIndexedPage(order, commonFilter, attributeDataFilterExtension, _loadRelations, _loadData, _relationsPagination, _attributePagination)));
    }

    return Promise.all(promises);
  };
}
/**
 * Check if for given componentKey missing data or relations and load them.
 * @param {String} componentKey
 */


var ensure = function ensure(componentKey) {
  return function (dispatch, getState) {
    var state = getState();
    (0, _recompute.setState)(state);

    var componentState = _Select["default"].data.components.getComponentStateByKey(state, componentKey);

    if (componentState) {
      var _componentState$attri = componentState.attributeOrder,
          order = _componentState$attri === void 0 ? null : _componentState$attri,
          _componentState$start = componentState.start,
          start = _componentState$start === void 0 ? 1 : _componentState$start,
          length = componentState.length;

      var attributeDataFilterExtension = _Select["default"].data.components.getAttributeDataFilterExtensionByComponentKey(componentKey);

      var commonFilter = _Select["default"].data.components.getCommonFilterByComponentKey(componentKey);

      var relationsFilter = _objectSpread({}, commonFilter);

      var attributeDataIndex = _Select["default"].data.components.getIndexForAttributeDataByComponentKey(componentKey) || [];
      var attributeRelationsIndex = _Select["default"].data.attributeRelations.getIndex(state, relationsFilter) || [];
      var loadRelations = true;
      var loadData = true;

      var localConfig = _Select["default"].app.getCompleteLocalConfiguration(state);

      var RELATIONS_PAGE_SIZE = (0, _helpers2.getPageSize)(localConfig); // Attribute data page size is same like app page size
      // In case of need PAGE_SIZE could be modified here

      var PAGE_SIZE = RELATIONS_PAGE_SIZE;
      var relationsPagination = (0, _helpers.getPagination)(0, 1, RELATIONS_PAGE_SIZE);
      var attributePagination = (0, _helpers.getPagination)(0, start, PAGE_SIZE, length);
      var missingRelationsPages, missingAttributesPages; // Relations index exist
      // find if all required relations are loaded

      if (!_lodash["default"].isEmpty(attributeDataIndex)) {
        missingRelationsPages = (0, _helpers.getMissingPages)(attributeRelationsIndex, RELATIONS_PAGE_SIZE, 1, null);
        relationsPagination = (0, _helpers.getPagination)(missingRelationsPages[0] || 0, 0, RELATIONS_PAGE_SIZE);

        if (missingRelationsPages.length > 0) {
          loadRelations = true;
        } else {
          loadRelations = false;
        }
      } // Attribute data index exist
      // find if all required data are loaded


      if (!_lodash["default"].isEmpty(attributeDataIndex)) {
        missingAttributesPages = (0, _helpers.getMissingPages)(attributeDataIndex, PAGE_SIZE, start, length);
        attributePagination = (0, _helpers.getPagination)(missingAttributesPages[0] || 0, start, PAGE_SIZE, length, attributeDataIndex.count);

        if (missingAttributesPages.length > 0) {
          loadData = true;
        } else {
          loadData = false;
        }
      } // Attribute and relation index is loaded. We know exactly which attribute or relations pages we need.


      if (!_lodash["default"].isEmpty(attributeDataIndex) && !_lodash["default"].isEmpty(attributeRelationsIndex)) {
        // Some of data or relations are needed
        if (loadData || loadRelations) {
          // Load just missing data and relations defined by missingPages
          return dispatch(loadMissingRelationsAndData(componentKey, order, commonFilter, attributeDataFilterExtension, missingRelationsPages, missingAttributesPages, start, length, PAGE_SIZE));
        } else {
          // All data are loaded
          return;
        } // Attribute or relations or both index is not loaded.

      } else {
        // Load relations and data
        return dispatch(ensureDataAndRelations(componentKey, order, commonFilter, attributeDataFilterExtension, start, length, PAGE_SIZE, loadRelations, loadData, attributePagination, relationsPagination));
      }
    }
  };
};

var ensureWithFilterByActive = function ensureWithFilterByActive(filterByActive) {
  return function (dispatch, getState) {
    var state = getState();

    var componentsInUse = _Select["default"].data.components.getAllComponentsInUse(state);

    if (componentsInUse.length) {
      componentsInUse.forEach(function (componentKey) {
        var fitsFilterByActive = _Select["default"].data.components.componentMatchesFilterByActive(state, componentKey, filterByActive);

        if (fitsFilterByActive) {
          dispatch(ensure(componentKey));
        }
      });
    }
  };
};
/**
 * Entry point for ensuring data for component
 * @param {string} componentKey
 */


var use = function use(componentKey) {
  return function (dispatch) {
    dispatch(componentUseRegister(componentKey));
    dispatch(ensure(componentKey));
  };
};
/**
 * Clear use of the component
 * @param componentKey {string}
 */


var componentUseClear = function componentUseClear(componentKey) {
  return function (dispatch, getState) {
    var registered = _Select["default"].data.components.isComponentInUse(getState(), componentKey);

    if (registered) {
      dispatch(actionComponentUseClear(componentKey));
    }
  };
};
/**
 * Register use of the component
 * @param componentKey {string}
 */


var componentUseRegister = function componentUseRegister(componentKey) {
  return function (dispatch, getState) {
    var alreadyRegistered = _Select["default"].data.components.isComponentInUse(getState(), componentKey);

    if (!alreadyRegistered) {
      dispatch(actionComponentUseRegister(componentKey));
    }
  };
};
/**
 * Compose payload for request from given parameters
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} relationsPagination Pagination for relations. Example `{relations: true, limit:100, offset:0}`.
 * @param {Object?} attributeDataPagination Pagination for attributeData. Example `{data: true, limit:100, offset:0}`.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {Array?} order Order object for attributes
 * @returns {Object}
 */


var getPayload = function getPayload(commonFilter, relationsPagination, attributeDataPagination, attributeDataFilterExtension, order) {
  var attributeFilter = attributeDataFilterExtension.attributeFilter,
      dataSourceKeys = attributeDataFilterExtension.dataSourceKeys,
      featureKeys = attributeDataFilterExtension.featureKeys,
      spatialFilter = attributeDataFilterExtension.spatialFilter;
  var layerTemplateKey = commonFilter.layerTemplateKey,
      areaTreeLevelKey = commonFilter.areaTreeLevelKey,
      attributeKeys = commonFilter.attributeKeys,
      modifiers = commonFilter.modifiers; // Create payload

  var payload = _objectSpread(_objectSpread(_objectSpread(_objectSpread({
    modifiers: modifiers
  }, layerTemplateKey && {
    layerTemplateKey: layerTemplateKey
  }), areaTreeLevelKey && {
    areaTreeLevelKey: areaTreeLevelKey
  }), attributeKeys && {
    attributeKeys: attributeKeys
  }), {}, {
    // pagination for relations (& data sources)
    // TODO add support for relations:false on BE
    // ...(loadRelations && {relations: usedRelationsPagination}),
    relations: relationsPagination,
    data: _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, attributeDataPagination && attributeDataPagination), attributeFilter && {
      attributeFilter: attributeFilter
    }), {}, {
      attributeOrder: order || null
    }, featureKeys && {
      featureKeys: featureKeys
    }), spatialFilter && {
      spatialFilter: spatialFilter
    }), dataSourceKeys && {
      dataSourceKeys: dataSourceKeys
    })
  });

  return payload;
};
/**
 * Process result into smaller actions that pass loaded data into store.
 * @param {Object} result Result from BE
 * @param {bool} loadRelations Wether BE should return relations
 * @param {Object} relationsFilter Filter object with modifiers
 * @param {Object?} relationsOrder Order object for relations
 * @param {Object} attributeDataFilter Object contains values extended by commonFilter.
 * @param {Array?} order Order object for attributes
 * @param {Number} relationsLimit Numeric limitation for loading relations
 * @returns
 */


var processResult = function processResult(result, loadRelations, relationsFilter, relationsOrder, attributeDataFilter, order, relationsLimit) {
  return function (dispatch) {
    if (result.attributeData || result.attributeRelationsDataSources) {
      if (loadRelations) {
        var changes = null;
        dispatch(_actions2["default"].receiveIndexed(result.attributeRelationsDataSources.attributeRelations, relationsFilter, relationsOrder, result.attributeRelationsDataSources.offset + 1, result.attributeRelationsDataSources.total, changes, relationsLimit));
      }

      if (result.attributeData.attributeData) {
        var _changes = null;
        dispatch(_actions3["default"].receiveIndexedAttributeEndPoint(result.attributeData, attributeDataFilter, order, result.attributeData.offset + 1, result.attributeData.total, _changes));
      }
    }
  };
};
/**
 *
 * @param {Array?} order Order object for attributes
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {bool} loadRelations Whether response should contain relations
 * @param {bool} loadData Whether response should contain data
 * @param {Object?} relationsPagination Pagination for relations.
 * @param {Object?} attributeDataPagination Pagination for attributeData.
 */


function loadIndexedPage(order, commonFilter, attributeDataFilterExtension, loadRelations, loadData, relationsPagination, attributeDataPagination) {
  return function (dispatch, getState) {
    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(getState());

    var apiPath = 'rest/attributeData/filtered';
    var relationsOrder = null;

    var relationsFilter = _objectSpread({}, commonFilter);

    var attributeDataFilter = _objectSpread(_objectSpread({}, commonFilter), attributeDataFilterExtension);

    var usedRelationsPagination = relationsPagination ? _objectSpread({}, relationsPagination) : DEFAULT_PAGE_PAGINATION;

    if (loadRelations) {
      usedRelationsPagination.relations = true; //set relations loading

      dispatch(_actions2["default"].addLoadingIndex(usedRelationsPagination, relationsFilter, relationsOrder));
    } else {
      usedRelationsPagination.relations = false;
    }

    var usedAttributeDataPagination = attributeDataPagination ? _objectSpread({}, attributeDataPagination) : DEFAULT_PAGE_PAGINATION;

    if (loadData) {
      usedAttributeDataPagination.data = true; //set attributeData loading

      dispatch(_actions3["default"].addLoadingIndex(usedAttributeDataPagination, attributeDataFilter, order));
    } else {
      usedAttributeDataPagination.data = false;
    }

    var payload = getPayload(commonFilter, usedRelationsPagination, usedAttributeDataPagination, attributeDataFilterExtension, order);
    return (0, _request["default"])(localConfig, apiPath, 'POST', null, payload, undefined, null).then(function (result) {
      if (result.errors) {
        throw new Error(result.errors[dataType] || 'no data');
      } else {
        if (result.attributeData || result.attributeRelationsDataSources) {
          var relationsLimit = usedRelationsPagination.limit;
          dispatch(processResult(result, loadRelations, relationsFilter, relationsOrder, attributeDataFilter, order, relationsLimit));
          return result;
        } else {
          var error = new Error('no data');
          dispatch(_actions["default"].actionGeneralError(error));
          return error;
        }
      }
    })["catch"](function (error) {
      dispatch(_actions["default"].actionGeneralError(error));
      return error; //todo do we need to return this
    });
  };
} // Actions ------------------------------------------------------------------------------------------------------------

/**
 *
 * @param componentKey {string}
 * @param attributeKeys {Array}
 * @returns
 */


var actionSetAttributeKeys = function actionSetAttributeKeys(componentKey, attributeKeys) {
  return {
    type: _ActionTypes["default"].DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS,
    componentKey: componentKey,
    attributeKeys: attributeKeys
  };
};

var actionUpdateComponents = function actionUpdateComponents(components) {
  return {
    type: _ActionTypes["default"].DATA.COMPONENTS.UPDATE_COMPONENTS,
    components: components
  };
};

var actionComponentUseClear = function actionComponentUseClear(componentKey) {
  return {
    type: _ActionTypes["default"].DATA.COMPONENTS.COMPONENT.USE.CLEAR,
    componentKey: componentKey
  };
};

var actionComponentUseRegister = function actionComponentUseRegister(componentKey) {
  return {
    type: _ActionTypes["default"].DATA.COMPONENTS.COMPONENT.USE.REGISTER,
    componentKey: componentKey
  };
};

var _default = {
  componentUseClear: componentUseClear,
  componentUseRegister: componentUseRegister,
  ensure: ensure,
  ensureDataAndRelations: ensureDataAndRelations,
  ensureWithFilterByActive: ensureWithFilterByActive,
  getPayload: getPayload,
  loadIndexedPage: loadIndexedPage,
  loadMissingRelationsAndData: loadMissingRelationsAndData,
  processResult: processResult,
  setAttributeKeys: actionSetAttributeKeys,
  updateComponentsStateFromView: updateComponentsStateFromView,
  updateComponent: updateComponent,
  use: use
};
exports["default"] = _default;