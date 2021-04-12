"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _recompute = require("@jvitela/recompute");

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _lodash = require("lodash");

var _helpers = _interopRequireDefault(require("../../_common/helpers"));

var _selectors = _interopRequireDefault(require("../../_common/selectors"));

var _selectors2 = _interopRequireDefault(require("../AttributeData/selectors"));

var _selectors3 = _interopRequireDefault(require("../AttributeRelations/selectors"));

var _selectors4 = _interopRequireDefault(require("../../Components/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getAllComponentsInUse = function getAllComponentsInUse(state) {
  return state.data.components.components.inUse;
};

var getComponentStateByKey = function getComponentStateByKey(state, key) {
  return state.data.components.components.byKey[key] || null;
};

var getComponentStateByKeyObserver = (0, _recompute.createObserver)(getComponentStateByKey);
/**
 * Check if component is in use
 * @param state {Object}
 * @param componentKey {string}
 * @return {boolean}
 */

var isComponentInUse = (0, _reReselect["default"])([getAllComponentsInUse, function (state, componentKey) {
  return componentKey;
}], function (componentsInUse, componentKey) {
  if (componentsInUse !== null && componentsInUse !== void 0 && componentsInUse.length && componentKey) {
    return !!(0, _lodash.includes)(componentsInUse, componentKey);
  } else {
    return false;
  }
})(function (state, componentKey) {
  return componentKey;
});
/**
 * Check if component's filter by active matches give filterByActive
 * @param state {Object}
 * @param componentKey {string}
 * @param filterByActive {Object} {scope: true, place: true, ...}
 * @return {boolean}
 */

var componentMatchesFilterByActive = (0, _reReselect["default"])([getComponentStateByKey, function (state, componentKey, filterByActive) {
  return filterByActive;
}], function (componentState, filterByActive) {
  if (componentState !== null && componentState !== void 0 && componentState.filterByActive && filterByActive) {
    return (0, _lodash.isMatch)(componentState.filterByActive, filterByActive);
  } else {
    return false;
  }
})(function (state, componentKey, filterByActive) {
  return "".concat(componentKey, "_").concat(JSON.stringify(filterByActive));
});
/**
 * Get filter params which are specific for attribute data
 * @param componentKey {string}
 * @return {Object}
 */

var getAttributeDataFilterExtensionByComponentKey = (0, _recompute.createSelector)(function (componentKey) {
  var componentState = getComponentStateByKeyObserver(componentKey);

  if (componentState) {
    var attributeFilter = componentState.attributeFilter,
        dataSourceKeys = componentState.dataSourceKeys,
        featureKeys = componentState.featureKeys,
        spatialFilter = componentState.spatialFilter;
    return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, attributeFilter !== undefined && {
      attributeFilter: attributeFilter
    }), dataSourceKeys !== undefined && {
      dataSourceKeys: dataSourceKeys
    }), featureKeys !== undefined && {
      featureKeys: featureKeys
    }), spatialFilter !== undefined && {
      spatialFilter: spatialFilter
    });
  } else {
    return {};
  }
});
/**
 * Get filter params which are common to both attributeRelations and attributeData
 * @param componentKey {string}
 * @return {{modifiers: Object, areaTreeLevelKey: string, layerTemplateKey: string, attributeKeys: Array}}
 */

