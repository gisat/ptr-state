"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

var _Action = _interopRequireDefault(require("../../Action"));

var _reducers = _interopRequireWildcard(require("../../_common/reducers"));

var _lodash = _interopRequireDefault(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = _objectSpread({
  featuresBySourceKey: {},
  editedFeaturesBySourceKey: {},
  selectedFeaturesKeysBySourceKey: {},
  loading: false
}, _reducers.DEFAULT_INITIAL_STATE);

function receive(state, action) {
  var data;

  if (state.featuresBySourceKey.hasOwnProperty(action.dataSourceKey) && state.featuresBySourceKey[action.dataSourceKey].length) {
    // remove old versions of received models
    var oldData = _lodash["default"].reject(state.featuresBySourceKey[action.dataSourceKey], function (model) {
      return _lodash["default"].find(action.data, {
        key: model.key
      });
    });

    data = [].concat(_toConsumableArray(oldData), _toConsumableArray(action.data));
  } else {
    data = _toConsumableArray(action.data);
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    loading: false,
    featuresBySourceKey: _objectSpread(_objectSpread({}, state.featuresBySourceKey), {}, _defineProperty({}, action.dataSourceKey, data))
  });
}

function select(state, action) {
  var selectedKeys = state.selectedFeaturesKeysBySourceKey[action.dataSourceKey] || [];

  switch (action.selectionMode) {
    case 'replace':
      selectedKeys = action.featureKeys;
      break;

    case 'add':
      selectedKeys = _lodash["default"].uniq([].concat(_toConsumableArray(selectedKeys), _toConsumableArray(action.featureKeys)));
      break;

    case 'remove':
      selectedKeys = _lodash["default"].without(selectedKeys, action.featureKeys);
      break;
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    selectedFeaturesKeysBySourceKey: _objectSpread(_objectSpread({}, state.selectedFeaturesKeysBySourceKey), {}, _defineProperty({}, action.dataSourceKey, selectedKeys))
  });
}

function addEdited(state, action) {
  // remove old versions
  var oldEdited = _lodash["default"].reject(state.editedFeaturesBySourceKey[action.dataSourceKey], function (feature) {
    return _lodash["default"].find(action.features, {
      key: feature.key
    });
  });

  var newEdited = [].concat(_toConsumableArray(oldEdited), _toConsumableArray(action.features));
  return _objectSpread(_objectSpread({}, state), {}, {
    editedFeaturesBySourceKey: _objectSpread(_objectSpread({}, state.editedFeaturesBySourceKey), {}, _defineProperty({}, action.dataSourceKey, newEdited))
  });
}

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"].SPATIAL_DATA_SOURCES_VECTOR_FEATURES_RECEIVE:
      return receive(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES_VECTOR_FEATURES_SELECT:
      return select(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES_VECTOR_FEATURES_EDITED_ADD:
      return addEdited(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR.ADD:
      return _reducers["default"].add(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR.ADD_BATCH:
      return _reducers["default"].addBatch(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR.ADD_UNRECEIVED:
      return _reducers["default"].addUnreceivedKeys(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR.INDEX.ADD:
      return _reducers["default"].addIndex(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR.INDEX.ADD_BATCH:
      return _reducers["default"].addBatchIndex(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR.INDEX.CLEAR_ALL:
      return _reducers["default"].clearIndexes(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR.INDEX.CLEAR_INDEX:
      return _reducers["default"].clearIndex(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR.USE.KEYS.REGISTER:
      return _reducers["default"].useKeysRegister(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR.USE.KEYS.CLEAR:
      return _reducers["default"].useKeysClear(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR.USE.INDEXED.REGISTER:
      return _reducers["default"].registerUseIndexed(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR.USE.INDEXED_BATCH.REGISTER:
      return _reducers["default"].registerBatchUseIndexed(state, action);

    case _ActionTypes["default"].SPATIAL_DATA_SOURCES.VECTOR.USE.INDEXED.CLEAR:
      return _reducers["default"].useIndexedClear(state, action);

    case _ActionTypes["default"].COMMON.DATA.SET_OUTDATED:
      return _reducers["default"].dataSetOutdated(state, action);
    // TODO add permissions to data
    // case ActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
    // 	return common.cleanupOnLogout(state, action);

    default:
      return state;
  }
};

exports["default"] = _default;