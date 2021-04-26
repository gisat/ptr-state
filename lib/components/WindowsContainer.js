"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _Action = _interopRequireDefault(require("../state/Action"));

var _Select = _interopRequireDefault(require("../state/Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    set: _Select["default"].windows.getSetByKey(state, ownProps.setKey),
    windows: _Select["default"].windows.getWindowsBySetKeyAsObject(state, ownProps.setKey)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onWindowClick: function onWindowClick(windowKey) {
      dispatch(_Action["default"].windows.topWindow(ownProps.setKey, windowKey));
    },
    onWindowClose: function onWindowClose(windowKey) {
      dispatch(_Action["default"].windows.remove(ownProps.setKey, windowKey));
    },
    onWindowDragStart: function onWindowDragStart(windowKey) {
      dispatch(_Action["default"].windows.topWindow(ownProps.setKey, windowKey));
    },
    onWindowDragStop: function onWindowDragStop(windowKey, position) {
      dispatch(_Action["default"].windows.updateSettings(windowKey, {
        position: position
      }));
    },
    onWindowResize: function onWindowResize(windowKey, width, height, position) {
      dispatch(_Action["default"].windows.updateSettings(windowKey, {
        width: width,
        height: height,
        position: position
      }));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);

exports["default"] = _default;