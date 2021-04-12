"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _helpers = require("../helpers");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actionTypes = _ActionTypes["default"].DATA.ATTRIBUTE_DATA; // ============ creators ===========

/**
 * It ensure adding index and adding or updating received data from BE.
 * Add data to state only when attributeData received, in case of empty attributeData it adds only index.
 * @param {Object} attributeData Object received from BE contains under attributeDataKey object of data attributes [id]: [value].
 * @param {Object} spatialData Object received from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {string?} changedOn
 */

var receiveIndexed = function receiveIndexed(attributeData, spatialData, attributeDataFilter, order, changedOn) {
  return function (dispatch) {
    if (!_lodash["default"].isEmpty(attributeData)) {
      dispatch(addDataAndIndexBasedOnSpatialData(attributeDataFilter, order, attributeData, spatialData, changedOn));
    } else {
      // add to index
      dispatch(createAndAddIndexBasedOnSpatialData(attributeDataFilter, order, attributeData, spatialData, changedOn));
    }
  };
};
/**
 * Ensure adding index and adding or updating received data from BE.
 * @param {Object} attributeData
 * @param {Array} attributeData.index
 * @param {Object} attributeData.attributeData
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Array?} start
 * @param {Array?} total
 * @param {string?} changedOn
 */


var receiveIndexedAttributeEndPoint = function receiveIndexedAttributeEndPoint(attributeData, attributeDataFilter, order, start, total, changedOn) {
  return addDataAndIndexAction(attributeDataFilter, order, total, start, attributeData.index, attributeData.attributeData, changedOn);
};
/**
 * Add data and index at the same time
 *
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object} attributeData Object received from BE contains under attributeDataKey object of data attributes [id]: [value].
 * @param {Object} spatialData Object received from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}
 * @param order {Array}
 * @param changedOn {string}
 */


function addDataAndIndexBasedOnSpatialData(attributeDataFilter, order, attributeData, spatialData, changedOn) {
  return function (dispatch) {
    var indexData = getIndexDataBySpatialData(spatialData, attributeData);

    for (var _i = 0, _Object$keys = Object.keys(attributeData); _i < _Object$keys.length; _i++) {
      var attributeDataSourceKey = _Object$keys[_i];
      dispatch(addDataAndIndexBasedOnSpatialDataAction(attributeDataSourceKey, attributeData[attributeDataSourceKey], attributeDataFilter, order, [indexData], changedOn));
    }
  };
}
/**
 * Create and add index for given attribute data based on related spatial data index.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Object} attributeData Object received from BE contains under attributeDataKey object of data attributes [id]: [value].
 * @param {Object} spatialData Object received from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}. SpatialData indexes are used as a templete for attribute data indexes.
 * @param {*} changedOn
 */


function createAndAddIndexBasedOnSpatialData(attributeDataFilter, order, attributeData, spatialData, changedOn) {
  var indexByLevelByTileByDataSourceKey = getIndexDataBySpatialData(spatialData, attributeData);
  return addIndexActionWithSpatialIndex(attributeDataFilter, order, [indexByLevelByTileByDataSourceKey], changedOn);
}
/**
 * Create new index based on given level and tiles with loading indicator.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Number} level
 * @param {Array.[Array]} tiles
 */


function addLoadingSpatialIndex(attributeDataFilter, order, level, tiles) {
  var changedOn = null; //create index with tiles value "true" that indicates loading state

  var loadingTiles = _lodash["default"].reduce(tiles, function (acc, tile) {
    var tileId = (0, _helpers.tileAsString)(tile);
    acc[tileId] = true;
    return acc;
  }, {});

  var index = _defineProperty({}, level, loadingTiles);

  return addIndexActionWithSpatialIndex(attributeDataFilter, order, [index], changedOn);
}
/**
 * Create new index based on pagination with loading indicator.
 * @param {Object} pagination
 * @param {Number} pagination.limit
 * @param {Number} pagination.offset
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 */


function addLoadingIndex(pagination, attributeDataFilter, order) {
  var changedOn = null; //Fake new data object for common action

  var data = _lodash["default"].reduce(_toConsumableArray(Array(pagination.limit)), function (acc, val) {
    //Use key = true as a loading identificator
    return [].concat(_toConsumableArray(acc), [{
      key: true
    }]);
  }, []); // filter, order, data, start, count, changedOn


  return addIndexAction(attributeDataFilter, order, data, pagination.offset + 1, null, changedOn);
} // ============ helpers ============

/**
 * Get data for indexing
 * @param {Object} spatialData
 * @param {Object} attributeData
 * @return {Object}
 */


