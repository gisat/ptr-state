import _ from 'lodash';
import createCachedSelector from "re-reselect";
import commonSelectors from '../_common/selectors';
import {CacheFifo} from '@gisatcz/ptr-utils';

let mergeFeaturesWithAttributesCache = new CacheFifo(20);

const getMergedFilterFromLayerStateAndActiveMetadataKeys = createCachedSelector(
	[
		(layer) => layer,
		(layer, activeMetadataKeys) => activeMetadataKeys,
		(layer, activeMetadataKeys, modifiersPath) => modifiersPath
	],
	(layer, activeMetadataKeys, modifiersPath) => {
		let filter = {...layer[modifiersPath]};
		if (layer.layerTemplateKey) {
			filter.layerTemplateKey = layer.layerTemplateKey;
		}
		if (layer.areaTreeLevelKey) {
			filter.areaTreeLevelKey = layer.areaTreeLevelKey;
		}

		//todo fail on conflict between metadataModifiers & filterByActive ?
		//todo special filterByActive for attribute data

		let activeFilter = {};
		if (layer.filterByActive) {
			let active = layer.filterByActive;
			if (active.attribute && activeMetadataKeys.activeAttributeKey) {
				activeFilter.attributeKey = activeMetadataKeys.activeAttributeKey;
			}
			if (active.case && activeMetadataKeys.activeCaseKey) {
				activeFilter.caseKey = activeMetadataKeys.activeCaseKey;
			}
			if (active.layerTemplate && activeMetadataKeys.activeLayerTemplateKey) {
				activeFilter.layerTemplateKey = activeMetadataKeys.activeLayerTemplateKey;
			}
			if (active.areaTreeLevelKey && activeMetadataKeys.areaTreeLevelKey) {
				activeFilter.areaTreeLevelKey = activeMetadataKeys.areaTreeLevelKey;
			}
			// TODO what if multiple periods
			if (active.period && activeMetadataKeys.activePeriodKey) {
				activeFilter.periodKey = activeMetadataKeys.activePeriodKey;
			}
			// TODO what if multiple places
			if (active.place && activeMetadataKeys.activePlaceKey) {
				activeFilter.placeKey = activeMetadataKeys.activePlaceKey;
			}
			if (active.scenario && activeMetadataKeys.activeScenarioKey) {
				activeFilter.scenarioKey = activeMetadataKeys.activeScenarioKey;
			}
			if (active.scope && activeMetadataKeys.activeScopeKey) {
				activeFilter.scopeKey = activeMetadataKeys.activeScopeKey;
			}
		}

		return {...filter, ...activeFilter}
	}
)((layer, activeMetadataKeys) => `${layer}_${activeMetadataKeys}`);

const getBackgroundLayersWithFilter = createCachedSelector(
	[
		commonSelectors.getAllActiveKeys,
		(state, layerState) => layerState,
		(state, layerState, layerKey) => layerKey
	],
	(activeMetadataKeys, layerState, layerKey) => {
		layerState = JSON.parse(layerState);

		return [{
			key: layerKey,
			filter: getMergedFilterFromLayerStateAndActiveMetadataKeys(layerState, activeMetadataKeys, 'metadataModifiers')
		}]
	}
)((state, layerState, layerKey) => (`${layerState}:${layerKey}`));




const getLayersWithFilter = createCachedSelector(
	[
		commonSelectors.getAllActiveKeys,
		(state, layersState) => layersState
	],
	(activeMetadataKeys, layersState) => {
		layersState = JSON.parse(layersState);
		if (layersState && layersState.length) {
			return _.map(layersState, (layer) => {
				return {
					key: layer.key,
					filter: getMergedFilterFromLayerStateAndActiveMetadataKeys(layer, activeMetadataKeys, 'metadataModifiers'),
					attributeFilter: getMergedFilterFromLayerStateAndActiveMetadataKeys(layer, activeMetadataKeys, 'attributeMetadataModifiers')
				}
			});
		} else {
			return null;
		}
	}
)((state, layersState) => layersState);

/**
 * Create layer deffinition on the base of mandatory parameters.
 * Returns object that is input for Layer from @gisatcz/ptr-maps.
 * @param {string} layerKey 
 * @param {Object} dataSource 
 * @param {?string} fidColumnName Requided for vector layers
 * @param {Number} index Layer order in dataSources
 * @param {Object} layerState 
 * @param {?Object} style 
 * @param {Array} attributeDataSources 
 * @param {Object} selections 
 * @param {Object} layerTemplate 
 * @param {Object} period 
 */
