import _ from 'lodash';

import common from './_common/actions';
import Select from './Select';
import ActionTypes from '../constants/ActionTypes';

export const STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE = {
	areaRelations: [
		Select.areaRelations.getSubstate,
		'area',
		ActionTypes.AREA_RELATIONS,
		'relations',
	],
	areaTrees: [
		Select.areas.areaTrees.getSubstate,
		'areaTrees',
		ActionTypes.AREAS.AREA_TREES,
	],
	areaTreeLevels: [
		Select.areas.areaTrees.getSubstate,
		'areaTreeLevels',
		ActionTypes.AREAS.AREA_TREE_LEVELS,
	],
	attributes: [
		Select.attributes.getSubstate,
		'attributes',
		ActionTypes.ATTRIBUTES,
	],
	// TODO attribute sets
	cases: [Select.cases.getSubstate, 'cases', ActionTypes.CASES],
	layerTemplates: [
		Select.layerTemplates.getSubstate,
		'layerTemplates',
		ActionTypes.LAYER_TEMPLATES,
	],
	periods: [Select.periods.getSubstate, 'periods', ActionTypes.PERIODS],
	places: [Select.places.getSubstate, 'places', ActionTypes.PLACES],
	// TODO scenarios
	scopes: [Select.scopes.getSubstate, 'scopes', ActionTypes.SCOPES],
	tags: [Select.tags.getSubstate, 'tags', ActionTypes.TAGS],
	views: [Select.views.getSubstate, 'views', ActionTypes.VIEWS, 'views'],
};

/**
 * Ensure indexes with filter by active for each store from the list (above)
 *
 * @param filterKey {string} active metadata type key (e.g. scope, place, ..)
 */
export function ensureDependenciesOfActiveMetadataType(filterKey) {
	return dispatch => {
		let filterByActive = {
			[filterKey]: true,
		};

		_.forIn(STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE, params => {
			dispatch(
				common.ensureIndexesWithFilterByActive(...params)(filterByActive)
			);
		});

		// TODO data-based stores
	};
}
