import common from '../_common/selectors';

const getSubstate = state => state.attributeSets;

const getAll = common.getAll(getSubstate);
const getActiveKey = common.getActiveKeys(getSubstate);
const getActiveKeys = common.getActiveKeys(getSubstate);
const getActive = common.getActive(getSubstate);

const getUsedKeysForComponent = common.getUsedKeysForComponent(getSubstate);
const getStateToSave = common.getStateToSave(getSubstate);

const haveAllKeysRegisteredUse = common.haveAllKeysRegisteredUse(getSubstate);

export default {
	getActive,
	getActiveKey,
	getActiveKeys,
	getAll,

	getUsedKeysForComponent,

	getStateToSave,
	getSubstate,

	haveAllKeysRegisteredUse,
};
