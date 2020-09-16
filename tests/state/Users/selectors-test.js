import {assert} from 'chai';
import selectors from '../../../src/state/Users/selectors';

describe('state/Users/selectors', function () {
	describe('getAll', function () {
		const tests = [
			{
				name: 'null',
				state: {
					users: {
						byKey: null,
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					users: {
						byKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					users: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
					},
				},
				expectedResult: [{n: 1}, {n: 2}],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAll(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getActive', function () {
		const createState = (activeKey) => ({
			users: {
				byKey: {
					k1: {n: 1},
					k2: {n: 2},
					k3: {n: 3, removed: true},
				},
				activeKey,
			},
		});

		it('select active', function () {
			assert.deepStrictEqual(selectors.getActive(createState('k1')), {
				n: 1,
			});
		});

		it('select inactive', function () {
			assert.isNull(selectors.getActive(createState('k3')));
		});
	});

	describe('getByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					users: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					users: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					users: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k1',
				expectedResult: {
					n: 1,
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getByKey(test.state, test.key),
					test.expectedResult
				);
			});
		});
	});

	it('getById', function () {
		assert.deepStrictEqual(
			selectors.getById(
				{
					users: {
						byKey: {
							11: {key: 11, id: 1},
							12: {key: 12, id: 2},
							13: {key: 13, id: 3},
						},
					},
				},
				2
			),
			{key: 12, id: 2}
		);
	});

	it('getActiveKey', function () {
		const state = {users: {activeKey: 'k'}};

		assert.strictEqual(selectors.getActiveKey(state), 'k');
	});

	describe('getActiveUser', function () {
		const createState = (activeKey) => ({
			users: {
				byKey: {
					k1: {n: 1},
					k2: {n: 2},
					k3: {n: 3, removed: true},
				},
				activeKey,
			},
		});

		it('select active', function () {
			assert.deepStrictEqual(selectors.getActiveUser(createState('k1')), {
				n: 1,
			});
		});

		it('select inactive', function () {
			assert.isNull(selectors.getActiveUser(createState('k3')));
		});
	});

	describe('getGroupKeysForActiveUser', function () {
		const createState = (activeKey) => ({
			users: {
				byKey: {
					k1: {n: 1, groups: ['g1', 'g2', 'g3']},
					k2: {n: 2},
					k3: {n: 3, removed: true},
				},
				activeKey,
			},
		});

		it('select active', function () {
			assert.deepStrictEqual(
				selectors.getGroupKeysForActiveUser(createState('k1')),
				['g1', 'g2', 'g3']
			);
		});

		it('select inactive', function () {
			assert.deepStrictEqual(
				selectors.getGroupKeysForActiveUser(createState('k3')),
				[]
			);
		});
	});

	describe('getGroupsForActiveUser', function () {
		const createState = (activeKey) => ({
			users: {
				byKey: {
					k1: {n: 1, groups: ['g1', 'g2', 'g3']},
					k2: {n: 2},
					k3: {n: 3, removed: true},
				},
				activeKey,
			},
		});

		it('select active', function () {
			assert.deepStrictEqual(
				selectors.getGroupsForActiveUser(createState('k1')),
				['g1', 'g2', 'g3']
			);
		});

		it('select inactive', function () {
			assert.deepStrictEqual(
				selectors.getGroupsForActiveUser(createState('k3')),
				[]
			);
		});
	});

	describe('getUsers', function () {
		const tests = [
			{
				name: 'null',
				state: {
					users: {
						byKey: null,
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					users: {
						byKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					users: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
					},
				},
				expectedResult: [{n: 1}, {n: 2}],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getUsers(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getGroups', function () {
		const tests = [
			{
				name: 'null',
				state: {
					users: {
						groups: {
							byKey: null,
						},
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					users: {
						groups: {
							byKey: {},
						},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					users: {
						groups: {
							byKey: {
								k1: {n: 1},
								k2: {n: 2},
								k3: {n: 3, removed: true},
							},
						},
					},
				},
				expectedResult: [{n: 1}, {n: 2}],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getGroups(test.state),
					test.expectedResult
				);
			});
		});
	});

	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				users: 'subst',
			}),
			'subst'
		);
	});

	it('getGroupsSubstate', function () {
		assert.strictEqual(
			selectors.getGroupsSubstate({
				users: {groups: 'subst'},
			}),
			'subst'
		);
	});

	describe('hasActiveUserPermissionToCreate', function () {
		const createState = (activeKey) => ({
			users: {
				byKey: {
					k1: {n: 1, permissions: {cat: {type: {create: true}}}},
					k2: {n: 2, permissions: {cat: {type: {create: false}}}},
					k3: {n: 3, removed: true},
				},
				activeKey,
			},
		});

		it('select active with permissions', function () {
			assert.isTrue(
				selectors.hasActiveUserPermissionToCreate(
					createState('k1'),
					'type',
					'cat'
				)
			);
		});

		it('select active with permissions', function () {
			assert.isFalse(
				selectors.hasActiveUserPermissionToCreate(
					createState('k2'),
					'type',
					'cat'
				)
			);
		});
	});

	describe('isAdmin', function () {
		it('admin', function () {
			assert.isTrue(selectors.isAdmin({users: {isAdmin: true}}));
		});

		it('non admin', function () {
			assert.isFalse(selectors.isAdmin({users: {isAdmin: false}}));
		});
	});

	describe('isAdminGroupMember', function () {
		const ADMIN_GROUP = 1;
		const createState = (activeKey) => ({
			users: {
				byKey: {
					k1: {n: 1, groups: [ADMIN_GROUP, 2, 3]},
					k2: {n: 2, groups: [2, 3]},
					k3: {n: 3, removed: true},
				},
				activeKey,
			},
		});

		it('admin', function () {
			assert.isTrue(selectors.isAdminGroupMember(createState('k1')));
		});

		it('non admin', function () {
			assert.isFalse(selectors.isAdminGroupMember(createState('k2')));
		});
	});

	describe('isLoggedIn', function () {
		it('logged in', function () {
			assert.isTrue(selectors.isLoggedIn({users: {activeKey: 1}}));
		});

		it('logged out', function () {
			assert.isFalse(selectors.isLoggedIn({users: {activeKey: null}}));
		});
	});
});
