import ActionTypes from '../../constants/ActionTypes';
import _ from 'lodash';
import path from 'path';
import fetch from 'isomorphic-fetch';

import request from '../_common/request';

import common from '../_common/actions';
import Select from '../Select';

import ScopesAction from '../Scopes/actions';
import PlacesAction from '../Places/actions';
import PeriodsAction from '../Periods/actions';

const TTL = 5;

// ============ creators ===========

const add = common.add(ActionTypes.USERS);
const create = common.create(
	Select.users.getSubstate,
	'users',
	ActionTypes.USERS,
	'user'
);
const deleteItem = common.delete(
	Select.users.getSubstate,
	'users',
	ActionTypes.USERS,
	'user'
);
const saveEdited = common.saveEdited(
	Select.users.getSubstate,
	'users',
	ActionTypes.USERS,
	'user'
);
const updateEdited = common.updateEdited(
	Select.users.getSubstate,
	ActionTypes.USERS
);
const setActiveKey = common.setActiveKey(ActionTypes.USERS);
const refreshUses = () => dispatch => {
	dispatch(
		common.refreshUses(
			Select.users.getSubstate,
			'users',
			ActionTypes.USERS,
			'user'
		)()
	);
	dispatch(
		common.refreshUses(
			Select.users.getGroupsSubstate,
			'groups',
			ActionTypes.USERS.GROUPS,
			'user'
		)()
	);
};
const useKeys = common.useKeys(
	Select.users.getSubstate,
	'users',
	ActionTypes.USERS,
	'user'
);
const useKeysClear = common.useKeysClear(ActionTypes.USERS);
const useIndexedUsers = common.useIndexed(
	Select.users.getSubstate,
	'users',
	ActionTypes.USERS,
	'user'
);
const useIndexedGroups = common.useIndexed(
	Select.users.getGroupsSubstate,
	'groups',
	ActionTypes.USERS.GROUPS,
	'user'
);

function authCookie(authToken) {
	const suffix = process.env.NODE_ENV === 'development' ? '' : ';secure';

	return `authToken=${authToken};path=/;samesite=strict${suffix}`;
}

/**
 * @typedef User
 * @property {string} key
 * @property {{name: string, email: string, phone: string}} data
 * @property {Object<string, Object<string, {create: boolean, view: boolean, update: boolean, delete: boolean}>>} data.permissions
 */

/**
 * @param {object} data
 * @param {User} data.user
 * @param {string} data.authToken
 */
function onLogin(data) {
	return dispatch => {
		document.cookie = authCookie(data.authToken);

		dispatch(common.actionDataSetOutdated());
		loadedUser(dispatch, data.user);

		dispatch(ScopesAction.refreshUses());
		dispatch(PlacesAction.refreshUses());
		dispatch(PeriodsAction.refreshUses());
		dispatch(refreshUses());
	};
}

function onLogout() {
	return dispatch => {
		document.cookie = 'authToken=;max-age=0';
		dispatch(actionLogout());
		dispatch(setActiveKey(null));

		dispatch(ScopesAction.refreshUses());
		dispatch(PlacesAction.refreshUses());
		dispatch(PeriodsAction.refreshUses());
		dispatch(refreshUses());
	};
}

function apiLoginUser(email, password) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		dispatch(actionApiLoginRequest());

		const payload = {
			username: email,
			password: password,
		};

		return request(localConfig, 'rest/login/login', 'POST', null, payload)
			.then(result => {
				const user = _.omit(result, 'authToken');

				dispatch(onLogin({user: user, authToken: result.authToken}));
			})
			.catch(error => {
				dispatch(common.actionGeneralError(error));
				return error;
			});
	};
}

// function apiLoad(ttl) {
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

/**
 * @param {User} result
 */
function loadedUser(dispatch, result) {
	const user = {...result, ...{groups: []}};

	dispatch(setActiveKey(user.key));
	dispatch(add(transformUser(user)));
	// dispatch(actionAddGroups(transformGroups(user.groups)));
}

