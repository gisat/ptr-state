import {createSelector} from 'reselect';
import common from '../_common/selectors';

const getSubstate = state => state.scopes;

const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);
const getActive = common.getActive(getSubstate);
const getActiveKey = common.getActiveKey(getSubstate);

const getByKey = common.getByKey(getSubstate);
const getByKeys = common.getByKeys(getSubstate);
const getByKeysAsObject = common.getByKeysAsObject(getSubstate);
const getByFilterOrder = common.getByFilterOrder(getSubstate);

const getDataByKey = common.getDataByKey(getSubstate);
const getEditedDataByKey = common.getEditedDataByKey(getSubstate);

const getDeletePermissionByKey = common.getDeletePermissionByKey(getSubstate);
const getUpdatePermissionByKey = common.getUpdatePermissionByKey(getSubstate);
const getUsedKeysForComponent = common.getUsedKeysForComponent(getSubstate);

const getIndexed = common.getIndexed(getSubstate);

const getStateToSave = common.getStateToSave(getSubstate);

const haveAllKeysRegisteredUse = common.haveAllKeysRegisteredUse(getSubstate);

const getActiveScopeConfiguration = createSelector([getActive], scope => {
	return scope && scope.data && scope.data.configuration
		? scope.data.configuration
		: null;
});

export default {
	getActive,
	getActiveKey,
	getActiveScopeConfiguration,
	getAll,
	getAllAsObject,

	getByFilterOrder,

	getByKey,
	getByKeys,
	getByKeysAsObject,
	getDataByKey,
	getDeletePermissionByKey,

	getEditedDataByKey,

	getIndexed,

	getStateToSave,
	getSubstate,

	getUpdatePermissionByKey,
	getUsedKeysForComponent,

	haveAllKeysRegisteredUse,
};
