import {assert} from 'chai';
import reducers, {INITIAL_STATE} from '../../../../src/state/Maps/reducers';
import {MapReducersState as state} from './_state';

describe('setMapBackgroundLayer-test', function () {
	it('Should set map background layer', function () {
		const backgroundLayer = {
			layerTemplateKey: 'abc',
		};

		const expectedState = {
			...state,
			maps: {
				...state.maps,
				map1: {
					...state.maps.map1,
					data: {
						...state.maps.map1.data,
						backgroundLayer,
					},
				},
			},
		};

		const action = {
			type: 'MAPS.MAP.SET_BACKGROUND_LAYER',
			mapKey: 'map1',
			backgroundLayer,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});
});
