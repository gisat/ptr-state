import {assert} from 'chai';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getActiveKeysByFilterByActive', function () {
	const state = {
		app: {
			key: 'testing',
		},
		scopes: {
			activeKey: 'scopeA',
		},
		places: {
			activeKey: null,
			activeKeys: ['placeA', 'placeB'],
		},
		scenarios: {},
		layerTemplates: {
			activeKey: 'ltA',
		},
	};

	it('should omit metadata which do not have active key or keys', () => {
		const filterByActive = {
			scope: true,
			place: true,
			scenario: true,
			layerTemplate: true,
		};

		const expectedResult = {
			scopeKey: 'scopeA',
			placeKeys: ['placeA', 'placeB'],
			layerTemplateKey: 'ltA',
		};
		const output = commonSelectors.getActiveKeysByFilterByActive(
			state,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should omit missing metadata', () => {
		const filterByActive = {
			scope: true,
			areaTreeLevelKey: true,
		};

		const expectedResult = {
			scopeKey: 'scopeA',
		};
		const output = commonSelectors.getActiveKeysByFilterByActive(
			state,
			filterByActive
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if no metadata match', () => {
		const filterByActive = {
			areaTreeLevelKey: true,
		};

		const output = commonSelectors.getActiveKeysByFilterByActive(
			state,
			filterByActive
		);
		assert.isNull(output);
	});

	it('should return null if filter by active is null', () => {
		const filterByActive = null;
		const output = commonSelectors.getActiveKeysByFilterByActive(
			state,
			filterByActive
		);
		assert.isNull(output);
	});
});
