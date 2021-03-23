import common from '../_common/selectors';

const getSubstate = state => state.attributes;

const getAll = common.getAll(getSubstate);
const getActive = common.getActive(getSubstate);
const getActiveKey = common.getActiveKey(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);

const getByKey = common.getByKey(getSubstate);
const getByKeys = common.getByKeys(getSubstate);

const getDataByKey = common.getDataByKey(getSubstate);
const getDeletePermissionByKey = common.getDeletePermissionByKey(getSubstate);

const getEditedDataByKey = common.getEditedDataByKey(getSubstate);
const getUpdatePermissionByKey = common.getUpdatePermissionByKey(getSubstate);
const getUsedKeysForComponent = common.getUsedKeysForComponent(getSubstate);

const getStateToSave = common.getStateToSave(getSubstate);

const haveAllKeysRegisteredUse = common.haveAllKeysRegisteredUse(getSubstate);

export default {
	getAll,

	getActive,
	getActiveKey,

	getAllAsObject,

	getByKey,
	getByKeys,

	getDataByKey,
	getDeletePermissionByKey,

	getEditedDataByKey,
	getUpdatePermissionByKey,
	getUsedKeysForComponent,

	getStateToSave,
	getSubstate,

	haveAllKeysRegisteredUse,
};
