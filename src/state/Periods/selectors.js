import createCachedSelector from 're-reselect';
import _ from 'lodash';
import moment from "moment";

import common from "../_common/selectors";
import attributeRelationsSelectors from "../AttributeRelations/selectors";
import SpatialRelations from "../SpatialRelations/selectors";

const getSubstate = state => state.periods;

const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);
const getAllForActiveScope = common.getAllForActiveScope(getSubstate);
const getActive = common.getActive(getSubstate);
const getActiveKey = common.getActiveKey(getSubstate);
const getActiveKeys = common.getActiveKeys(getSubstate);
const getActiveModels = common.getActiveModels(getSubstate);

const getByKey = common.getByKey(getSubstate);
const getByKeys = common.getByKeys(getSubstate);

const getDataByKey = common.getDataByKey(getSubstate);
const getDeletePermissionByKey = common.getDeletePermissionByKey(getSubstate);

const getEditedDataByKey = common.getEditedDataByKey(getSubstate);
const getIndexed = common.getIndexed(getSubstate);
const getUpdatePermissionByKey = common.getUpdatePermissionByKey(getSubstate);

const getKeysByAttributeRelations = createCachedSelector(
	[attributeRelationsSelectors.getFilteredRelations],
	(filteredRelations) => {
		if (filteredRelations) {
			return _.map(filteredRelations, relation => relation.periodKey);
		} else {
			return null;
		}
	}
)((state, filter, cacheKey) => {
	return JSON.stringify(filter) + ':' + JSON.stringify(cacheKey)
});

/**
 * Both start and end time must be defined, otherwise all available periods are returned.
 */
const getByFullPeriodAsObject = createCachedSelector(
	[
		getAllAsObject,
		(state, start) => start,
		(state, start, end) => end
	],
	(periods, start, end) => {
		if (periods && start && end) {
			return _.pickBy(periods, (period) => {
				const periodStart = period.data && period.data.start;
				const periodEnd = period.data && period.data.end;

				if (periodStart && periodEnd) {
					return moment(periodStart).isBetween(start, end, null, '[]')
						&& moment(periodEnd).isBetween(start, end, null, '[]');
				} else if (periodStart) {
					return moment(periodStart).isBetween(start, end, null, '[]');
				} else if (periodEnd) {
					return moment(periodEnd).isBetween(start, end, null, '[]');
				} else {
					return true;
				}
			})
		} else {
			return periods;
		}
	}
)((state, start, end) => `${start}_${end}`);

const getFilteredGroupedByLayerTemplateKey = createCachedSelector(
	[
		getAllAsObject,
		SpatialRelations.getFilteredDataGroupedByLayerTemplateKey,
		(state, layersState) => layersState
	],
	(periods, spatialRelationsDataGroupedByLayerTemplateKey, layersState) => {
		if (periods && !_.isEmpty(periods) && spatialRelationsDataGroupedByLayerTemplateKey && !_.isEmpty(spatialRelationsDataGroupedByLayerTemplateKey) && layersState) {
			const periodsByLayerKey = {};
			for (const [layerTemplateKey, spatialRelations] of Object.entries(spatialRelationsDataGroupedByLayerTemplateKey)) {
				periodsByLayerKey[layerTemplateKey] = spatialRelations.map(spatialRelation => {
					if(periods[spatialRelation.data.periodKey]) {
						return periods[spatialRelation.data.periodKey];
					}
				})
				periodsByLayerKey[layerTemplateKey].filter(i => i); //filter empty
			}
			return periodsByLayerKey;
		} else {
			return null;
		}
	}
)((state, layersState) => layersState.map(l => l.filter && l.filter.layerTemplateKey).join(','));

const getFilteredGroupedByLayerKey = createCachedSelector(
	[
		getAllAsObject,
		SpatialRelations.getFilteredDataGroupedByLayerKey,
		(state, layersState) => layersState
	],
	(periods, spatialRelationsDataGroupedByLayerKey, layersState) => {
		if (periods && !_.isEmpty(periods) && spatialRelationsDataGroupedByLayerKey && !_.isEmpty(spatialRelationsDataGroupedByLayerKey) && layersState) {
			const periodsByLayerKey = {};
			for (const [layerKey, spatialRelations] of Object.entries(spatialRelationsDataGroupedByLayerKey)) {
				periodsByLayerKey[layerKey] = spatialRelations.map(spatialRelation => {
					if(periods[spatialRelation.periodKey]) {
						return periods[spatialRelation.periodKey];
					}
				})
				periodsByLayerKey[layerKey].filter(i => i); //filter empty
			}
			return periodsByLayerKey;
		} else {
			return null;
		}
	}
)((state, layersState) => layersState.map(l => l.key).join(','));

export default {
	getActive,
	getActiveKey,
	getActiveKeys,
	getActiveModels,
	getAll,
	getAllAsObject,
	getAllForActiveScope,

	getByKey,
	getByKeys,
	getByFullPeriodAsObject,

	getDataByKey,
	getDeletePermissionByKey,

	getEditedDataByKey,
	getFilteredGroupedByLayerTemplateKey,
	getFilteredGroupedByLayerKey,
	getIndexed,
	getKeysByAttributeRelations,
	getUpdatePermissionByKey,

	getSubstate,

	// TODO handle old selectors export
	getActivePeriod: getActive,
	getPeriods: getAll,
};