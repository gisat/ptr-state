import {createSelector} from "reselect";
import createCachedSelector from "re-reselect";
import _ from "lodash";
import commonHelpers from './helpers';

const activeScopeKey = state => state.scopes.activeKey;

/**
 *
 * @param {*} getSubstate
 * @returns {Object}
 */
const getAllByKey = (getSubstate) => {
	return (state) => {
		return getSubstate(state).byKey;
	}
};

/**
 * 
 * @param {*} getSubstate 
 * @returns {Object}
 */
const getAllNotRemovedAsObject = (getSubstate) => {
	return createSelector(
		[getAllByKey(getSubstate)],
		byKey => {
			return _.pickBy(byKey, (item) => !item.hasOwnProperty('removed'));
		}
	);
};

const getAllAsObject = getAllNotRemovedAsObject;

/**
 * 
 * @param {*} getSubstate 
 * @returns {Array|null}
 */
const getAll = (getSubstate) => {
	return createSelector(
		[getAllAsObject(getSubstate)],
		byKey => {
			return byKey ? Object.values(byKey) : null;
		}
	);
};

function modelsFromIndex(models, index) {
	if (!index || !index.index) {
		return null;
	}

	const indexedModels = [];
	for (let i = 1; i <= index.count; i++){
		const modelKey = index.index[i];
		if (modelKey){
			const indexedModel = models[modelKey];
			if (indexedModel){
				indexedModels.push(indexedModel);
			} else {
				indexedModels.push({key: modelKey});
			}
		} else {
			indexedModels.push(null);
		}
	}

	return nonEmptyArray(indexedModels);
}

function modelsFromIndex2(models, index) {
	if (!index || !index.index) {
		return null;
	}

	const indexedModels = [];
	for (const [key, value] of Object.entries(index.index)) {
		if (value) {
			const indexedModel = models[value];
			if (indexedModel) {
				indexedModels.push(indexedModel);
			} else {
				indexedModels.push(null);
			}
		} else {
			indexedModels.push(null);
		}
	}

	return nonEmptyArray(indexedModels);
}

const getAllForActiveScope = (getSubstate) => {
	return createSelector(
		[getAllAsObject(getSubstate), getIndexes(getSubstate), activeScopeKey, (state, order) => order],
		(models, indexes, activeScopeKey, order) => {
			if (models && indexes && activeScopeKey) {
				const filter = {
					scopeKey: activeScopeKey
				};
				const index = commonHelpers.getIndex(indexes, filter, order);

				return modelsFromIndex(models, index);
			}

			return null;
		}
	);
};

const getActiveKey = (getSubstate) => {
	return (state) => getSubstate(state).activeKey
};

const getActiveKeys = (getSubstate) => {
	return (state) => getSubstate(state).activeKeys
};

const getActive = (getSubstate) => {
	return createSelector(
		[getAllAsObject(getSubstate), getActiveKey(getSubstate)],
		(models, activeKey) => {
			if (models && models[activeKey]){
				return models[activeKey];
			} else {
				return null;
			}
		}
	);
};

const getActiveModels = (getSubstate) => {
	return createSelector(
		[getAllAsObject(getSubstate), getActiveKeys(getSubstate)],
		(models, activeKeys) => {
			let activeModels = [];
			if (models && !_.isEmpty(models) && activeKeys && !_.isEmpty(activeKeys)){
				activeKeys.map(key => {
					let model = models[key];
					if (model){
						activeModels.push(model);
					}
				});
			}
			return nonEmptyArray(activeModels);
		}
	)
};

const getByFilterOrder = (getSubstate) => {
	return createSelector(
		[
			getAllAsObject(getSubstate),
			getIndexes(getSubstate),
			(state, filter) => filter,
			(state, filter, order) => order
		],
		(models, indexes, filter, order) => {
			if (models && indexes) {
				const index = commonHelpers.getIndex(indexes, filter, order);

				return modelsFromIndex(models, index);
			} else {
				return null;
			}
		}
	);
};

