"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _Select = _interopRequireDefault(require("../../state/Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    set: _Select["default"].charts.getSetByKey(state, ownProps.setKey),
    charts: _Select["default"].charts.getChartsBySetKeyAsObject(state, ownProps.setKey)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {// Action.charts.add
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);

exports["default"] = _default;