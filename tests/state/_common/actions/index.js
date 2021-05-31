// tests related imports
// import testBatchRunner, {getTestsByActionName} from '../../helpers';
// import commonActions from '../../../../src/state/_common/actions';
// import {commonActionTypesObj as actionTypes} from '../../../constants';

import action from './action-test';
import actionDataSetOutdated from './actionDataSetOutdated-test';
import actionGeneralError from './actionGeneralError-test';
import actionSetActiveKey from './actionSetActiveKey-test';
import add from './add-test';
import addIndex from './addIndex-test';
import apiUpdate from './apiUpdate-test';
import clearIndex from './clearIndex-test';
import create from './create-test';
import creator from './creator-test';
import deleteItem from './delete-test';
import ensure from './ensure-test';
import ensureIndexed from './ensureIndexed-test';
import ensureIndexesWithFilterByActive from './ensureIndexesWithFilterByActive-test';
import ensureKeys from './ensureKeys-test';
import loadIndexedPage from './loadIndexedPage-test';
import loadKeysPage from './loadKeysPage-test';
import receiveIndexed from './receiveIndexed-test';
import receiveKeys from './receiveKeys-test';
import receiveUpdated from './receiveUpdated-test';
import refreshUses from './refreshUses-test';
import removePropertyFromEdited from './removePropertyFromEdited-test';
import request from './request-test';
import saveEdited from './saveEdited-test';
import setActiveKey from './setActiveKey-test';
import setActiveKeys from './setActiveKeys-test';
import updateEdited from './updateEdited-test';
import updateStore from './updateStore-test';
import updateSubstateFromView from './updateSubstateFromView-test';
import updateStateFromView from './updateStateFromView-test'; //common function is updateSubstateFromView, but in store is like updateStateFromView
import useIndexed from './useIndexed-test';
import useIndexedClear from './useIndexedClear-test';
import useIndexedClearAll from './useIndexedClearAll-test';
import useIndexedRegister from './useIndexedRegister-test';
import useKeys from './useKeys-test';
import useKeysClear from './useKeysClear-test';

const commonActionsTests = {
	action,
	actionDataSetOutdated,
	actionGeneralError,
	actionSetActiveKey,
	add,
	addIndex,
	apiUpdate,
	clearIndex,
	create,
	creator,
	delete: deleteItem,
	ensure,
	ensureIndexed,
	ensureIndexesWithFilterByActive,
	ensureKeys,
	loadIndexedPage,
	loadKeysPage,
	receiveIndexed,
	receiveKeys,
	receiveUpdated,
	refreshUses,
	removePropertyFromEdited,
	request,
	saveEdited,
	setActiveKey,
	setActiveKeys,
	updateEdited,
	updateStore,
	updateSubstateFromView,
	updateStateFromView,
	useIndexed,
	useIndexedClear,
	useIndexedClearAll,
	useIndexedRegister,
	useKeys,
	useKeysClear,
};

// If you uncomment test, then child tests could not be started from IDE
// describe('Run all common actions', () => {
// 	it('Test with datatype testStore and categoryPath metadata.', () => {
// 		const commonActionNames = Object.keys(commonActionsTests);
// 		const dataType = 'testStore';
// 		const categoryPath = 'metadata';
// 		const tests = getTestsByActionName(commonActionNames, commonActionsTests);
// 		testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
// 	});
// });

//
// temporary list of common action for some of stores
//
const cases = [
	// ...USE_ACTIONS,
	// ...EDIT_ACTIONS,
	// ...SETTING_ACTIVE_ACTIONS,
	// ...RESTORE_STATE_ACTIONS,
	// 'add',
	// 'create',
	// 'delete',
	// 'refreshUses',
	// 'saveEdited',
	// 'setActiveKey',
	// 'setActiveKeys',
	// 'updateEdited',
	// 'updateStateFromView',
	// 'useIndexed',
	// 'useIndexedClear',
	// 'useKeys',
	// 'useKeysClear',
];
const layertemplates = [
	// ...USE_ACTIONS,
	// ...EDIT_ACTIONS,
	// ...SETTING_ACTIVE_ACTIONS,
	// ...RESTORE_STATE_ACTIONS,
	// 'add',
	// 'create',
	// 'delete',
	// 'saveEdited',
	// 'setActiveKey',
	// 'updateEdited',
	// 'useIndexed',
	// 'useIndexedClear',
	// 'useKeys',
	// 'useKeysClear',
	// 'refreshUses',
	// 'setActiveKeys',
	// 'updateStateFromView',

	// TODO
	'clearIndex', //FIXME specific??
];

