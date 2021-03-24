import {createSelector} from 'reselect';
import {
	createSelector as createRecomputeSelector,
	createObserver as createRecomputeObserver,
} from '@jvitela/recompute';
import createCachedSelector from 're-reselect';
import _, {
	difference as _difference,
	pickBy as _pickBy,
	isEmpty as _isEmpty,
} from 'lodash';
import commonHelpers from './helpers';

const getActiveKey = getSubstate => {
	return state => getSubstate(state).activeKey;
};

const getActiveKeys = getSubstate => {
	return state => getSubstate(state).activeKeys;
};

const getAllByKey = getSubstate => {
	return state => getSubstate(state).byKey;
};

const getKeysInUse = getSubstate => {
	return state => getSubstate(state).inUse?.keys;
};

const getIndexesInUse = getSubstate => {
	return state => getSubstate(state).inUse?.indexes;
};

const getEditedAllAsObject = getSubstate => {
	return state => getSubstate(state).editedByKey;
};

const getIndexes = getSubstate => {
	return state => getSubstate(state).indexes;
};

/**
 * Get indexes value from given state on given path.
 * Optional param indexPath has default value "indexes". Call with:
 * state {Object}
 * indexPath {string}
 * @param getSubstate {function}
 * @return {Object} index
 */
const getIndexesByPath = getSubstate => {
	return (state, indexPath = 'indexes') => _.get(getSubstate(state), indexPath);
};

/**
 * Get all but removed models in byKey
 * @param getSubstate {function}
 * @returns {Object} all models except removed from by key
 */
const getAllNotRemovedAsObject = getSubstate => {
	return createSelector([getAllByKey(getSubstate)], byKey => {
		if (byKey) {
			return _pickBy(byKey, item => !item.hasOwnProperty('removed'));
		} else {
			return null;
		}
	});
};

const getAllAsObject = getAllNotRemovedAsObject;

/**
 * Get all but removed models as a collection
 * @param getSubstate {function}
 * @returns {Array|null} all models except removed as a collection
 */
const getAll = getSubstate => {
	return createSelector([getAllAsObject(getSubstate)], byKey => {
		return byKey ? Object.values(byKey) : null;
	});
};

/**
 * Get active model
 * @param getSubstate {func}
 * @return {Object} Active model
 */
const getActive = getSubstate => {
	return createSelector(
		[getAllAsObject(getSubstate), getActiveKey(getSubstate)],
		(models, activeKey) => {
			return models?.[activeKey] || null;
		}
	);
};

/**
 * Get active models
 * @param getSubstate {func}
 * @return {Array} A collection of active models
 */
const getActiveModels = getSubstate => {
	return createSelector(
		[getAllAsObject(getSubstate), getActiveKeys(getSubstate)],
		(models, activeKeys) => {
			let activeModels = [];
			if (
				models &&
				!_.isEmpty(models) &&
				activeKeys &&
				!_.isEmpty(activeKeys)
			) {
				activeKeys.map(key => {
					let model = models[key];
					if (model) {
						activeModels.push(model);
					}
				});
			}
			return activeModels.length ? activeModels : null;
		}
	);
};

/**
 * Get model with given key. Call with:
 * state {Object}
 * key {string} model key
 * @param getSubstate {function}
 * @return {Object} selected model
 */
const getByKey = getSubstate => {
	return createCachedSelector(
		[getAllAsObject(getSubstate), (state, key) => key],
		(allData, key) => {
			if (key && allData && !_isEmpty(allData) && allData[key]) {
				return allData[key];
			} else {
				return null;
			}
		}
	)((state, key) => key);
};

/**
 * Get models by given keys. Call with:
 * state {Object}
 * keys {Array} model keys
 * @param getSubstate {function}
 * @return {Object} selected models
 */
const getByKeysAsObject = getSubstate => {
	return createCachedSelector(
		[getAllAsObject(getSubstate), (state, keys) => keys],
		(allData, keys) => {
			if (keys && keys.length && allData && !_.isEmpty(allData)) {
				let data = _.pick(allData, keys);
				return _.isEmpty(data) ? null : data;
			} else {
				return null;
			}
		}
	)((state, keys) => `${keys}`);
};

