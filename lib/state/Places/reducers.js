"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.INITIAL_STATE = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _reducers = _interopRequireWildcard(require("../_common/reducers"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = _objectSpread(_objectSpread({}, _reducers.DEFAULT_INITIAL_STATE), {}, {
  activeKeys: null
});

exports.INITIAL_STATE = INITIAL_STATE;

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"].PLACES.ADD:
      return _reducers["default"].add(state, action);

    case _ActionTypes["default"].PLACES.ADD_UNRECEIVED:
      return _reducers["default"].addUnreceivedKeys(state, action);

    case _ActionTypes["default"].PLACES.DELETE:
      return _reducers["default"].remove(state, action);

    case _ActionTypes["default"].PLACES.EDITED.REMOVE:
      return _reducers["default"].removeEdited(state, action);

    case _ActionTypes["default"].PLACES.EDITED.REMOVE_ACTIVE:
      return _reducers["default"].removeEditedActive(state, action);

    case _ActionTypes["default"].PLACES.EDITED.REMOVE_PROPERTY:
      return _reducers["default"].removeEditedProperty(state, action);

    case _ActionTypes["default"].PLACES.EDITED.UPDATE:
      return _reducers["default"].updateEdited(state, action);

    case _ActionTypes["default"].PLACES.INDEX.ADD:
      return _reducers["default"].addIndex(state, action);

    case _ActionTypes["default"].PLACES.INDEX.CLEAR_ALL:
      return _reducers["default"].clearIndexes(state, action);

    case _ActionTypes["default"].PLACES.INDEX.CLEAR_INDEX:
      return _reducers["default"].clearIndex(state, action);

    case _ActionTypes["default"].PLACES.MARK_DELETED:
      return _reducers["default"].markDeleted(state, action);

    case _ActionTypes["default"].PLACES.SET_ACTIVE_KEY:
      return _reducers["default"].setActive(state, action);

    case _ActionTypes["default"].PLACES.SET_ACTIVE_KEYS:
      return _reducers["default"].setActiveMultiple(state, action);

    case _ActionTypes["default"].PLACES.UPDATE_STORE:
      return _reducers["default"].updateStore(state, action);

    case _ActionTypes["default"].PLACES.USE.INDEXED.CLEAR:
      return _reducers["default"].useIndexedClear(state, action);

    case _ActionTypes["default"].PLACES.USE.INDEXED.CLEAR_ALL:
      return _reducers["default"].useIndexedClearAll(state, action);

    case _ActionTypes["default"].PLACES.USE.INDEXED.REGISTER:
      return _reducers["default"].registerUseIndexed(state, action);

    case _ActionTypes["default"].PLACES.USE.KEYS.REGISTER:
      return _reducers["default"].useKeysRegister(state, action);

    case _ActionTypes["default"].PLACES.USE.KEYS.CLEAR:
      return _reducers["default"].useKeysClear(state, action);

    case _ActionTypes["default"].COMMON.DATA.SET_OUTDATED:
      return _reducers["default"].dataSetOutdated(state, action);

    case _ActionTypes["default"].COMMON.DATA.CLEANUP_ON_LOGOUT:
      return _reducers["default"].cleanupOnLogout(state, action);

    default:
      return state;
  }
};

exports["default"] = _default;