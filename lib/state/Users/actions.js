"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _lodash = _interopRequireDefault(require("lodash"));

var _path = _interopRequireDefault(require("path"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _request = _interopRequireDefault(require("../_common/request"));

var _actions = _interopRequireDefault(require("../_common/actions"));

var _Select = _interopRequireDefault(require("../Select"));

var _actions2 = _interopRequireDefault(require("../Scopes/actions"));

var _actions3 = _interopRequireDefault(require("../Places/actions"));

var _actions4 = _interopRequireDefault(require("../Periods/actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TTL = 5; // ============ creators ===========

var add = _actions["default"].add(_ActionTypes["default"].USERS);

var setActiveKey = _actions["default"].setActiveKey(_ActionTypes["default"].USERS);

var refreshUses = function refreshUses() {
  return function (dispatch) {
    dispatch(_actions["default"].refreshUses(_Select["default"].users.getSubstate, 'users', _ActionTypes["default"].USERS, 'user')());
    dispatch(_actions["default"].refreshUses(_Select["default"].users.getGroupsSubstate, 'groups', _ActionTypes["default"].USERS.GROUPS, 'user')());
  };
};

var useKeys = _actions["default"].useKeys(_Select["default"].users.getSubstate, 'users', _ActionTypes["default"].USERS, 'user');

var useKeysClear = _actions["default"].useKeysClear(_ActionTypes["default"].USERS);

var useIndexedUsers = _actions["default"].useIndexed(_Select["default"].users.getSubstate, 'users', _ActionTypes["default"].USERS, 'user');

var useIndexedGroups = _actions["default"].useIndexed(_Select["default"].users.getGroupsSubstate, 'groups', _ActionTypes["default"].USERS.GROUPS, 'user');

function onLogin() {
  return function (dispatch) {
    dispatch(_actions["default"].actionDataSetOutdated());
    dispatch(apiLoadCurrentUser());
    dispatch(_actions2["default"].refreshUses());
    dispatch(_actions3["default"].refreshUses());
    dispatch(_actions4["default"].refreshUses());
    dispatch(refreshUses());
  };
}

function onLogout() {
  return function (dispatch) {
    dispatch(actionLogout());
    dispatch(setActiveKey(null));
    dispatch(_actions2["default"].refreshUses());
    dispatch(_actions3["default"].refreshUses());
    dispatch(_actions4["default"].refreshUses());
    dispatch(refreshUses());
  };
}

function apiLoginUser(email, password) {
  return function (dispatch, getState) {
    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(getState());

    dispatch(actionApiLoginRequest());
    var payload = {
      username: email,
      password: password
    };
    return (0, _request["default"])(localConfig, 'api/login/login', 'POST', null, payload).then(function (result) {
      if (result.data.status === 'ok') {
        dispatch(onLogin());
      }
    })["catch"](function (error) {
      dispatch(_actions["default"].actionGeneralError(error));
      return error;
    });
  };
} // function apiLoad(ttl) {
// 	if (_.isUndefined(ttl)) ttl = TTL;
// 	return (dispatch, getState) => {
// 		let state = getState();
// 		if (state.users.loading) {
// 			// already loading, do nothing
// 		} else {
// 			dispatch(actionApiLoadRequest());
//
// 			let url = config.apiBackendProtocol + '://' + path.join(config.apiBackendHost, 'backend/rest/user');
//
// 			return fetch(url, {
// 				method: 'GET',
// 				credentials: 'include',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					'Accept': 'application/json'
// 				}
// 			}).then(
// 				response => {
// 					let contentType = response.headers.get('Content-type');
// 					if (response.ok && contentType && (contentType.indexOf('application/json') !== -1)) {
// 						return response.json().then(data => {
// 							Promise.all(data.data.map(user => {
// 								return new User({data: user}).then(user => {
// 									user.key = user.id;
// 									return user;
// 								});
// 							})).then(users => {
// 								dispatch(actionAdd(users));
// 							});
// 						});
// 					} else {
// 						dispatch(actionApiLoadRequestError('scopes#action Problem with loading scopes.'));
// 					}
// 				},
// 				error => {
// 					if (ttl - 1) {
// 						dispatch(apiLoad(ttl - 1));
// 					} else {
// 						dispatch(actionApiLoadRequestError('scopes#action Problem with loading scopes.'));
// 					}
// 				}
// 			);
// 		}
// 	};
// }


function apiLoadCurrentUser() {
  return function (dispatch, getState) {
    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(getState());

    dispatch(actionApiLoadCurrentUserRequest());
    return (0, _request["default"])(localConfig, 'rest/user/current', 'GET', null, null).then(function (result) {
      if (result.errors) {
        //todo how do we return errors here?
        throw new Error(result.errors);
      } else {
        if (result.key === 0) {
          // no logged in user = guest
          dispatch(actionAddGroups(transformGroups(result.groups)));
        } else if (result.key) {
          // logged in user
          dispatch(setActiveKey(result.key));
          dispatch(add(transformUser(result)));
          dispatch(actionAddGroups(transformGroups(result.groups)));
        }
      }
    })["catch"](function (error) {
      dispatch(_actions["default"].actionGeneralError(error));
      return error;
    });
  };
}

function apiLogoutUser(ttl) {
  if (_lodash["default"].isUndefined(ttl)) ttl = TTL;
  return function (dispatch, getState) {
    var apiBackendProtocol = _Select["default"].app.getLocalConfiguration(getState(), 'apiBackendProtocol');

    var apiBackendHost = _Select["default"].app.getLocalConfiguration(getState(), 'apiBackendHost');

    dispatch(actionApiLogoutRequest());

    var url = apiBackendProtocol + '://' + _path["default"].join(apiBackendHost, 'api/login/logout');

    return (0, _isomorphicFetch["default"])(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(function (response) {
      console.log('#### logout user response', response);

      if (response.ok) {
        // window.location.reload();
        dispatch(onLogout());
      } else {
        dispatch(actionApiLogoutRequestError('user#action logout Problem with logging out the User, please try later.'));
      }
    }, function (error) {
      console.log('#### logout user error', error);

      if (ttl - 1) {
        dispatch(apiLogoutUser(ttl - 1));
      } else {
        dispatch(actionApiLogoutRequestError('user#action logout Problem with logging out the User, please try later.'));
      }
    });
  };
} // ============ helpers ===========


function transformUser(user) {
  return _objectSpread(_objectSpread({}, user), {}, {
    //TODO remove -> workaround with permissions.guest.get
    permissions: _objectSpread(_objectSpread({}, user.permissions), {}, {
      guest: {
        get: false
      }
    }),
    groups: _lodash["default"].map(user.groups, 'key')
  });
} //TODO remove -> workaround with permissions.guest.get


function transformGroups(groups) {
  return groups.map(function (group) {
    return _objectSpread(_objectSpread({}, group), {}, {
      permissions: {
        guest: {
          get: false
        }
      }
    });
  });
} // ============ actions ===========


function actionClearUsersUseIndexed(componentId) {
  return {
    type: _ActionTypes["default"].USERS.USE.INDEXED.CLEAR,
    componentId: componentId
  };
}

function actionClearGroupsUseIndexed(componentId) {
  return {
    type: _ActionTypes["default"].USERS.GROUPS.USE.INDEXED.CLEAR,
    componentId: componentId
  };
}

function actionAddGroups(groups) {
  return {
    type: _ActionTypes["default"].USERS.GROUPS.ADD,
    data: groups
  };
}

function actionApiLogoutRequest() {
  return {
    type: _ActionTypes["default"].USERS_LOGOUT_REQUEST
  };
}

function actionApiLogoutRequestError(error) {
  return {
    type: _ActionTypes["default"].USERS_LOGOUT_REQUEST_ERROR,
    error: error
  };
}

function actionApiLoadRequest() {
  return {
    type: _ActionTypes["default"].USERS_LOAD_REQUEST
  };
}

function actionApiLoadRequestError(error) {
  return {
    type: _ActionTypes["default"].USERS_LOAD_REQUEST_ERROR,
    error: error
  };
}

function actionApiLoginRequest() {
  return {
    type: _ActionTypes["default"].USERS.LOGIN.REQUEST
  };
}

function actionApiLoadCurrentUserRequest() {
  return {
    type: _ActionTypes["default"].USERS.CURRENT.REQUEST
  };
}

function actionLogout() {
  return {
    type: _ActionTypes["default"].COMMON.DATA.CLEANUP_ON_LOGOUT
  };
} // ============ export ===========


var _default = {
  add: add,
  // apiLoad: apiLoad,
  apiLoadCurrentUser: apiLoadCurrentUser,
  apiLoginUser: apiLoginUser,
  apiLogoutUser: apiLogoutUser,
  refreshUses: refreshUses,
  useKeys: useKeys,
  useKeysClear: useKeysClear,
  useIndexedUsers: useIndexedUsers,
  useIndexedGroups: useIndexedGroups,
  useIndexedUsersClear: actionClearUsersUseIndexed,
  useIndexedGroupsClear: actionClearGroupsUseIndexed // update: update

};
exports["default"] = _default;