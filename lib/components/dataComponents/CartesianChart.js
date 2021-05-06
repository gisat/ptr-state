"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _recompute = require("@jvitela/recompute");

var _Select = _interopRequireDefault(require("../../state/Select"));

var _Action = _interopRequireDefault(require("../../state/Action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  (0, _recompute.setState)(state);
  return _Select["default"].data.components.getDataForCartesianChart(ownProps);
};

var mapDispatchToPropsFactory = function mapDispatchToPropsFactory() {
  return function (dispatch, ownProps) {
    return {
      onMount: function onMount() {
        dispatch(_Action["default"].data.components.use(ownProps.stateComponentKey));
      },
      onUnmount: function onUnmount() {
        dispatch(_Action["default"].data.components.componentUseClear(ownProps.stateComponentKey));
      }
    };
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToPropsFactory);

exports["default"] = _default;