var getCommonFilterByComponentKey = (0, _recompute.createSelector)(function (componentKey) {
  var componentState = getComponentStateByKeyObserver(componentKey);

  if (componentState) {
    var areaTreeLevelKey = componentState.areaTreeLevelKey,
        attributeKeys = componentState.attributeKeys,
        filterByActive = componentState.filterByActive,
        layerTemplateKey = componentState.layerTemplateKey,
        metadataModifiers = componentState.metadataModifiers; // modifiers defined by key

    var metadataDefinedByKey = metadataModifiers ? _objectSpread({}, metadataModifiers) : {};

    if (layerTemplateKey) {
      metadataDefinedByKey[layerTemplateKey] = layerTemplateKey;
    } else if (areaTreeLevelKey) {
      metadataDefinedByKey[areaTreeLevelKey] = areaTreeLevelKey;
    } // Get actual metadata keys defined by filterByActive


    var activeMetadataKeys = filterByActive ? _selectors["default"].getActiveKeysByFilterByActiveObserver(filterByActive) : null; // Merge metadata, metadata defined by key have priority

    var mergedMetadataKeys = _helpers["default"].mergeMetadataKeys(metadataDefinedByKey, activeMetadataKeys); // Decouple modifiers from templates


    var modifiedAreaTreeLevelKey = mergedMetadataKeys.areaTreeLevelKey,
        modifiedLayerTemplateKey = mergedMetadataKeys.layerTemplateKey,
        modifiers = _objectWithoutProperties(mergedMetadataKeys, ["areaTreeLevelKey", "layerTemplateKey"]); // It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}


    var modifiersForRequest = _helpers["default"].convertModifiersToRequestFriendlyFormat(modifiers);

    return _objectSpread(_objectSpread(_objectSpread({
      modifiers: modifiersForRequest
    }, areaTreeLevelKey !== undefined && {
      areaTreeLevelKey: areaTreeLevelKey
    }), layerTemplateKey !== undefined && {
      layerTemplateKey: layerTemplateKey
    }), attributeKeys !== undefined && {
      attributeKeys: attributeKeys
    });
  } else {
    return {};
  }
});
/**
 * Select attribute data indexes by component key
 * @param componentKey {string}
 */

var getIndexForAttributeDataByComponentKey = (0, _recompute.createSelector)(function (componentKey) {
  var componentState = getComponentStateByKeyObserver(componentKey);

  if (componentState) {
    var attributeOrder = componentState.attributeOrder;
    var attributeDataFilterExtension = getAttributeDataFilterExtensionByComponentKey(componentKey);
    var commonFilter = getCommonFilterByComponentKey(componentKey);

    var attributeDataFilter = _objectSpread(_objectSpread({}, commonFilter), attributeDataFilterExtension);

    var attributeDataIndex = _selectors2["default"].getIndex_recompute(attributeDataFilter, attributeOrder) || [];
    return !(0, _lodash.isEmpty)(attributeDataIndex) ? attributeDataIndex : null;
  } else {
    return null;
  }
}); // Data selectors ------------------------------------------------------------------------------------------------------

/**
 * General selector for assembling attribute data for component
 * @param componentKey {string}
 * @return {Array} A collection of features, where each feature has following format: {featureKey: string, data: {attributeKey: string|number|boolean|null}}
 */

