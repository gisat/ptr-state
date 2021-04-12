"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _ptrUtils = require("@gisatcz/ptr-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mergeFeaturesWithAttributesCache = new _ptrUtils.CacheFifo(20);
var getMergedFilterFromLayerStateAndActiveMetadataKeys = (0, _reReselect["default"])([function (layer) {
  return layer;
}, function (layer, activeMetadataKeys) {
  return activeMetadataKeys;
}, function (layer, activeMetadataKeys, modifiersPath) {
  return modifiersPath;
}], function (layer, activeMetadataKeys, modifiersPath) {
  var filter = _objectSpread({}, layer[modifiersPath]);

  if (layer.layerTemplateKey) {
    filter.layerTemplateKey = layer.layerTemplateKey;
  }

  if (layer.areaTreeLevelKey) {
    filter.areaTreeLevelKey = layer.areaTreeLevelKey;
  } //todo fail on conflict between metadataModifiers & filterByActive ?
  //todo special filterByActive for attribute data


  var activeFilter = {};

  if (layer.filterByActive) {
    var active = layer.filterByActive;

    if (active.attribute && activeMetadataKeys.activeAttributeKey) {
      activeFilter.attributeKey = activeMetadataKeys.activeAttributeKey;
    }

    if (active["case"] && activeMetadataKeys.activeCaseKey) {
      activeFilter.caseKey = activeMetadataKeys.activeCaseKey;
    }

    if (active.layerTemplate && activeMetadataKeys.activeLayerTemplateKey) {
      activeFilter.layerTemplateKey = activeMetadataKeys.activeLayerTemplateKey;
    }

    if (active.areaTreeLevelKey && activeMetadataKeys.areaTreeLevelKey) {
      activeFilter.areaTreeLevelKey = activeMetadataKeys.areaTreeLevelKey;
    } // TODO what if multiple periods


    if (active.period && activeMetadataKeys.activePeriodKey) {
      activeFilter.periodKey = activeMetadataKeys.activePeriodKey;
    } // TODO what if multiple places


    if (active.place && activeMetadataKeys.activePlaceKey) {
      activeFilter.placeKey = activeMetadataKeys.activePlaceKey;
    }

    if (active.scenario && activeMetadataKeys.activeScenarioKey) {
      activeFilter.scenarioKey = activeMetadataKeys.activeScenarioKey;
    }

    if (active.scope && activeMetadataKeys.activeScopeKey) {
      activeFilter.scopeKey = activeMetadataKeys.activeScopeKey;
    }
  }

  return _objectSpread(_objectSpread({}, filter), activeFilter);
})(function (layer, activeMetadataKeys) {
  return "".concat(layer, "_").concat(activeMetadataKeys);
});
var getBackgroundLayersWithFilter = (0, _reReselect["default"])([_selectors["default"].getAllActiveKeys, function (state, layerState) {
  return layerState;
}, function (state, layerState, layerKey) {
  return layerKey;
}], function (activeMetadataKeys, layerState, layerKey) {
  layerState = JSON.parse(layerState);
  return [{
    key: layerKey,
    filter: getMergedFilterFromLayerStateAndActiveMetadataKeys(layerState, activeMetadataKeys, 'metadataModifiers')
  }];
})(function (state, layerState, layerKey) {
  return "".concat(layerState, ":").concat(layerKey);
});
var getLayersWithFilter = (0, _reReselect["default"])([_selectors["default"].getAllActiveKeys, function (state, layersState) {
  return layersState;
}], function (activeMetadataKeys, layersState) {
  layersState = JSON.parse(layersState);

  if (layersState && layersState.length) {
    return _lodash["default"].map(layersState, function (layer) {
      return {
        key: layer.key,
        filter: getMergedFilterFromLayerStateAndActiveMetadataKeys(layer, activeMetadataKeys, 'metadataModifiers'),
        attributeFilter: getMergedFilterFromLayerStateAndActiveMetadataKeys(layer, activeMetadataKeys, 'attributeMetadataModifiers')
      };
    });
  } else {
    return null;
  }
})(function (state, layersState) {
  return layersState;
});
/**
 * Create layer deffinition on the base of mandatory parameters.
 * Returns object that is input for Layer from @gisatcz/ptr-maps.
 * @param {string} layerKey 
 * @param {Object} dataSource 
 * @param {?string} fidColumnName Requided for vector layers
 * @param {Number} index Layer order in dataSources
 * @param {Object} layerState 
 * @param {?Object} style 
 * @param {Array} attributeDataSources 
 * @param {Object} selections 
 * @param {Object} layerTemplate 
 * @param {Object} period 
 */

