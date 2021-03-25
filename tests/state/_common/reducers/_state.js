export const CommonReducersState = {
	byKey: {
		key1: {
			key: 'key1',
			data: {
				nameDisplay: 'Albi',
				nameInternal: 'Albert',
			},
		},
		key2: {
			key: 'key2',
			data: {
				nameDisplay: 'Berty',
				nameInternal: 'Bert',
			},
		},
	},
	inUse: {
		keys: [],
		indexes: {
			ComponentA: [
				{
					filter: {
						scopeKey: 'scope1',
					},
					filterByActive: {
						place: true,
					},
					order: null,
					start: 1,
					length: 10,
				},
			],
			ComponentB: [
				{
					filter: {
						scopeKey: 'scope1',
					},
					filterByActive: {
						place: true,
					},
					order: null,
					start: 3,
					length: 7,
				},
			],
			ComponentC: [
				{
					filter: {
						scopeKey: 'scope1',
					},
					filterByActive: {
						place: true,
					},
					order: null,
					start: 12,
					length: 3,
				},
			],
			ComponentD: [
				{
					filter: {
						scopeKey: 'scope1',
					},
					filterByActive: {
						place: true,
					},
					order: null,
					start: 12,
					length: 4,
				},
				{
					filter: {
						scopeKey: 'scope2',
					},
					order: null,
					start: 3,
					length: 3,
				},
			],
			ComponentE: [
				{
					filter: {
						scopeKey: 'scope2',
					},
					order: null,
					start: 1,
					length: 5,
				},
			],
		},
	},
};
