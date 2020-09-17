import {assert} from 'chai';
import reducer from '../../../src/state/Windows/reducers';

describe('state/Windows/reducers', function () {
	it('add', function () {
		assert.deepStrictEqual(
			reducer(
				{},
				{
					type: 'WINDOWS.ADD',
					windowKey: 'w1',
					state: 'open',
					settings: {minWidth: 150},
					component: 'c1',
					props: {pk: 'pv'},
					setKey: 's1',
				}
			),
			{
				sets: {
					s1: {
						orderByHistory: ['w1'],
					},
				},
				windows: {
					w1: {
						data: {
							component: 'c1',
							props: {
								pk: 'pv',
							},
							settings: {
								height: 300,
								maxHeight: 500,
								maxWidth: 500,
								minHeight: 200,
								minWidth: 150,
								position: {
									left: 50,
									top: 50,
								},
								width: 200,
							},
							state: 'open',
						},
						key: 'w1',
					},
				},
			}
		);
	});

	it('open', function () {
		assert.deepStrictEqual(
			reducer(
				{windows: {w1: {data: {state: 'closed'}}}, sets: {}},
				{type: 'WINDOWS.OPEN', windowKey: 'w1', setKey: 's1'}
			),
			{
				sets: {
					s1: {
						orderByHistory: ['w1'],
					},
				},
				windows: {
					w1: {
						data: {
							state: 'open',
						},
						key: 'w1',
					},
				},
			}
		);
	});

	it('remove', function () {
		assert.deepStrictEqual(
			reducer(
				{
					sets: {
						s1: {
							orderByHistory: ['w1'],
						},
					},
					windows: {
						w1: {
							data: {
								state: 'open',
							},
							key: 'w1',
						},
					},
				},
				{type: 'WINDOWS.REMOVE', windowKey: 'w1', setKey: 's1'}
			),
			{
				sets: {
					s1: {
						orderByHistory: [],
					},
				},
				windows: {
					w1: {
						data: {
							state: 'close',
						},
						key: 'w1',
					},
				},
			}
		);
	});

	it('top', function () {
		assert.deepStrictEqual(
			reducer(
				{
					sets: {
						s1: {
							orderByHistory: ['w0', 'w1', 'w2'],
						},
					},
					windows: {
						w1: {
							data: {
								state: 'open',
							},
							key: 'w1',
						},
					},
				},
				{type: 'WINDOWS.TOP', windowKey: 'w1', setKey: 's1'}
			),
			{
				sets: {
					s1: {
						orderByHistory: ['w0', 'w2', 'w1'],
					},
				},
				windows: {
					w1: {
						data: {
							state: 'open',
						},
						key: 'w1',
					},
				},
			}
		);
	});

	it('update', function () {
		assert.deepStrictEqual(
			reducer(
				{
					windows: {
						w1: {
							data: {
								component: 'c1',
								props: {
									pk: 'pv',
								},
								settings: {
									height: 300,
									maxHeight: 500,
									maxWidth: 500,
									minHeight: 200,
									minWidth: 150,
									position: {
										left: 50,
										top: 50,
									},
									width: 200,
								},
								state: 'open',
							},
							key: 'w1',
						},
					},
				},
				{
					type: 'WINDOWS.UPDATE',
					windowKey: 'w1',
					data: {width: 230, height: 100},
				}
			),
			{
				windows: {
					w1: {
						data: {
							component: 'c1',
							height: 100,
							props: {
								pk: 'pv',
							},
							settings: {
								height: 300,
								maxHeight: 500,
								maxWidth: 500,
								minHeight: 200,
								minWidth: 150,
								position: {
									left: 50,
									top: 50,
								},
								width: 200,
							},
							state: 'open',
							width: 230,
						},
						key: 'w1',
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