const getBatchByFilterOrder = (getSubstate) => {
	return createSelector(
		[
			getAllAsObject(getSubstate),
			getIndexes(getSubstate),
			(state, filter) => filter,
			(state, filter, order) => order
		],
		(models, indexes, filter, order) => {
			if (models && indexes) {
				const index = commonHelpers.getIndex(indexes, filter, order);
				return modelsFromIndex2(models, index);
			} else {
				return null;
			}
		}
	);
};

const getIndexed = (getSubstate) => { //todo proper memoization && unify with old getIndexedPage etc.
	return createCachedSelector(
		[
			getAllAsObject(getSubstate),
			getIndexes(getSubstate),
			getAllActiveKeys,
			(state, filterByActive) => filterByActive,
			(state, filterByActive, filter) => filter,
			(state, filterByActive, filter, order) => order,
			(state, filterByActive, filter, order, start) => start,
			(state, filterByActive, filter, order, start, length) => length,
		],
		(models, indexes, activeKeys, filterByActive, filter, order, start, length) => {
			if (models && indexes) {
				let mergedFilter = commonHelpers.mergeFilters(activeKeys, filterByActive, filter);
				let index = commonHelpers.getIndex(indexes, mergedFilter, order);
				if (index && index.index) {
					let indexedModels = [];
					let end = Math.min(start + length - 1, index.count);
					for (let i = start; i <= end; i++){
						let modelKey = index.index[i];
						if (modelKey){
							let indexedModel = models[modelKey];
							if (indexedModel){
								indexedModels.push(indexedModel);
							} else {
								indexedModels.push({key: modelKey});
							}
						} else {
							indexedModels.push(null);
						}
					}
					return indexedModels.length ? indexedModels : null;
				} else {
					return null;
				}
			} else {
				return null;
			}
		}
	)((state, filterByActive, filter, order, start, length) => {
		return `${JSON.stringify(filterByActive)}:${JSON.stringify(filter)}:${JSON.stringify(order)}:${start}:${length}`
	});
};

const getByKey = (getSubstate) => {
	return createCachedSelector(
		[
			getAllAsObject(getSubstate),
			(state, key) => key
		],
		(allData, key) => {
			if (key && allData && !_.isEmpty(allData) && allData[key]) {
				return allData[key];
			} else {
				return null;
			}
		}
	)((state, key) => key);
};

const getByKeysAsObject = (getSubstate) => {
	return createCachedSelector(
		[
			getAllAsObject(getSubstate),
			(state, keys) => keys,
		],
		(allData, keys) => {
			if (keys && keys.length && allData && !_.isEmpty(allData)) {
				let data = _.pick(allData, keys);
				return _.isEmpty(data) ? null : data;
			} else {
				return null;
			}
		}
	)(
		(state, keys) => `${keys}`
	);
};

// TODO test + use getByKeysAsObject?
const getByKeys = (getSubstate) => {
	return createCachedSelector(
		[
			getAllAsObject(getSubstate),
			(state, keys) => keys,
		],
		(allData, keys) => {
			if (keys && keys.length && allData && !_.isEmpty(allData)) {
				let data = [];
				_.each(keys, key => {
					if (allData[key]) {
						data.push(allData[key])
					}
				});

				return nonEmptyArray(data);
			} else {
				return null;
			}
		}
	)(
		(state, keys) => `${keys}`
	);
};

const getDataByKey = (getSubstate) => {
	return createSelector(
		[getByKey(getSubstate)],
		(model) => {
			if (model && model.data) {
				return model.data;
			} else {
				return null;
			}
		}
	);
};

const getDeletePermissionByKey = (getSubstate) => {
	return createSelector(
		[getByKey(getSubstate)],
		(model) => {
			if (model && model.permissions) {
				return (model.permissions.activeUser && model.permissions.activeUser.delete) || (model.permissions.guest && model.permissions.guest.delete);
			} else {
				return false;
			}
		}
	);
};

const getUpdatePermissionByKey = (getSubstate) => {
	return createSelector(
		[getByKey(getSubstate)],
		(model) => {
			if (model && model.permissions) {
				return (model.permissions.activeUser && model.permissions.activeUser.update) || (model.permissions.guest && model.permissions.guest.update);
			} else {
				return false;
			}
		}
	);
};

