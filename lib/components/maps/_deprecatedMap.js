"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _Action = _interopRequireDefault(require("../../state/Action"));

var _Select = _interopRequireDefault(require("../../state/Select"));

var _ptrUtils = require("@gisatcz/ptr-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  if (ownProps.stateMapKey) {
    return {
      backgroundLayer: _Select["default"]._deprecatedMaps.getMapBackgroundLayer(state, ownProps.stateMapKey),
      layers: _Select["default"]._deprecatedMaps.getMapLayers(state, ownProps.stateMapKey),
      view: _Select["default"]._deprecatedMaps.getView(state, ownProps.stateMapKey),
      viewLimits: _Select["default"]._deprecatedMaps.getViewLimits(state, ownProps.stateMapKey),
      mapKey: ownProps.stateMapKey
    };
  } else {
    return {
      backgroundLayer: _Select["default"]._deprecatedMaps.getBackgroundLayer(state, ownProps.backgroundLayer),
      layers: _Select["default"]._deprecatedMaps.getLayers(state, ownProps.layers)
    };
  }
};

var mapDispatchToPropsFactory = function mapDispatchToPropsFactory() {
  var componentId = 'Map_' + _ptrUtils.utils.randomString(6);

  return function (dispatch, ownProps) {
    if (ownProps.stateMapKey) {
      return {
        onMount: function onMount() {
          // dispatch(Action._deprecatedMaps.use(ownProps.stateMapKey));
          dispatch(_Action["default"].maps.use(ownProps.stateMapKey));
        },
        onUnmount: function onUnmount() {
          dispatch(_Action["default"]._deprecatedMaps.useClear(ownProps.stateMapKey));
        },
        refreshUse: function refreshUse() {
          dispatch(_Action["default"]._deprecatedMaps.use(ownProps.stateMapKey));
        },
        onViewChange: function onViewChange(update) {
          dispatch(_Action["default"]._deprecatedMaps.updateMapAndSetView(ownProps.stateMapKey, update));
        },
        resetHeading: function resetHeading() {
          dispatch(_Action["default"]._deprecatedMaps.resetViewHeading(ownProps.stateMapKey));
        },
        onClick: function onClick(view) {
          dispatch(_Action["default"]._deprecatedMaps.setMapSetActiveMapKey(ownProps.stateMapKey));
        },
        onLayerClick: function onLayerClick(mapKey, layerKey, selectedFeatureKeys) {
          dispatch(_Action["default"]._deprecatedMaps.setLayerSelectedFeatureKeys(ownProps.stateMapKey, layerKey, selectedFeatureKeys));
        }
      };
    } else {
      var mapKey = ownProps.mapKey || componentId;
      return {
        onMount: function onMount() {
          // dispatch(Action._deprecatedMaps.use(mapKey, ownProps.backgroundLayer, ownProps.layers));
          dispatch(_Action["default"].maps.use(mapKey, ownProps.backgroundLayer, ownProps.layers));
        },
        onUnmount: function onUnmount() {
          dispatch(_Action["default"]._deprecatedMaps.useClear(mapKey));
        },
        refreshUse: function refreshUse() {
          dispatch(_Action["default"]._deprecatedMaps.use(mapKey, ownProps.backgroundLayer, ownProps.layers));
        },
        onViewChange: ownProps.onViewChange || function (update) {},
        onClick: ownProps.onClick || function (view) {}
      };
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToPropsFactory);

exports["default"] = _default;