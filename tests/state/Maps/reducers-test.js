import { assert } from 'chai';
import reducer from '../../../src/state/Maps/reducers';

describe('state/Maps/reducers', function () {
	it('update layer layerTemplateKay', function () {
		const result = reducer(
			{
				maps: {
					map1: {
						key: 'map1',
						data: {
							layers: [{
								key: 'layer1'
							}]
						}
					}
				}
			},
			{
				type: 'MAPS.LAYERS.LAYER.UPDATE',
				mapKey: 'map1',
				layerKey: 'layer1',
				update: { layerTemplateKey: 'layerTemplateKey1' }
			}
		);

		const expectedResult = {
			maps: {
				map1: {
					key: 'map1',
					data: {
						layers: [{
							key: 'layer1',
							layerTemplateKey: 'layerTemplateKey1'
						}]
					}
				}
			}
		}
		assert.deepStrictEqual(result, expectedResult);
	});

	it('update layer data array property', function () {
		const result = reducer(
			{
				maps: {
					map1: {
						key: 'map1',
						data: {
							layers: [{
								key: 'layer1',
								data: {
									districts: [3, 4]
								}
							}]
						}
					}
				}
			},
			{
				type: 'MAPS.LAYERS.LAYER.UPDATE',
				mapKey: 'map1',
				layerKey: 'layer1',
				update: { data: { districts: [1, 2] } }
			}
		);

		const expectedResult = {
			maps: {
				map1: {
					key: 'map1',
					data: {
						layers: [{
							key: 'layer1',
							data: { districts: [1, 2] }
						}]
					}
				}
			}
		}
		assert.deepStrictEqual(result, expectedResult);
	});

	it('update layer data object property', function () {
		const result = reducer(
			{
				maps: {
					map1: {
						key: 'map1',
						data: {
							layers: [
								{
									key: 'layer2'
								},
								{
									key: 'layer1',
									data: {
										districts: {
											prague: {
												citizens: 1000000
											},
											brno: {
												citizens: 300000
											}
										}
									}
								}]
						}
					}
				}
			},
			{
				type: 'MAPS.LAYERS.LAYER.UPDATE',
				mapKey: 'map1',
				layerKey: 'layer1',
				update: { data: { districts: { brno: { citizens: 400000 } } } }
			}
		);

		const expectedResult = {
			maps: {
				map1: {
					key: 'map1',
					data: {
						layers: [
							{
								key: 'layer2'
							},
							{
								key: 'layer1',
								data: {
									districts: {
										prague: {
											citizens: 1000000
										},
										brno: {
											citizens: 400000
										}
									}
								}
							}
						]
					}
				}
			}
		}
		assert.deepStrictEqual(result, expectedResult);
	});

	it('Add new property', function () {
		const result = reducer(
			{
				maps: {
					map1: {
						key: 'map1',
						data: {
							layers: [
								{
									key: 'layer2'
								},
								{
									key: 'layer1',
									data: {
										districts: {
											prague: {
												citizens: 1000000
											},
											brno: {
												citizens: 300000
											}
										}
									}
								}]
						}
					}
				}
			},
			{
				type: 'MAPS.LAYERS.LAYER.UPDATE',
				mapKey: 'map1',
				layerKey: 'layer1',
				update: { data: { districts: { brno: { cars: 100000 } } } }
			}
		);

		const expectedResult = {
			maps: {
				map1: {
					key: 'map1',
					data: {
						layers: [
							{
								key: 'layer2'
							},
							{
								key: 'layer1',
								data: {
									districts: {
										prague: {
											citizens: 1000000
										},
										brno: {
											citizens: 300000,
											cars: 100000
										}
									}
								}
							}
						]
					}
				}
			}
		}
		assert.deepStrictEqual(result, expectedResult);
	});

	it('fail on unexistiong layer key', function () {
		const initState = {
			maps: {
				map1: {
					key: 'map1',
					data: {
						layers: [
							{
								key: 'layer2'
							},
							{
								key: 'layer1',
								data: {
									districts: {
										prague: {
											citizens: 1000000
										},
										brno: {
											citizens: 300000
										}
									}
								}
							}]
					}
				}
			}
		};

		const result = reducer(
			initState,
			{
				type: 'MAPS.LAYERS.LAYER.UPDATE',
				mapKey: 'map1',
				layerKey: 'layer3',
				update: { data: { districts: { brno: { citizens: 400000 } } } }
			}
		);

		assert.deepStrictEqual(result, initState);
	});
});
