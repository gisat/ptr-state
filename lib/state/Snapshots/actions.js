"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ============ creators ===========
var add = function add(data) {
  return function (dispatch) {
    if (!_lodash["default"].isArray(data)) data = [data];
    dispatch(actionAdd(data));
  };
};

var remove = function remove(keys) {
  return function (dispatch) {
    if (!_lodash["default"].isArray(keys)) keys = [keys];
    dispatch(actionRemove(keys));
  };
};

var createMapSnapshot = function createMapSnapshot() {
  return function (dispatch) {
    window.Stores.generateSnapshot().then(function (snapshots) {
      snapshots.forEach(function (snapshot) {
        dispatch(add({
          key: snapshot.uuid,
          data: {
            name: snapshot.name,
            type: "map",
            source: snapshot.source
          }
        }));
      });
    });
  };
}; // ============ actions ===========


function actionAdd(data) {
  return {
    type: _ActionTypes["default"].SNAPSHOTS_ADD,
    data: data
  };
}

function actionRemove(keys) {
  return {
    type: _ActionTypes["default"].SNAPSHOTS_REMOVE,
    keys: keys
  };
} // ============ export ===========


var _default = {
  add: add,
  remove: remove,
  createMapSnapshot: createMapSnapshot
};
exports["default"] = _default;