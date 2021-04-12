"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reducers = _interopRequireWildcard(require("../_common/reducers"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = _objectSpread(_objectSpread({}, _reducers.DEFAULT_INITIAL_STATE), {}, {
  groups: _objectSpread({}, _reducers.DEFAULT_INITIAL_STATE)
});

function update(state, action) {
  var _action$data = action.data,
      userId = _action$data.userId,
      data = _objectWithoutProperties(_action$data, ["userId"]);

  data.activeKey = action.data.userId;
  return _objectSpread(_objectSpread({}, state), data);
}

function loadRequest(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    loading: true
  });
}

function loadRequestError(state, action) {
  return _objectSpread(_objectSpread({}, state), {}, {
    loading: false
  });
}

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"].USERS.ADD:
      return _reducers["default"].add(state, action);

    case _ActionTypes["default"].USERS.INDEX.ADD:
      return _reducers["default"].addIndex(state, action);

    case _ActionTypes["default"].USERS.INDEX.CLEAR_ALL:
      return _reducers["default"].clearIndexes(state, action);

    case _ActionTypes["default"].USERS.USE.INDEXED.CLEAR:
      return _reducers["default"].useIndexedClear(state, action);

    case _ActionTypes["default"].USERS.USE.INDEXED.REGISTER:
      return _reducers["default"].registerUseIndexed(state, action);

    case _ActionTypes["default"].USERS.ADD_UNRECEIVED:
      return _reducers["default"].addUnreceivedKeys(state, action);

    case _ActionTypes["default"].USERS.SET_ACTIVE_KEY:
      return _reducers["default"].setActive(state, action);

    case _ActionTypes["default"].USERS.USE.KEYS.CLEAR:
      return _reducers["default"].useKeysClear(state, action);

    case _ActionTypes["default"].USERS.USE.KEYS.REGISTER:
      return _reducers["default"].useKeysRegister(state, action);

    case _ActionTypes["default"].COMMON.DATA.SET_OUTDATED:
      //set outdated for users and users.groups
      return _objectSpread(_objectSpread({}, _reducers["default"].dataSetOutdated(state, action)), {}, {
        groups: _reducers["default"].dataSetOutdated(state.groups, action)
      });

    case _ActionTypes["default"].COMMON.DATA.CLEANUP_ON_LOGOUT:
      //clear users and users.groups
      return _objectSpread(_objectSpread({}, _reducers["default"].cleanupOnLogout(state, action)), {}, {
        groups: _reducers["default"].cleanupOnLogout(state.groups, action)
      });

    case _ActionTypes["default"].USERS_LOAD_REQUEST:
      return loadRequest(state, action);

    case _ActionTypes["default"].USERS_LOAD_REQUEST_ERROR:
      return loadRequestError(state, action);

    case _ActionTypes["default"].USERS_UPDATE:
      return update(state, action);

    case _ActionTypes["default"].USERS.GROUPS.ADD:
      return _objectSpread(_objectSpread({}, state), {}, {
        groups: _reducers["default"].add(state.groups, action)
      });

    case _ActionTypes["default"].USERS.GROUPS.INDEX.ADD:
      return _objectSpread(_objectSpread({}, state), {}, {
        groups: _reducers["default"].addIndex(state.groups, action)
      });

    case _ActionTypes["default"].USERS.GROUPS.INDEX.CLEAR_ALL:
      return _objectSpread(_objectSpread({}, state), {}, {
        groups: _reducers["default"].clearIndexes(state.groups, action)
      });

    case _ActionTypes["default"].USERS.GROUPS.ADD_UNRECEIVED:
      return _objectSpread(_objectSpread({}, state), {}, {
        groups: _reducers["default"].addUnreceivedKeys(state.groups, action)
      });

    case _ActionTypes["default"].USERS.GROUPS.USE.INDEXED.CLEAR:
      return _objectSpread(_objectSpread({}, state), {}, {
        groups: _reducers["default"].useIndexedClear(state.groups, action)
      });

    case _ActionTypes["default"].USERS.GROUPS.USE.KEYS.CLEAR:
      return _objectSpread(_objectSpread({}, state), {}, {
        groups: _reducers["default"].useKeysClear(state.groups, action)
      });

    case _ActionTypes["default"].USERS.GROUPS.USE.INDEXED.REGISTER:
      return _objectSpread(_objectSpread({}, state), {}, {
        groups: _reducers["default"].registerUseIndexed(state.groups, action)
      });

    default:
      return state;
  }
};

exports["default"] = _default;