function apiLoadCurrentUser() {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		dispatch(actionApiLoadCurrentUserRequest());

		// return request(localConfig, 'rest/user/current', 'GET', null, null)
		return request(localConfig, 'rest/login/getLoginInfo', 'GET', null, null)
			.then(result => {
				if (result.errors) {
					//todo how do we return errors here?
					throw new Error(result.errors);
				} else {
					const user = _.omit(result, 'authToken');
					loadedUser(dispatch, user);
				}
			})
			.catch(error => {
				dispatch(common.actionGeneralError(error));
				return error;
			});
	};
}

function apiLogoutUser(ttl) {
	if (_.isUndefined(ttl)) ttl = TTL;
	return (dispatch, getState) => {
		const apiBackendProtocol = Select.app.getLocalConfiguration(
			getState(),
			'apiBackendProtocol'
		);
		const apiBackendHost = Select.app.getLocalConfiguration(
			getState(),
			'apiBackendHost'
		);
		dispatch(actionApiLogoutRequest());

		let url =
			apiBackendProtocol +
			'://' +
			path.join(apiBackendHost, 'rest/login/logout');

		return fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}).then(
			response => {
				console.log('#### logout user response', response);
				if (response.ok) {
					// window.location.reload();
					dispatch(onLogout());
				} else {
					dispatch(
						actionApiLogoutRequestError(
							'user#action logout Problem with logging out the User, please try later.'
						)
					);
				}
			},
			error => {
				console.log('#### logout user error', error);
				if (ttl - 1) {
					dispatch(apiLogoutUser(ttl - 1));
				} else {
					dispatch(
						actionApiLogoutRequestError(
							'user#action logout Problem with logging out the User, please try later.'
						)
					);
				}
			}
		);
	};
}

// ============ helpers ===========

function transformUser(user) {
	return {
		...user,
		//TODO remove -> workaround with permissions.guest.get
		permissions: {...user.permissions, guest: {get: false}},
		groups: _.map(user.groups, 'key'),
	};
}
//TODO remove -> workaround with permissions.guest.get
function transformGroups(groups) {
	return groups.map(group => ({...group, permissions: {guest: {get: false}}}));
}

// ============ actions ===========

function actionClearUsersUseIndexed(componentId) {
	return {
		type: ActionTypes.USERS.USE.INDEXED.CLEAR,
		componentId,
	};
}

function actionClearGroupsUseIndexed(componentId) {
	return {
		type: ActionTypes.USERS.GROUPS.USE.INDEXED.CLEAR,
		componentId,
	};
}

function actionAddGroups(groups) {
	return {
		type: ActionTypes.USERS.GROUPS.ADD,
		data: groups,
	};
}

function actionApiLogoutRequest() {
	return {
		type: ActionTypes.USERS_LOGOUT_REQUEST,
	};
}

function actionApiLogoutRequestError(error) {
	return {
		type: ActionTypes.USERS_LOGOUT_REQUEST_ERROR,
		error: error,
	};
}

function actionApiLoadRequest() {
	return {
		type: ActionTypes.USERS_LOAD_REQUEST,
	};
}

function actionApiLoadRequestError(error) {
	return {
		type: ActionTypes.USERS_LOAD_REQUEST_ERROR,
		error: error,
	};
}

function actionApiLoginRequest() {
	return {
		type: ActionTypes.USERS.LOGIN.REQUEST,
	};
}

function actionApiLoadCurrentUserRequest() {
	return {
		type: ActionTypes.USERS.CURRENT.REQUEST,
	};
}

function actionLogout() {
	return {
		type: ActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT,
	};
}

// ============ export ===========

export default {
	add,
	create,
	delete: deleteItem,
	saveEdited,
	updateEdited,
	// apiLoad: apiLoad,
	apiLoadCurrentUser: apiLoadCurrentUser,
	apiLoginUser: apiLoginUser,
	apiLogoutUser: apiLogoutUser,
	refreshUses,
	useKeys,
	useKeysClear,
	useIndexedUsers,
	useIndexedGroups,
	useIndexedUsersClear: actionClearUsersUseIndexed,
	useIndexedGroupsClear: actionClearGroupsUseIndexed,
};
