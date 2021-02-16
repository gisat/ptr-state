import ActionTypes from '../../constants/ActionTypes';

import common from "../_common/actions";
import Select from "../Select";

// ============ creators ===========

const add = common.add(ActionTypes.STYLES);
const useIndexed = common.useIndexed(Select.styles.getSubstate, 'styles', ActionTypes.STYLES);
const useKeys = common.useKeys(Select.styles.getSubstate, 'styles', ActionTypes.STYLES);
const useKeysClear = common.useKeysClear(ActionTypes.STYLES);
const updateStateFromView = common.updateSubstateFromView(ActionTypes.STYLES);

// ============ export ===========

// TODO - common?
const updateStateFromViewWithData = (view) => {
    return (dispatch, getState) => {
        dispatch(updateStateFromView(view));
        if (view.data) {
            dispatch(add(view.data));
        }
    }
};

export default {
	add,
	useIndexed,
	useKeys,
	useKeysClear,
	updateStateFromView,
    updateStateFromViewWithData
}
