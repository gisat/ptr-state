import {assert} from 'chai';
import actions from '../../../../../src/state/Data/AttributeData/actions';
import getStoreSet from '../../../_common/helpers/store';

describe('state/Data/AttributeData/actions', function () {
	it('removeSpatialIndex', function () {
		const filter = {appKey: 'testKey'};
		const order = null;

		const action = actions.removeSpatialIndex(filter, order);
		assert.deepEqual(action, {
			type: 'DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.REMOVE',
			filter,
			order,
		});
	});

	it('updateStore', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);

		const storeData = {indexes: [], byKey: 'key'};
		dispatch(actions.updateStore(storeData));
		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.ATTRIBUTE_DATA.UPDATE_STORE',
					data: storeData,
				},
			]);
		});
	});
});
