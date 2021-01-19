import createCachedSelector from "re-reselect";
import _ from "lodash";

/**
 * TODO tests
 * Returns all indexes that fits filter and order
 * @param {*} indexes 
 * @param {*} filter 
 * @param {*} order 
 */
const getIndex = createCachedSelector([
		(indexes) => indexes,
		(indexes, filter) => filter,
		(indexes, filter, order) => order,
	],
	(indexes, filter, order) => {
		if (indexes){
			const index = _.find(indexes, (index) => isCorrespondingIndex(index, filter, order));
			return index ? index : null;
		} else {
			return null;
		}
	}
)((indexes, filter, order) => {
	return `${JSON.stringify(filter)}${JSON.stringify(order)}`
})


// TODO Test
function getUniqueIndexes(indexes) {
	if(!_.isEmpty(indexes)) {
		return indexes.reduce((uniqueIndexes, index) => {
			if (_.find(uniqueIndexes, (i) => i && isCorrespondingIndex(index, i.filter, i.order))) {
				return uniqueIndexes;
			}
	
			return [...uniqueIndexes, index];
		}, []);
	} else {
		return null;
	}
}

/**
 * @param state {Object}
 * @param filter {Object}
 * @param order {Array}
 * @param indexesData {Array}
 * @param changedOn {string}
 */
function getUpdatedIndexes(state, filter, order, indexesData, changedOn) {
	let indexes = [];
	let selectedIndex = {};

	if (state.indexes){
		state.indexes.forEach(index => {
			if (_.isEqual(index.filter, filter) && _.isEqual(index.order, order)){
				selectedIndex = index;
			} else {
				indexes.push(index);
			}
		});
	}

	let index;
	if (indexesData.length){
		index = {...selectedIndex.index};
		indexesData.forEach((model, i) => {
			if(model.key) {
				index[i] = model.key;
			} else {
				//spatial data by spatialDataSourceKey, levels and tiles
				//update spatialDataSourceKey
				for(const [level, dataByTiles] of Object.entries(model)) {
					if(index.hasOwnProperty(level) && index[level]) {
						//update data on level
						index[level] =  {...index[level], ...dataByTiles}
					} else {
						index[level] =  {...dataByTiles}
					}
				}
			}

		});
	}

	selectedIndex = {
		filter: selectedIndex.filter || filter,
		order: selectedIndex.order || order,
		changedOn: changedOn,
		index: index || selectedIndex.index
	};
	indexes.push(selectedIndex);

	return indexes;
}

function isCorrespondingIndex(index, filter, order) {
	return _.isEqual(index.filter, filter) && _.isEqual(index.order, order);
}

function itemFitFilter(filter, item) {
	// null filter fit 
	if(filter === null) {
		return true;
	}

	const entries = Object.entries(filter);

	return entries.every(([key, value]) => {
			const itemHasFilterKey = item.data && item.data.hasOwnProperty(key);
			const itemHasFilterLinkKey = item.data && item.data.hasOwnProperty(`${key}Key`) ;
			if(itemHasFilterKey) {
				//apply condition
				//"column0": "hleda se rovnost",
				//"column1": null,
				if(item.data && item.data[key] === value) {
					return true;
				}

				// "column2": {
				// 	"like": "hleda se podobnost, castecny vyskyt"
				// },
				if(_.isObject(value) && value['like']) {
					//now we dont deal like filter, refrest indexes
					return true;
				}

				// "column3": {
				// 	"in": ["existuje", "v", "poli", "prvku"]
				// },
				if(_.isObject(value) && value['in']) {
					return value.in.includes(item.data[key]);
				}

				// "column4": {
				// 	"notin": ["neexistuje", "v", "poli", "prvku"]
				// }
				if(_.isObject(value) && value['notin']) {
					return !value.notin.includes(item.data[key]);
				}
			}

			//check if filter contains linking like scopeKey, viewKey, ...
			if(itemHasFilterLinkKey) {
				if(item.data && item.data[`${key}Key`] === value) {
					return true;
				}
			}

			//if to filter fit return false
			return false;
	})
}