const getEditedAll = (getSubstate) => {
	return (state) => {
		let data = getSubstate(state).editedByKey;
		return data ? Object.values(data) : null;
	}
};

const getEditedAllAsObject = (getSubstate) => {
	return (state) => getSubstate(state).editedByKey;
};

const getEditedActive = (getSubstate) => {
	return createSelector(
		[getEditedAllAsObject(getSubstate), getActiveKey(getSubstate)],
		(models, activeKey) => {
			if (models && models[activeKey]){
				return models[activeKey];
			} else {
				return null;
			}
		}
	);
};

const getEditedByKey = (getSubstate) => {
	return (state, key) => {
		let allEditedData = getEditedAllAsObject(getSubstate)(state);
		if (key && allEditedData && !_.isEmpty(allEditedData) && allEditedData[key]) {
			return allEditedData[key];
		} else {
			return null;
		}
	}
};

const getEditedDataByKey = (getSubstate) => {
	return createSelector(
		[getEditedByKey(getSubstate)],
		(model) => {
			if (model && model.data) {
				return model.data;
			} else {
				return null;
			}
		}
	);
};

const getEditedKeys = (getSubstate) => {
	return createSelector(
		[getEditedAll(getSubstate)],
		(edited) => {
			if (edited && !_.isEmpty(edited)){
				return edited.map(model => model.key);
			}
			return null;
		}
	);
};

const getIndexes = (getSubstate) => {
	return (state) => getSubstate(state).indexes;
};

/**
 * Get whole index by given filter and order
 * @param getSubstate
 */
const getIndex = (getSubstate) => {
	return createSelector([
		getIndexes(getSubstate),
		(state, filter) => filter,
		(state, filter, order) => order],
		(indexes, filter, order) => {
			return commonHelpers.getIndex(indexes, filter, order);
		}
	);
};

const getIndexChangedOn = (getSubstate) => {
	return createSelector(
		[getIndex(getSubstate)],
		(index) => {
			if (index && index.changedOn){
				return index.changedOn;
			} else {
				return null;
			}
		}
	);
};

const getIndexPage = (getSubstate) => {
	return createSelector([
		getIndex(getSubstate),
		(state, filter, order, start) => (start),
		(state, filter, order, start, length) => (length)],
		(index, start, length) => {
			if (index && index.index){
				let indexed = {};
				for (let o = start; o < (start + length) && o <= index.count; o++){
					let key = index.index[o];
					indexed[o] = key ? key : null;
				}
				return indexed;
			} else {
				return null;
			}
		}
	);
};

/**
 * Get a page of data
 * call with (state, filter, order, start, length)
 */
const getIndexedPage = (getSubstate) => {
	return createSelector(
		[
			getIndexPage(getSubstate),
			getAllAsObject(getSubstate)
		],
		(page, models) => {
			return page && page.length && page.map(key => (models[key] || null)) || null; //todo check loading
		}
	);
};

/**
 * call with (state, filter, order)
 */
const getIndexTotal = (getSubstate) => {
	return createSelector(
		[getIndex(getSubstate)],
		(index) => {
			if (index && (index.count || index.count === 0)){
				return index.count;
			} else {
				return null;
			}
		}
	);
};

/**
 * 
 * @param {func} getSubstate 
 * @return {Array}
 */
const getIndexesByFilteredItem = (getSubstate) => {
	return createSelector([
		getIndexes(getSubstate),
		(state, item) => item,
		],
		(indexes, item) => {
			if(!_.isEmpty(indexes)){
				return indexes.filter((index) => commonHelpers.itemFitFilter(index.filter, item));
			} else {
				return null;
			}
		}
	);
};

/**
 * @param {Array} array
 *
 * @returns {Array|null} Non empty array or null.
 */
function nonEmptyArray(array) {
	return array.length ? array : null;
}

/**
 * Compare keys with loaded models and return which keys need to be loaded
 */
const getKeysToLoad = (getSubstate) => {
	return createSelector(
		[getAllAsObject(getSubstate),
			(state, keys) => (keys)],
		(models, keys) => {
			if (keys && keys.length){
				if (!models){
					return keys;
				} else {
					return nonEmptyArray(keys.filter(key => !models[key] || models[key].outdated));
				}
			} else {
				return null;
			}
		}
	);
};

