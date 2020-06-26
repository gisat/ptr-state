import {assert} from 'chai';
import Select from "../../../src/state/Select";

describe('state/selections/selectors', function () {
	const state = {
		styles: {
			byKey: {
				"style1": {
					key: 'style1',
					data: {
						definition: {
							rules: [{
								styles: [
									{
										"fill": "#aab5ff"
									}
								]}
							]
						}
					}
				}
			}
		},
		selections: {
			byKey: {
				"selection1": {
					key: "selection1",
					data: {
						styleKey: "style1"
					}
				}
			}
		}
	};


	describe('getAllAsObjectWithStyles', function () {
		const noStyleState = {
			...state,
			styles: {}
		};

		const noMatchStyleState = {
			...state,
			styles: {byKey: {'styleXXX': {}}}
		};

		const emptyStyleState = {
			...state,
			styles: {byKey: {'style1': {key: 'style1', data: {}}}}
		};

		const noSelectionState = {
			...state,
			selections: {}
		};

		it('should return selections with styles', () => {
			const result = {
				"selection1": {
					key: "selection1",
					data: {
						styleKey: "style1",
						style: {
							"fill": "#aab5ff"
						}
					}
				}
			};
			assert.deepEqual(Select.selections.getAllAsObjectWithStyles(state), result);
		});

		it('should return original selections', () => {
			const result = {...state.selections.byKey};
			assert.deepEqual(Select.selections.getAllAsObjectWithStyles(noStyleState), result);
			assert.deepEqual(Select.selections.getAllAsObjectWithStyles(noMatchStyleState), result);
			assert.deepEqual(Select.selections.getAllAsObjectWithStyles(emptyStyleState), result);
		});

		it('should return empty object', () => {
			assert.deepEqual(Select.selections.getAllAsObjectWithStyles(noSelectionState), {});
		});
	});
});
