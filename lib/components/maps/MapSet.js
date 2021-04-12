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
    var activeMapKey = _Select["default"].maps.getMapSetActiveMapKey(state, ownProps.stateMapSetKey);

    return {
      activeMapKey: activeMapKey,
      activeMapView: _Select["default"].maps.getMapSetActiveMapView(state, ownProps.stateMapSetKey),
      maps: _Select["default"].maps.getMapSetMapKeys(state, ownProps.stateMapSetKey),
      view: _Select["default"].maps.getMapSetView(state, ownProps.stateMapSetKey),
      activeMapViewport: _Select["default"].maps.getViewportByMapKey(state, activeMapKey),
      viewLimits: _Select["default"].maps.getMapSetViewLimits(state, ownProps.stateMapSetKey)
    };
  } else {
    return {
      backgroundLayer: null,
      layers: null
    };
  }
};

var mapDispatchToPropsFactory = function mapDispatchToPropsFactory() {
  var componentId = 'MapSet_' + _ptrUtils.utils.randomString(6);

  return function (dispatch, ownProps) {
    if (ownProps.stateMapSetKey) {
      return {
        onMount: function onMount() {
          dispatch(_Action["default"].maps.mapSetUseRegister(ownProps.stateMapSetKey));
        },
        onUnmount: function onUnmount() {
          dispatch(_Action["default"].maps.mapSetUseClear(ownProps.stateMapSetKey));
        },
        updateView: function updateView(update, mapKey) {
          dispatch(_Action["default"].maps.updateMapAndSetView(mapKey, update));
        },
        resetHeading: function resetHeading(mapKey) {},
        onMapRemove: function onMapRemove(mapKey) {
          dispatch(_Action["default"].maps.removeMapFromSet(ownProps.stateMapSetKey, mapKey));
        }
      };
    } else {
      var setKey = ownProps.setKey || componentId;
      return {
        onMount: function onMount() {},
        onUnmount: function onUnmount() {},
        refreshUse: function refreshUse() {}
      };
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToPropsFactory);

exports["default"] = _default;