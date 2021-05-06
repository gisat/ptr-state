"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _lodash = require("lodash");

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actionTypes = _ActionTypes["default"].DATA.SPATIAL_DATA; // ============ creators ===========

/**
 * It ensure adding index and adding received data from BE.
 * Add data to state only when spatialData received, in case of empty spatialData it adds only index.
 * @param {Object} spatialData Object received from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}.
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {string?} changedOn
 */

var receiveIndexed = function receiveIndexed(spatialData, filter, order, changedOn) {
  return function (dispatch) {
    if (spatialData && !(0, _lodash.isEmpty)(spatialData)) {
      return dispatch(addDataAndIndex(spatialData, filter, order, changedOn));
    }
  };
};
/**
 * Add data and index at the same time
 * Add data, even if data are empty, for replacing loading indicator.
 * @param spatialDataAndIndexByDataSourceKey {Object} [dataSourceKey]: {data: Object, spatialIndex: Object}
 * @param filter {Object}
 * @param order {Array}
 * @param changedOn {string}
 */


function addDataAndIndex(spatialDataAndIndexByDataSourceKey, filter, order, changedOn) {
  return function (dispatch) {
    var indexByLevelByTileByDataSourceKey = getIndexData(spatialDataAndIndexByDataSourceKey); // spatialData should be only from one level

    var level = Object.keys(indexByLevelByTileByDataSourceKey)[0];
    var spatialDataByDataSourceKey = {};
    (0, _lodash.forIn)(spatialDataAndIndexByDataSourceKey, function (value, spatialDataSourceKey) {
      spatialDataByDataSourceKey[spatialDataSourceKey] = value.data;
    });
    dispatch(actionAddDataAndIndex(spatialDataByDataSourceKey, level, filter, order, [indexByLevelByTileByDataSourceKey], changedOn));
  };
}
/**
 * Create new index based on given level and tiles with loading indicator.
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {Number} level
 * @param {Array.[Array]} tiles
 */


function addLoadingIndex(filter, order, level, tiles) {
  var changedOn = null; //create index with tiles value "true" that indicates loading state

  var loadingTiles = (0, _lodash.reduce)(tiles, function (acc, tile) {
    var tileId = (0, _helpers.tileAsString)(tile);
    acc[tileId] = true;
    return acc;
  }, {});

  var index = _defineProperty({}, level, loadingTiles);

  return actionAddIndex(filter, order, [index], changedOn);
} // ============ helpers ============

/**
 * Get data for indexing
 * @param spatialDataByDataSourceKey {Object} [dataSourceKey]: {data: Object, spatialIndex: Object}
 * @return {Object}
 */


function getIndexData(spatialDataByDataSourceKey) {
  var indexByLevelByTileByDataSourceKey = {};

  for (var _i = 0, _Object$entries = Object.entries(spatialDataByDataSourceKey); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        dsKey = _Object$entries$_i[0],
        datasource = _Object$entries$_i[1];

    for (var _i2 = 0, _Object$entries2 = Object.entries(datasource.spatialIndex); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          level = _Object$entries2$_i[0],
          tiles = _Object$entries2$_i[1];

      if (!indexByLevelByTileByDataSourceKey[level]) {
        indexByLevelByTileByDataSourceKey[level] = {};
      }

      for (var _i3 = 0, _Object$entries3 = Object.entries(tiles); _i3 < _Object$entries3.length; _i3++) {
        var _indexByLevelByTileBy;

        var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
            tile = _Object$entries3$_i[0],
            tileData = _Object$entries3$_i[1];

        //Add to existing index
        if (indexByLevelByTileByDataSourceKey !== null && indexByLevelByTileByDataSourceKey !== void 0 && (_indexByLevelByTileBy = indexByLevelByTileByDataSourceKey[level]) !== null && _indexByLevelByTileBy !== void 0 && _indexByLevelByTileBy[(0, _helpers.tileAsString)(tile)]) {
          indexByLevelByTileByDataSourceKey[level][(0, _helpers.tileAsString)(tile)] = _objectSpread(_objectSpread({}, indexByLevelByTileByDataSourceKey[level][(0, _helpers.tileAsString)(tile)]), {}, _defineProperty({}, dsKey, tileData));
        } else {
          //Create new tile and insert dsKey index data
          indexByLevelByTileByDataSourceKey[level][(0, _helpers.tileAsString)(tile)] = _defineProperty({}, dsKey, tileData);
        }
      }
    }
  }

  return indexByLevelByTileByDataSourceKey;
} // ============ actions ============


function actionRemoveIndex(filter, order) {
  return {
    type: actionTypes.INDEX.REMOVE,
    filter: filter,
    order: order
  };
}

function actionAddDataAndIndex(dataByDataSourceKey, level, filter, order, indexData, changedOn) {
  return {
    type: actionTypes.ADD_WITH_INDEX,
    dataByDataSourceKey: dataByDataSourceKey,
    level: level,
    filter: filter,
    order: order,
    indexData: indexData,
    changedOn: changedOn
  };
}

function actionAddIndex(filter, order, index, changedOn) {
  return {
    type: actionTypes.INDEX.ADD,
    filter: filter,
    order: order,
    indexData: index,
    changedOn: changedOn
  };
} // ============ export ===========


var _default = {
  addLoadingIndex: addLoadingIndex,
  getIndexData: getIndexData,
  removeIndex: actionRemoveIndex,
  receiveIndexed: receiveIndexed
};
exports["default"] = _default;