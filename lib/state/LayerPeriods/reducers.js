"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = {
  byAoiKey: {},
  byPlaceKey: {},
  byKey: {}
};

function requestForAoi(state, action) {
  var layerRecord = _objectSpread(_objectSpread({}, getLayerRecord(state, action.aoiKey, action.layerKey)), {}, {
    data: action.periods,
    loading: true
  });

  var byLayerKey = _objectSpread(_objectSpread({}, getByLayerKey(state, action.aoiKey)), {}, _defineProperty({}, action.layerKey, layerRecord));

  var aoiRecord = _objectSpread(_objectSpread({}, state.byAoiKey[action.aoiKey]), {}, {
    byLayerKey: byLayerKey
  });

  var byAoiKey = _objectSpread(_objectSpread({}, state.byAoiKey), {}, _defineProperty({}, action.aoiKey, aoiRecord));

  return _objectSpread(_objectSpread({}, state), {}, {
    byAoiKey: byAoiKey
  });
}

function requestForAoiError(state, action) {
  var layerRecord = _objectSpread(_objectSpread({}, getLayerRecord(state, action.aoiKey, action.layerKey)), {}, {
    loading: false
  }); //todo should we clear old data?


  var byLayerKey = _objectSpread(_objectSpread({}, getByLayerKey(state, action.aoiKey)), {}, _defineProperty({}, action.layerKey, layerRecord));

  var aoiRecord = _objectSpread(_objectSpread({}, state.byAoiKey[action.aoiKey]), {}, {
    byLayerKey: byLayerKey
  });

  var byAoiKey = _objectSpread(_objectSpread({}, state.byAoiKey), {}, _defineProperty({}, action.aoiKey, aoiRecord));

  return _objectSpread(_objectSpread({}, state), {}, {
    byAoiKey: byAoiKey
  });
}

function receiveForAoi(state, action) {
  var layerRecord = _objectSpread(_objectSpread({}, getLayerRecord(state, action.aoiKey, action.layerKey)), {}, {
    data: action.periods,
    loading: false
  });

  var byLayerKey = _objectSpread(_objectSpread({}, getByLayerKey(state, action.aoiKey)), {}, _defineProperty({}, action.layerKey, layerRecord));

  var aoiRecord = _objectSpread(_objectSpread({}, state.byAoiKey[action.aoiKey]), {}, {
    byLayerKey: byLayerKey
  });

  var byAoiKey = _objectSpread(_objectSpread({}, state.byAoiKey), {}, _defineProperty({}, action.aoiKey, aoiRecord));

  return _objectSpread(_objectSpread({}, state), {}, {
    byAoiKey: byAoiKey
  });
}

function requestForPlace(state, action) {
  var layerRecord = _objectSpread(_objectSpread({}, getLayerRecordForPlace(state, action.placeKey, action.layerKey)), {}, {
    data: action.periods,
    loading: true
  });

  var byLayerKey = _objectSpread(_objectSpread({}, getByLayerKeyForPlace(state, action.placeKey)), {}, _defineProperty({}, action.layerKey, layerRecord));

  var placeRecord = _objectSpread(_objectSpread({}, state.byPlaceKey[action.placeKey]), {}, {
    byLayerKey: byLayerKey
  });

  var byPlaceKey = _objectSpread(_objectSpread({}, state.byPlaceKey), {}, _defineProperty({}, action.placeKey, placeRecord));

  return _objectSpread(_objectSpread({}, state), {}, {
    byPlaceKey: byPlaceKey
  });
}

function requestForPlaceError(state, action) {
  var layerRecord = _objectSpread(_objectSpread({}, getLayerRecordForPlace(state, action.placeKey, action.layerKey)), {}, {
    loading: false
  });

  var byLayerKey = _objectSpread(_objectSpread({}, getByLayerKeyForPlace(state, action.placeKey)), {}, _defineProperty({}, action.layerKey, layerRecord));

  var placeRecord = _objectSpread(_objectSpread({}, state.byPlaceKey[action.placeKey]), {}, {
    byLayerKey: byLayerKey
  });

  var byPlaceKey = _objectSpread(_objectSpread({}, state.byPlaceKey), {}, _defineProperty({}, action.placeKey, placeRecord));

  return _objectSpread(_objectSpread({}, state), {}, {
    byPlaceKey: byPlaceKey
  });
}

function receiveForPlace(state, action) {
  var layerRecord = _objectSpread(_objectSpread({}, getLayerRecordForPlace(state, action.placeKey, action.layerKey)), {}, {
    data: action.periods,
    loading: false
  });

  var byLayerKey = _objectSpread(_objectSpread({}, getByLayerKeyForPlace(state, action.placeKey)), {}, _defineProperty({}, action.layerKey, layerRecord));

  var placeRecord = _objectSpread(_objectSpread({}, state.byPlaceKey[action.placeKey]), {}, {
    byLayerKey: byLayerKey
  });

  var byPlaceKey = _objectSpread(_objectSpread({}, state.byPlaceKey), {}, _defineProperty({}, action.placeKey, placeRecord));

  return _objectSpread(_objectSpread({}, state), {}, {
    byPlaceKey: byPlaceKey
  });
}