const periods = [
	// ...USE_ACTIONS,
	// ...EDIT_ACTIONS,
	// ...SETTING_ACTIVE_ACTIONS,
	// ...RESTORE_STATE_ACTIONS,
	// 'add',
	// 'create',
	// 'delete',
	// 'refreshUses',
	// 'saveEdited',
	// 'setActiveKey',
	// 'setActiveKeys',
	// 'updateEdited',
	// 'updateStateFromView',
	// 'useIndexed',
	// 'useIndexedClear',
	// 'useKeys',
	// 'useKeysClear',
];

const places = [
	// ...USE_ACTIONS,
	// ...EDIT_ACTIONS,
	// ...SETTING_ACTIVE_ACTIONS,
	// ...RESTORE_STATE_ACTIONS,
	// 'add',
	// 'create',
	// 'delete',
	// 'refreshUses',
	// 'saveEdited',
	// 'setActiveKey',
	// 'setActiveKeys',
	// 'updateEdited',
	// 'updateStateFromView',
	// 'useIndexed',
	// 'useIndexedClear',
	// 'useKeys',
	// 'useKeysClear',
];

const scenarios = [
	//FIXME
	// 'add',
	// 'setActiveKey',
	// 'setActiveKeys',
	// 'updateStateFromView',

	// to add
	'create',
	'delete',

	'useKeys',
	'useKeysClear',
	'refreshUses',
	'useIndexed',
	'useIndexedClear',

	'saveEdited',
	'updateEdited',
];

const scopes = [
	// ...USE_ACTIONS,
	// ...EDIT_ACTIONS,
	// ...SETTING_ACTIVE_ACTIONS,
	// ...RESTORE_STATE_ACTIONS,
	// 'add',
	// 'create',
	// 'delete',
	// 'refreshUses',
	// 'saveEdited',
	// 'setActiveKey',
	// 'updateEdited',
	// 'updateStateFromView',
	// 'useIndexed',
	// 'useIndexedClear',
	// 'useKeys',
	// 'useKeysClear',
	// 'setActiveKeys',
];

const styles = [
	// ...USE_ACTIONS,
	// ...EDIT_ACTIONS,
	// ...RESTORE_STATE_ACTIONS,
	// 'add',
	// 'useIndexed',
	// 'useKeys',
	// 'useKeysClear',
	// 'updateStateFromView',
	// 'create',
	// 'delete',
	// 'refreshUses',
	// 'useIndexedClear',
	// 'saveEdited',
	// 'updateEdited',
	// to add
];
const tags = [
	// ...USE_ACTIONS,
	// ...EDIT_ACTIONS,
	// ...RESTORE_STATE_ACTIONS,
	// 'create',
	// 'delete',
	// 'saveEdited',
	// 'updateEdited',
	// 'useKeys',
	// 'useKeysClear',
	// 'refreshUses',
	// 'useIndexed',
	// 'useIndexedClear',
	// 'add',
	// 'updateStateFromView',
];

const views = [
	// ...USE_ACTIONS,
	// ...EDIT_ACTIONS,
	// ...SETTING_ACTIVE_ACTIONS,
	// ...RESTORE_STATE_ACTIONS,
	// 'add',
	// 'setActiveKey',
	// 'setActiveKeys',
	// 'create',
	// 'delete',
	// 'saveEdited',
	// 'updateEdited',
	// 'useKeys',
	// 'useKeysClear',
	// 'refreshUses',
	// 'useIndexed',
	// 'useIndexedClear',
	// 'updateStateFromView',
];

export const EDIT_ACTIONS = [
	'add',
	'create',
	'delete',
	'saveEdited',
	'updateEdited',
];

export const USE_ACTIONS = [
	'useKeys',
	'useKeysClear',
	'refreshUses',
	'useIndexed',
	'useIndexedClear',
	//clearIndex
];

export const SETTING_ACTIVE_ACTIONS = ['setActiveKey', 'setActiveKeys'];

export const RESTORE_STATE_ACTIONS = [
	// 'updateSubstateFromView' //updateStateFromView
	'updateStateFromView', //updateStateFromView
];

export default commonActionsTests;
