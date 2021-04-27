import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('setSetBackgroundLayer-test', function () {
	it('Should set map set background layer', function () {
		const backgroundLayer = {
			layerTemplateKey: 'abc',
		};

		const expectedState = {
			...state,
			sets: {
				...state.sets,
				set1: {
					...state.sets.set1,
					data: {
						...state.sets.set1.data,
						backgroundLayer,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.SET.SET_BACKGROUND_LAYER',
			setKey: 'set1',
			backgroundLayer,
		};

		const output = reducers(state, action);

		assert.deepStrictEqual(output, expectedState);
	});
});
