"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DEFAULT_INITIAL_STATE = void 0;

var _lodash = require("lodash");

var _helpers = _interopRequireDefault(require("./helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_INITIAL_STATE = {
  activeKey: null,
  byKey: null,
  count: null,
  editedByKey: null,
  indexes: null,
  inUse: {
    indexes: null,
    keys: null
  },
  lastChangedOn: null,
  loading: false,
  loadingKeys: null
};
exports.DEFAULT_INITIAL_STATE = DEFAULT_INITIAL_STATE;
var _default = {
  /**
   * Add models to store or update them
   * @param state {Object}
   * @param action {Object}
   * @param action.data {Array} A collection of models to add
   * @return {Object} updated state
   */
  add: function add(state, action) {
    var _action$data;

    if (action !== null && action !== void 0 && (_action$data = action.data) !== null && _action$data !== void 0 && _action$data.length) {
      var newData = _objectSpread({}, state.byKey);

      action.data.forEach(function (model) {
        newData[model.key] = _objectSpread(_objectSpread({}, newData[model.key]), model);
        delete newData[model.key].outdated;
        delete newData[model.key].unreceived;
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        byKey: newData
      });
    } else {
      return state;
    }
  },

  /**
   * Add just keys and mark as unreceived for unreceived models
   * @param state {Object}
   * @param action {Object}
   * @param action.keys {Array} A list of unreceived keys
   * @return {Object} updated state
   */
  addUnreceivedKeys: function addUnreceivedKeys(state, action) {
    var _action$keys;

    if (action !== null && action !== void 0 && (_action$keys = action.keys) !== null && _action$keys !== void 0 && _action$keys.length) {
      var newData = _objectSpread({}, state.byKey);

      action.keys.forEach(function (key) {
        newData[key] = {
          key: key,
          unreceived: true
        };
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        byKey: newData
      });
    } else {
      return state;
    }
  },

  /**
   * Add new or updated existing index
   * @param state {Object}
   * @param action {Object}
   * @param action.data {Array} A collection of models to add
   * @param action.filter {Object}
   * @param action.order {Array}
   * @param action.start {number}
   * @param action.length {number}
   * @param action.count {number}
   * @param action.changedOn {string}
   * @return {Object} updated state
   */
  addIndex: function addIndex(state, action) {
    if (action !== null && action !== void 0 && action.data) {
      var updatedIndexes = state.indexes ? _toConsumableArray(state.indexes) : [];
      var indexOfIndex = updatedIndexes.length ? (0, _lodash.findIndex)(state.indexes, function (index) {
        return (0, _lodash.isEqual)(index.filter, action.filter) && (0, _lodash.isEqual)(index.order, action.order);
      }) : -1; // update existing index

      if (indexOfIndex > -1) {
        var updatedIndex = _objectSpread({}, updatedIndexes[indexOfIndex]); // register models to index


        var updatedIndexIndex = _helpers["default"].registerModelsToIndex(_objectSpread({}, updatedIndex.index), action.data, action.start); // Remove loading indicator if data does not come


        if (action.length) {
          for (var i = action.start; i < action.start + action.length; i++) {
            if (updatedIndexIndex[i] === true) {
              delete updatedIndexIndex[i];
            }
          }
        }

        updatedIndexes[indexOfIndex] = _objectSpread(_objectSpread({}, updatedIndex), {}, {
          count: action.count || updatedIndex.count || null,
          changedOn: action.changedOn || updatedIndex.changedOn || null,
          index: updatedIndexIndex
        });
      } // add new index
      else {
          updatedIndexes.push({
            filter: action.filter || null,
            order: action.order || null,
            count: action.count || null,
            changedOn: action.changedOn || null,
            index: _helpers["default"].registerModelsToIndex({}, action.data, action.start)
          });
        }

      return _objectSpread(_objectSpread({}, state), {}, {
        indexes: updatedIndexes
      });
    } else {
      return state;
    }
  },

  /**
   * Register usage of indexed data
   * @param state {Object}
   * @param action {Object}
   * @param action.data {Array} A collection of models to add
   * @param action.componentId {string}
   * @param action.filterByActive {Object}
   * @param action.filter {Object}
   * @param action.order {Array}
   * @param action.start {number}
   * @param action.length {number}
   * @return {Object} updated state
   */
  registerUseIndexed: function registerUseIndexed(state, action) {
    var newUse = {
      filterByActive: action.filterByActive,
      filter: action.filter,
      order: action.order,
      start: action.start,
      length: action.length
    };
    var existingUse = false;

    if (state.inUse.indexes && state.inUse.indexes[action.componentId]) {
      existingUse = (0, _lodash.find)(state.inUse.indexes[action.componentId], newUse);
    } // add use if it doesn't already exist


    if (!existingUse) {
      return _objectSpread(_objectSpread({}, state), {}, {
        inUse: _objectSpread(_objectSpread({}, state.inUse), {}, {
          indexes: _objectSpread(_objectSpread({}, state.inUse.indexes), {}, _defineProperty({}, action.componentId, state.inUse.indexes && state.inUse.indexes[action.componentId] ? [].concat(_toConsumableArray(state.inUse.indexes[action.componentId]), [newUse]) : [newUse]))
        })
      });
    } else {
      return state;
    }
  },

  /**
   * Clear the usage of indexed data
   * @param state {Object}
   * @param action {Object}
   * @param action.componentId {string}
   * @return {Object} updated state
   */
  useIndexedClear: function useIndexedClear(state, action) {
    var _state$inUse, _state$inUse$indexes;

    if (action.componentId && (_state$inUse = state.inUse) !== null && _state$inUse !== void 0 && (_state$inUse$indexes = _state$inUse.indexes) !== null && _state$inUse$indexes !== void 0 && _state$inUse$indexes.hasOwnProperty(action.componentId)) {
      var indexes = _objectSpread({}, state.inUse.indexes);

      delete indexes[action.componentId];
      return _objectSpread(_objectSpread({}, state), {}, {
        inUse: _objectSpread(_objectSpread({}, state.inUse), {}, {
          indexes: (0, _lodash.isEmpty)(indexes) ? null : indexes
        })
      });
    } else {
      return state;
    }
  },

  /**
   * Clear all usages of indexed data
   * @param state {Object}
   * @param action {Object}
   * @return {Object} updated state
   */
  useIndexedClearAll: function useIndexedClearAll(state, action) {
    var _state$inUse2;

    if (state.inUse && (_state$inUse2 = state.inUse) !== null && _state$inUse2 !== void 0 && _state$inUse2.indexes) {
      return _objectSpread(_objectSpread({}, state), {}, {
        inUse: _objectSpread(_objectSpread({}, state.inUse), {}, {
          indexes: null
        })
      });
    } else {
      return state;
    }
  },

  /**
   * Register the usage of a model with key
   * @param state {Object}
   * @param action {Object}
   * @param action.componentId {Object} string
   * @param action.keys {Array} list of keys
   * @return {Object} updated state
   */
  useKeysRegister: function useKeysRegister(state, action) {
    var _action$keys2;

    if (action.componentId && (_action$keys2 = action.keys) !== null && _action$keys2 !== void 0 && _action$keys2.length) {
      var _state$inUse$keys;

      return _objectSpread(_objectSpread({}, state), {}, {
        inUse: _objectSpread(_objectSpread({}, state.inUse), {}, {
          keys: _objectSpread(_objectSpread({}, state.inUse.keys), {}, _defineProperty({}, action.componentId, (_state$inUse$keys = state.inUse.keys) !== null && _state$inUse$keys !== void 0 && _state$inUse$keys[action.componentId] ? (0, _lodash.union)(state.inUse.keys[action.componentId], action.keys) : action.keys))
        })
      });
    } else {
      return state;
    }
  },

  /**
   * Clear the usage of models for component
   * @param state {Object}
   * @param action {Object}
   * @param action.componentId {string}
   * @return {Object} updated state
   */
  useKeysClear: function useKeysClear(state, action) {
    if (action.componentId) {
      var keys = _objectSpread({}, state.inUse.keys);

      delete keys[action.componentId];
      return _objectSpread(_objectSpread({}, state), {}, {
        inUse: _objectSpread(_objectSpread({}, state.inUse), {}, {
          keys: (0, _lodash.isEmpty)(keys) ? null : keys
        })
      });
    } else {
      return state;
    }
  },

  /**
   * Mark model as deleted
   * @param state {Object}
   * @param action {Object}
   * @param action.key {string}
   * @return {Object} updated state
   */
  markDeleted: function markDeleted(state, action) {
    var _state$byKey;

    if (action.key && (_state$byKey = state.byKey) !== null && _state$byKey !== void 0 && _state$byKey[action.key]) {
      return _objectSpread(_objectSpread({}, state), {}, {
        byKey: _objectSpread(_objectSpread({}, state.byKey), {}, _defineProperty({}, action.key, _objectSpread(_objectSpread({}, state.byKey[action.key]), {}, {
          removed: true
        })))
      });
    } else {
      return state;
    }
  },

  /**
   * Remove models from byKey
   * @param state {Object}
   * @param action {Object}
   * @param action.keys {Array} list of model keys to remove
   * @return {Object} updated state
   */
  remove: function remove(state, action) {
    var _action$keys3;

    if ((_action$keys3 = action.keys) !== null && _action$keys3 !== void 0 && _action$keys3.length && state.byKey) {
      var updatedByKey = (0, _lodash.omit)(state.byKey, action.keys);
      return _objectSpread(_objectSpread({}, state), {}, {
        byKey: (0, _lodash.isEmpty)(updatedByKey) ? null : updatedByKey
      });
    } else {
      return state;
    }
  },

  /**
   * Remove edited models
   * @param state {Object}
   * @param action {Object}
   * @param action.keys {Array} list of model keys to remove
   * @return {Object} updated state
   */
  removeEdited: function removeEdited(state, action) {
    var _action$keys4;

    if ((_action$keys4 = action.keys) !== null && _action$keys4 !== void 0 && _action$keys4.length && state.editedByKey) {
      var updatedEditedByKey = (0, _lodash.omit)(state.editedByKey, action.keys);
      return _objectSpread(_objectSpread({}, state), {}, {
        editedByKey: (0, _lodash.isEmpty)(updatedEditedByKey) ? null : updatedEditedByKey
      });
    } else {
      return state;
    }
  },

  /**
   * Remove edited active model
   * @param state {Object}
   * @param action {Object}
   * @return {Object} updated state
   */
  removeEditedActive: function removeEditedActive(state, action) {
    if (state.activeKey && state.editedByKey) {
      var updatedEditedByKey = (0, _lodash.omit)(state.editedByKey, state.activeKey);
      return _objectSpread(_objectSpread({}, state), {}, {
        editedByKey: (0, _lodash.isEmpty)(updatedEditedByKey) ? null : updatedEditedByKey
      });
    } else {
      return state;
    }
  },

  /**
   * Remove edited model property
   * @param state {Object}
   * @param action {Object}
   * @param action.key {Array} edited model key
   * @param action.property {Array} edited model property
   * @return {Object} updated state
   */
  removeEditedProperty: function removeEditedProperty(state, action) {
    if (action.key && state.editedByKey) {
      var editedModel = state.editedByKey[action.key];
      var editedModelData = editedModel === null || editedModel === void 0 ? void 0 : editedModel.data;

      if (editedModelData !== null && editedModelData !== void 0 && editedModelData.hasOwnProperty(action.property)) {
        var _action$property = action.property,
            propertyToRemove = editedModelData[_action$property],
            restProps = _objectWithoutProperties(editedModelData, [_action$property].map(_toPropertyKey));

        if ((0, _lodash.isEmpty)(restProps)) {
          var editedModels = _objectSpread({}, state.editedByKey);

          delete editedModels[action.key];
          return _objectSpread(_objectSpread({}, state), {}, {
            editedByKey: (0, _lodash.isEmpty)(editedModels) ? null : editedModels
          });
        } else {
          return _objectSpread(_objectSpread({}, state), {}, {
            editedByKey: _objectSpread(_objectSpread({}, state.editedByKey), {}, _defineProperty({}, action.key, _objectSpread(_objectSpread({}, state.editedByKey[action.key]), {}, {
              data: restProps
            })))
          });
        }
      } else {
        return state;
      }
    } else {
      return state;
    }
  },

  /**
   * Set active key
   * @param state {Object}
   * @param action {Object}
   * @param action.key {string|null} key
   * @return {Object} state
   */
  setActive: function setActive(state, action) {
    return _objectSpread(_objectSpread({}, state), {}, {
      activeKey: action.key,
      activeKeys: null
    });
  },

  /**
   * Set active keys
   * @param state {Object}
   * @param action {Object}
   * @param action.keys {array|null} keys
   * @return {Object} state
   */
  setActiveMultiple: function setActiveMultiple(state, action) {
    return _objectSpread(_objectSpread({}, state), {}, {
      activeKeys: action.keys,
      activeKey: null
    });
  },

  /**
   * Add or update edited models
   * @param state {Object}
   * @param action {Object}
   * @param action.data {Object} update
   * @return {Object} updated state
   */
  updateEdited: function updateEdited(state, action) {
    var _action$data2;

    if ((_action$data2 = action.data) !== null && _action$data2 !== void 0 && _action$data2.length) {
      var newEditedData = _objectSpread({}, state.editedByKey);

      action.data.forEach(function (model) {
        if (newEditedData[model.key]) {
          newEditedData[model.key] = _objectSpread(_objectSpread({}, newEditedData[model.key]), {}, {
            data: _objectSpread(_objectSpread({}, newEditedData[model.key].data), model.data)
          });
        } else {
          newEditedData[model.key] = model;
        }
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        editedByKey: newEditedData
      });
    } else {
      return state;
    }
  },

  /**
   * Set indexes as outdated
   * @param state {Object}
   * @param action {Object}
   * @return {Object} updated state
   */
  clearIndexes: function clearIndexes(state, action) {
    var _state$indexes;

    if ((_state$indexes = state.indexes) !== null && _state$indexes !== void 0 && _state$indexes.length) {
      var indexes = (0, _lodash.map)(state.indexes, function (index) {
        return _objectSpread(_objectSpread({}, index), {}, {
          index: null,
          count: null,
          changedOn: null,
          outdated: index.index,
          outdatedCount: index.count
        });
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        indexes: indexes
      });
    } else {
      return state;
    }
  },

  /**
   * Useful for invalidate data before refresh indexes
   * @param state {Object}
   * @param action {Object}
   * @param action.filter {Object}
   * @param action.order {Array}
   * @return {Object} updated state
   * */
  clearIndex: function clearIndex(state, action) {
    var _state$indexes2;

    if ((_state$indexes2 = state.indexes) !== null && _state$indexes2 !== void 0 && _state$indexes2.length) {
      var indexes = _toConsumableArray(state.indexes).map(function (index) {
        var correspondIndex = _helpers["default"].isCorrespondingIndex(index, action.filter, action.order);

        if (correspondIndex) {
          return _objectSpread(_objectSpread({}, index), {}, {
            outdated: index.index,
            outdatedCount: index.count,
            index: null,
            count: null,
            changedOn: null
          });
        } else {
          return index;
        }
      });

      return _objectSpread(_objectSpread({}, state), {}, {
        indexes: indexes
      });
    } else {
      return state;
    }
  },

  /**
   * Mark all models as outdated
   * @param state {Object}
   * @param action {Object}
   * @return {Object}
   */
  dataSetOutdated: function dataSetOutdated(state, action) {
    if (state.byKey) {
      var byKey = {};
      (0, _lodash.each)(state.byKey, function (model, key) {
        byKey[key] = _objectSpread(_objectSpread({}, model), {}, {
          outdated: true
        });
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        byKey: byKey
      });
    } else {
      return state;
    }
  },

  /**
   * Cleanup on logout
   * @param state {Object}
   * @param action {Object}
   * @return {Object}
   */
  cleanupOnLogout: function cleanupOnLogout(state, action) {
    if (state.byKey) {
      var byKey = {};
      (0, _lodash.each)(state.byKey, function (model, key) {
        var _model$permissions, _model$permissions$gu;

        if ((_model$permissions = model.permissions) !== null && _model$permissions !== void 0 && (_model$permissions$gu = _model$permissions.guest) !== null && _model$permissions$gu !== void 0 && _model$permissions$gu.get) {
          byKey[key] = _objectSpread(_objectSpread({}, model), {}, {
            permissions: {
              guest: model.permissions.guest
            }
          });
        }
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        byKey: byKey
      });
    } else {
      return state;
    }
  },

  /**
   * Update whole state
   * @param state {Object}
   * @param action {Object}
   * @return {Object}
   */
  updateStore: function updateStore(state, action) {
    if (action) {
      var type = action.type,
          data = _objectWithoutProperties(action, ["type"]);

      return _objectSpread(_objectSpread({}, state), data);
    } else {
      return state;
    }
  }
};
exports["default"] = _default;