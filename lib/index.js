"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createStore", {
  enumerable: true,
  get: function get() {
    return _redux.createStore;
  }
});
Object.defineProperty(exports, "combineReducers", {
  enumerable: true,
  get: function get() {
    return _redux.combineReducers;
  }
});
Object.defineProperty(exports, "applyMiddleware", {
  enumerable: true,
  get: function get() {
    return _redux.applyMiddleware;
  }
});
Object.defineProperty(exports, "compose", {
  enumerable: true,
  get: function get() {
    return _redux.compose;
  }
});
Object.defineProperty(exports, "thunk", {
  enumerable: true,
  get: function get() {
    return _reduxThunk["default"];
  }
});
Object.defineProperty(exports, "logger", {
  enumerable: true,
  get: function get() {
    return _reduxLogger["default"];
  }
});
Object.defineProperty(exports, "reduxBatch", {
  enumerable: true,
  get: function get() {
    return _reduxBatch.reduxBatch;
  }
});
Object.defineProperty(exports, "setRecomputeState", {
  enumerable: true,
  get: function get() {
    return _recompute.setState;
  }
});
Object.defineProperty(exports, "createRecomputeSelector", {
  enumerable: true,
  get: function get() {
    return _recompute.createSelector;
  }
});
Object.defineProperty(exports, "createRecomputeObserver", {
  enumerable: true,
  get: function get() {
    return _recompute.createObserver;
  }
});
Object.defineProperty(exports, "connect", {
  enumerable: true,
  get: function get() {
    return _reactRedux.connect;
  }
});
Object.defineProperty(exports, "Provider", {
  enumerable: true,
  get: function get() {
    return _reactRedux.Provider;
  }
});
Object.defineProperty(exports, "connects", {
  enumerable: true,
  get: function get() {
    return _connects["default"];
  }
});
Object.defineProperty(exports, "MountWrapper", {
  enumerable: true,
  get: function get() {
    return _MountWrapper["default"];
  }
});
Object.defineProperty(exports, "commonActionTypes", {
  enumerable: true,
  get: function get() {
    return _ActionTypes["default"];
  }
});
Object.defineProperty(exports, "Action", {
  enumerable: true,
  get: function get() {
    return _Action["default"];
  }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function get() {
    return _Select["default"];
  }
});
Object.defineProperty(exports, "commonActions", {
  enumerable: true,
  get: function get() {
    return _actions["default"];
  }
});
Object.defineProperty(exports, "commonHelpers", {
  enumerable: true,
  get: function get() {
    return _helpers["default"];
  }
});
Object.defineProperty(exports, "commonReducers", {
  enumerable: true,
  get: function get() {
    return _reducers["default"];
  }
});
Object.defineProperty(exports, "DEFAULT_INITIAL_STATE", {
  enumerable: true,
  get: function get() {
    return _reducers.DEFAULT_INITIAL_STATE;
  }
});
Object.defineProperty(exports, "commonSelectors", {
  enumerable: true,
  get: function get() {
    return _selectors["default"];
  }
});
Object.defineProperty(exports, "activeMetadataActions", {
  enumerable: true,
  get: function get() {
    return _actions2["default"];
  }
});
Object.defineProperty(exports, "STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE", {
  enumerable: true,
  get: function get() {
    return _constants.STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE;
  }
});
exports["default"] = exports.createBaseStore = exports.baseStores = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _reduxBatch = require("@manaflair/redux-batch");

var _recompute = require("@jvitela/recompute");

var _reactRedux = require("react-redux");

var _connects = _interopRequireDefault(require("./components/connects"));

var _MountWrapper = _interopRequireDefault(require("./components/MountWrapper"));

var _ActionTypes = _interopRequireDefault(require("./constants/ActionTypes"));

var _Action = _interopRequireDefault(require("./state/Action"));

var _Select = _interopRequireDefault(require("./state/Select"));

var _actions = _interopRequireDefault(require("./state/_common/actions"));

var _helpers = _interopRequireDefault(require("./state/_common/helpers"));

var _reducers = _interopRequireWildcard(require("./state/_common/reducers"));

var _selectors = _interopRequireDefault(require("./state/_common/selectors"));

var _actions2 = _interopRequireDefault(require("./state/_activeMetadata/actions"));

var _constants = require("./state/_activeMetadata/constants");

