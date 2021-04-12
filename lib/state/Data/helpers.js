"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPageSize = getPageSize;
exports.getMissingTiles = exports.tileAsArray = exports.tileAsString = exports.tileAsStringArray = exports.precision = void 0;

var _lodash = require("lodash");

var _ptrCore = require("@gisatcz/ptr-core");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Determinate decimal precision of number
 * @param {Number} number
 * @returns {Number}
 */
var precision = function precision(number) {
  if (!Number.isFinite(number)) {
    return 0;
  }

  var e = 1,
      p = 0;

  while (Math.round(number * e) / e !== number) {
    e *= 10;
    p++;
  }

  return p;
};
/**
 * Finite numbers are transformed to the decimal format and to the string.
 * Example: 2e-2 -> "0.02"
 * Example: 0.02 -> "0.02"
 * @param {Number} number
 * @returns {string?}
 */


exports.precision = precision;

var getNumberInDecimalString = function getNumberInDecimalString(number) {
  if (!Number.isFinite(number)) {
    return null;
  }

  var numberPrecision = precision(number);
  return number.toFixed(numberPrecision);
};
/**
 * Returns array of strings representing given tile
 * @param {Array|string} tile
 * @returns {Array}
 */


var tileAsStringArray = function tileAsStringArray(tile) {
  if ((0, _lodash.isArray)(tile) && typeof tile[0] === 'string' && typeof tile[1] === 'string') {
    return tile;
  } else if ((0, _lodash.isArray)(tile)) {
    var arrTile = tileAsArray(tile);

    if (arrTile) {
      // return arrTile.map(getNumberInDecimalString).join(',');
      return arrTile.map(getNumberInDecimalString);
    } else {
      return null;
    }
  } else {
    return null;
  }
};
/**
 * Returns string representing given tile
 * @param {Array|string} tile
 * @returns {string}
 */


exports.tileAsStringArray = tileAsStringArray;

var tileAsString = function tileAsString(tile) {
  if (typeof tile === 'string') {
    return tile;
  } else {
    var stringTile = tileAsStringArray(tile);
    return stringTile ? stringTile.join(',') : null;
  }
};
/**
 * Converts tile as a string to array
 * @param {Array|string} tile
 * @returns {Array} Tile defined by Numbers in array
 */


exports.tileAsString = tileAsString;

var tileAsArray = function tileAsArray(tile) {
  if (typeof tile === 'string' && tile.split(',').length > 1 && tile.split(',').every(function (i) {
    return (0, _lodash.isFinite)(parseFloat(i));
  })) {
    return tile.split(',').map(parseFloat);
  } else if ((0, _lodash.isArray)(tile) && tile.length !== 1 && tile.every(function (i) {
    return (0, _lodash.isFinite)(parseFloat(i));
  })) {
    return tile.map(parseFloat);
  } else if ((0, _lodash.isArray)(tile) && tile.length === 1) {
    return tileAsArray(tile[0]);
  } else {
    return null;
  }
};
/**
 * Compare wanted tiles from filter with already loaded or loading tiles and give array of missing tiles in string format
 * @param {Object} index Already loaded index
 * @param {Object} filter Required filter
 * @param {Array.<string|Array.<number>>} filter.tiles
 * @param {number} filter.level
 * @returns {Array?} Array of missing tiles in stringArray format
 */


exports.tileAsArray = tileAsArray;

var getMissingTiles = function getMissingTiles(index, filter) {
  if (index && index.index && filter && (0, _lodash.isArray)(filter.tiles)) {
    var _index$index;

    //index contains level
    if ((_index$index = index.index) !== null && _index$index !== void 0 && _index$index[filter.level]) {
      var loadedTilesInIndex = (0, _lodash.reduce)(index.index[filter.level], function (acc, tileData, tileKey) {
        //tileData === true means it is loading, so we mark them as not missing
        if (tileData) {
          //re-save tile as array to prevent negative zero
          return [].concat(_toConsumableArray(acc), [tileAsString(tileKey)]);
        } else {
          return acc;
        }
      }, []);
      var missingTiles = filter.tiles.filter(function (tile) {
        return !loadedTilesInIndex.includes(tileAsString(tile));
      });
      return missingTiles;
    } else {
      // no data for requested level
      // all tiles are missing
      return filter.tiles.map(function (tile) {
        return tileAsStringArray(tile);
      });
    }
  } else {
    if ((0, _lodash.isArray)(filter === null || filter === void 0 ? void 0 : filter.tiles)) {
      // all tiles are missing
      return filter.tiles.map(function (tile) {
        return tileAsStringArray(tile);
      });
    } else {
      //filter is not defined
      return null;
    }
  }
};
/**
 * Central method for getting PAGE_SIZE from state or configDefaults.
 * @param {Object} localConfig Configuration with overrides
 * @return {Number}
 */


exports.getMissingTiles = getMissingTiles;

function getPageSize(localConfig) {
  var PAGE_SIZE = (localConfig === null || localConfig === void 0 ? void 0 : localConfig.requestPageSize) || _ptrCore.configDefaults.requestPageSize;
  return PAGE_SIZE;
}