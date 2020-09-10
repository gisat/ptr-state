import {assert} from 'chai';
import reducer from '../../../src/state/SpatialData/reducers';

describe('state/SpatialData/reducers', function () {
	describe('add', function () {
		const tests = [
			{
				name: 'no data',
				state: {
					byKey: {
						k1: {spatialDataSourceKey: 'k1', p1: 'v1', p2: 'v2'},
					},
				},
				action: {
					type: 'SPATIAL_DATA.ADD',
				},
				expectedResult: {
					byKey: {
						k1: {spatialDataSourceKey: 'k1', p1: 'v1', p2: 'v2'},
					},
				},
			},
			{
				name: 'some',
				state: {
					byKey: {
						k1: {spatialDataSourceKey: 'k1', p1: 'v1', p2: 'v2'},
					},
				},
				action: {
					type: 'SPATIAL_DATA.ADD',
					data: [
						{spatialDataSourceKey: 'k1', p2: 'v2.2', p3: 'v3.3'},
						{spatialDataSourceKey: 'k2', p: 'v'},
					],
				},
				expectedResult: {
					byKey: {
						k1: {
							spatialDataSourceKey: 'k1',
							p1: 'v1',
							p2: 'v2.2',
							p3: 'v3.3',
						},
						k2: {
							spatialDataSourceKey: 'k2',
							p: 'v',
						},
					},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('registerUseIndexed', function () {
		const tests = [
			{
				name: 'existing',
				state: {
					inUse: {
						indexes: {
							compId: [
								{
									filterByActive: 'fba',
									filter: 'f',
									order: 'asc',
									start: 4,
									length: 2,
								},
							],
						},
					},
				},
				action: {
					type: 'SPATIAL_DATA.USE.INDEXED.REGISTER',
					componentId: 'compId',
					filterByActive: 'fba',
					filter: 'f',
					order: 'asc',
					start: 4,
					length: 2,
				},
				expectedResult: {
					inUse: {
						indexes: {
							compId: [
								{
									filterByActive: 'fba',
									filter: 'f',
									order: 'asc',
									start: 4,
									length: 2,
								},
							],
						},
					},
				},
			},
			{
				name: 'non existing',
				state: {
					inUse: {
						indexes: {
							compId: [
								{
									filterByActive: 'fba',
									filter: 'f',
									order: 'asc',
									start: 4,
									length: 2,
								},
							],
						},
					},
				},
				action: {
					type: 'SPATIAL_DATA.USE.INDEXED.REGISTER',
					componentId: 'compId',
					filterByActive: '_fba',
					filter: 'f',
					order: 'asc',
					start: 4,
					length: 2,
				},
				expectedResult: {
					inUse: {
						indexes: {
							compId: [
								{
									filterByActive: 'fba',
									filter: 'f',
									order: 'asc',
									start: 4,
									length: 2,
								},
								{
									filterByActive: '_fba',
									filter: 'f',
									order: 'asc',
									start: 4,
									length: 2,
								},
							],
						},
					},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	it('unknown', function () {
		assert.deepStrictEqual(
			reducer(
				{},
				{
					type: 'UNKNOWN_ACTION',
				}
			),
			{}
		);
	});
});
