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
    user: _Select["default"].users.getActiveUser(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    login: function login() {
      dispatch(_Action["default"].components.set('App_Container', 'loginOverlayOpen', true));
    },
    logout: function logout() {
      dispatch(_Action["default"].users.apiLogoutUser());
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);

exports["default"] = _default;