const prepareLayerByDataSourceType = (layerKey, dataSource, fidColumnName, index, layerState, style, attributeDataSources, selections, layerTemplate, period) => {
	const layerOptions = layerState && layerState.options;
	let dataSourceData = dataSource.data;

	let {attribution, nameInternal, type, tableName, layerName, features, selected, ...options} = dataSourceData;

	// TODO data source strucutre
	if (type === 'wmts') {
		options.url = options.urls[0];
	} else if (type === 'wms') {
		const {url, params, configuration, ...rest} = options;
		const singleTile = configuration && configuration.hasOwnProperty('singleTile') ? configuration.singleTile : false;

		options = {
			params: {
				...params,
				layers: rest.layers,
				styles: rest.styles,
			},
			singleTile,
			url
		}
	} else if (type === 'vector' && features) {
		if (attributeDataSources) {
			features = mergeFeaturesWithAttributes(layerKey, features, attributeDataSources, fidColumnName);
		}

		if (selections && layerOptions?.selected) {
			selected = prepareSelection(selections, layerOptions.selected);
		}
		
		
		options = {
			...layerOptions,
			features,
			selected,
			fidColumnName
		};

		// TODO type=geoserver
		if (style && style.data && style.data.source === 'definition') {
			options.style = style.data.definition;
		}
	}

	if(period) {
		options.period = period;
	}

	return {
		key: layerKey + '_' + index,
		name: layerState.name || layerTemplate?.data?.nameDisplay,
		description: layerTemplate?.data?.description,
		layerKey: layerKey,
		opacity: (layerState && layerState.opacity) || 1,
		type,
		options
	};
};

function prepareSelection(selections, layerSelections) {
	let populatedSelections = {};
	_.forIn(layerSelections, (value, key) => {
		let selectionData = selections?.[key].data;

		if (selectionData) {
			const style = selectionData.style;
			// TODO hovered style
			const color = selectionData.color;
			const hoveredColor = selectionData.hoveredColor;

			if (selectionData.featureKeysFilter) {
				populatedSelections[key] = {keys: selectionData.featureKeysFilter.keys};
				if (style) {
					populatedSelections[key].style = style;
					populatedSelections[key].hoveredStyle = style;
				} else {
					populatedSelections[key].style = {
						outlineColor: color,
						outlineWidth: 2
					};
					populatedSelections[key].hoveredStyle = {
						outlineColor: hoveredColor,
						outlineWidth: 2
					}
				}
			}

			//TODO other selection types
		}
	});

	return populatedSelections;
}

function mergeFeaturesWithAttributes(layerKey, features, attributeDataSources, fidColumnName) {
	let cacheKey = JSON.stringify(layerKey);
	let cache = mergeFeaturesWithAttributesCache.findByKey(cacheKey);

	let finalFeaturesObject = {};
	if (cache && cache.features === features) {
		finalFeaturesObject = cache.finalFeaturesObject;
	} else {
		features.forEach((feature) => {
			let key = feature.properties[fidColumnName];
			finalFeaturesObject[key] = {...feature};
		});

	}

	attributeDataSources.forEach(attributeDataSource => {
		let featuresWithAttributes = attributeDataSource.dataSource.data.features;
		if (featuresWithAttributes) {
			featuresWithAttributes.forEach(featureWithAttributes => {
				let featureKey = featureWithAttributes.properties[fidColumnName];

				_.forIn(featureWithAttributes.properties, (value, key) => {
					finalFeaturesObject[featureKey].properties[key] = value;
				});
			});
		}
	});

	mergeFeaturesWithAttributesCache.addOrUpdate({
		cacheKey,
		features,
		finalFeaturesObject
	});


	return Object.values(finalFeaturesObject);
}

function getLayersStateWithoutFeatures(layersState) {
	let withoutFeatures = [];
	_.each(layersState, layerState => {
		if (layerState?.options?.features) {
			withoutFeatures.push({
				...layerState,
				options: {
					...layerState.options,
					features: null
				}
			});
		} else {
			withoutFeatures.push(layerState);
		}
	});

	return withoutFeatures;
}

export default {
	getBackgroundLayersWithFilter,
	getLayersWithFilter,
	getLayersStateWithoutFeatures,
	prepareLayerByDataSourceType,
	prepareSelection
}