const getUsedKeys = (getSubstate) => {
	return (state) => {
		let inUse = getSubstate(state).inUse.keys;
		if (inUse) {
			let keys = _.uniq(_.flatten(Object.values(inUse)));
			return keys.length ? keys : null;
		} else {
			return null;
		}
	}
};

const getIndexedDataUses = (getSubstate) => {
	return (state) => {
		if (getSubstate(state) && getSubstate(state).inUse) {
			return getSubstate(state).inUse.indexes;
		} else {
			return null;
		}
	};
};

const getAllActiveKeys = createSelector(
	[
		state => state.scopes && state.scopes.activeKey,
		state => state.cases && state.cases.activeKey,
		state => state.cases && state.cases.activeKeys,
		state => state.scenarios && state.scenarios.activeKey,
		state => state.scenarios && state.scenarios.activeKeys,
		state => state.places && state.places.activeKey,
		state => state.places && state.places.activeKeys,
		state => state.periods && state.periods.activeKey,
		state => state.periods && state.periods.activeKeys,
		state => state.attributes && state.attributes.activeKey,
		state => state.attributes && state.attributes.activeKeys,
		state => state.layerTemplates && state.layerTemplates.activeKey,
		state => state.areaTreeLevelKeys && state.areaTreeLevelKeys.activeKey,
		state => state.specific && state.specific.apps,
		state => state.app && state.app.key
	],
	(activeScopeKey,activeCaseKey,activeCaseKeys,activeScenarioKey,activeScenarioKeys,activePlaceKey,activePlaceKeys,activePeriodKey,activePeriodKeys,activeAttributeKey,activeAttributeKeys, activeLayerTemplateKey, activeAreaTreeLevelKey, apps, appKey) => {
		let activeKeys = {
		    activeScopeKey: activeScopeKey || null,
            activeCaseKey: activeCaseKey || null,
            activeCaseKeys: activeCaseKeys || null,
            activeScenarioKey: activeScenarioKey || null,
            activeScenarioKeys: activeScenarioKeys || null,
            activePlaceKey: activePlaceKey || null,
            activePlaceKeys: activePlaceKeys || null,
            activePeriodKey: activePeriodKey || null,
            activePeriodKeys: activePeriodKeys || null,
            activeAttributeKey: activeAttributeKey || null,
            activeAttributeKeys: activeAttributeKeys || null,
            activeLayerTemplateKey: activeLayerTemplateKey || null,
            activeAreaTreeLevelKey: activeAreaTreeLevelKey || null
		};

		// for BO usage
		if (apps){
			activeKeys.activeApplicationKey = apps.activeKey;
		} else if (appKey){
			activeKeys.activeApplicationKey = appKey;
		}

		return activeKeys;
	}
);

const getActiveKeysByFilterByActive = createCachedSelector(
    [
        getAllActiveKeys,
        (state, filterByActive) => filterByActive
    ],
    (activeKeys, filterByActive) => {
        if (filterByActive && !_.isEmpty(filterByActive)) {
            let keys = {};

            if (filterByActive.scope && activeKeys.activeScopeKey) {
                keys.scopeKey = activeKeys.activeScopeKey;
            }
            if (filterByActive.place) {
                if (activeKeys.activePlaceKey) {
                    keys.placeKey = activeKeys.activePlaceKey;
                } else if (activeKeys.activePlaceKeys) {
                    keys.placeKeys = activeKeys.activePlaceKeys;
                }
            }
            if (filterByActive.scenario){
                if (activeKeys.activeScenarioKey) {
                    keys.scenarioKey = activeKeys.activeScenarioKey;
                } else if (activeKeys.activeScenarioKeys) {
                    keys.scenarioKeys = activeKeys.activeScenarioKeys;
                }
            }
            if (filterByActive.case) {
                if (activeKeys.activeCaseKey) {
                    keys.caseKey = activeKeys.activeCaseKey;
                } else if (activeKeys.activeCaseKeys) {
                    keys.caseKeys = activeKeys.activeCaseKeys;
                }
            }
            if (filterByActive.period) {
                if (activeKeys.activePeriodKey) {
                    keys.periodKey = activeKeys.activePeriodKey;
                } else if (activeKeys.activePeriodKeys) {
                    keys.periodKeys = activeKeys.activePeriodKeys;
                }
            }
            if (filterByActive.layerTemplate && activeKeys.activeLayerTemplateKey) {
                keys.layerTemplateKey = activeKeys.activeLayerTemplateKey;
            }
            if (filterByActive.areaTreeLevel && activeKeys.activeAreaTreeLevelKey) {
                keys.areaTreeLevelKey = activeKeys.activeAreaTreeLevelKey;
            }
            if (filterByActive.application && activeKeys.activeApplicationKey) {
                keys.applicationKey = activeKeys.activeApplicationKey
            }

            return !_.isEmpty(keys) ? keys : null;
        } else {
            return null;
        }
    }
)((state, filterByActive) => JSON.stringify(filterByActive));

