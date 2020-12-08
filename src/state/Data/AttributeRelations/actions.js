import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_RELATIONS;

// ============ creators ===========
function receiveIndexed(attributeRelations, filter, order, start, total, changes) {
    return dispatch => {
        // add attributeRelations to store
        if (attributeRelations.length) {
            dispatch(common.add(actionTypes)(attributeRelations, filter));
        }

        // add to index
        dispatch(common.actionAddIndex(actionTypes, filter, order, total, start, attributeRelations, changes));
    }
}


// ============ actions ============
// ============ export ===========

export default {
    receiveIndexed,
}