/**
 * Get models by given keys. Call with:
 * state {Object}
 * keys {Array} model keys
 * @param getSubstate {function}
 * @return {Array} selected models
 */
const getByKeys = getSubstate => {
	return createCachedSelector([getByKeysAsObject(getSubstate)], asObject => {
		if (asObject) {
			return Object.values(asObject);
		} else {
			return null;
		}
	})((state, keys) => `${keys}`);
};

/**
 * Get model's data by given keys. Call with:
 * state {Object}
 * keys {Array} model keys
 * @param getSubstate {function}
 * @return {Object} selected model data
 */
const getDataByKey = getSubstate => {
	return createSelector([getByKey(getSubstate)], model => {
		return model?.data || null;
	});
};

/**
 * True, if current user or guest has a permission to delete the model. Call with:
 * state {Object}
 * key {string}
 * @param getSubstate {function}
 * @return {bool}
 */
const getDeletePermissionByKey = getSubstate => {
	return createSelector([getByKey(getSubstate)], model => {
		return (
			model?.permissions?.activeUser?.delete ||
			model?.permissions?.guest?.delete ||
			false
		);
	});
};

/**
 * True, if current user or guest has a permission to update the model. Call with:
 * state {Object}
 * key {string}
 * @param getSubstate {function}
 * @return {bool}
 */
const getUpdatePermissionByKey = getSubstate => {
	return createSelector([getByKey(getSubstate)], model => {
		return (
			model?.permissions?.activeUser?.update ||
			model?.permissions?.guest?.update ||
			false
		);
	});
};

/**
 * Get all edited models. Call with:
 * state {Object}
 * @param getSubstate {function}
 * @return {Object}
 */
const getEditedAll = getSubstate => {
	return createSelector([getEditedAllAsObject(getSubstate)], editedAsObject => {
		return editedAsObject ? Object.values(editedAsObject) : null;
	});
};

/**
 * Get active edited model. Call with:
 * state {Object}
 * @param getSubstate {function}
 * @return {Object} edited active model
 */
const getEditedActive = getSubstate => {
	return createSelector(
		[getEditedAllAsObject(getSubstate), getActiveKey(getSubstate)],
		(models, activeKey) => {
			return models?.[activeKey] || null;
		}
	);
};

/**
 * Get edited model with given key. Call with:
 * state {Object}
 * key {string} model key
 * @param getSubstate {function}
 * @return {Object} edited model
 */
const getEditedByKey = getSubstate => {
	return createCachedSelector(
		[getEditedAllAsObject(getSubstate), (state, key) => key],
		(allData, key) => {
			if (key && allData && !_isEmpty(allData) && allData[key]) {
				return allData[key];
			} else {
				return null;
			}
		}
	)((state, key) => key);
};

/**
 * Get edited model's data by given key. Call with:
 * state {Object}
 * keys {Array} model keys
 * @param getSubstate {function}
 * @return {Object} edited model data
 */
const getEditedDataByKey = getSubstate => {
	return createSelector([getEditedByKey(getSubstate)], model => {
		return model?.data || null;
	});
};

/**
 * Get edited models keys. Call with:
 * state {Object}
 * @param getSubstate {function}
 * @return {Array} edited keys
 */
const getEditedKeys = getSubstate => {
	return createSelector([getEditedAllAsObject(getSubstate)], edited => {
		if (edited && !_isEmpty(edited)) {
			return Object.keys(edited);
		}
		return null;
	});
};

/**
 * Get whole index by given filter and order. Call with:
 * state {Object}
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {Object} index
 */
const getIndex = getSubstate => {
	return createSelector(
		[
			getIndexes(getSubstate),
			(state, filter) => filter,
			(state, filter, order) => order,
		],
		(indexes, filter, order) => {
			return commonHelpers.getIndex(indexes, filter, order);
		}
	);
};

/**
 * Get whole index by given filter and order and optional indexPath. Call with:
 * state {Object}
 * indexPath {string} [optional]
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {Object} index
 */
const getIndexByPath = getSubstate => {
	return createSelector(
		[
			getIndexesByPath(getSubstate),
			(state, indexPath, filter) => filter,
			(state, indexPath, filter, order) => order,
		],
		(indexes, filter, order) => {
			return commonHelpers.getIndex(indexes, filter, order);
		}
	);
};