const getUsedIndexPages = (getSubstate) => {
	return createSelector([
			getIndexedDataUses(getSubstate),
			getAllActiveKeys
		],
		(indexedDataUses, activeKeys) => {
			let groupedUses = [];
			let finalUsedIndexes = [];
			if(!_.isEmpty(indexedDataUses)) {
				_.each(indexedDataUses, (usedIndexes) => {
					usedIndexes.forEach(usedIndex => {
						let mergedFilter = commonHelpers.mergeFilters(activeKeys, usedIndex.filterByActive, usedIndex.filter);
	
						let existingIndex = _.find(groupedUses, (use) => {
							return _.isEqual(use.filter, mergedFilter) && _.isEqual(use.order, usedIndex.order) ;
						});
						if (existingIndex){
							existingIndex.inUse.push({
								start: usedIndex.start,
								length: usedIndex.length
							});
						} else {
							groupedUses.push({
								filter: mergedFilter,
								order: usedIndex.order,
								inUse: [{
									start: usedIndex.start,
									length: usedIndex.length
								}]
							});
						}
					});
				});
			}

			_.each(groupedUses, index => {
				if (index.inUse && Object.keys(index.inUse).length) {
					finalUsedIndexes.push({
						filter: index.filter,
						order: index.order,
						uses: _mergeIntervals(Object.values(index.inUse))
					});
				}
			});
			return finalUsedIndexes.length ? finalUsedIndexes : null;
		}
	);
};

const getUsesForIndex = (getSubstate) => {
	return createCachedSelector(
		getIndexedDataUses(getSubstate),
		(state, filter) => filter,
		(state, filter, order) => order,
		getAllActiveKeys,
		(indexedDataUses, filter, order, activeKeys) => {
			let index = null;
			if(!_.isEmpty(indexedDataUses)) {
				_.each(indexedDataUses, (usedIndexes) => {
					_.each(usedIndexes, usedIndex => {
						let mergedFilter = commonHelpers.mergeFilters(activeKeys, usedIndex.filterByActive, usedIndex.filter);

						if (_.isEqual(filter, mergedFilter) && _.isEqual(order, usedIndex.order)){
							if (index){
								index.inUse.push({
									start: usedIndex.start,
									length: usedIndex.length
								});
							} else {
								index = {
									filter: filter,
									order: usedIndex.order,
									inUse: [{
										start: usedIndex.start,
										length: usedIndex.length
									}]
								};
							}
						}
					});
				});
			}

			if (index){
				return {
					filter: index.filter,
					order: index.order,
					uses: _mergeIntervals(Object.values(index.inUse))
				}
			} else {
				return null;
			}
		}
	)(
		(state, filter, order) => {
			let stringOrder = JSON.stringify(order);
			let stringFilter = JSON.stringify(_.map(filter, (value, key) => {
				return `${key}:${value}`;
			}).sort());
			return `${stringOrder}:${stringFilter}`;
		}
	);
};

