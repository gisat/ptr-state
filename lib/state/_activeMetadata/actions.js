"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _actions = _interopRequireDefault(require("../_common/actions"));

var _actions2 = _interopRequireDefault(require("../Data/Components/actions"));

var _actions3 = _interopRequireDefault(require("../Maps/actions"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Ensure indexes with filter by active for each store from the list (above) & for data-based components
 *
 * @param filterKey {string} active metadata type key (e.g. scope, place, ..)
 */
function ensureDependenciesOfActiveMetadataType(filterKey) {
  return function (dispatch) {
    var filterByActive = _defineProperty({}, filterKey, true);

    _lodash["default"].forIn(_constants.STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE, function (params) {
      dispatch(_actions["default"].ensureIndexesWithFilterByActive.apply(_actions["default"], _toConsumableArray(params))(filterByActive));
    });

    dispatch(_actions2["default"].ensureWithFilterByActive(filterByActive));
    dispatch(_actions3["default"].ensureWithFilterByActive(filterByActive));
  };
}

var _default = {
  ensureDependenciesOfActiveMetadataType: ensureDependenciesOfActiveMetadataType
};
exports["default"] = _default;