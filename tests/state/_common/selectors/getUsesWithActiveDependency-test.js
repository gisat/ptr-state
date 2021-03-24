import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getUsesWithActiveDependency', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		places: {
			activeKey: 'place1',
		},
		[sampleSubstoreName]: {
			inUse: {
				indexes: {
					ComponentA: [
						{
							filter: {
								scopeKey: 'scope1',
							},
							filterByActive: {
								place: true,
							},
							order: null,
							start: 1,
							length: 10,
						},
					],
					ComponentB: [
						{
							filter: {
								scopeKey: 'scope1',
							},
							filterByActive: {
								place: true,
							},
							order: null,
							start: 3,
							length: 7,
						},
					],
					ComponentC: [
						{
							filter: {
								scopeKey: 'scope1',
							},
							filterByActive: {
								place: true,
							},
							order: null,
							start: 12,
							length: 3,
						},
					],
				},
			},
		},
	};

	it('should return uses with active dependency', () => {
		const filterByActive = {
			place: true,
		};
		const expectedOutput = [
			{
				filter: {
					scopeKey: 'scope1',
					placeKey: 'place1',
				},
				order: null,
				uses: [
					{
						start: 1,
						length: 10,
					},
					{
						start: 12,
						length: 3,
					},
				],
			},
		];
		const output = commonSelectors.getUsesWithActiveDependency(getSubstate)(
			state,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedOutput);
	});
});
