"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRestPages = getRestPages;
exports.getPagination = getPagination;
exports.getNullishPagination = getNullishPagination;
exports.getLoadedPages = getLoadedPages;
exports.getMissingPages = getMissingPages;

var _lodash = require("lodash");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Determinate pages for requested range of the data. Return array which always starts with 0 as a first page.
 * @param {Number} [count] Optional size of data on BE. Usually known after request on BE.
 * @param {Number} PAGE_SIZE Size of pagesize
 * @param {Number} [optStart]  Optional start, if not set, default value 1 is used.
 * @param {Number} [optLength] Optional length of requested data. If set, then last page will not overfloat requested data.
 * @return {Array.<Number>} Page indexes [0,1,2,3]
 */
function getRestPages(count, PAGE_SIZE) {
  var optStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var optLength = arguments.length > 3 ? arguments[3] : undefined;
  optStart = (0, _lodash.isNumber)(optStart) ? optStart : 1;

  if ((0, _lodash.isNumber)(count) && (count === 0 || optStart > count)) {
    return [];
  } else {
    var wanted;

    if ((0, _lodash.isNumber)(count)) {
      wanted = count - optStart + 1; // Request specific number of results

      if ((0, _lodash.isNumber)(optLength)) {
        if (optStart + optLength - 1 > count) {
          wanted = count - optStart + 1;
        } else {
          wanted = optLength;
        }
      }
    } else {
      // Request specific number of results
      if ((0, _lodash.isNumber)(optLength)) {
        wanted = optLength;
      } else {
        wanted = PAGE_SIZE;
      }
    }

    var startIndex = optStart; //1

    var endIndex = optStart + wanted; //101

    var lastPageIndex = Math.ceil((endIndex - startIndex) / PAGE_SIZE);

    var pages = _toConsumableArray(Array(lastPageIndex)).map(function (_, i) {
      return i;
    });

    return pages;
  }
}
/**
 * Get pagination object {offset, limit}. Calculate necessary limit and offset from wanted range of the data.
 * If optLength or optCount passed, then returned pagination object will not overfloat limits.
 * @param {Number} pageIndex Page index based on count, PAGE_SIZE, start and length.
 * @param {Number} [optStart]  Optional start, if not set, default value 1 is used.
 * @param {Number} pageSize Size of pagesize
 * @param {Number} [optLength] Optional length of requested data. If set, then last page will not overfloat requested data.
 * @param {Number} [optCount] Optional size of data on BE. Usually known after request on BE.
 * @return {Object} {offset:Number, limit: Number}
 */


function getPagination(pageIndex) {
  var optStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var pageSize = arguments.length > 2 ? arguments[2] : undefined;
  var optLength = arguments.length > 3 ? arguments[3] : undefined;
  var optCount = arguments.length > 4 ? arguments[4] : undefined;
  optStart = (0, _lodash.isNumber)(optStart) ? optStart : 1;
  var limit = pageSize;

  if ((0, _lodash.isNumber)(optLength) && pageIndex * pageSize + pageSize > optLength) {
    limit = Math.max(0, optLength - pageIndex * pageSize);
  }

  if ((0, _lodash.isNumber)(optCount) && optStart + pageIndex * pageSize + limit - 1 > optCount) {
    limit = Math.max(0, optCount - (optStart + pageIndex * pageSize - 1));
  }

  return {
    offset: Math.max(0, optStart + pageIndex * pageSize - 1),
    limit: limit
  };
}
/**
 * Get empty pagination
 * @return {Object} {offset:Number, limit: Number
 */


function getNullishPagination() {
  return getPagination(0, 1, 0, 0);
}
/**
 * Find loaded or loading pages
 * @param {Object} dataIndex Index with loaded or loading data
 * @param {Number} [optStart] Optional start, if not set, default value 1 is used.
 * @param {Number} pageSize Size of pagesize
 * @param {Array.<Number>} pages Which pages asking for
 * @param {Number} [optCount] Optional size of data on BE. Usually known after request on BE.
 * @param {Number} [optLength] Optional length of requested data. If set, then last page will not overfloat requested data.
 * @return {Array} Array of page indexex that are loaded of loading
 */


function getLoadedPages() {
  var dataIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var optStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var pageSize = arguments.length > 2 ? arguments[2] : undefined;
  var pages = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var optCount = arguments.length > 4 ? arguments[4] : undefined;
  var optLength = arguments.length > 5 ? arguments[5] : undefined;
  optStart = (0, _lodash.isNumber)(optStart) ? optStart : 1;
  var loadedPages = [];
  pages.forEach(function (pageIndex) {
    var itemsOnPage = 0;

    if ((0, _lodash.isNumber)(optCount)) {
      if ((0, _lodash.isNumber)(optLength) && pageSize * (pageIndex + 1) > optLength) {
        itemsOnPage = optLength - pageSize * pageIndex;

        if (optStart + itemsOnPage > optCount) {
          itemsOnPage = optCount - (optStart + pageSize * (pageIndex + 1) - pageSize) + 1;
        }
      } else if (optStart + pageSize * (pageIndex + 1) > optCount) {
        itemsOnPage = optCount - (optStart + pageSize * (pageIndex + 1) - pageSize) + 1;
      } else {
        itemsOnPage = pageSize;
      }
    } else {
      if ((0, _lodash.isNumber)(optLength) && pageSize * (pageIndex + 1) > optLength) {
        itemsOnPage = optLength - pageSize * pageIndex;
      } else {
        itemsOnPage = pageSize;
      }
    }

    var requestedDataIndexes = _toConsumableArray(Array(itemsOnPage)).map(function (_, i) {
      return optStart + pageSize * pageIndex + i;
    });

    var hasPage = requestedDataIndexes.every(function (index) {
      return dataIndex.hasOwnProperty(index);
    });

    if (hasPage) {
      loadedPages.push(pageIndex);
    }
  });
  return loadedPages;
}
/**
 * Determinate requested pages and which pages are alredy loaded or loading. Return difference between requested an loaded pages.
 * @param {Object} [optDataIndex]
 * @param {Number} pageSize Size of pagesize
 * @param {Number} [optStart] Optional start.
 * @param {Number} [optLength] Optional length of requested data.
 */


function getMissingPages(optDataIndex, pageSize, optStart, optLength) {
  var count = (optDataIndex === null || optDataIndex === void 0 ? void 0 : optDataIndex.count) || null;
  var restPages = getRestPages(count, pageSize, optStart, optLength);
  var loadedPages = getLoadedPages(optDataIndex === null || optDataIndex === void 0 ? void 0 : optDataIndex.index, optStart, pageSize, restPages, count, optLength);
  var missingPages = (0, _lodash.difference)(restPages, loadedPages);
  return missingPages;
}