import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';
import {stateManagement} from '@gisatcz/ptr-utils';
import _ from 'lodash';
import commonHelpers from '../../_common/helpers';
const INITIAL_STATE = {
    ...DEFAULT_INITIAL_STATE,
    byDataSourceKey: {},
};

const getEmptyFeature = () => {
    return {
        geometries: {}
    }
}

const add = (state, action) => {
    const level = action.level;
    const key = action.key;
    let stateDataByDataSourceKey = state.byDataSourceKey[action.key] || {};
    const dataFeatures = action.data;
    const dataFeaturesKeys = Object.keys(dataFeatures);
    dataFeaturesKeys.forEach((featureKey) => {
        if (stateDataByDataSourceKey.hasOwnProperty(featureKey)) {
            //add just level geometry to existing feature
            stateDataByDataSourceKey[featureKey].geometries[level] = dataFeatures[featureKey]
        } else {
            //create new feature with geometry and add to state
            const newFeature = getEmptyFeature();
            newFeature.geometries[level] = dataFeatures[featureKey]
            stateDataByDataSourceKey = {...stateDataByDataSourceKey, [featureKey]: {...newFeature}};
        }
    })


    return {...state, byDataSourceKey: {...state.byDataSourceKey, [key]: {...stateDataByDataSourceKey}}}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.DATA.SPATIAL_DATA.ADD:
			return add(state, action);
		case ActionTypes.DATA.SPATIAL_DATA.INDEX.ADD:
            return common.addIndex(state, action)
        default:
            return state;
    }
}
