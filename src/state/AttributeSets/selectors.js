import common from '../_common/selectors';

const getSubstate = state => state.attributeSets;

const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);
const getActiveKey = common.getActiveKeys(getSubstate);
const getActiveKeys = common.getActiveKeys(getSubstate);
const getActiveModels = common.getActiveModels(getSubstate);
const getActive = common.getActive(getSubstate);

const getByKey = common.getByKey(getSubstate);
const getByKeys = common.getByKeys(getSubstate);
const getByKeysAsObject = common.getByKeysAsObject(getSubstate);
const getDataByKey = common.getDataByKey(getSubstate);

const getUsedKeysForComponent = common.getUsedKeysForComponent(getSubstate);
const getStateToSave = common.getStateToSave(getSubstate);

const haveAllKeysRegisteredUse = common.haveAllKeysRegisteredUse(getSubstate);

export default {
	getActive,
	getActiveKey,
	getActiveKeys,
	getActiveModels,
	getAll,
	getAllAsObject,

	getByKey,
	getByKeys,
	getByKeysAsObject,
	getDataByKey,

	getUsedKeysForComponent,

	getStateToSave,
	getSubstate,

	haveAllKeysRegisteredUse,
};
