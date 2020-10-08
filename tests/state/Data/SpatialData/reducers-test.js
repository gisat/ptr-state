import {assert} from 'chai';
import reducer from '../../../../src/state/Data/SpatialData/reducers';

describe('state/Data/SpatialData', function () {
	it('add new data', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byDataSourceKey: {
						key2: {
							citizens: 50,
						},
					},
				},
				{
					type: 'DATA.SPATIAL_DATA.ADD',
					key: 'key1',
					data: {
						citizens: 22
					},
				}
			),
			{
				byDataSourceKey: {
					key1: {
						citizens: 22
					},
					key2: {
						citizens: 50
					},
				},
			}
		);
	});

	it('add data on key that exists', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byDataSourceKey: {
						key1: {
							citizens: 22,
							area: 9999,
						},
					},
				},
				{
					type: 'DATA.SPATIAL_DATA.ADD',
					key: 'key1',
					data: {
						citizens: 25,
						COpolution: 0.25
					},
				}
			),
			{
				byDataSourceKey: {
					key1: {
						citizens: 25,
						COpolution: 0.25,
					},
				},
			}
		);
	});

	it('update data', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byDataSourceKey: {
						key2: {
							citizens: 50,
						},
					},
				},
				{
					type: 'DATA.SPATIAL_DATA.UPDATE',
					key: 'key2',
					data: {
						COpolutions: 0.99
					},
				}
			),
			{
				byDataSourceKey: {
					key2: {
						citizens: 50,
						COpolutions: 0.99
					},
				},
			}
		);
	});

	it('add new indexes', function () {

        const filter = {scope: 'cities'};
        const order = null;
        const level = 10;
		const spatialDataSourceKey = 'key1';
		const tile = '15,51';
		const index = {[level]: {[tile]:[1,2,3]}};
		const changedOn = null;
		assert.deepStrictEqual(
			reducer(
				{},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					filter,
					order,
					level,
					spatialDataSourceKey,
					index,
					changedOn,
				}
			),
			{
				indexes: [
					{
						count:3,
						filter,
						order,
						level,
						spatialDataSourceKey,
						index: index[level][tile],
						tile,
						changedOn,
					}
				]
			}
		);
	});

	it('add new indexes', function () {

        const filter = {scope: 'cities'};
        const order = null;
        const level = 10;
		const spatialDataSourceKey = 'key1';
		const tile = '15,51';
		const tile2 = '15,52';
		const index = {[level]: {
			[tile]:[1,2,3],
			[tile2]:[1,2,5,6]
		}};
		const changedOn = null;
		assert.deepStrictEqual(
			reducer(
				{},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					filter,
					order,
					level,
					spatialDataSourceKey,
					index,
					changedOn,
				}
			),
			{
				indexes: [
					{
						count:3,
						filter,
						order,
						level,
						spatialDataSourceKey,
						index: index[level][tile],
						tile,
						changedOn,
					},
					{
						count:4,
						filter,
						order,
						level,
						spatialDataSourceKey,
						index: index[level][tile2],
						tile: tile2,
						changedOn,
					}
				]
			}
		);
	});

	it('update index on add indexes', function () {

        const filter = {scope: 'cities'};
        const order = null;
        const level = 10;
		const spatialDataSourceKey = 'key1';
		const tile = '15,51';
		const tile2 = '15,52';
		const index = {[level]: {
			[tile]:[1,2,9],
			[tile2]:[1,2,5,6],
		}};
		const updateIndex = {[level]: {
			[tile2]:[1,9,11,10,89],
		}};
		const changedOn = null;
		assert.deepStrictEqual(
			reducer(
				{
					indexes: [
						{
							count:3,
							filter,
							order,
							level,
							spatialDataSourceKey,
							index: index[level][tile],
							tile,
							changedOn,
						},
						{
							count:4,
							filter,
							order,
							level,
							spatialDataSourceKey,
							index: index[level][tile2],
							tile: tile2,
							changedOn,
						}
					]
				},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					filter,
					order,
					level,
					spatialDataSourceKey,
					index: updateIndex,
					changedOn,
				}
			),
			{
				indexes: [
					{
						count:3,
						filter,
						order,
						level,
						spatialDataSourceKey,
						index: index[level][tile],
						tile,
						changedOn,
					},
					{
						count:5,
						filter,
						order,
						level,
						spatialDataSourceKey,
						index: updateIndex[level][tile2],
						tile: tile2,
						changedOn,
					}
				]
			}
		);
	});
});
