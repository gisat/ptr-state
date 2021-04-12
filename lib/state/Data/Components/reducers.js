"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.INITIAL_STATE = void 0;

var _lodash = require("lodash");

var _ActionTypes = _interopRequireDefault(require("../../../constants/ActionTypes"));

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

var INITIAL_STATE = {
  components: {
    byKey: {},
    inUse: []
  },
  sets: {}
};
/**
 * Remove component key from the list of usages
 * @param state {Object}
 * @param componentKey {string}
 * @return {Object} updated state
 */

exports.INITIAL_STATE = INITIAL_STATE;

var componentUseClear = function componentUseClear(state, componentKey) {
  if (componentKey && !(0, _lodash.isEmpty)(state.components.inUse)) {
    var index = (0, _lodash.indexOf)(state.components.inUse, componentKey);

    if (index > -1) {
      var updatedInUse = [].concat(_toConsumableArray(state.components.inUse.slice(0, index)), _toConsumableArray(state.components.inUse.slice(index + 1)));
      return _objectSpread(_objectSpread({}, state), {}, {
        components: _objectSpread(_objectSpread({}, state.components), {}, {
          inUse: updatedInUse
        })
      });
    } else {
      return state;
    }
  } else {
    return state;
  }
};
/**
 * Add component key to the list of usages
 * @param state {Object}
 * @param componentKey {string}
 * @return {Object} updated state
 */


var componentUseRegister = function componentUseRegister(state, componentKey) {
  if (componentKey) {
    return _objectSpread(_objectSpread({}, state), {}, {
      components: _objectSpread(_objectSpread({}, state.components), {}, {
        inUse: [].concat(_toConsumableArray(state.components.inUse), [componentKey])
      })
    });
  } else {
    return state;
  }
};
/**
 * Set attribute keys for given component
 * @param state {Object}
 * @param componentKey {string}
 * @param attributeKeys {Array}
 * @return {Object} updated state
 */


var setComponentAttributeKeys = function setComponentAttributeKeys(state, componentKey, attributeKeys) {
  if (componentKey && attributeKeys !== null && attributeKeys !== void 0 && attributeKeys.length) {
    return _objectSpread(_objectSpread({}, state), {}, {
      components: _objectSpread(_objectSpread({}, state.components), {}, {
        byKey: _objectSpread(_objectSpread({}, state.components.byKey), {}, _defineProperty({}, componentKey, state.components.byKey[componentKey] ? _objectSpread(_objectSpread({}, state.components.byKey[componentKey]), {}, {
          attributeKeys: attributeKeys
        }) : {
          attributeKeys: attributeKeys
        }))
      })
    });
  } else {
    return state;
  }
};
/**
 * Update whole data.components.components.byKey object with given components
 * @param state {Object}
 * @param componentsByKey {Object}
 * @return {Object}
 */


var updateComponents = function updateComponents(state, componentsByKey) {
  if (componentsByKey) {
    return _objectSpread(_objectSpread({}, state), {}, {
      components: _objectSpread(_objectSpread({}, state.components), {}, {
        byKey: _objectSpread(_objectSpread({}, state.components.byKey), componentsByKey)
      })
    });
  } else {
    return state;
  }
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _ActionTypes["default"].DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS:
      return setComponentAttributeKeys(state, action.componentKey, action.attributeKeys);

    case _ActionTypes["default"].DATA.COMPONENTS.COMPONENT.USE.CLEAR:
      return componentUseClear(state, action.componentKey);

    case _ActionTypes["default"].DATA.COMPONENTS.COMPONENT.USE.REGISTER:
      return componentUseRegister(state, action.componentKey);

    case _ActionTypes["default"].DATA.COMPONENTS.UPDATE_COMPONENTS:
      return updateComponents(state, action.components);

    default:
      return state;
  }
};

exports["default"] = _default;