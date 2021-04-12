"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _recompute = require("@jvitela/recompute");

var _ptrCore = require("@gisatcz/ptr-core");

var _actions = _interopRequireDefault(require("./AttributeRelations/actions"));

var _actions2 = _interopRequireDefault(require("./AttributeDataSources/actions"));

var _actions3 = _interopRequireDefault(require("./AttributeData/actions"));

var _actions4 = _interopRequireDefault(require("./Components/actions"));

var _actions5 = _interopRequireDefault(require("./SpatialRelations/actions"));

var _actions6 = _interopRequireDefault(require("./SpatialDataSources/actions"));

var _actions7 = _interopRequireDefault(require("./SpatialData/actions"));

var _request = _interopRequireDefault(require("../_common/request"));

var _actions8 = _interopRequireDefault(require("../_common/actions"));

var _Select = _interopRequireDefault(require("../Select"));

var _helpers = require("./helpers");

var _constants = require("./constants");

var _helpers2 = _interopRequireDefault(require("../_common/helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var DEFAULT_RELATIONS_PAGE = {
  offset: 0,
  limit: _ptrCore.configDefaults.requestPageSize
};
/**
 * Calculates how many page of relations is missing.
 * It assume that one page of size PAGE_SIZE was loaded.
 * @param {Number} attributeRelationsCount Wanted attributeRelations items
 * @param {Number} spatialRelationsCount Wanted spatialRelations items
 * @param {Number} PAGE_SIZE How many items fit to one page
 * @returns Number How many pages remaining
 */

var getRestRelationsPages = function getRestRelationsPages(attributeRelationsCount, spatialRelationsCount, PAGE_SIZE) {
  // What is higer to load? attributeRelations or spatialRelations
  var maxCountValue = Math.max(attributeRelationsCount, spatialRelationsCount);

  if (maxCountValue === 0) {
    return 0;
  } else {
    var remainingPageCount = Math.ceil((maxCountValue - PAGE_SIZE) / PAGE_SIZE);
    return remainingPageCount;
  }
};
/**
 * Helper function. Usually second step in requesting data.
 * Calculate if relations requests are missing based on attributeRelationsCount and spatialRelationsCount.
 * Each relations request loads one next tile from spatialFilter.
 * Rest tiles are loaded without relatiions.
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Number} attributeRelationsCount Count of known attribute relations. Used for determinate further requests.
 * @param {Number} spatialRelationsCount Count of known spatial relations. Used for determinate further requests.
 * @param {Array} preloadedSpatialDataSources SpatialDataSources loaded by previous request.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function} Return promise.
 */


function loadMissingRelationsAndData(loadGeometry, spatialFilter, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeRelationsCount, spatialRelationsCount) {
  var preloadedSpatialDataSources = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];
  var attributeDataFilter = arguments.length > 9 ? arguments[9] : undefined;
  return function (dispatch, getState) {
    var _spatialFilter$tiles;

    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(getState());

    var PAGE_SIZE = (0, _helpers.getPageSize)(localConfig);
    var promises = []; // load remaining relations pages
    // ignoring first page

    var remainingRelationsPageCount = getRestRelationsPages(attributeRelationsCount, spatialRelationsCount, PAGE_SIZE);
    var tilesPagination = 0;

    for (var i = 1; i <= remainingRelationsPageCount; i++) {
      //load only needed relations
      var loadAttributeRelations = attributeRelationsCount - i > 0;
      var loadSpatialRelations = spatialRelationsCount - i > 0;
      var relations = {
        offset: i * PAGE_SIZE,
        limit: PAGE_SIZE
      };
      tilesPagination = i;
      var spatialIndex = {
        tiles: [spatialFilter.tiles[tilesPagination]]
      };
      promises.push(dispatch(loadIndexedPage(styleKey, relations, spatialIndex, spatialFilter, loadGeometry, loadAttributeRelations, loadSpatialRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
    } //
    //load rest of tiles
    //


    var remainingTilesPageCount = (spatialFilter === null || spatialFilter === void 0 ? void 0 : (_spatialFilter$tiles = spatialFilter.tiles) === null || _spatialFilter$tiles === void 0 ? void 0 : _spatialFilter$tiles.length) || 0; //first tile was loaded before loadMissingRelationsAndData first request

    for (var _i = tilesPagination + 1; _i < remainingTilesPageCount; _i++) {
      var _spatialIndex = {
        tiles: [spatialFilter.tiles[_i]]
      };
      var _relations = {};
      var loadRestTilesRelations = false;
      promises.push(dispatch(loadIndexedPage(styleKey, _relations, _spatialIndex, spatialFilter, loadGeometry, loadRestTilesRelations, loadRestTilesRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
    }

    if (promises.length > 0) {
      return Promise.all(promises).then(function () {
        var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        // All relations are loaded at this moment.
        // Check if all spatialDataSources relations from response and preloadedSpatialDataSources are type of "unsupported" like raster/wms/wmts.
        // If all spatialDataSources are unsupported, then received data are empty and indexes needs to be removed.
        // If only some of spatialDataSources relations are unsupported, then loading status on index will be replaced by data.
        var spatialDataSourcesTypes = _lodash["default"].flattenDeep(response.map(function (r) {
          var _r$spatialAttributeRe, _r$spatialAttributeRe2;

          return r === null || r === void 0 ? void 0 : (_r$spatialAttributeRe = r.spatialAttributeRelationsDataSources) === null || _r$spatialAttributeRe === void 0 ? void 0 : (_r$spatialAttributeRe2 = _r$spatialAttributeRe.spatialDataSources) === null || _r$spatialAttributeRe2 === void 0 ? void 0 : _r$spatialAttributeRe2.map(function (sds) {
            return {
              type: sds.data.type,
              key: sds.key
            };
          });
        }));

        var spatialDataSourcesPairs = [].concat(_toConsumableArray(spatialDataSourcesTypes), _toConsumableArray(preloadedSpatialDataSources)); //test spatialDataSources only if some come from BE

        var allSourcesAreUnsupported = !_lodash["default"].isEmpty(spatialDataSourcesPairs) ? spatialDataSourcesPairs.every(function (ds) {
          return !_constants.TILED_VECTOR_LAYER_TYPES.includes(ds.type);
        }) : false; // Check if all of returned spatialDataSources are unsupported type.
        // Indexes for unsupported layers can be cleared.

        if (allSourcesAreUnsupported) {
          // AttributeData and spatialData index represented by spatialRelationsFilter, attributeRelationsFilter and order can be deleted
          dispatch(_actions7["default"].removeIndex(spatialRelationsFilter, order));
          dispatch(_actions3["default"].removeSpatialIndex(attributeDataFilter, order));
        }
      });
    } else {
      return Promise.resolve();
    }
  };
}
/**
 * Ensure load missing attribute data and relations for tiles defined in spatialFilter that are not loaded or loading in state.
 *
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function}
 */


function loadMissingAttributeData(spatialFilter, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter) {
  return function (dispatch, getState) {
    // console.log("loadMissingAttributeData",spatialFilter);
    var state = getState();

    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(state);

    var PAGE_SIZE = (0, _helpers.getPageSize)(localConfig);
    var relations = {
      // start: 0,
      // length: 1000,
      offset: 0,
      limit: PAGE_SIZE
    }; //
    // which attribute data to load
    //
    //get attribute data index with loaded and loading data

    var attributeDataIndex = _Select["default"].data.attributeData.getIndex(state, 'spatialIndexes', attributeDataFilter, order) || []; //diff loaded attribute data from index with wanted spatial data

    var missingAttributeDataTiles = (0, _helpers.getMissingTiles)(attributeDataIndex, spatialFilter) || []; // Load relations and data sources in first request if they are not already loaded.

    var attributeRelations = _Select["default"].data.attributeRelations.getIndex(state, attributeRelationsFilter, order);

    var attributeDataSources = _Select["default"].data.attributeDataSources.getIndex(state, attributeRelationsFilter, order);

    var loadAttributeRelationsAndDS = !(!_lodash["default"].isEmpty(attributeRelations) && !_lodash["default"].isEmpty(attributeDataSources)); //load only attribute data

    var loadGeometry = false; // Modified spatial filter with only missing attribute data tiles

    var spatialFilterWithMissingTiles = _objectSpread(_objectSpread({}, spatialFilter), {}, {
      tiles: missingAttributeDataTiles
    }); // Relations for given filters are missing


    if (loadAttributeRelationsAndDS) {
      // Only if spatialIndex is null then is set whole spatialFilter.tiles as loading true in one step
      var spatialIndex = null;
      var loadAttributeRelations = true;
      var loadSpatialRelations = false; // Load relations

      return dispatch(loadIndexedPage(styleKey, relations, spatialIndex, spatialFilterWithMissingTiles, loadGeometry, loadAttributeRelations, loadSpatialRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)).then(function (response) {
        var _response$spatialAttr;

        if (response instanceof Error) {
          return;
          throw response;
        }

        var spatialDataSources = (response === null || response === void 0 ? void 0 : (_response$spatialAttr = response.spatialAttributeRelationsDataSources) === null || _response$spatialAttr === void 0 ? void 0 : _response$spatialAttr.spatialDataSources) || [];
        var preloadSpatialDataSources = spatialDataSources.map(function (sds) {
          return {
            type: sds.data.type,
            key: sds.key
          };
        });
        var attributeRelationsCount = response.spatialAttributeRelationsDataSources.total.attributeRelations;
        var spatialRelationsCount = response.spatialAttributeRelationsDataSources.total.spatialRelations;
        return dispatch(loadMissingRelationsAndData(loadGeometry, spatialFilterWithMissingTiles, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeRelationsCount, spatialRelationsCount, preloadSpatialDataSources, attributeDataFilter));
      });
    } else {
      var promises = [];
      var _loadAttributeRelations = false;
      var _loadSpatialRelations = false;

      var _iterator = _createForOfIteratorHelper(missingAttributeDataTiles),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tile = _step.value;
          var _spatialIndex2 = {
            tiles: [tile]
          };
          promises.push(dispatch(loadIndexedPage(styleKey, relations, _spatialIndex2, spatialFilter, loadGeometry, _loadAttributeRelations, _loadSpatialRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return Promise.all(promises);
    }
  };
}
/**
 * Ensure load missing spatial data for tiles defined in spatialFilter that are not loaded or loading in state.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function}
 */


function loadMissingSpatialData(spatialFilter, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter) {
  return function (dispatch, getState) {
    // console.log("loadMissingSpatialData",spatialFilter);
    //
    //which spatial data to load
    //
    //get spatial data index with loaded and loading data
    var spatialDataIndex = _Select["default"].data.spatialData.getIndex(getState(), spatialRelationsFilter, order) || []; //diff spatial data loaded/loading and to load

    var missingSpatialDataTiles = (0, _helpers.getMissingTiles)(spatialDataIndex, spatialFilter) || [];
    var loadGeometry = true;
    dispatch(setLoading(attributeDataFilter, {
      tiles: missingSpatialDataTiles
    }, spatialFilter, spatialRelationsFilter, order, loadGeometry));
    var promises = [];

    var _iterator2 = _createForOfIteratorHelper(missingSpatialDataTiles),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var tile = _step2.value;
        var spatialIndex = {
          tiles: [tile]
        };
        var relations = {};
        var loadRelations = false;
        promises.push(dispatch(loadIndexedPage(styleKey, relations, spatialIndex, spatialFilter, loadGeometry, loadRelations, loadRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return Promise.all(promises);
  };
}
/**
 * Ensure load spatial data, attribute data and relations for tiles defined in spatialFilter.
 * Makes load first page of data, if more date missing, pass filters to loadMissingRelationsAndData.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function}
 */


function ensureDataAndRelations(spatialFilter, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter) {
  return function (dispatch, getState) {
    // console.log("ensureDataAndRelations", spatialFilter);
    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(getState());

    var PAGE_SIZE = (0, _helpers.getPageSize)(localConfig);
    var relations = {
      // start: 0,
      // length: 1000,
      offset: 0,
      limit: PAGE_SIZE
    };
    var loadGeometry = true;
    var loadAttributeRelations = true;
    var loadSpatialRelations = true;

    if (spatialFilter && !_lodash["default"].isEmpty(spatialFilter)) {
      // Only if spatialIndex is null then is set whole spatialFilter.tiles as loading true in one step
      var spatialIndex = null;
      return dispatch(loadIndexedPage(styleKey, relations, spatialIndex, spatialFilter, loadGeometry, loadAttributeRelations, loadSpatialRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)).then(function (response) {
        var _response$spatialAttr2;

        if (response instanceof Error) {
          return;
          throw response;
        }

        var attributeRelationsCount = response.spatialAttributeRelationsDataSources.total.attributeRelations;
        var spatialRelationsCount = response.spatialAttributeRelationsDataSources.total.spatialRelations;
        var restRelationsPages = getRestRelationsPages(attributeRelationsCount, spatialRelationsCount, PAGE_SIZE);
        var spatialDataSources = (response === null || response === void 0 ? void 0 : (_response$spatialAttr2 = response.spatialAttributeRelationsDataSources) === null || _response$spatialAttr2 === void 0 ? void 0 : _response$spatialAttr2.spatialDataSources) || []; //test spatialDataSources only if some come from BE

        var allSourcesAreUnsupported = loadSpatialRelations ? spatialDataSources.every(function (ds) {
          var _ds$data;

          return !_constants.TILED_VECTOR_LAYER_TYPES.includes((_ds$data = ds.data) === null || _ds$data === void 0 ? void 0 : _ds$data.type);
        }) : false; // Check if all of returned spatialDataSources are unsupported type.
        // If so, is no reason to make further requests.
        // Indexes for unsupported layers can be cleared.

        if (restRelationsPages === 0 && allSourcesAreUnsupported) {
          // AttributeData and spatialData index represented by spatialRelationsFilter, attributeRelationsFilter and order can be deleted
          dispatch(_actions7["default"].removeIndex(spatialRelationsFilter, order));
          dispatch(_actions3["default"].removeSpatialIndex(attributeDataFilter, order));
          return;
        } else {
          var preloadSpatialDataSources = spatialDataSources.map(function (sds) {
            return {
              type: sds.data.type,
              key: sds.key
            };
          });
          return dispatch(loadMissingRelationsAndData(loadGeometry, spatialFilter, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeRelationsCount, spatialRelationsCount, preloadSpatialDataSources, attributeDataFilter));
        }
      })["catch"](function (err) {
        if ((err === null || err === void 0 ? void 0 : err.message) === 'Index outdated') {
          dispatch(refreshIndex(getSubstate, dataType, filter, order, actionTypes, categoryPath));
        } else {
          throw new Error("data/actions#ensure: ".concat(err));
        }
      });
    } else {
      return dispatch(_actions8["default"].actionGeneralError(new Error('Missing spatial filter')));
    }
  };
}
/**
 * Find out all tiles from spatialFilter without loaded attribute data
 * @param {Object} attributeDataIndex
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 */


var hasMissingAttributesData = function hasMissingAttributesData(attributeDataIndex, spatialFilter) {
  var missingAttributeDataTiles = (0, _helpers.getMissingTiles)(attributeDataIndex, spatialFilter) || spatialFilter.tiles;
  return missingAttributeDataTiles && missingAttributeDataTiles.length && missingAttributeDataTiles.length > 0 ? true : false;
};
/**
 * Find out all tiles from spatialFilter without loaded attribute data
 * @param {Object} spatialDataIndex
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 */


var hasMissingSpatialData = function hasMissingSpatialData(spatialDataIndex, spatialFilter) {
  var missingSpatialDataTiles = (0, _helpers.getMissingTiles)(spatialDataIndex, spatialFilter) || spatialFilter.tiles;
  return missingSpatialDataTiles && missingSpatialDataTiles.length && missingSpatialDataTiles.length > 0 ? true : false;
};
/**
 * It find out if for given spatialRelationsFilter exists relations index.
 * The Existence of index means it is loading or loaded or we can just find out missing data.
 * TODO - add support of areaTrees
 * TODO - add support of dataSourcesKeys
 * @param {Object} state App state object
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array} order
 * @return {bool}
 */


var hasSpatialOrAreaRelations = function hasSpatialOrAreaRelations(state, spatialRelationsFilter, order) {
  var spatialRelationsIndex = null;
  var areaRelationsIndex = null;

  if (spatialRelationsFilter.layerTemplateKey) {
    spatialRelationsIndex = _Select["default"].data.spatialRelations.getIndex(state, spatialRelationsFilter, order);
  } // FIXME - add support for areaTreeLevels


  if (spatialRelationsFilter.areaTreeLevelKey) {// areaRelationsIndex = Select.data.areaRelations.getIndex(getState(), spatialRelationsFilter, order);
  }

  return spatialRelationsIndex !== null || areaRelationsIndex !== null;
};
/**
 * Entry function for requesting of loading new data. In first step are identified loaded indexes based on filters.
 * Next phase is request only data that are missing.
 * @param styleKey {string}
 * @param commonRelationsFilter {Object} Filter object with modifiers, layerTemplateKey or areaTreeLevelKey. It defines spatialRealations and after add styleKey is used as a attributeRelations filter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param attributeDataFilterExtension {Object} Filter object with optional values for attributeFilter, dataSourceKeys and featureKeys. After merge with attributeRelationsFilter it defines filter for attributeData
 * @return {function}
 */


function ensure(styleKey, commonRelationsFilter, spatialFilter, attributeDataFilterExtension) {
  return function (dispatch, getState) {
    // Filter params - see Panther docs: Code/API/Data endpoint
    var areaTreeLevelKey = commonRelationsFilter.areaTreeLevelKey,
        layerTemplateKey = commonRelationsFilter.layerTemplateKey;
    var spatialRelationsFilter = commonRelationsFilter;

    var attributeRelationsFilter = _objectSpread(_objectSpread({}, commonRelationsFilter), {}, {
      styleKey: styleKey
    });

    var attributeDataFilter = _objectSpread(_objectSpread({}, attributeRelationsFilter), attributeDataFilterExtension); // ensure string datatype for tiles in filter


    spatialFilter.tiles = spatialFilter.tiles.map(_helpers.tileAsStringArray); // Order for spatialData if null at the moment

    var order = null;
    var spatialDataIndex = _Select["default"].data.spatialData.getIndex(getState(), spatialRelationsFilter, order) || [];
    var attributeDataIndex = _Select["default"].data.attributeData.getIndex(getState(), 'spatialIndexes', attributeDataFilter, order) || [];
    var missingAttributesData = hasMissingAttributesData(attributeDataIndex, spatialFilter);
    var missingSpatialData = hasMissingSpatialData(spatialDataIndex, spatialFilter);
    var filterHasSpatialOrAreaRelations = hasSpatialOrAreaRelations(getState(), spatialRelationsFilter, order);
    var loadRelationsAndData = !filterHasSpatialOrAreaRelations && missingSpatialData;

    var modifiedSpatialFilterForAttributes = _objectSpread({}, spatialFilter);

    var modifiedSpatialFilterForSpatial = _objectSpread({}, spatialFilter); // If spatial relations are loaded and spatial and attribute date are missing,
    // find which only attribute tile are missing and which attribute tiles load with spatial data.


    if (!loadRelationsAndData && missingAttributesData) {
      var missingAttributeDataTiles = (0, _helpers.getMissingTiles)(attributeDataIndex, spatialFilter) || [];
      var missingSpatialDataTiles = (0, _helpers.getMissingTiles)(spatialDataIndex, spatialFilter) || [];

      var missingAttributeDataTilesToLoad = _lodash["default"].difference(missingAttributeDataTiles, missingSpatialDataTiles);

      var missingSpatialAndAttributeDataTiles = _lodash["default"].intersection(missingAttributeDataTiles, missingSpatialDataTiles);

      modifiedSpatialFilterForAttributes.tiles = missingAttributeDataTilesToLoad;
      modifiedSpatialFilterForSpatial.tiles = missingSpatialAndAttributeDataTiles;
    }

    var promises = [];

    if (loadRelationsAndData) {
      promises.push(dispatch(ensureDataAndRelations(spatialFilter, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
    }

    if (filterHasSpatialOrAreaRelations && missingSpatialData && !_lodash["default"].isEmpty(modifiedSpatialFilterForSpatial.tiles)) {
      promises.push(dispatch(loadMissingSpatialData(modifiedSpatialFilterForSpatial, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
    }

    if (!loadRelationsAndData && !_lodash["default"].isEmpty(modifiedSpatialFilterForAttributes.tiles)) {
      promises.push(dispatch(loadMissingAttributeData(modifiedSpatialFilterForAttributes, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
    }

    return Promise.all(promises);
  };
}
/**
 * Save result data to related stores.
 * If data are presented, then save them to attributeRelations, attributeDataSources, attributeData, spatialRelations, spatialDataSources, spatialData.
 * @param {Object} result result data from backend data endpoind
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadAttributeRelations Whether response should contain relations
 * @param {bool} loadSpatialRelations Whether response should contain relations
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object} start
 */


function processResult(result, loadGeometry, loadAttributeRelations, loadSpatialRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter, start) {
  return function (dispatch, getState) {
    ////
    // Attributes
    ////
    if (!!loadAttributeRelations && result.spatialAttributeRelationsDataSources.attributeRelations && !_lodash["default"].isEmpty(result.spatialAttributeRelationsDataSources.attributeRelations)) {
      var changes = null;
      dispatch(_actions["default"].receiveIndexed(result.spatialAttributeRelationsDataSources.attributeRelations, attributeRelationsFilter, order, start, result.spatialAttributeRelationsDataSources.total.attributeRelations, changes));
    }

    if (!!loadAttributeRelations && result.spatialAttributeRelationsDataSources.attributeDataSources && !_lodash["default"].isEmpty(result.spatialAttributeRelationsDataSources.attributeDataSources)) {
      var _changes = null;
      dispatch(_actions2["default"].receiveIndexed(result.spatialAttributeRelationsDataSources.attributeDataSources, attributeRelationsFilter, order, start, result.spatialAttributeRelationsDataSources.total.attributeRelations, _changes));
    }

    if (result.spatialData && result.attributeData) {
      var _changes2 = null;
      dispatch(_actions3["default"].receiveIndexed(result.attributeData, result.spatialData, attributeDataFilter, order, _changes2));
    } ////
    // Spatial data
    ////


    if (!!loadSpatialRelations && result.spatialAttributeRelationsDataSources.spatialRelations && !_lodash["default"].isEmpty(result.spatialAttributeRelationsDataSources.spatialRelations)) {
      var _changes3 = null;
      dispatch(_actions5["default"].receiveIndexed(result.spatialAttributeRelationsDataSources.spatialRelations, spatialRelationsFilter, order, start, result.spatialAttributeRelationsDataSources.total.spatialRelations, _changes3));
    }

    if (!!loadSpatialRelations && result.spatialAttributeRelationsDataSources.spatialDataSources && !_lodash["default"].isEmpty(result.spatialAttributeRelationsDataSources.spatialDataSources)) {
      var _changes4 = null;
      dispatch(_actions6["default"].receiveIndexed(result.spatialAttributeRelationsDataSources.spatialDataSources, spatialRelationsFilter, order, start, result.spatialAttributeRelationsDataSources.total.spatialRelations, _changes4));
    }

    if (!!loadGeometry) {
      // Add data even if data are empty.
      // Override loading indicator in state index
      var _changes5 = null;
      dispatch(_actions7["default"].receiveIndexed(result.spatialData, spatialRelationsFilter, order, _changes5));
    }
  };
}
/**
 * Create request payload for data endpoint
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {string?} styleKey
 * @param {Object?} relations Pagination for relations.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded. Tiles are subset of tiles defined inspatilaFilter.
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadAttributeRelations Whether response should contain relations
 * @param {bool} loadSpatialRelations Whether response should contain relations
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @returns
 */


function composeDataEndpointPayload(spatialRelationsFilter, styleKey, relations, attributeDataFilter, spatialIndex, loadGeometry, loadAttributeRelations, loadSpatialRelations, spatialFilter) {
  var _ref = spatialRelationsFilter || {},
      areaTreeLevelKey = _ref.areaTreeLevelKey,
      layerTemplateKey = _ref.layerTemplateKey,
      modifiers = _ref.modifiers; // Create payload


  var payload = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, modifiers && {
    modifiers: modifiers
  }), layerTemplateKey && {
    layerTemplateKey: layerTemplateKey
  }), areaTreeLevelKey && {
    areaTreeLevelKey: areaTreeLevelKey
  }), styleKey && {
    styleKey: styleKey
  }), {}, {
    // pagination for relations (& data sources)
    relations: _objectSpread(_objectSpread({}, relations), {}, {
      //should response contain attribute or spatial relations
      attribute: !!loadAttributeRelations,
      spatial: !!loadSpatialRelations
    }),
    data: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, (attributeDataFilter === null || attributeDataFilter === void 0 ? void 0 : attributeDataFilter.featureKeys) && {
      featureKeys: attributeDataFilter.featureKeys
    }), spatialIndex && {
      spatialIndex: spatialIndex
    }), {}, {
      // extent
      spatialFilter: spatialFilter
    }, (attributeDataFilter === null || attributeDataFilter === void 0 ? void 0 : attributeDataFilter.attributeFilter) && {
      attributeFilter: attributeDataFilter.attributeFilter
    }), {}, {
      //request for geometry
      geometry: !!loadGeometry
    }, (attributeDataFilter === null || attributeDataFilter === void 0 ? void 0 : attributeDataFilter.dataSourceKeys) && {
      dataSourceKeys: attributeDataFilter.dataSourceKeys
    })
  });

  return payload;
}
/**
 * Set loading status to spatialData and attributeData stores to related indexes, level and tiles.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded. Tiles are subset of tiles defined inspatilaFilter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {bool} loadGeometry Whether response should contain geometry
 */


function setLoading(attributeDataFilter, spatialIndex, spatialFilter, spatialRelationsFilter, order, loadGeometry) {
  return function (dispatch, getState) {
    (0, _recompute.setState)(getState());
    var loadingTilesGeometry = (spatialIndex === null || spatialIndex === void 0 ? void 0 : spatialIndex.tiles) || (spatialFilter === null || spatialFilter === void 0 ? void 0 : spatialFilter.tiles) || []; //get loading tiles

    var spatialTilesInNotLoadingState = _lodash["default"].reduce(loadingTilesGeometry, function () {
      var acc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var tile = arguments.length > 1 ? arguments[1] : undefined;

      var loading = _Select["default"].data.spatialData.isTileLoading(spatialRelationsFilter, spatialFilter.level, (0, _helpers.tileAsString)(tile));

      if (!loading) {
        return [].concat(_toConsumableArray(acc), [(0, _helpers.tileAsStringArray)(tile)]);
      } else {
        return acc;
      }
    }, []);

    var attributesTilesInNotLoadingState = _lodash["default"].reduce(loadingTilesGeometry, function () {
      var acc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var tile = arguments.length > 1 ? arguments[1] : undefined;

      var loading = _Select["default"].data.attributeData.isTileLoading(attributeDataFilter, spatialFilter.level, (0, _helpers.tileAsString)(tile));

      if (!loading) {
        return [].concat(_toConsumableArray(acc), [(0, _helpers.tileAsStringArray)(tile)]);
      } else {
        return acc;
      }
    }, []); ////
    // Spatial
    ////


    if (loadGeometry && spatialTilesInNotLoadingState.length > 0) {
      dispatch(_actions7["default"].addLoadingIndex(spatialRelationsFilter, order, spatialFilter.level, spatialTilesInNotLoadingState));
    } ////
    // Attribute
    ////


    if (attributesTilesInNotLoadingState.length > 0) {
      dispatch(_actions3["default"].addLoadingSpatialIndex(attributeDataFilter, order, spatialFilter.level, attributesTilesInNotLoadingState));
    }
  };
}
/**
 * Central method for executing requests to data endpoint.
 * @param {string?} styleKey
 * @param {Object?} relations Pagination for relations.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded. Tiles are subset of tiles defined inspatilaFilter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadAttributeRelations Whether response should contain relations
 * @param {bool} loadSpatialRelations Whether response should contain relations
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 */


function loadIndexedPage(styleKey, relations, spatialIndex, spatialFilter, loadGeometry, loadAttributeRelations, loadSpatialRelations, order) {
  var spatialRelationsFilter = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : {};
  var attributeRelationsFilter = arguments.length > 9 ? arguments[9] : undefined;
  var attributeDataFilter = arguments.length > 10 ? arguments[10] : undefined;
  return function (dispatch, getState) {
    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(getState());

    var apiPath = 'rest/data/filtered'; //Register loading to related indexes and tiles

    dispatch(setLoading(attributeDataFilter, spatialIndex, spatialFilter, spatialRelationsFilter, order, loadGeometry));
    var usedRelations = relations ? _objectSpread({}, relations) : DEFAULT_RELATIONS_PAGE;
    var payload = composeDataEndpointPayload(spatialRelationsFilter, styleKey, usedRelations, attributeDataFilter, spatialIndex, loadGeometry, loadAttributeRelations, loadSpatialRelations, spatialFilter);
    var start = usedRelations.offset + 1;
    return (0, _request["default"])(localConfig, apiPath, 'POST', null, payload, undefined, null).then(function (result) {
      if (result.errors) {
        var error = new Error(result.errors[dataType] || 'no data');
        dispatch(_actions8["default"].actionGeneralError(error));
      } else {
        if (result.spatialAttributeRelationsDataSources && result.spatialData && result.attributeData) {
          dispatch(processResult(result, loadGeometry, loadAttributeRelations, loadSpatialRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter, start));
          return result;
        } else {
          var _error = new Error('no data');

          dispatch(_actions8["default"].actionGeneralError(_error));
          return _error;
        }
      }
    })["catch"](function (error) {
      dispatch(_actions8["default"].actionGeneralError(error));
      return error; //todo do we need to return this
    });
  };
}

var _default = {
  //export of sub actions
  attributeData: _actions3["default"],
  attributeDataSources: _actions2["default"],
  attributeRelations: _actions["default"],
  components: _actions4["default"],
  spatialData: _actions7["default"],
  spatialDataSources: _actions6["default"],
  spatialRelations: _actions5["default"],
  //export functions
  composeDataEndpointPayload: composeDataEndpointPayload,
  //tested
  ensure: ensure,
  ensureDataAndRelations: ensureDataAndRelations,
  getRestRelationsPages: getRestRelationsPages,
  //tested
  hasMissingAttributesData: hasMissingAttributesData,
  //tested
  hasMissingSpatialData: hasMissingSpatialData,
  //tested
  hasSpatialOrAreaRelations: hasSpatialOrAreaRelations,
  //tested
  loadIndexedPage: loadIndexedPage,
  //tested
  loadMissingAttributeData: loadMissingAttributeData,
  loadMissingRelationsAndData: loadMissingRelationsAndData,
  //tested
  loadMissingSpatialData: loadMissingSpatialData,
  processResult: processResult,
  //tested
  setLoading: setLoading //tested

};
exports["default"] = _default;