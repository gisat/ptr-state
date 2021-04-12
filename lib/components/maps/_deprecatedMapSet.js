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
  if (ownProps.stateMapSetKey) {
    return {
      activeMapKey: _Select["default"]._deprecatedMaps.getMapSetActiveMapKey(state, ownProps.stateMapSetKey),
      activeMapView: _Select["default"]._deprecatedMaps.getMapSetActiveMapView(state, ownProps.stateMapSetKey),
      maps: _Select["default"]._deprecatedMaps.getMapSetMapKeys(state, ownProps.stateMapSetKey),
      view: _Select["default"]._deprecatedMaps.getMapSetView(state, ownProps.stateMapSetKey),
      viewLimits: _Select["default"]._deprecatedMaps.getMapSetViewLimits(state, ownProps.stateMapSetKey)
    };
  } else {
    return {
      backgroundLayer: _Select["default"]._deprecatedMaps.getBackgroundLayer(state, ownProps.backgroundLayer),
      layers: _Select["default"]._deprecatedMaps.getLayers(state, ownProps.layers)
    };
  }
};

var mapDispatchToPropsFactory = function mapDispatchToPropsFactory() {
  var componentId = 'MapSet_' + _ptrUtils.utils.randomString(6);

  return function (dispatch, ownProps) {
    if (ownProps.stateMapSetKey) {
      return {
        updateView: function updateView(update) {
          dispatch(_Action["default"]._deprecatedMaps.updateSetView(ownProps.stateMapSetKey, update));
        },
        resetHeading: function resetHeading(mapKey) {
          dispatch(_Action["default"]._deprecatedMaps.resetViewHeading(mapKey));
        },
        onMapRemove: function onMapRemove(mapKey) {
          dispatch(_Action["default"]._deprecatedMaps.removeMap(mapKey));
        }
      };
    } else {
      var setKey = ownProps.setKey || componentId;
      return {
        onMount: function onMount() {
          dispatch(_Action["default"]._deprecatedMaps.use(setKey, ownProps.backgroundLayer, ownProps.layers));
        },
        onUnmount: function onUnmount() {
          dispatch(_Action["default"]._deprecatedMaps.useClear(setKey));
        },
        refreshUse: function refreshUse() {
          dispatch(_Action["default"]._deprecatedMaps.use(setKey, ownProps.backgroundLayer, ownProps.layers));
        }
      };
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToPropsFactory);

exports["default"] = _default;