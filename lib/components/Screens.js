"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _Action = _interopRequireDefault(require("../state/Action"));

var _Select = _interopRequireDefault(require("../state/Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    screens: _Select["default"].screens.getScreensBySetKey(state, props.setKey),
    set: _Select["default"].screens.getSetByKey(state, props.setKey)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onFocusScreen: function onFocusScreen(screenLineage) {
      dispatch(_Action["default"].screens.topHistory(ownProps.setKey, screenLineage));
    },
    onCloseScreen: function onCloseScreen(screenLineage) {
      dispatch(_Action["default"].screens.close(ownProps.setKey, screenLineage));
    },
    onOpenScreen: function onOpenScreen(screenLineage) {
      dispatch(_Action["default"].screens.open(ownProps.setKey, screenLineage));
    },
    onRetractScreen: function onRetractScreen(screenLineage) {
      dispatch(_Action["default"].screens.retract(ownProps.setKey, screenLineage));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);

exports["default"] = _default;