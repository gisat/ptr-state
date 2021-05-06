"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reselect = require("reselect");

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _lodash = _interopRequireDefault(require("lodash"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _selectors2 = _interopRequireDefault(require("../Scopes/selectors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DEFAULT_CATEGORY = 'metadata';

var getSubstate = function getSubstate(state) {
  return state.users;
};

var getGroupsSubstate = function getGroupsSubstate(state) {
  return state.users.groups;
};

var getAll = _selectors["default"].getAll(getSubstate);

var getGroups = _selectors["default"].getAll(getGroupsSubstate);

var getActiveKey = _selectors["default"].getActiveKey(getSubstate);

var getActive = _selectors["default"].getActive(getSubstate);

var getByKey = _selectors["default"].getByKey(getSubstate);

var isLoggedIn = function isLoggedIn(state) {
  return !!state.users.activeKey;
};

var isAdmin = function isAdmin(state) {
  return state.users.isAdmin;
};

var getById = (0, _reselect.createSelector)([getAll, function (state, userId) {
  return userId;
}], function (users, userId) {
  if (users, userId) {
    return users.find(function (user) {
      return user.id === userId;
    });
  }

  return false;
});
var isAdminGroupMember = (0, _reselect.createSelector)([getActive], function (user) {
  if (user) {
    return _lodash["default"].includes(user.groups, 1);
  }

  return false;
});
var getActiveUserPermissions = (0, _reselect.createSelector)([getActive], function (user) {
  if (user && user.permissions) {
    return user.permissions;
  } else {
    return null;
  }
});
var isAdminOrAdminGroupMember = (0, _reselect.createSelector)([isAdmin, isAdminGroupMember], function (isAdmin, isAdminGroupMember) {
  return isAdmin || isAdminGroupMember;
});
var getGroupKeysForActiveUser = (0, _reselect.createSelector)([getActive], function (activeUser) {
  if (activeUser && activeUser.groups) {
    return activeUser.groups;
  } else {
    return [];
  }
});
var hasActiveUserPermissionToCreate = (0, _reselect.createSelector)([getActiveUserPermissions, function (state, type) {
  return type;
}, function (state, type, category) {
  return category;
}], function (permissions, type) {
  var category = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_CATEGORY;
  return type && permissions && permissions[category] && permissions[category][type] && permissions[category][type].create;
});

var isDromasAdmin = function isDromasAdmin(state) {
  var isDromasAdmin = false;

  if (state.users && state.users.data && state.users.data.length) {
    var currentUser = state.users.data.filter(function (user) {
      return user.key === state.users.activeKey;
    });

    if (currentUser.length > 0) {
      currentUser[0].groups.forEach(function (group) {
        if (group.name === 'Aktualizace LPIS Gisat admin') {
          isDromasAdmin = true;
        }
      });
    }
  }

  return isDromasAdmin || state.users.isAdmin;
};

var getActiveUserDromasLpisChangeReviewGroup = (0, _reselect.createSelector)([getGroupKeysForActiveUser, _selectors2["default"].getActiveScopeConfiguration], function (activeUserGroupKeys, activeScopeConfiguration) {
  if (_lodash["default"].includes(activeUserGroupKeys, activeScopeConfiguration.dromasLpisChangeReview.groups.gisatAdmins)) {
    return 'gisatAdmins';
  } else if (_lodash["default"].includes(activeUserGroupKeys, activeScopeConfiguration.dromasLpisChangeReview.groups.szifAdmins)) {
    return 'szifAdmins';
  } else if (_lodash["default"].includes(activeUserGroupKeys, activeScopeConfiguration.dromasLpisChangeReview.groups.gisatUsers)) {
    return 'gisatUsers';
  } else if (_lodash["default"].includes(activeUserGroupKeys, activeScopeConfiguration.dromasLpisChangeReview.groups.szifUsers)) {
    return 'szifUsers';
  } else {
    return null;
  }
});
var _default = {
  getAll: getAll,
  getActive: getActive,
  getByKey: getByKey,
  getById: getById,
  getActiveKey: getActiveKey,
  getActiveUser: getActive,
  getGroupKeysForActiveUser: getGroupKeysForActiveUser,
  getGroupsForActiveUser: getGroupKeysForActiveUser,
  getUsers: getAll,
  getGroups: getGroups,
  getSubstate: getSubstate,
  getGroupsSubstate: getGroupsSubstate,
  hasActiveUserPermissionToCreate: hasActiveUserPermissionToCreate,
  isAdmin: isAdmin,
  isAdminGroupMember: isAdminGroupMember,
  isAdminOrAdminGroupMember: isAdminOrAdminGroupMember,
  isLoggedIn: isLoggedIn,
  isDromasAdmin: isDromasAdmin,
  getActiveUserDromasLpisChangeReviewGroup: getActiveUserDromasLpisChangeReviewGroup
};
exports["default"] = _default;