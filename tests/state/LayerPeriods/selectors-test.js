import {assert} from 'chai';
import selectors from '../../../src/state/LayerPeriods/selectors';

describe('state/LayerPeriods/selectors', function () {
	it('getActiveAoiData', function () {
		assert.deepStrictEqual(
			selectors.getActiveAoiData({
				layerPeriods: {byAoiKey: {ak1: {key: 'ak1'}}},
				aoi: {activeKey: 'ak1'},
			}),
			{key: 'ak1'}
		);
	});

	it('getActivePlaceData', function () {
		assert.deepStrictEqual(
			selectors.getActivePlaceData({
				layerPeriods: {byPlaceKey: {pk1: {key: 'pk1'}}},
				places: {activeKey: 'pk1'},
			}),
			{key: 'pk1'}
		);
	});

	it('getForActiveLpisCase', function () {
		assert.deepStrictEqual(
			selectors.getForActiveLpisCase({
				layerPeriods: {byKey: {lpisCaselk1: {key: 'lk1'}}},
				specific: {lpisChangeReviewCases: {activeCaseKey: 'lk1'}},
			}),
			{key: 'lk1'}
		);
	});
});