const getUsesWithActiveDependency = (getSubstate) => {
	/**
	 * @param state {Object}
	 * @param filterByActive {Object} Something like {scope: true}
	 */
	return createSelector([
			getIndexedDataUses(getSubstate),
			getAllActiveKeys,
			(state, filterByActive) => filterByActive
		],
		/**
		 * @param indexedDataUses {Object} inUse.indexes
		 * @param activeKeys {Object} active keys of all metadata
		 * @param filterByActive {Object} given metadata type active key for filtering (e.g. {scope: true})
		 */
		(indexedDataUses, activeKeys, filterByActive) => {
			let groupedUses = []; // uses grouped by filter
			let usedIndexes = [];

			if (filterByActive && !_.isEmpty(indexedDataUses)) {
				// loop through components
				_.map(indexedDataUses, (componentUsedIndexes) => {
					// loop through uses for component
					_.map(componentUsedIndexes, (usedIndex) => {
						if (_.reduce(filterByActive, (accumulator, value, index) => accumulator && value && usedIndex.filterByActive && usedIndex.filterByActive[index], true)) {
							// if usedIndex.filterByActive has all the properties of filterByActive

							let mergedFilter = commonHelpers.mergeFilters(activeKeys, usedIndex.filterByActive, usedIndex.filter);

							let existingIndex = _.find(groupedUses, (use) => {
								return _.isEqual(use.filter, mergedFilter) && _.isEqual(use.order, usedIndex.order) ;
							});
							if (existingIndex){
								existingIndex.inUse.push({
									start: usedIndex.start,
									length: usedIndex.length
								});
							} else {
								groupedUses.push({
									filter: mergedFilter,
									order: usedIndex.order,
									inUse: [{
										start: usedIndex.start,
										length: usedIndex.length
									}]
								});
							}
						}
					});
				});

				// loop through uses grouped by filter and merge intervals
				_.map(groupedUses, index => {
					if (index.inUse && Object.keys(index.inUse).length) {
						usedIndexes.push({
							filter: index.filter,
							order: index.order,
							uses: _mergeIntervals(Object.values(index.inUse))
						});
					}
				});
				return usedIndexes.length ? usedIndexes : null;
			} else {
				return null;
			}
		}
	);
};

const getStateToSave = (getSubstate) => {
	return (state) => {
		const activeKey = getSubstate(state).activeKey;
		if (activeKey) {
			return {activeKey};
		}

		const activeKeys = getSubstate(state).activeKeys;
		if (activeKeys) {
			return {activeKeys};
		}

		return {}
	}
};

function isInterval(interval) {
	return interval && interval.start && interval.length;
}

function intervalsOverlap(earlier, later) {
	return later.start <= (earlier.start + earlier.length);
}

const _mergeIntervals = (intervals) => {
	const validIntervals = intervals.filter(isInterval)
	const sortedIntervals = _.sortBy(validIntervals, ['start', 'length']);
	if (sortedIntervals.length === 0) {
		return null;
	}

	//merge intervals
	return _.tail(sortedIntervals)
		.reduce((mergedIntervals, interval) => {
			const last = mergedIntervals.pop();
			if (intervalsOverlap(last, interval)) {
				//merge last & current
				const end = Math.max((last.start + last.length), (interval.start + interval.length));
				return [...mergedIntervals, {
					start: last.start,
					length: (end - last.start)
				}];
			} else {
				//add both
				return [...mergedIntervals, last, interval];
			}
	}, [_.head(sortedIntervals)]);
};

export default {
	getActive,
	getActiveModels,
	getActiveKey,
	getActiveKeys,
    getActiveKeysByFilterByActive,
	getAll,
	getAllActiveKeys,
	getAllAsObject,
	getAllForActiveScope,

	getByFilterOrder,
	getBatchByFilterOrder,
	getByKey,
	getByKeysAsObject,
	getByKeys,

	getDataByKey,
	getDeletePermissionByKey,

	getEditedActive,
	getEditedAll,
	getEditedAllAsObject,
	getEditedByKey,
	getEditedDataByKey,
	getEditedKeys,

	getIndex,
	getIndexed,
	getIndexes,
	getIndexChangedOn,
	getIndexPage,
	getIndexedPage,
	getIndexTotal,
	getIndexesByFilteredItem,

	getKeysToLoad,

	getStateToSave,

	getUpdatePermissionByKey,
	getUsesForIndex,
	getUsedIndexPages,
	getUsedKeys,
	getUsesWithActiveDependency,

	_mergeIntervals
}