var _reducers2 = _interopRequireDefault(require("./state/App/reducers"));

var _reducers3 = _interopRequireDefault(require("./state/Areas/reducers"));

var _reducers4 = _interopRequireDefault(require("./state/AreaRelations/reducers"));

var _reducers5 = _interopRequireDefault(require("./state/Attributes/reducers"));

var _reducers6 = _interopRequireDefault(require("./state/AttributeSets/reducers"));

var _reducers7 = _interopRequireDefault(require("./state/Cases/reducers"));

var _reducers8 = _interopRequireDefault(require("./state/Components/reducers"));

var _reducers9 = _interopRequireDefault(require("./state/Data/reducers"));

var _reducers10 = _interopRequireDefault(require("./state/LayerTemplates/reducers"));

var _reducers11 = _interopRequireDefault(require("./state/LayerTrees/reducers"));

var _reducers12 = _interopRequireDefault(require("./state/Maps/reducers"));

var _reducers13 = _interopRequireDefault(require("./state/Periods/reducers"));

var _reducers14 = _interopRequireDefault(require("./state/Places/reducers"));

var _reducers15 = _interopRequireDefault(require("./state/Scenarios/reducers"));

var _reducers16 = _interopRequireDefault(require("./state/Scopes/reducers"));

var _reducers17 = _interopRequireDefault(require("./state/Screens/reducers"));

var _reducers18 = _interopRequireDefault(require("./state/Selections/reducers"));

var _reducers19 = _interopRequireDefault(require("./state/Styles/reducers"));

var _reducers20 = _interopRequireDefault(require("./state/Tags/reducers"));

var _reducers21 = _interopRequireDefault(require("./state/Users/reducers"));

var _reducers22 = _interopRequireDefault(require("./state/Views/reducers"));

var _reducers23 = _interopRequireDefault(require("./state/Windows/reducers"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var baseStores = {
  app: _reducers2["default"],
  areas: _reducers3["default"],
  areaRelations: _reducers4["default"],
  attributes: _reducers5["default"],
  attributeSets: _reducers6["default"],
  cases: _reducers7["default"],
  components: _reducers8["default"],
  data: _reducers9["default"],
  layerTemplates: _reducers10["default"],
  layerTrees: _reducers11["default"],
  maps: _reducers12["default"],
  periods: _reducers13["default"],
  places: _reducers14["default"],
  scenarios: _reducers15["default"],
  scopes: _reducers16["default"],
  screens: _reducers17["default"],
  selections: _reducers18["default"],
  styles: _reducers19["default"],
  tags: _reducers20["default"],
  users: _reducers21["default"],
  views: _reducers22["default"],
  windows: _reducers23["default"]
};
exports.baseStores = baseStores;

var createBaseStore = function createBaseStore(specificStores, rootStores, middleware) {
  var enhancedThunk = _reduxThunk["default"].withExtraArgument(_actions2["default"]);

  var appliedMiddleware = _redux.applyMiddleware.apply(void 0, [enhancedThunk].concat(_toConsumableArray(middleware)));

  if (process.env.NODE_ENV === 'development') {
    appliedMiddleware = _redux.applyMiddleware.apply(void 0, [enhancedThunk, _reduxLogger["default"]].concat(_toConsumableArray(middleware)));
  }

  var stores = specificStores ? _objectSpread(_objectSpread(_objectSpread({}, baseStores), rootStores), {}, {
    specific: (0, _redux.combineReducers)(specificStores)
  }) : _objectSpread(_objectSpread({}, baseStores), rootStores);
  return (0, _redux.createStore)((0, _redux.combineReducers)(stores), (0, _redux.compose)(_reduxBatch.reduxBatch, appliedMiddleware, _reduxBatch.reduxBatch, (0, _redux.applyMiddleware)(enhancedThunk), _reduxBatch.reduxBatch));
};

exports.createBaseStore = createBaseStore;
// TODO remove?
var _default = {
  commonActionTypes: _ActionTypes["default"],
  Action: _Action["default"],
  Select: _Select["default"],
  commonActions: _actions["default"],
  commonHelpers: _helpers["default"],
  commonReducers: _reducers["default"],
  commonSelectors: _selectors["default"],
  DEFAULT_INITIAL_STATE: _reducers.DEFAULT_INITIAL_STATE
};
exports["default"] = _default;