function getIndexDataBySpatialData(spatialData, attributeData) {
  var indexByLevelByTileByDataSourceKey = {}; //Attribute data indexes are stored in related spatial index
  //for all spatial data keys in spatialData

  for (var _i2 = 0, _Object$entries = Object.entries(spatialData); _i2 < _Object$entries.length; _i2++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
        spatialDataSourceKey = _Object$entries$_i[0],
        datasource = _Object$entries$_i[1];

    //for all levels in spatial data source
    for (var _i3 = 0, _Object$entries2 = Object.entries(datasource.spatialIndex); _i3 < _Object$entries2.length; _i3++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
          level = _Object$entries2$_i[0],
          tiles = _Object$entries2$_i[1];

      if (!indexByLevelByTileByDataSourceKey[level]) {
        indexByLevelByTileByDataSourceKey[level] = {};
      } //for all tiles in tiles


      for (var _i4 = 0, _Object$entries3 = Object.entries(tiles); _i4 < _Object$entries3.length; _i4++) {
        var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i4], 2),
            tile = _Object$entries3$_i[0],
            tileData = _Object$entries3$_i[1];

        // If empty attributeData, then rewrite "loading" state.
        // or
        // Prepare empty tile for new data if tile does not exists.
        if (!indexByLevelByTileByDataSourceKey[level][(0, _helpers.tileAsString)(tile)] || _lodash["default"].isEmpty(attributeData)) {
          indexByLevelByTileByDataSourceKey[level][(0, _helpers.tileAsString)(tile)] = {};
        }

        if (!_lodash["default"].isEmpty(attributeData)) {
          var _loop = function _loop() {
            var _indexByLevelByTileBy, _indexByLevelByTileBy2;

            var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i5], 2),
                attributeDataSourceKey = _Object$entries4$_i[0],
                attributeDataSource = _Object$entries4$_i[1];

            // Save only tileData that are incuded in attribute data keys
            var indexes = tileData.filter(function (e) {
              return Object.keys(attributeDataSource).includes(e.toString());
            }); //Add to existing index

            if (indexByLevelByTileByDataSourceKey !== null && indexByLevelByTileByDataSourceKey !== void 0 && (_indexByLevelByTileBy = indexByLevelByTileByDataSourceKey[level]) !== null && _indexByLevelByTileBy !== void 0 && (_indexByLevelByTileBy2 = _indexByLevelByTileBy[(0, _helpers.tileAsString)(tile)]) !== null && _indexByLevelByTileBy2 !== void 0 && _indexByLevelByTileBy2[attributeDataSourceKey]) {
              indexByLevelByTileByDataSourceKey[level][(0, _helpers.tileAsString)(tile)][attributeDataSourceKey] = [].concat(_toConsumableArray(indexByLevelByTileByDataSourceKey[level][(0, _helpers.tileAsString)(tile)][attributeDataSourceKey]), _toConsumableArray(indexes));
            } else {
              //Create new tile and insert dsKey index data
              indexByLevelByTileByDataSourceKey[level][(0, _helpers.tileAsString)(tile)][attributeDataSourceKey] = indexes;
            }
          };

          //for all attribute data source keys in attributeData
          for (var _i5 = 0, _Object$entries4 = Object.entries(attributeData); _i5 < _Object$entries4.length; _i5++) {
            _loop();
          }
        }
      }
    }
  }

  return indexByLevelByTileByDataSourceKey;
} // ============ actions ============


function removeSpatialIndexAction(filter, order) {
  return {
    type: actionTypes.SPATIAL_INDEX.REMOVE,
    filter: filter,
    order: order
  };
}
/**
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Number} total
 * @param {Number} start
 * @param {Array} index
 * @param {Object} data
 * @param {string?} changedOn
 */


function addDataAndIndexBasedOnSpatialDataAction(attributeDataSourceKey, data, attributeDataFilter, order, indexData, changedOn) {
  return {
    type: actionTypes.ADD_WITH_SPATIAL_INDEX,
    attributeDataSourceKey: attributeDataSourceKey,
    data: data,
    filter: attributeDataFilter,
    order: order,
    indexData: indexData,
    changedOn: changedOn
  };
}
/**
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Number} total
 * @param {Number} start
 * @param {Array} index
 * @param {Object} data
 * @param {string?} changedOn
 */


function addDataAndIndexAction(attributeDataFilter, order, total, start, index, data, changedOn) {
  return {
    type: actionTypes.ADD_WITH_INDEX,
    filter: attributeDataFilter,
    order: order,
    total: total,
    start: start,
    index: index,
    data: data,
    changedOn: changedOn
  };
}

function addIndexActionWithSpatialIndex(attributeDataFilter, order, index, changedOn) {
  return {
    type: actionTypes.SPATIAL_INDEX.ADD,
    filter: attributeDataFilter,
    order: order,
    indexData: index,
    changedOn: changedOn
  };
}
/**
 *
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {*} order
 * @param {*} data
 * @param {*} start
 * @param {*} count
 * @param {*} changedOn
 * @returns
 */


function addIndexAction(attributeDataFilter, order, data, start, count, changedOn) {
  return {
    type: actionTypes.INDEX.ADD,
    filter: attributeDataFilter,
    order: order,
    data: data,
    start: start,
    count: count,
    changedOn: changedOn
  };
}

function actionUpdateStore(data) {
  return {
    type: actionTypes.UPDATE_STORE,
    data: data
  };
} // ============ export ===========


var _default = {
  addLoadingIndex: addLoadingIndex,
  addLoadingSpatialIndex: addLoadingSpatialIndex,
  getIndexDataBySpatialData: getIndexDataBySpatialData,
  receiveIndexed: receiveIndexed,
  receiveIndexedAttributeEndPoint: receiveIndexedAttributeEndPoint,
  removeSpatialIndex: removeSpatialIndexAction,
  updateStore: actionUpdateStore //do we use it?

};
exports["default"] = _default;