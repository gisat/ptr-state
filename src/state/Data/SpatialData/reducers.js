import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';
import _ from 'lodash';
import {commonHelpers} from '../../../index';

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

const add = (state, action) => {
    const dataSourceKey = action.key;
	const updatedDataForDataSourceKey = getUpdatedDataForDataSourceKey(state, dataSourceKey, action.data, action.level);

    return {...state, byDataSourceKey: {...state.byDataSourceKey, [dataSourceKey]: updatedDataForDataSourceKey}}
}

const addWithIndex = (state, action) => {
	const dataSourceKey = action.dataSourceKey;

	const updatedDataForDataSourceKey = getUpdatedDataForDataSourceKey(state, dataSourceKey, action.data, action.level);
	const updatedIndexes = commonHelpers.getUpdatedIndexes(state, action.spatialFilter, action.order, action.indexData, action.changedOn);

	return {
		...state,
		byDataSourceKey: {
			...state.byDataSourceKey,
			[dataSourceKey]: updatedDataForDataSourceKey
		},
		indexes: updatedIndexes
	}
}

const addIndex = (state, action) => {
	const updatedIndexes = commonHelpers.getUpdatedIndexes(state, action.spatialFilter, action.order, action.indexData, action.changedOn);

	return {
		...state,
		indexes: updatedIndexes
	}
}

// helpers

/**
 * @param state {Object}
 * @param dataSourceKey {string} uuid
 * @param featuresAsObject {Object}
 * @param level {number}
 * @return {Object}
 */
function getUpdatedDataForDataSourceKey(state, dataSourceKey, featuresAsObject, level) {
	// TODO what about features adding without level?
	const dataFeaturesKeys = Object.keys(featuresAsObject);
	let updatedData = state.byDataSourceKey[dataSourceKey] ? {...state.byDataSourceKey[dataSourceKey]} : {};

	dataFeaturesKeys.forEach((featureKey) => {
		if (updatedData.hasOwnProperty(featureKey)) {
			//add just level geometry to existing feature
			updatedData[featureKey].geometries[level] = featuresAsObject[featureKey]
		} else {
			//create new feature with geometry and add to state
			const newFeature = getEmptyFeature();
			newFeature.geometries[level] = featuresAsObject[featureKey]
			updatedData = {...updatedData, [featureKey]: {...newFeature}};
		}
	});

	return updatedData;
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.DATA.SPATIAL_DATA.ADD:
			return add(state, action);
		case ActionTypes.DATA.SPATIAL_DATA.ADD_WITH_INDEX:
			return addWithIndex(state, action);
		case ActionTypes.DATA.SPATIAL_DATA.INDEX.ADD:
            return addIndex(state, action);
        default:
            return state;
    }
}
