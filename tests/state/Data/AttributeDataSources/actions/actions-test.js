import {assert} from 'chai';
import actions from '../../../../../src/state/Data/attributeDataSources/actions';
import getStoreSet from '../../../_common/helpers/store';
describe('state/Data/AttributeDataSources/actions', function () {
	it('add', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);

		const filter = {appKey: 'testKey'};
		const data = [{11: 'Prague'}];
		dispatch(actions.add(data, filter));
		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.ATTRIBUTE_DATA_SOURCES.ADD',
					filter,
					data,
				},
			]);
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
					type: 'DATA.ATTRIBUTE_DATA_SOURCES.UPDATE_STORE',
					data: storeData,
				},
			]);
		});
	});
});
