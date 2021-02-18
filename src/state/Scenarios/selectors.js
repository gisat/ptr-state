import common from "../_common/selectors";

const getSubstate = state => state.scenarios;

const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);
const getActiveKey = common.getActiveKey(getSubstate);
const getActiveKeys = common.getActiveKeys(getSubstate);
const getActive = common.getActive(getSubstate);
const getActiveScenarios = common.getActiveModels(getSubstate);

const getByKey = common.getByKey(getSubstate);

const getEditedAll = common.getEditedAll(getSubstate);
const getEditedAllAsObject = common.getEditedAllAsObject(getSubstate);
const getEditedByKey = common.getEditedByKey(getSubstate);

const getEditedKeys = common.getEditedKeys(getSubstate);

export default {
	getActive,
	getActiveKey,
	getActiveKeys,
	getActiveScenarios,
	getAll,
	getAllAsObject,
	getByKey,
	getEditedAll,
	getEditedAllAsObject,
	getEditedByKey,
	getEditedKeys,

	getSubstate,
}