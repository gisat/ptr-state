import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_DATA_SOURCES;

// ============ creators ===========
function receiveIndexed(attributeDataSources, filter, order, start, total, changes) {
    return dispatch => {
        // add attributeDataSources to store
        if (attributeDataSources.length) {
            dispatch(common.add(actionTypes)(attributeDataSources, filter));
        }

        // add to index
        dispatch(common.actionAddIndex(actionTypes, filter, order, total, start, attributeDataSources, changes));
    }
}

// ============ actions ============

// ============ export ===========

export default {
	add: common.add(actionTypes),
    receiveIndexed,
}
