import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';
import common from "../../_common/selectors";

const getSubstate = state => state.data.attributeDataSources;

const getIndex_recompute = common.getIndex_recompute(getSubstate);

const getByKeyObserver = createRecomputeObserver((state, key) => {
	return getSubstate(state)?.byKey?.[key] || null;
});


const getIndex = common.getIndex(getSubstate);

const getByKeys = createRecomputeSelector(keys => {
	return keys.map(key => getByKeyObserver(key));
});

const getFiltered = createRecomputeSelector(filter => {
	const index = getIndex_recompute(filter, null);
	if (index?.index) {
		let keys = Object.values(index.index);
		if (keys) {
			return getByKeys(keys);
		} else {
			return null;
		}
	} else {
		return null;
	}
});

export default {
	getFiltered,
	getIndex,
};