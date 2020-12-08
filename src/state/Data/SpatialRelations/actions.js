import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.SPATIAL_RELATIONS;

// ============ creators ===========
function receiveIndexed(spatialRelations, filter, order, start, total, changes) {
    return dispatch => {
        // add spatialRelations to store
        if (spatialRelations.length) {
            dispatch(common.add(actionTypes)(spatialRelations, filter));
        }

        // add to index
        dispatch(common.actionAddIndex(actionTypes, filter, order, total, start, spatialRelations, changes));
    }
}


// ============ actions ============
// ============ export ===========

export default {
    receiveIndexed,
}