var prepareLayerByDataSourceType = function prepareLayerByDataSourceType(layerKey, dataSource, fidColumnName, index, layerState, style, attributeDataSources, selections, layerTemplate, period) {
  var _layerTemplate$data, _layerTemplate$data2;

  var layerOptions = layerState && layerState.options;
  var dataSourceData = dataSource.data;

  var attribution = dataSourceData.attribution,
      nameInternal = dataSourceData.nameInternal,
      type = dataSourceData.type,
      tableName = dataSourceData.tableName,
      layerName = dataSourceData.layerName,
      features = dataSourceData.features,
      selected = dataSourceData.selected,
      options = _objectWithoutProperties(dataSourceData, ["attribution", "nameInternal", "type", "tableName", "layerName", "features", "selected"]); // TODO data source strucutre


  if (type === 'wmts') {
    options.url = options.urls[0];
  } else if (type === 'wms') {
    var _options = options,
        url = _options.url,
        params = _options.params,
        configuration = _options.configuration,
        rest = _objectWithoutProperties(_options, ["url", "params", "configuration"]);

    var singleTile = configuration && configuration.hasOwnProperty('singleTile') ? configuration.singleTile : false;
    options = {
      params: _objectSpread(_objectSpread({}, params), {}, {
        layers: rest.layers,
        styles: rest.styles
      }),
      singleTile: singleTile,
      url: url
    };
  } else if (type === 'vector' && features) {
    if (attributeDataSources) {
      features = mergeFeaturesWithAttributes(layerKey, features, attributeDataSources, fidColumnName);
    }

    if (selections && layerOptions !== null && layerOptions !== void 0 && layerOptions.selected) {
      selected = prepareSelection(selections, layerOptions.selected);
    }

    options = _objectSpread(_objectSpread({}, layerOptions), {}, {
      features: features,
      selected: selected,
      fidColumnName: fidColumnName
    }); // TODO type=geoserver

    if (style && style.data && style.data.source === 'definition') {
      options.style = style.data.definition;
    }
  }

  if (period) {
    options.period = period;
  }

  return {
    key: layerKey + '_' + index,
    name: (layerState === null || layerState === void 0 ? void 0 : layerState.name) || (layerTemplate === null || layerTemplate === void 0 ? void 0 : (_layerTemplate$data = layerTemplate.data) === null || _layerTemplate$data === void 0 ? void 0 : _layerTemplate$data.nameDisplay),
    description: layerTemplate === null || layerTemplate === void 0 ? void 0 : (_layerTemplate$data2 = layerTemplate.data) === null || _layerTemplate$data2 === void 0 ? void 0 : _layerTemplate$data2.description,
    layerKey: layerKey,
    opacity: layerState && layerState.opacity || 1,
    type: type,
    options: options
  };
};

function prepareSelection(selections, layerSelections) {
  var populatedSelections = {};

  _lodash["default"].forIn(layerSelections, function (value, key) {
    var selectionData = selections === null || selections === void 0 ? void 0 : selections[key].data;

    if (selectionData) {
      var style = selectionData.style; // TODO hovered style

      var color = selectionData.color;
      var hoveredColor = selectionData.hoveredColor;

      if (selectionData.featureKeysFilter) {
        populatedSelections[key] = {
          keys: selectionData.featureKeysFilter.keys
        };

        if (style) {
          populatedSelections[key].style = style;
          populatedSelections[key].hoveredStyle = style;
        } else {
          populatedSelections[key].style = {
            outlineColor: color,
            outlineWidth: 2
          };
          populatedSelections[key].hoveredStyle = {
            outlineColor: hoveredColor,
            outlineWidth: 2
          };
        }
      } //TODO other selection types

    }
  });

  return populatedSelections;
}

function mergeFeaturesWithAttributes(layerKey, features, attributeDataSources, fidColumnName) {
  var cacheKey = JSON.stringify(layerKey);
  var cache = mergeFeaturesWithAttributesCache.findByKey(cacheKey);
  var finalFeaturesObject = {};

  if (cache && cache.features === features) {
    finalFeaturesObject = cache.finalFeaturesObject;
  } else {
    features.forEach(function (feature) {
      var key = feature.properties[fidColumnName];
      finalFeaturesObject[key] = _objectSpread({}, feature);
    });
  }

  attributeDataSources.forEach(function (attributeDataSource) {
    var featuresWithAttributes = attributeDataSource.dataSource.data.features;

    if (featuresWithAttributes) {
      featuresWithAttributes.forEach(function (featureWithAttributes) {
        var featureKey = featureWithAttributes.properties[fidColumnName];

        _lodash["default"].forIn(featureWithAttributes.properties, function (value, key) {
          finalFeaturesObject[featureKey].properties[key] = value;
        });
      });
    }
  });
  mergeFeaturesWithAttributesCache.addOrUpdate({
    cacheKey: cacheKey,
    features: features,
    finalFeaturesObject: finalFeaturesObject
  });
  return Object.values(finalFeaturesObject);
}

function getLayersStateWithoutFeatures(layersState) {
  var withoutFeatures = [];

  _lodash["default"].each(layersState, function (layerState) {
    var _layerState$options;

    if (layerState !== null && layerState !== void 0 && (_layerState$options = layerState.options) !== null && _layerState$options !== void 0 && _layerState$options.features) {
      withoutFeatures.push(_objectSpread(_objectSpread({}, layerState), {}, {
        options: _objectSpread(_objectSpread({}, layerState.options), {}, {
          features: null
        })
      }));
    } else {
      withoutFeatures.push(layerState);
    }
  });

  return withoutFeatures;
}

var _default = {
  getBackgroundLayersWithFilter: getBackgroundLayersWithFilter,
  getLayersWithFilter: getLayersWithFilter,
  getLayersStateWithoutFeatures: getLayersStateWithoutFeatures,
  prepareLayerByDataSourceType: prepareLayerByDataSourceType,
  prepareSelection: prepareSelection
};
exports["default"] = _default;