import {assert} from 'chai';
import helpers from '../../../src/state/Maps/helpers';

describe('state/Maps/helpers', function () {
	it('getBackgroundLayersWithFilter', function () {
		assert.deepStrictEqual(
			helpers.getBackgroundLayersWithFilter(
				{
					scopes: {activeKey: 's1'},
					cases: {activeKey: 'c1'},
				},
				JSON.stringify({
					filterByActive: {case: true, scope: true},
					layerTemplateKey: 'lt1',
					areaTreeLevelKey: 'atl1',
					metadataModifiers: [],
				}),
				'l1'
			),
			[
				{
					key: 'l1',
					filter: {
						areaTreeLevelKey: 'atl1',
						caseKey: 'c1',
						layerTemplateKey: 'lt1',
						scopeKey: 's1',
					},
				},
			]
		);
	});

	it('getLayersWithFilter', function () {
		assert.deepStrictEqual(
			helpers.getLayersWithFilter(
				{
					scopes: {activeKey: 's1'},
					cases: {activeKey: 'c1'},
				},
				JSON.stringify([
					{
						key: 'l1',
						filterByActive: {case: true, scope: true},
						layerTemplateKey: 'lt1',
						areaTreeLevelKey: 'atl1',
						attributeFilter: [],
						attributeMetadataModifiers: [],
					},
				])
			),
			[
				{
					key: 'l1',
					filter: {
						areaTreeLevelKey: 'atl1',
						caseKey: 'c1',
						layerTemplateKey: 'lt1',
						scopeKey: 's1',
					},
					attributeFilter: {
						areaTreeLevelKey: 'atl1',
						caseKey: 'c1',
						layerTemplateKey: 'lt1',
						scopeKey: 's1',
					},
				},
			]
		);
	});

	it('getLayersStateWithoutFeatures', function () {
		assert.deepStrictEqual(
			helpers.getLayersStateWithoutFeatures([
				{
					key: 'l1',
					options: {
						features: ['f1', 'f2'],
					},
				},
				{
					key: 'l1',
					options: {},
				},
			]),
			[
				{
					key: 'l1',
					options: {
						features: null,
					},
				},
				{
					key: 'l1',
					options: {},
				},
			]
		);
	});

	it('prepareLayerByDataSourceType', function () {
		assert.deepStrictEqual(
			helpers.prepareLayerByDataSourceType(
				'l1',
				{data: {type: 'wmts', urls: ['url1', 'url2']}},
				'fid',
				0,
				{name: 'ls', opacity: 3, options: {}},
				{},
				{},
				{},
				{data: {description: 'desc'}},
				{}
			),
			{
				key: 'l1_0',
				name: 'ls',
				description: 'desc',
				layerKey: 'l1',
				opacity: 3,
				type: 'wmts',
				options: {
					period: {},
					url: 'url1',
					urls: ['url1', 'url2'],
				},
			}
		);
	});

	it('prepareSelection', function () {
		assert.deepStrictEqual(
			helpers.prepareSelection(
				{
					s1: {
						data: {
							style: 'stl',
							color: 'col',
							hoverColor: 'hColor',
							featureKeysFilter: {keys: ['fk1', 'fk2']},
						},
					},
				},
				{s1: {}}
			),
			{
				s1: {
					hoveredStyle: 'stl',
					keys: ['fk1', 'fk2'],
					style: 'stl',
				},
			}
		);
	});
});
