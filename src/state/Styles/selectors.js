import _ from 'lodash';

import common from "../_common/selectors";
import createCachedSelector from "re-reselect";
import {createObserver as createRecomputeObserver, createSelector as createRecomputeSelector} from '@jvitela/recompute';

const getSubstate = state => state.styles;

const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);
const getByKey = common.getByKey(getSubstate);

const getByKeyObserver = createRecomputeObserver(getByKey);

const getDefinitionByKey = createRecomputeSelector((key) => {
	const style = getByKeyObserver(key);
	return style?.data?.definition || null;
});

const getGroupedByLayerKey = createCachedSelector(
	[
		getAllAsObject,
		(state, layersState) => layersState
	],
	(styles, layersState) => {
		if (styles && !_.isEmpty(styles) && layersState) {
			let stylesByLayerKey = {};
			layersState.forEach(layer => {
				if (layer.styleKey) {
					stylesByLayerKey[layer.key] = styles[layer.styleKey];
				}
			});

			return stylesByLayerKey;
		} else {
			return null;
		}
	}
)((state, layerState, layersStateAsString) => layersStateAsString);

export default {
	getAll,
	getAllAsObject,
	getByKey,
	getDefinitionByKey,
	getIndexed: common.getIndexed(getSubstate),

	getGroupedByLayerKey,
	getSubstate
};