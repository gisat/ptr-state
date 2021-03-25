import {assert} from 'chai';
import actions from '../../../../../src/state/Data/Components/actions';
import getStoreSet from '../../../_common/helpers/store';

describe('state/Data/Components/actions/updateComponentsStateFromView', function () {
	it('Dispatch updateComponentsStateFromView action', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({});
		const dispatch = storeHelpers.getDispatch(getState);

		const components = {
			chart: {
				theme: 'red',
			},
		};

		dispatch(actions.updateComponentsStateFromView(components));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.COMPONENTS.UPDATE_COMPONENTS',
					components,
				},
			]);
		});
	});

	it('Dispatch nothing updateComponentsStateFromView action', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({});
		const dispatch = storeHelpers.getDispatch(getState);

		const components = undefined;

		dispatch(actions.updateComponentsStateFromView(components));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), []);
		});
	});
});
