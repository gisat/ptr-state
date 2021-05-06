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
    activeUser: _Select["default"].users.getActive(state),
    loginOverlayOpen: _Select["default"].components.get(state, 'App_Container', 'loginOverlayOpen')
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onLogIn: function onLogIn(email, password) {
      dispatch(_Action["default"].users.apiLoginUser(email, password));
    },
    onLoginOverlayClose: function onLoginOverlayClose() {
      dispatch(_Action["default"].components.set('App_Container', 'loginOverlayOpen', false));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);

exports["default"] = _default;