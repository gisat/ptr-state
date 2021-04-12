"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _recompute = require("@jvitela/recompute");

var _Action = _interopRequireDefault(require("../../state/Action"));

var _Select = _interopRequireDefault(require("../../state/Select"));

var _ptrUtils = require("@gisatcz/ptr-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  (0, _recompute.setState)(state);

  if (ownProps.stateMapKey) {
    return {
      backgroundLayer: _Select["default"].maps.getMapBackgroundLayer(ownProps.stateMapKey),
      layers: _Select["default"].maps.getMapLayers(ownProps.stateMapKey),
      viewport: _Select["default"].maps.getViewportByMapKey(state, ownProps.stateMapKey),
      view: _Select["default"].maps.getViewByMapKey(state, ownProps.stateMapKey),
      viewLimits: _Select["default"].maps.getViewLimitsByMapKey(state, ownProps.stateMapKey),
      mapKey: ownProps.stateMapKey
    };
  } else {
    return {
      backgroundLayer: _Select["default"].maps.getMapBackgroundLayer(ownProps.mapKey, ownProps.backgroundLayer),
      layers: _Select["default"].maps.getMapLayers(ownProps.mapKey, ownProps.layers)
    };
  }
};

var mapDispatchToPropsFactory = function mapDispatchToPropsFactory() {
  var componentId = 'Map_' + _ptrUtils.utils.randomString(6);

  return function (dispatch, ownProps) {
    if (ownProps.stateMapKey) {
      return {
        onMount: function onMount(mapWidth, mapHeight) {
          dispatch(_Action["default"].maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight));
          dispatch(_Action["default"].maps.use(ownProps.stateMapKey, null, null, mapWidth, mapHeight));
        },
        onResize: function onResize(mapWidth, mapHeight) {
          dispatch(_Action["default"].maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight));
          dispatch(_Action["default"].maps.use(ownProps.stateMapKey, null, null, mapWidth, mapHeight));
        },
        onUnmount: function onUnmount() {
          dispatch(_Action["default"].maps.mapUseClear(ownProps.stateMapKey));
        },
        refreshUse: function refreshUse() {},
        onViewChange: function onViewChange(update) {
          dispatch(_Action["default"].maps.updateMapAndSetView(ownProps.stateMapKey, update));
        },
        onPropViewChange: function onPropViewChange(update, mapWidth, mapHeight) {
          dispatch(_Action["default"].maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight));
          dispatch(_Action["default"].maps.use(ownProps.stateMapKey, undefined, undefined, mapWidth, mapHeight));
        },
        resetHeading: function resetHeading() {},
        onClick: function onClick(view) {
          dispatch(_Action["default"].maps.setMapSetActiveMapKey(ownProps.stateMapKey));
        },
        onLayerClick: function onLayerClick(mapKey, layerKey, selectedFeatureKeys) {
          dispatch(_Action["default"].maps.setLayerSelectedFeatureKeys(ownProps.stateMapKey, layerKey, selectedFeatureKeys));
        }
      };
    } else {
      var mapKey = ownProps.mapKey || componentId;
      return {
        onMount: function onMount() {
          dispatch(_Action["default"].maps.use(mapKey, ownProps.backgroundLayer, ownProps.layers));
        },
        onUnmount: function onUnmount() {},
        refreshUse: function refreshUse() {},
        onViewChange: ownProps.onViewChange || function (update) {},
        onClick: ownProps.onClick || function (view) {}
      };
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToPropsFactory);

exports["default"] = _default;