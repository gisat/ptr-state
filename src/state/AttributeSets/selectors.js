import common from '../_common/selectors';

const getSubstate = state => state.attributeSets;

const getAll = common.getAll(getSubstate);
const getActiveKeys = common.getActiveKeys(getSubstate);
const getActive = common.getActive(getSubstate);
const getStateToSave = common.getStateToSave(getSubstate);

export default {
	getActive,
	getActiveKeys,
	getAll,

	getStateToSave,
	getSubstate,
};
