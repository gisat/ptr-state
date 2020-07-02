import {assert} from 'chai';
import '../../../src/state/Action';
import actions from '../../../src/state/_common/actions';

describe('state/_common/actions', function () {
	let dispatchedActions = [];
	const dispatch = function (action) {
		dispatchedActions.push(action);
	};

	const clearDispatchedActions = function () {
		dispatchedActions = [];
	};

	afterEach(function () {
		clearDispatchedActions();
	});

	it('add', function () {
		actions.add({ADD: 'ADD'})('data', 'filter')(dispatch);
		assert.deepStrictEqual(dispatchedActions, [
			{type: 'ADD', data: ['data'], filter: 'filter'},
		]);
	});

	it('addBatch', function () {
		actions.addBatch({ADD_BATCH: 'ADD_BATCH'})('data', 'key')(dispatch);
		assert.deepStrictEqual(dispatchedActions, [
			{type: 'ADD_BATCH', data: ['data'], key: 'key'},
		]);
	});

	it('addBatchIndex', function () {
		actions.addBatchIndex({INDEX: {ADD_BATCH: 'ADD_BATCH_INDEX'}})(
			'filter',
			'order',
			'data',
			'key'
		)(dispatch);
		assert.deepStrictEqual(dispatchedActions, [
			{
				type: 'ADD_BATCH_INDEX',
				data: 'data',
				filter: 'filter',
				order: 'order',
				key: 'key',
			},
		]);
	});

	describe('action', function () {
		const tests = [
			{
				name: 'simple path',
				actionTypes: {ACTION: 'STR_ACTION'},
				type: 'ACTION',
				payload: {p: true},
				expectedAction: {type: 'STR_ACTION', p: true},
			},
			{
				name: 'complex path',
				actionTypes: {SCOPE: {ACTION: 'STR_SCOPE_ACTION'}},
				type: 'SCOPE.ACTION',
				payload: {p: true},
				expectedAction: {type: 'STR_SCOPE_ACTION', p: true},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					actions.action(test.actionTypes, test.type, test.payload),
					test.expectedAction
				);
			});
		});
	});

	describe('actionAdd', function () {
		const tests = [
			{
				name: 'single data',
				actionTypes: {ADD: 'ADD'},
				data: 'data',
				filter: 'filter',
				expectedAction: {type: 'ADD', data: ['data'], filter: 'filter'},
			},
			{
				name: 'multiple data',
				actionTypes: {ADD: 'ADD'},
				data: ['data'],
				filter: 'filter',
				expectedAction: {type: 'ADD', data: ['data'], filter: 'filter'},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					actions.actionAdd(test.actionTypes, test.data, test.filter),
					test.expectedAction
				);
			});
		});
	});

	it('actionGeneralError', function () {
		assert.deepStrictEqual(actions.actionGeneralError(new Error()), {
			type: 'ERROR',
		});
	});

	it('creator', function () {
		const action = (...args) => ({
			type: 'action',
			args,
		});

		actions.creator(action)({ADD: 'ADD'})('arg1')(dispatch);
		assert.deepStrictEqual(dispatchedActions, [
			{type: 'action', args: [{ADD: 'ADD'}, 'arg1']},
		]);
	});

	// apiUpdate,
	// create,
	// delete: deleteItem,
	// ensure: ensureKeys,
	// ensureIndexed,
	// ensureIndexesWithFilterByActive,
	// ensureKeys,
	// loadAll,
	// loadFiltered,
	// useIndexedBatch,
	// loadIndexedPage,
	// loadKeysPage,
	// setActiveKey: creator(actionSetActiveKey),
	// setActiveKeyAndEnsureDependencies,
	// setActiveKeysAndEnsureDependencies,
	// setActiveKeys: creator(actionSetActiveKeys),
	// receiveUpdated,
	// receiveIndexed,
	// receiveKeys,
	// refreshUses,
	// removePropertyFromEdited,
	// request: requestWrapper,
	// saveEdited,
	// updateSubstateFromView,
	// updateEdited,
	// useKeys,
	// useKeysClear: creator(actionUseKeysClear),
	// useIndexed,
	// clearIndex: creator(actionClearIndex),
	// useIndexedRegister: actionUseIndexedRegister,
	// useIndexedClear: creator(actionUseIndexedClear),
	// useIndexedClearAll: creator(actionUseIndexedClearAll),
	// setInitial: creator(actionSetInitial),
	// actionDataSetOutdated,
	// actionSetActiveKey
});
