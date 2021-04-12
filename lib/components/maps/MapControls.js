"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _Action = _interopRequireDefault(require("../../state/Action"));

var _Select = _interopRequireDefault(require("../../state/Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var mapKey = _Select["default"].maps.getActiveMapKey(state);

  return {
    view: _Select["default"].maps.getView(state, mapKey),
    mapKey: mapKey
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateView: function updateView(update, mapKey) {
      dispatch(_Action["default"].maps.updateMapAndSetView(mapKey, update));
    },
    resetHeading: function resetHeading(mapKey) {
      //todo disable button while reseting
      dispatch(_Action["default"].maps.resetViewHeading(mapKey));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);

exports["default"] = _default;