var getData = (0, _recompute.createSelector)(function (componentKey) {
  var componentState = getComponentStateByKeyObserver(componentKey);

  if (componentState) {
    var _ret = function () {
      // TODO cached selector for data of only relevant data sources needed!!!
      var data = _selectors2["default"].getAllAsObjectObserver();

      var attributeKeys = componentState === null || componentState === void 0 ? void 0 : componentState.attributeKeys;

      if (!(0, _lodash.isEmpty)(data) && attributeKeys !== null && attributeKeys !== void 0 && attributeKeys.length) {
        var attributeDataFilterExtension = getAttributeDataFilterExtensionByComponentKey(componentKey);
        var commonFilter = getCommonFilterByComponentKey(componentKey);

        var attributeFilter = _objectSpread(_objectSpread({}, commonFilter), attributeDataFilterExtension);

        var attributeOrder = componentState.attributeOrder || null;

        var relationsFilter = _objectSpread({}, commonFilter); // Get relations


        var attributeRelations = _selectors3["default"].getIndexed(relationsFilter);

        if (attributeRelations !== null && attributeRelations !== void 0 && attributeRelations.length) {
          // Get from relations, which data source is associated with which attribute
          var attributeDsKeyAttributeKeyPairs = {};
          attributeRelations.forEach(function (relation) {
            attributeDsKeyAttributeKeyPairs[relation.data.attributeDataSourceKey] = relation.data.attributeKey;
          }); // Find data index
          // TODO more sophisticated index with attributeFilter & attributeOrder

          var attributeDataIndex = _selectors2["default"].getIndex_recompute(attributeFilter, attributeOrder); // Get indexed features


          var indexedFeatureKeysAsObject = attributeDataIndex === null || attributeDataIndex === void 0 ? void 0 : attributeDataIndex.index;

          if (indexedFeatureKeysAsObject && !(0, _lodash.isEmpty)(indexedFeatureKeysAsObject)) {
            var _ret2 = function () {
              var start = componentState.start,
                  length = componentState.length;
              start = start || 1;
              length = length || attributeDataIndex.count;
              var end = Math.min(start + length - 1, attributeDataIndex.count);
              var finalFeaturesAsObject = []; // Loop through indexed features

              var _loop = function _loop(i) {
                var featureKey = indexedFeatureKeysAsObject[i];

                if (featureKey) {
                  // We don't know which feature is in which attribute DS
                  // also there could be more attributes for the feature
                  (0, _lodash.forIn)(attributeDsKeyAttributeKeyPairs, function (attributeKey, attributeDsKey) {
                    var _data$attributeDsKey;

                    var value = (_data$attributeDsKey = data[attributeDsKey]) === null || _data$attributeDsKey === void 0 ? void 0 : _data$attributeDsKey[featureKey];

                    if (value !== undefined) {
                      // existing feature
                      if (finalFeaturesAsObject[i - start]) {
                        finalFeaturesAsObject[i - start].data[attributeKey] = value;
                      } // new feature
                      else {
                          // TODO temporary fix for buggy BE values datatype
                          value = isNaN(value) ? value : (0, _lodash.isNumber)(value) ? value : Number(value); // TODO format?

                          finalFeaturesAsObject[i - start] = {
                            key: featureKey,
                            data: _defineProperty({}, attributeKey, value)
                          };
                        }
                    }
                  });
                } else {
                  // no feature key at index
                  finalFeaturesAsObject.push(null);
                }
              };

              for (var i = start; i <= end; i++) {
                _loop(i);
              }

              return {
                v: {
                  v: finalFeaturesAsObject
                }
              };
            }();

            if (_typeof(_ret2) === "object") return _ret2.v;
          } else {
            return {
              v: null
            };
          }
        } else {
          return {
            v: null
          };
        }
      } else {
        return {
          v: null
        };
      }
    }();

    if (_typeof(_ret) === "object") return _ret.v;
  } else {
    return null;
  }
});
/**
 * Specific selector to assembling the attribute data & settings of the cartesian chart
 * @param props {Object} component props
 * @param props.stateComponentKey {string} component key, needed for data assembling
 * @return {Object} Cartesian chart data & settings
 */

var getDataForCartesianChart = (0, _recompute.createSelector)(function (props) {
  var componentSettings = _selectors4["default"].getByComponentKey_recompute(props.stateComponentKey);

  var chartSettings = _objectSpread(_objectSpread({}, componentSettings), props);

  var data = getData(props.stateComponentKey);
  return _objectSpread({
    data: data || []
  }, chartSettings);
});
var _default = {
  componentMatchesFilterByActive: componentMatchesFilterByActive,
  getAllComponentsInUse: getAllComponentsInUse,
  getAttributeDataFilterExtensionByComponentKey: getAttributeDataFilterExtensionByComponentKey,
  getCommonFilterByComponentKey: getCommonFilterByComponentKey,
  getComponentStateByKey: getComponentStateByKey,
  getComponentStateByKeyObserver: getComponentStateByKeyObserver,
  getIndexForAttributeDataByComponentKey: getIndexForAttributeDataByComponentKey,
  isComponentInUse: isComponentInUse,
  // Data selectors
  getData: getData,
  getDataForCartesianChart: getDataForCartesianChart
};
exports["default"] = _default;