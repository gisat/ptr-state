import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';

const INITIAL_STATE = {
    ...DEFAULT_INITIAL_STATE,
    byDataSourceKey: {},
};

const getEmptyFeature = () => {
    return {
        geometries: {}
    }
}

/**
 * Add spatial data
 * @param state {Object}
 * @param action {Object}
 * @param action.key {String} Data source key
 * @param action.level {number} Zoom level
 * @param action.data {Object} Features as object
 * @return {Object}
 */
// TODO what about features adding without level?
const add = (state, action) => {
    const level = action.level;
    const key = action.key;
	const featuresAsObject = action.data;
	const dataFeaturesKeys = Object.keys(featuresAsObject);

    let stateDataByDataSourceKey = state.byDataSourceKey[action.key] || {};

    dataFeaturesKeys.forEach((featureKey) => {
        if (stateDataByDataSourceKey.hasOwnProperty(featureKey)) {
            //add just level geometry to existing feature
            stateDataByDataSourceKey[featureKey].geometries[level] = featuresAsObject[featureKey]
        } else {
            //create new feature with geometry and add to state
            const newFeature = getEmptyFeature();
            newFeature.geometries[level] = featuresAsObject[featureKey]
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