function mergeFilters(activeKeys, filterByActive, filter) {
	if (activeKeys && filterByActive) {
		let fullFilter = {...filter};
		if (filterByActive.application){
			if (activeKeys.activeApplicationKey){
				fullFilter.applicationKey = activeKeys.activeApplicationKey;
			}
		}
		if (filterByActive.case){
			if (activeKeys.activeCaseKey){
				fullFilter.caseKey = activeKeys.activeCaseKey;
			}
		}
		if (filterByActive.scope){
			if (activeKeys.activeScopeKey){
				fullFilter.scopeKey = activeKeys.activeScopeKey;
			}
		}
		// TODO add scenario, ...
		if (filterByActive.place){
			if (activeKeys.activePlaceKey){
				fullFilter.placeKey = activeKeys.activePlaceKey;
			} else if (activeKeys.activePlaceKeys){
				fullFilter.placeKey = {in: activeKeys.activePlaceKeys};
			}
		}
		if (filterByActive.period){
			if (activeKeys.activePeriodKey){
				fullFilter.periodKey = activeKeys.activePeriodKey;
			} else if (activeKeys.activePeriodKeys){
				fullFilter.periodKey = {in: activeKeys.activePeriodKeys};
			}
		}
		if (filterByActive.attribute){
			if (activeKeys.activeAttributeKey){
				fullFilter.attributeKey = activeKeys.activeAttributeKey;
			}
		}
		if (filterByActive.layerTemplate){
			if (activeKeys.activeLayerTemplateKey){
				fullFilter.layerTemplateKey = activeKeys.activeLayerTemplateKey;
			}
		}
		return _.isEmpty(fullFilter) ? null : fullFilter;
	} else {
		return filter;
	}
}

/**
 * Merge metadata defined by key with metadata keys defined by filterByActive
 * @param definedKeys {Object}
 * @param activeKeys {Object}
 * @return {Object|null}
 */
function mergeMetadataKeys(definedKeys, activeKeys) {
    if (definedKeys && activeKeys) {
        return {...activeKeys, ...definedKeys}
    } else {
        return definedKeys || activeKeys || null;
    }
}

/**
 * It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}
 * @param modifiers {Object}
 * @return {Object|null}
 */
function convertModifiersToRequestFriendlyFormat(modifiers) {
    if (modifiers) {
        let modifiersForRequest = {};
        if (modifiers.scopeKey) {
            modifiersForRequest.scopeKey = modifiers.scopeKey;
        }
        
        if (modifiers.placeKeys) {
            modifiersForRequest.placeKey = {in: modifiers.placeKeys};
        } else if (modifiers.placeKey) {
            modifiersForRequest.placeKey = modifiers.placeKey;
        }

        if (modifiers.caseKeys) {
            modifiersForRequest.caseKey = {in: modifiers.caseKeys};
        } else if (modifiers.caseKey) {
            modifiersForRequest.caseKey = modifiers.caseKey;
        }

        if (modifiers.scenarioKeys) {
            modifiersForRequest.scenarioKey = {in: modifiers.scenarioKeys};
        } else if (modifiers.scenarioKey) {
            modifiersForRequest.scenarioKey = modifiers.scenarioKey;
        }

        if (modifiers.periodKeys) {
            modifiersForRequest.periodKey = {in: modifiers.periodKeys};
        } else if (modifiers.periodKey) {
            modifiersForRequest.periodKey = modifiers.periodKey;
        }

        return !_.isEmpty(modifiersForRequest) ? modifiersForRequest : null;
    } else {
        return null;
    }
}

export default {
    convertModifiersToRequestFriendlyFormat,
	getIndex,
	getUniqueIndexes,
	getUpdatedIndexes,
	mergeFilters,
    mergeMetadataKeys,
	isCorrespondingIndex,
	itemFitFilter,
}