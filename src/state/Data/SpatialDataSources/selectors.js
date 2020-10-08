import _ from 'lodash';
import common from '../../_common/selectors';
import {makeParameterizedSelector} from '../../_common/utils';
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';

import SpatialRelationsSelectors from "../SpatialRelations/selectors";
import {makeSelector} from '@taskworld.com/rereselect';

const getSubstate = state => state.data.spatialDataSources;
const getAllAsObject = common.getAllAsObject(getSubstate);

const getAllAsObjectObserver = createRecomputeObserver(getAllAsObject);

const getByKey = makeParameterizedSelector('SpatialDataSources#getByKey', (key) => {
	console.log("SpatialDataSources/selectors#getByKey");
	return query => {
		return query(state => state.data.spatialDataSources.byKey?.[key]?.data);
	}
});

const getByKeyObserver = createRecomputeObserver((state, key) => {
	return getByKey(key)(state)
});

const getFiltered = createRecomputeSelector(filter => {
	console.log("SpatialDataSources/selectors#getFiltered");

	const dataSourceKeys = SpatialRelationsSelectors.getFilteredDataSourceKeys(filter);

	if (dataSourceKeys?.length) {
		const ds = getByKeyObserver(dataSourceKeys[0]);

		return ds ? [ds] : null;
	} else {
		return null;
	}
});

export default {
	getFiltered
};