/**
 * Get changeOn of filtered index
 * state {Object}
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {string}
 */
const getIndexChangedOn = getSubstate => {
	return createSelector([getIndex(getSubstate)], index => {
		return index?.changedOn || null;
	});
};

/**
 * Get indexes page. Call with:
 * state {Object}
 * filter {Object}
 * order {Array}
 * start {number} from 1 to n. Default 1.
 * length {number} from 1 to n. If no length specified, then is equal to total
 * @param getSubstate {function}
 * @return {Object} {7: 'key1', 8: null, ...}
 */
const getIndexPage = getSubstate => {
	return createSelector(
		[
			getIndex(getSubstate),
			(state, filter, order, start) => start,
			(state, filter, order, start, length) => length,
		],
		(index, start, length) => {
			if (index?.index && start && length) {
				let indexed = {};
				for (let o = start; o < start + length && o <= index.count; o++) {
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
 * Get indexed models. Call with:
 * state {Object}
 * filterByActive {Object}
 * filter {Object}
 * order {Array}
 * start {number} from 1 to n. Default 1.
 * length {number} from 1 to n. If no length specified, then is equal to total
 * @param getSubstate {function}
 * @return {Array} collection of models
 */
const getIndexed = getSubstate => {
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
		(
			models,
			indexes,
			activeKeys,
			filterByActive,
			filter,
			order,
			start,
			length
		) => {
			if (models && indexes) {
				let mergedFilter = commonHelpers.mergeFilters(
					activeKeys,
					filterByActive,
					filter
				);
				let index = commonHelpers.getIndex(indexes, mergedFilter, order);
				if (index?.index) {
					let indexedModels = [];
					start = start || 1;
					length = length || index.count;

					let end = Math.min(start + length - 1, index.count);
					for (let i = start; i <= end; i++) {
						let modelKey = index.index[i];
						if (modelKey) {
							let indexedModel = models[modelKey];
							if (indexedModel) {
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
		return `${JSON.stringify(filterByActive)}:${JSON.stringify(
			filter
		)}:${JSON.stringify(order)}:${start}:${length}`;
	});
};

/**
 * Get count of indexed items. Call with:
 * state {Object}
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {number}
 */
const getIndexTotal = getSubstate => {
	return createSelector([getIndex(getSubstate)], index => {
		if (index?.count > -1) {
			return index.count;
		} else {
			return null;
		}
	});
};

// TODO @vdubr please help
/**
 *
 * @param {func} getSubstate
 * @return {Array}
 */
const getIndexesByFilteredItem = getSubstate => {
	return createSelector(
		[getIndexes(getSubstate), (state, item) => item],
		(indexes, item) => {
			if (!_.isEmpty(indexes)) {
				return indexes.filter(index =>
					commonHelpers.itemFitFilter(index.filter, item)
				);
			} else {
				return null;
			}
		}
	);
};

/**
 * Compare keys with loaded models and return which keys need to be loaded
 * state {Object}
 * keys {Array}
 * @param getSubstate {function}
 * @return {Array} keys to load
 */
const getKeysToLoad = getSubstate => {
	return createSelector(
		[getAllAsObject(getSubstate), (state, keys) => keys],
		(models, keys) => {
			if (keys && keys.length) {
				if (!models) {
					return keys;
				} else {
					const filteredKeys = keys.filter(
						key => !models[key] || models[key].outdated
					);
					return filteredKeys.length ? filteredKeys : null;
				}
			} else {
				return null;
			}
		}
	);
};

/**
 * Get a list of keys used by given component
 * state {Object}
 * componentKey {string}
 * @param getSubstate {function}
 * @return {Array} used keys
 */
const getUsedKeysForComponent = getSubstate => {
	return createCachedSelector(
		[getKeysInUse(getSubstate), (state, componentKey) => componentKey],
		(usedKeys, componentKey) => {
			return usedKeys &&
				componentKey &&
				usedKeys[componentKey] &&
				usedKeys[componentKey].length
				? usedKeys[componentKey]
				: null;
		}
	)((state, componentKey) => `${componentKey}`);
};

/**
 * True, if all given keys are registered for given component
 * state {Object}
 * componentKey {string}
 * keys {Array}
 * @param getSubstate {function}
 * @return {boolean}
 */
const haveAllKeysRegisteredUse = getSubstate => {
	return createCachedSelector(
		[getUsedKeysForComponent(getSubstate), (state, componentKey, keys) => keys],
		(usedKeys, keys) => {
			if (usedKeys && keys?.length) {
				const notIncluded = _difference(keys, usedKeys);
				return !notIncluded.length;
			} else {
				return false;
			}
		}
	)((state, componentKey, keys) => `${componentKey}_${keys}`);
};

const getUsedIndexPages = getSubstate => {
	return createSelector(
		[getIndexesInUse(getSubstate), getAllActiveKeys],
		(indexedDataUses, activeKeys) => {
			let groupedUses = [];
			let finalUsedIndexes = [];
			if (!_.isEmpty(indexedDataUses)) {
				_.each(indexedDataUses, usedIndexes => {
					usedIndexes.forEach(usedIndex => {
						let mergedFilter = commonHelpers.mergeFilters(
							activeKeys,
							usedIndex.filterByActive,
							usedIndex.filter
						);

						let existingIndex = _.find(groupedUses, use => {
							return (
								_.isEqual(use.filter, mergedFilter) &&
								_.isEqual(use.order, usedIndex.order)
							);
						});
						if (existingIndex) {
							existingIndex.inUse.push({
								start: usedIndex.start,
								length: usedIndex.length,
							});
						} else {
							groupedUses.push({
								filter: mergedFilter,
								order: usedIndex.order,
								inUse: [
									{
										start: usedIndex.start,
										length: usedIndex.length,
									},
								],
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
						uses: _mergeIntervals(Object.values(index.inUse)),
					});
				}
			});
			return finalUsedIndexes.length ? finalUsedIndexes : null;
		}
	);
};

const getUsesForIndex = getSubstate => {
	return createCachedSelector(
		getIndexesInUse(getSubstate),
		(state, filter) => filter,
		(state, filter, order) => order,
		getAllActiveKeys,
		(indexedDataUses, filter, order, activeKeys) => {
			let index = null;
			if (!_.isEmpty(indexedDataUses)) {
				_.each(indexedDataUses, usedIndexes => {
					_.each(usedIndexes, usedIndex => {
						let mergedFilter = commonHelpers.mergeFilters(
							activeKeys,
							usedIndex.filterByActive,
							usedIndex.filter
						);

						if (
							_.isEqual(filter, mergedFilter) &&
							_.isEqual(order, usedIndex.order)
						) {
							if (index) {
								index.inUse.push({
									start: usedIndex.start,
									length: usedIndex.length,
								});
							} else {
								index = {
									filter: filter,
									order: usedIndex.order,
									inUse: [
										{
											start: usedIndex.start,
											length: usedIndex.length,
										},
									],
								};
							}
						}
					});
				});
			}

			if (index) {
				return {
					filter: index.filter,
					order: index.order,
					uses: _mergeIntervals(Object.values(index.inUse)),
				};
			} else {
				return null;
			}
		}
	)((state, filter, order) => {
		let stringOrder = JSON.stringify(order);
		let stringFilter = JSON.stringify(
			_.map(filter, (value, key) => {
				return `${key}:${value}`;
			}).sort()
		);
		return `${stringOrder}:${stringFilter}`;
	});
};

const getUsesWithActiveDependency = getSubstate => {
	/**
	 * @param state {Object}
	 * @param filterByActive {Object} Something like {scope: true}
	 */
	return createSelector(
		[
			getIndexesInUse(getSubstate),
			getAllActiveKeys,
			(state, filterByActive) => filterByActive,
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
				_.map(indexedDataUses, componentUsedIndexes => {
					// loop through uses for component
					_.map(componentUsedIndexes, usedIndex => {
						if (
							_.reduce(
								filterByActive,
								(accumulator, value, index) =>
									accumulator &&
									value &&
									usedIndex.filterByActive &&
									usedIndex.filterByActive[index],
								true
							)
						) {
							// if usedIndex.filterByActive has all the properties of filterByActive

							let mergedFilter = commonHelpers.mergeFilters(
								activeKeys,
								usedIndex.filterByActive,
								usedIndex.filter
							);

							let existingIndex = _.find(groupedUses, use => {
								return (
									_.isEqual(use.filter, mergedFilter) &&
									_.isEqual(use.order, usedIndex.order)
								);
							});
							if (existingIndex) {
								existingIndex.inUse.push({
									start: usedIndex.start,
									length: usedIndex.length,
								});
							} else {
								groupedUses.push({
									filter: mergedFilter,
									order: usedIndex.order,
									inUse: [
										{
											start: usedIndex.start,
											length: usedIndex.length,
										},
									],
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
							uses: _mergeIntervals(Object.values(index.inUse)),
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

/**
 * Get all data from substore which should be saved (to the view for instance)
 * @param getSubstate {function}
 * @return {Object} substore state to save
 */
const getStateToSave = getSubstate => {
	return state => {
		const activeKey = getSubstate(state).activeKey;
		if (activeKey) {
			return {activeKey};
		}

		const activeKeys = getSubstate(state).activeKeys;
		if (activeKeys) {
			return {activeKeys};
		}

		return {};
	};
};

function isInterval(interval) {
	return interval && interval.start && interval.length;
}

function intervalsOverlap(earlier, later) {
	return later.start <= earlier.start + earlier.length;
}

const _mergeIntervals = intervals => {
	const validIntervals = intervals.filter(isInterval);
	const sortedIntervals = _.sortBy(validIntervals, ['start', 'length']);
	if (sortedIntervals.length === 0) {
		return null;
	}

	//merge intervals
	return _.tail(sortedIntervals).reduce(
		(mergedIntervals, interval) => {
			const last = mergedIntervals.pop();
			if (intervalsOverlap(last, interval)) {
				//merge last & current
				const end = Math.max(
					last.start + last.length,
					interval.start + interval.length
				);
				return [
					...mergedIntervals,
					{
						start: last.start,
						length: end - last.start,
					},
				];
			} else {
				//add both
				return [...mergedIntervals, last, interval];
			}
		},
		[_.head(sortedIntervals)]
	);
};

/* 	--- Selectors accross stores --------------------------------------------- */
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
		state => state.app && state.app.key,
	],
	(
		activeScopeKey,
		activeCaseKey,
		activeCaseKeys,
		activeScenarioKey,
		activeScenarioKeys,
		activePlaceKey,
		activePlaceKeys,
		activePeriodKey,
		activePeriodKeys,
		activeAttributeKey,
		activeAttributeKeys,
		activeLayerTemplateKey,
		activeAreaTreeLevelKey,
		apps,
		appKey
	) => {
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
			activeAreaTreeLevelKey: activeAreaTreeLevelKey || null,
		};

		// for BO usage
		if (apps) {
			activeKeys.activeApplicationKey = apps.activeKey;
		} else if (appKey) {
			activeKeys.activeApplicationKey = appKey;
		}

		return activeKeys;
	}
);

const getActiveKeysByFilterByActive = createCachedSelector(
	[getAllActiveKeys, (state, filterByActive) => filterByActive],
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
			if (filterByActive.scenario) {
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
			if (filterByActive.attribute) {
				if (activeKeys.activeAttributeKey) {
					keys.attributeKey = activeKeys.activeAttributeKey;
				} else if (activeKeys.activeAttributeKeys) {
					keys.attributeKeys = activeKeys.activeAttributeKeys;
				}
			}
			if (filterByActive.layerTemplate && activeKeys.activeLayerTemplateKey) {
				keys.layerTemplateKey = activeKeys.activeLayerTemplateKey;
			}
			if (filterByActive.areaTreeLevel && activeKeys.activeAreaTreeLevelKey) {
				keys.areaTreeLevelKey = activeKeys.activeAreaTreeLevelKey;
			}
			if (filterByActive.application && activeKeys.activeApplicationKey) {
				keys.applicationKey = activeKeys.activeApplicationKey;
			}

			return !_.isEmpty(keys) ? keys : null;
		} else {
			return null;
		}
	}
)((state, filterByActive) => JSON.stringify(filterByActive));

/* 	--- Recompute observers -------------------------------------------------- */

/**
 * @param filterByActive {Object}
 */
const getActiveKeysByFilterByActiveObserver = createRecomputeObserver(
	(state, filterByActive) =>
		getActiveKeysByFilterByActive(state, filterByActive)
);

const getIndexesObserver = createRecomputeObserver((state, getSubstate) =>
	getIndexes(getSubstate)(state)
);

/* --- Recompute selectors -------------------------------------------------- */

const getIndex_recompute = getSubstate => {
	return createRecomputeSelector((filter, order) => {
		const indexes = getIndexesObserver(getSubstate);
		if (indexes) {
			return commonHelpers.getIndex(indexes, filter, order);
		} else {
			return null;
		}
	});
};

/**
 * Merge metadata modifiers with filter by active
 * @params metadataModifiers {Object} {placeKey: "uuid", scopeKey: "uuid", ...}
 * @params filterByActive {Object} {place: true, case: true, ...}
 */
const getMergedModifiers_recompute = createRecomputeSelector(
	(metadataModifiers, filterByActive) => {
		// TODO at least a part is the same as in Maps/actions/layerUse?

		// modifiers defined by key
		let metadataDefinedByKey = metadataModifiers ? {...metadataModifiers} : {};

		// Get actual metadata keys defined by filterByActive
		const activeMetadataKeys = getActiveKeysByFilterByActiveObserver(
			filterByActive
		);

		// Merge metadata, metadata defined by key have priority
		return commonHelpers.mergeMetadataKeys(
			metadataDefinedByKey,
			activeMetadataKeys
		);
	}
);

/**
 * Merge metadata modifiers with filter by active and return it in request-like format
 * @params metadataModifiers {Object}
 * @params filterByActive {Object}
 */
const getMergedModifiersInRequestFormat_recompute = createRecomputeSelector(
	(metadataModifiers, filterByActive) => {
		const mergedMetadataKeys = getMergedModifiers_recompute(
			metadataModifiers,
			filterByActive
		);

		// It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}
		return commonHelpers.convertModifiersToRequestFriendlyFormat(
			mergedMetadataKeys
		);
	}
);

/**
 * @params componentState {Object}
 */
const getCommmonDataRelationsFilterFromComponentState_recompute = createRecomputeSelector(
	componentState => {
		const relationsFilter = {};
		const modifiers = getMergedModifiersInRequestFormat_recompute(
			componentState.metadataModifiers,
			componentState.filterByActive
		);
		if (!_.isEmpty(modifiers)) {
			relationsFilter.modifiers = modifiers;
		}

		// add layerTemplate od areaTreeLevelKey
		if (componentState.layerTemplateKey) {
			relationsFilter.layerTemplateKey = componentState.layerTemplateKey;
		} else if (componentState.areaTreeLevelKey) {
			relationsFilter.areaTreeLevelKey = componentState.areaTreeLevelKey;
		}
		return relationsFilter;
	}
);

export default {
	getActive,
	getActiveKey,
	getActiveKeys,
	getActiveModels,
	getAll,
	getAllAsObject,
	getAllByKey,

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
	getIndexByPath,
	getIndexed,
	getIndexes,
	getIndexesByPath,
	getIndexChangedOn,
	getIndexPage,
	getIndexTotal,
	getIndexesByFilteredItem,

	getKeysInUse,
	getKeysToLoad,

	getStateToSave,

	getUpdatePermissionByKey,
	getUsesForIndex, //TODO test
	getUsedIndexPages, //TODO test
	getUsedKeysForComponent, //TODO test
	getUsesWithActiveDependency, //TODO test

	haveAllKeysRegisteredUse,

	_mergeIntervals,

	// TODO test all bellow
	// selectors across stores
	getActiveKeysByFilterByActive,
	getAllActiveKeys,

	// recompute observers
	getActiveKeysByFilterByActiveObserver,
	getIndexesObserver,

	// recompute selectors
	getIndex_recompute,
	getCommmonDataRelationsFilterFromComponentState_recompute,
	getMergedModifiers_recompute,
	getMergedModifiersInRequestFormat_recompute,
};