function requestForKey(state, action) {
  var layerRecord = _objectSpread(_objectSpread({}, getLayerRecordForKey(state, action.key, action.layerKey)), {}, {
    data: action.periods,
    loading: true
  });

  var byLayerKey = _objectSpread(_objectSpread({}, getByLayerKeyForKey(state, action.key)), {}, _defineProperty({}, action.layerKey, layerRecord));

  var record = _objectSpread(_objectSpread({}, state.byKey[action.key]), {}, {
    byLayerKey: byLayerKey
  });

  var byKey = _objectSpread(_objectSpread({}, state.byKey), {}, _defineProperty({}, action.key, record));

  return _objectSpread(_objectSpread({}, state), {}, {
    byKey: byKey
  });
}

function requestForKeyError(state, action) {
  var layerRecord = _objectSpread(_objectSpread({}, getLayerRecordForKey(state, action.key, action.layerKey)), {}, {
    loading: false
  });

  var byLayerKey = _objectSpread(_objectSpread({}, getByLayerKeyForKey(state, action.key)), {}, _defineProperty({}, action.layerKey, layerRecord));

  var record = _objectSpread(_objectSpread({}, state.byKey[action.key]), {}, {
    byLayerKey: byLayerKey
  });

  var byKey = _objectSpread(_objectSpread({}, state.byKey), {}, _defineProperty({}, action.key, record));

  return _objectSpread(_objectSpread({}, state), {}, {
    byKey: byKey
  });
}

function receiveForKey(state, action) {
  var layerRecord = _objectSpread(_objectSpread({}, getLayerRecordForKey(state, action.key, action.layerKey)), {}, {
    data: action.periods,
    loading: false
  });

  var byLayerKey = _objectSpread(_objectSpread({}, getByLayerKeyForKey(state, action.key)), {}, _defineProperty({}, action.layerKey, layerRecord));

  var record = _objectSpread(_objectSpread({}, state.byKey[action.key]), {}, {
    byLayerKey: byLayerKey
  });

  var byKey = _objectSpread(_objectSpread({}, state.byKey), {}, _defineProperty({}, action.key, record));

  return _objectSpread(_objectSpread({}, state), {}, {
    byKey: byKey
  });
}

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"].LAYER_PERIODS_AOI_LAYER_REQUEST:
      return requestForAoi(state, action);

    case _ActionTypes["default"].LAYER_PERIODS_AOI_LAYER_RECEIVE:
      return receiveForAoi(state, action);

    case _ActionTypes["default"].LAYER_PERIODS_AOI_LAYER_REQUEST_ERROR:
      return requestForAoiError(state, action);

    case _ActionTypes["default"].LAYER_PERIODS_PLACE_LAYER_REQUEST:
      return requestForPlace(state, action);

    case _ActionTypes["default"].LAYER_PERIODS_PLACE_LAYER_RECEIVE:
      return receiveForPlace(state, action);

    case _ActionTypes["default"].LAYER_PERIODS_PLACE_LAYER_REQUEST_ERROR:
      return requestForPlaceError(state, action);

    case _ActionTypes["default"].LAYER_PERIODS_KEY_LAYER_REQUEST:
      return requestForKey(state, action);

    case _ActionTypes["default"].LAYER_PERIODS_KEY_LAYER_RECEIVE:
      return receiveForKey(state, action);

    case _ActionTypes["default"].LAYER_PERIODS_KEY_LAYER_REQUEST_ERROR:
      return requestForKeyError(state, action);

    default:
      return state;
  }
};

exports["default"] = _default;

function getByLayerKey(state, aoiKey) {
  return state && state.byAoiKey && state.byAoiKey[aoiKey] && state.byAoiKey[aoiKey].byLayerKey;
}

function getLayerRecord(state, aoiKey, layerKey) {
  return getByLayerKey(state, aoiKey) && state.byAoiKey[aoiKey].byLayerKey[layerKey];
}

function getByLayerKeyForPlace(state, placeKey) {
  return state && state.byPlaceKey && state.byPlaceKey[placeKey] && state.byPlaceKey[placeKey].byLayerKey;
}

function getLayerRecordForPlace(state, placeKey, layerKey) {
  return getByLayerKeyForPlace(state, placeKey) && state.byPlaceKey[placeKey].byLayerKey[layerKey];
}

function getByLayerKeyForKey(state, key) {
  return state && state.byKey && state.byKey[key] && state.byKey[key].byLayerKey;
}

function getLayerRecordForKey(state, key, layerKey) {
  return getByLayerKeyForKey(state, key) && state.byKey[key].byLayerKey[layerKey];
}