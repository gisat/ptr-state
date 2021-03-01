import _ from 'lodash';
import common from '../_common/actions';
import {STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE} from './constants';

/**
 * Ensure indexes with filter by active for each store from the list (above)
 *
 * @param filterKey {string} active metadata type key (e.g. scope, place, ..)
 */
function ensureDependenciesOfActiveMetadataType(filterKey) {
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

export default {
	ensureDependenciesOfActiveMetadataType,
};
