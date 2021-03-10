import {assert} from 'chai';
import {setState} from '@jvitela/recompute';
import selectors from '../../../../src/state/Data/selectors';
import {DataSelectorsState} from './_state';

describe('getTile', function () {
	before(function () {
		setState(DataSelectorsState);
	});

	it('Should select populated tile', function () {
		const spatialDataSourceKey = 'spatialDataSource1',
			fidColumnName = 'fid',
			level = 6,
			tile = [0, 0],
			spatialRelationsFilter = {
				modifiers: {
					scopeKey: 'scope1',
					placeKey: 'place1',
				},
			},
			attributeRelationsFilter = {
				modifiers: {
					scopeKey: 'scope1',
					placeKey: 'place1',
				},
				styleKey: 'style1',
			},
			attributeDataSourceKeyAttributeKeyPairs = {
				attributeDataSource1: 'attribute1',
				attributeDataSource2: 'attribute2',
			},
			styleKey = 'style1',
			attributeDataFilter = attributeRelationsFilter;

		const expectedResult = {
			level: 6,
			tile: '0,0',
			features: [
				{
					type: 'Feature',
					key: 'featureKey1',
					geometry: {
						type: 'Point',
						coordinates: [0.2, 0.2],
					},
					properties: {
						fid: 'featureKey1',
						attribute1: 'A',
						attribute2: null,
					},
				},
				{
					type: 'Feature',
					key: 'featureKey2',
					geometry: {
						type: 'Point',
						coordinates: [0.7, 0.7],
					},
					properties: {
						fid: 'featureKey2',
						attribute1: 'B',
						attribute2: null,
					},
				},
			],
		};

		assert.deepStrictEqual(
			selectors.getTile(
				spatialDataSourceKey,
				fidColumnName,
				level,
				tile,
				spatialRelationsFilter,
				attributeRelationsFilter,
				attributeDataSourceKeyAttributeKeyPairs,
				styleKey,
				attributeDataFilter
			),
			expectedResult
		);
	});

	after(function () {
		setState(null);
	});
});
