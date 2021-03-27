import {assert} from 'chai';
import reducers, {
	DEFAULT_INITIAL_STATE,
} from '../../../src/state/_common/reducers';

describe('state/_common/reducers', function () {
	describe('removeEditedPropertyValues', function () {
		const tests = [
			{
				name: 'updated',
				state: {
					editedByKey: {
						k1: {
							data: {
								name: 'key prop in keys',
								actionKey: 'ak1',
							},
						},
						k2: {
							data: {
								name: 'key prop not in keys',
								actionKey: 'nak2',
							},
						},
						k3: {
							data: {
								name: 'multi key prop in keys',
								actionKeys: ['ak3.1', 'ak3.2'],
							},
						},
						k4: {
							data: {
								name: 'multi key prop not in keys',
								actionKeys: ['ak4.1', 'ak4.2'],
							},
						},
					},
				},
				action: {
					dataType: 'actions',
					keys: ['ak1', 'ak3.2'],
				},
				expectedResult: {
					editedByKey: {
						k1: {
							data: {
								name: 'key prop in keys',
								actionKey: null,
							},
						},
						k2: {
							data: {
								name: 'key prop not in keys',
								actionKey: 'nak2',
							},
						},
						k3: {
							data: {
								name: 'multi key prop in keys',
								actionKeys: ['ak3.1'],
							},
						},
						k4: {
							data: {
								name: 'multi key prop not in keys',
								actionKeys: ['ak4.1', 'ak4.2'],
							},
						},
					},
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducers.removeEditedPropertyValues(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});
});
