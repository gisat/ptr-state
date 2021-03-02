import ActionTypes from '../../constants/ActionTypes';
import common from '../_common/actions';

// ============ creators ===========

const add = common.add(ActionTypes.SCENARIOS);
const setActiveKey = common.setActiveKey(ActionTypes.SCENARIOS);
const setActiveKeys = common.setActiveKeys(ActionTypes.SCENARIOS);
const updateStateFromView = common.updateSubstateFromView(
	ActionTypes.SCENARIOS
);

const setActiveKeyAndEnsureDependencies = key => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKey(key));
		dispatch(options.ensureDependenciesOfActiveMetadataType('scenario'));
	};
};

const setActiveKeysAndEnsureDependencies = keys => {
	return (dispatch, getState, options) => {
		dispatch(setActiveKeys(keys));
		dispatch(options.ensureDependenciesOfActiveMetadataType('scenario'));
	};
};

// ============ export ===========

export default {
	add,
	setActiveKey: setActiveKeyAndEnsureDependencies,
	setActiveKeys: setActiveKeysAndEnsureDependencies,
	updateStateFromView,
};
