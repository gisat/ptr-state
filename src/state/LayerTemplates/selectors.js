import common from "../_common/selectors";
import createCachedSelector from "re-reselect";

const getSubstate = state => state.layerTemplates;

const getActiveKey = common.getActiveKey(getSubstate);
const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);
const getByKey = common.getByKey(getSubstate);
const getDataByKey = common.getDataByKey(getSubstate);
const getDeletePermissionByKey = common.getDeletePermissionByKey(getSubstate);
const getEditedDataByKey = common.getEditedDataByKey(getSubstate);
const getUpdatePermissionByKey = common.getUpdatePermissionByKey(getSubstate);

const getFilteredTemplatesGroupedByLayerKey = createCachedSelector(
	[
		getAllAsObject,
		(state, layersState) => layersState
	],
	(layerTemplates, layersState) => {
		if (layerTemplates && !_.isEmpty(layerTemplates) && layersState) {
			let layerTemplatesByLayerKey = {};
			layersState.forEach(layer => {
				if (layer.filter.layerTemplateKey) {
					layerTemplatesByLayerKey[layer.key] = layerTemplates[layer.filter.layerTemplateKey];
				}
			});

			return layerTemplatesByLayerKey;
		} else {
			return null;
		}
	}
)((state, layersState) => layersState.map(l => l.filter && l.filter.layerTemplateKey).join(','));

const getFilteredTemplatesGroupedByLayerTemplateKey = createCachedSelector(
	[
		getAllAsObject,
		(state, layersState) => layersState
	],
	(layerTemplates, layersState) => {
		if (layerTemplates && !_.isEmpty(layerTemplates) && layersState) {
			let layerTemplatesByLayerKey = {};
			layersState.forEach(layer => {
				if (layer.filter.layerTemplateKey) {
					layerTemplatesByLayerKey[layer.filter.layerTemplateKey] = layerTemplates[layer.filter.layerTemplateKey];
				}
			});

			return layerTemplatesByLayerKey;
		} else {
			return null;
		}
	}
)((state, layersState) => layersState.map(l => l.filter && l.filter.layerTemplateKey).join(','));

export default {
	getActiveKey,
	getAll,
	getAllAsObject,

	getByKey,

	getDataByKey,
	getDeletePermissionByKey,

	getEditedDataByKey,
	
	getIndexed: common.getIndexed(getSubstate),

	getUpdatePermissionByKey,
	getFilteredTemplatesGroupedByLayerKey,
	getFilteredTemplatesGroupedByLayerTemplateKey,
	getSubstate
};