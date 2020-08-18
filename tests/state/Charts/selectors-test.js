import {assert} from 'chai';
import selectors from '../../../src/state/Charts/selectors';

describe('state/Charts/selectors', function () {
	describe('getChartConfiguration', function () {
		const tests = [
			{
				name: 'with interesting properties (single value)',
				state: {
					scopes: {activeKey: 'sc1'},
					periods: {activeKey: 'sp1', activeKeys: ['sp1']},
					attributes: {activeKey: 'a1'},
					charts: {
						charts: {
							k1: {
								data: {
									scope: 's1',
									periods: ['p1'],
									attributes: ['a1'],
									layerTemplate: 't1',
								},
							},
						},
					},
				},
				key: 'k1',
				useActiveMetadataKeys: false,
				expectedResult: {
					data: {
						attributes: ['a1'],
						layerTemplate: 't1',
						periods: ['p1'],
						scope: 's1',
					},
					filter: {
						attributeKey: 'a1',
						layerTemplateKey: 't1',
						periodKey: 'p1',
						scopeKey: 's1',
					},
					filterByActive: {},
					mergedFilter: {
						attributeKey: 'a1',
						layerTemplateKey: 't1',
						periodKey: 'p1',
						scopeKey: 's1',
					},
				},
			},
			{
				name: 'with interesting properties (multi value)',
				state: {
					scopes: {activeKey: 'sc1'},
					periods: {activeKey: 'sp1', activeKeys: ['sp1']},
					attributes: {activeKey: 'a1'},
					charts: {
						charts: {
							k1: {
								data: {
									scope: 's1',
									periods: ['p1', 'p2'],
									attributes: ['a1', 'a2'],
									layerTemplate: 't1',
								},
							},
						},
					},
				},
				key: 'k1',
				useActiveMetadataKeys: false,
				expectedResult: {
					data: {
						attributes: ['a1', 'a2'],
						layerTemplate: 't1',
						periods: ['p1', 'p2'],
						scope: 's1',
					},
					filter: {
						attributeKey: {in: ['a1', 'a2']},
						layerTemplateKey: 't1',
						periodKey: {in: ['p1', 'p2']},
						scopeKey: 's1',
					},
					filterByActive: {},
					mergedFilter: {
						attributeKey: {in: ['a1', 'a2']},
						layerTemplateKey: 't1',
						periodKey: {in: ['p1', 'p2']},
						scopeKey: 's1',
					},
				},
			},
			{
				name: 'without interesting properties (single value)',
				state: {
					scopes: {activeKey: 'sc1'},
					periods: {activeKey: 'sp1', activeKeys: ['sp1']},
					attributes: {activeKey: 'a1'},
					charts: {
						charts: {
							k1: {
								data: {},
							},
						},
					},
				},
				key: 'k1',
				useActiveMetadataKeys: {
					scope: true,
					period: true,
					attribute: true,
				},
				expectedResult: {
					data: {},
					filter: {},
					filterByActive: {
						attribute: true,
						period: true,
						scope: true,
					},
					mergedFilter: {
						attributeKey: 'a1',
						periodKey: 'sp1',
						scopeKey: 'sc1',
					},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getChartConfiguration(
						test.state,
						test.key,
						test.useActiveMetadataKeys
					),
					test.expectedResult
				);
			});
		});
	});

	describe('getChartsBySetKeyAsObject', function () {
		const tests = [
			{
				name: 'some',
				state: {
					charts: {
						charts: {
							c1: {key: 'c1'},
							c2: {key: 'c2'},
							c3: {key: 'c3'},
						},
						sets: {s1: {charts: ['c1', 'c3']}},
					},
				},
				key: 's1',
				expectedResult: {
					c1: {
						key: 'c1',
					},
					c3: {
						key: 'c3',
					},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getChartsBySetKeyAsObject(test.state, test.key),
					test.expectedResult
				);
			});
		});
	});

	describe('getDataForChart', function () {
		const tests = [
			{
				name: 'some',
				state: {
					attributeData: {
						byKey: {
							ad1: {
								n: 1,
								attributeData: {
									features: [{properties: {fid: 'f1'}}],
								},
							},
							ad2: {n: 2},
							ad3: {n: 3, removed: true},
						},
					},
					attributeRelations: {
						byKey: {
							k1: {
								data: {
									v: 1,
									active: true,
									attributeDataSourceKey: 'ad1',
									fidColumnName: 'fid',
								},
							},
							k2: {
								data: {
									v: 2,
									active: true,
									attributeDataSourceKey: 'ad2',
									fidColumnName: 'fid',
								},
							},
							k3: {data: {v: 3, active: false}},
						},
					},
					filter: ['v', 1],
				},
				expectedResult: [
					{
						key: 'f1',
						data: {
							name: 'f1',
							values: [],
						},
					},
				],
			},
		];

		tests.forEach((test) => {
			it(test.name, () => {
				assert.deepStrictEqual(
					selectors.getDataForChart(test.state, 'filter', 'chartKey'),
					test.expectedResult
				);
			});
		});
	});

	describe('getNamesForChart', function () {
		const tests = [
			{
				name: 'some',
				state: {
					attributeData: {
						byKey: {
							k1: {
								n: 1,
								attributeData: {
									features: [{properties: {fid: 1, p: 'v'}}],
								},
							},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
					},
					attributeRelations: {
						byKey: {
							r1: {
								data: {
									v: 1,
									attributeDataSourceKey: 'k1',
									fidColumnName: 'fid',
								},
							},
						},
					},
				},
				expectedResult: [{key: 1, data: {name: 'v'}}],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getNamesForChart(test.state, 'filter', 'ck'),
					test.expectedResult
				);
			});
		});
	});

	describe('getSetByKey', function () {
		const tests = [
			{
				name: 'some',
				state: {
					charts: {
						sets: {s1: {key: 's1'}},
					},
				},
				key: 's1',
				expectedResult: {key: 's1'},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getSetByKey(test.state, test.key),
					test.expectedResult
				);
			});
		});
	});
});
