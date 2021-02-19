import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';
import Select from '../../Select';
import commonHelpers from '../../_common/helpers';
import commonSelectors from '../../_common/selectors';

/**
 * Update whole data.components.components object with given components
 * @param components {Object}
 */
function updateComponentsStateFromView(components) {
	return dispatch => {
		if (components) {
			dispatch(actionUpdateComponents(components));
		}
	};
}

// Actions
const actionUpdateComponents = components => {
	return {
		type: ActionTypes.DATA.COMPONENTS.UPDATE_COMPONENTS,
		components,
	};
};

const ensure = ({
	areaTreeLevelKey,
	attributeKeys,
	attributeFilter,
	attributeOrder,
	componentKey,
	dataSourceKeys,
	featureKeys,
	layerTemplateKey,
	modifiers,
	spatialFilter,
}) => {
	return (dispatch, getState) => {
		console.log(
			'xxx2',
			areaTreeLevelKey,
			attributeKeys,
			attributeFilter,
			attributeOrder,
			componentKey,
			dataSourceKeys,
			featureKeys,
			layerTemplateKey,
			modifiers,
			spatialFilter
		);
	};
};

const use = componentKey => {
	return (dispatch, getState) => {
		const state = getState();
		const componentState = Select.data.components.getComponentStateByKey(
			state,
			componentKey
		);
		const {
			areaTreeLevelKey,
			attributeKeys,
			attributeFilter,
			attributeOrder,
			dataSourceKeys,
			featureKeys,
			filterByActive,
			layerTemplateKey,
			metadataModifiers,
			spatialFilter,
		} = componentState;

		// modifiers defined by key
		const metadataDefinedByKey = metadataModifiers
			? {...metadataModifiers}
			: {};

		if (layerTemplateKey) {
			metadataDefinedByKey[layerTemplateKey] = layerTemplateKey;
		} else if (areaTreeLevelKey) {
			metadataDefinedByKey[areaTreeLevelKey] = areaTreeLevelKey;
		}

		// Get actual metadata keys defined by filterByActive
		const activeMetadataKeys = filterByActive
			? commonSelectors.getActiveKeysByFilterByActive(state, filterByActive)
			: null;

		// Merge metadata, metadata defined by key have priority
		const mergedMetadataKeys = commonHelpers.mergeMetadataKeys(
			metadataDefinedByKey,
			activeMetadataKeys
		);

		// Decouple modifiers from templates
		const {
			areaTreeLevelKey: modifiedAreaTreeLevelKey,
			layerTemplateKey: modifiedLayerTemplateKey,
			applicationKey,
			...modifiers
		} = mergedMetadataKeys;

		// It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}
		const modifiersForRequest = commonHelpers.convertModifiersToRequestFriendlyFormat(
			modifiers
		);

		// TODO register use?
		dispatch(
			ensure({
				areaTreeLevelKey: modifiedAreaTreeLevelKey,
				attributeKeys,
				attributeFilter,
				attributeOrder,
				componentKey,
				dataSourceKeys,
				featureKeys,
				layerTemplateKey: modifiedLayerTemplateKey,
				modifiers: modifiersForRequest,
				spatialFilter,
			})
		);
	};
};
export default {
	updateComponentsStateFromView,
	use,
};
