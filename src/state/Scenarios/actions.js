import ActionTypes from '../../constants/ActionTypes';
import common from '../_common/actions';

// ============ creators ===========

const add = common.add(ActionTypes.SCENARIOS);
const updateStateFromView = common.updateSubstateFromView(
	ActionTypes.SCENARIOS
);

// ============ export ===========

export default {
	add,
	updateStateFromView,
};
