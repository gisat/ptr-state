import {assert} from 'chai';
import reducer from '../../../src/state/LayerPeriods/reducers';

describe('state/LayerPeriods/reducers', function () {
	it('requestForAoi', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byAoiKey: {ak1: {byLayerKey: {lk1: {layerKey: 'lk1'}}}},
				},
				{
					type: 'LAYER_PERIODS_AOI_LAYER_REQUEST',
					periods: {p1: 'v1'},
					layerKey: 'lk1',
					aoiKey: 'ak1',
				}
			),
			{
				byAoiKey: {
					ak1: {
						byLayerKey: {
							lk1: {
								data: {
									p1: 'v1',
								},
								layerKey: 'lk1',
								loading: true,
							},
						},
					},
				},
			}
		);
	});

	it('receiveForAoi', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byAoiKey: {ak1: {byLayerKey: {lk1: {layerKey: 'lk1'}}}},
				},
				{
					type: 'LAYER_PERIODS_AOI_LAYER_RECEIVE',
					periods: {p1: 'v1'},
					layerKey: 'lk1',
					aoiKey: 'ak1',
				}
			),
			{
				byAoiKey: {
					ak1: {
						byLayerKey: {
							lk1: {
								data: {
									p1: 'v1',
								},
								layerKey: 'lk1',
								loading: false,
							},
						},
					},
				},
			}
		);
	});

	it('requestForAoiError', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byAoiKey: {ak1: {byLayerKey: {lk1: {layerKey: 'lk1'}}}},
				},
				{
					type: 'LAYER_PERIODS_AOI_LAYER_REQUEST_ERROR',
					periods: {p1: 'v1'},
					layerKey: 'lk1',
					aoiKey: 'ak1',
				}
			),
			{
				byAoiKey: {
					ak1: {
						byLayerKey: {
							lk1: {
								layerKey: 'lk1',
								loading: false,
							},
						},
					},
				},
			}
		);
	});

	it('requestForPlace', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byPlaceKey: {pk1: {byLayerKey: {lk1: {layerKey: 'lk1'}}}},
				},
				{
					type: 'LAYER_PERIODS_PLACE_LAYER_REQUEST',
					periods: {p1: 'v1'},
					layerKey: 'lk1',
					placeKey: 'pk1',
				}
			),
			{
				byPlaceKey: {
					pk1: {
						byLayerKey: {
							lk1: {
								data: {
									p1: 'v1',
								},
								layerKey: 'lk1',
								loading: true,
							},
						},
					},
				},
			}
		);
	});

	it('receiveForPlace', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byPlaceKey: {pk1: {byLayerKey: {lk1: {layerKey: 'lk1'}}}},
				},
				{
					type: 'LAYER_PERIODS_PLACE_LAYER_RECEIVE',
					periods: {p1: 'v1'},
					layerKey: 'lk1',
					placeKey: 'pk1',
				}
			),
			{
				byPlaceKey: {
					pk1: {
						byLayerKey: {
							lk1: {
								data: {
									p1: 'v1',
								},
								layerKey: 'lk1',
								loading: false,
							},
						},
					},
				},
			}
		);
	});

	it('requestForPlaceError', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byPlaceKey: {ak1: {byLayerKey: {lk1: {layerKey: 'lk1'}}}},
				},
				{
					type: 'LAYER_PERIODS_PLACE_LAYER_REQUEST_ERROR',
					periods: {p1: 'v1'},
					layerKey: 'lk1',
					placeKey: 'ak1',
				}
			),
			{
				byPlaceKey: {
					ak1: {
						byLayerKey: {
							lk1: {
								layerKey: 'lk1',
								loading: false,
							},
						},
					},
				},
			}
		);
	});

	it('requestForKey', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byKey: {k1: {byLayerKey: {lk1: {layerKey: 'lk1'}}}},
				},
				{
					type: 'LAYER_PERIODS_KEY_LAYER_REQUEST',
					periods: {p1: 'v1'},
					layerKey: 'lk1',
					key: 'k1',
				}
			),
			{
				byKey: {
					k1: {
						byLayerKey: {
							lk1: {
								data: {
									p1: 'v1',
								},
								layerKey: 'lk1',
								loading: true,
							},
						},
					},
				},
			}
		);
	});

	it('receiveForKey', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byKey: {k1: {byLayerKey: {lk1: {layerKey: 'lk1'}}}},
				},
				{
					type: 'LAYER_PERIODS_KEY_LAYER_RECEIVE',
					periods: {p1: 'v1'},
					layerKey: 'lk1',
					key: 'k1',
				}
			),
			{
				byKey: {
					k1: {
						byLayerKey: {
							lk1: {
								data: {
									p1: 'v1',
								},
								layerKey: 'lk1',
								loading: false,
							},
						},
					},
				},
			}
		);
	});

	it('requestForKeyError', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byKey: {k1: {byLayerKey: {lk1: {layerKey: 'lk1'}}}},
				},
				{
					type: 'LAYER_PERIODS_KEY_LAYER_REQUEST_ERROR',
					periods: {p1: 'v1'},
					layerKey: 'lk1',
					key: 'k1',
				}
			),
			{
				byKey: {
					k1: {
						byLayerKey: {
							lk1: {
								layerKey: 'lk1',
								loading: false,
							},
						},
					},
				},
			}
		);
	});

	it('unknown', function () {
		assert.deepStrictEqual(
			reducer(
				{},
				{
					type: 'UNKNOWN_ACTION',
				}
			),
			{}
		);
	});
});
