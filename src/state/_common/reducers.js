import _, {
	find as _find,
	findIndex as _findIndex,
	isEmpty as _isEmpty,
	isEqual as _isEqual,
	isNumber as _isNumber,
	omit as _omit,
	union as _union,
} from 'lodash';
import commonHelpers from './helpers';

export const DEFAULT_INITIAL_STATE = {
	activeKey: null,
	byKey: null,
	count: null,
	editedByKey: null,
	indexes: null,
	inUse: {
		indexes: null,
		keys: null,
	},
	lastChangedOn: null,
	loading: false,
	loadingKeys: null,
};

export default {
	/**
	 * Add models to store or update them
	 * @param state {Object}
	 * @param action {Object}
	 * @param action.data {Array} A collection of models to add
	 * @return {Object} updated state
	 */
	add: (state, action) => {
		if (action?.data?.length) {
			let newData = {...state.byKey};
			action.data.forEach(model => {
				newData[model.key] = {...newData[model.key], ...model};
				delete newData[model.key].outdated;
				delete newData[model.key].unreceived;
			});

			return {...state, byKey: newData};
		} else {
			return state;
		}
	},

	/**
	 * Add just keys and mark as unreceived for unreceived models
	 * @param state {Object}
	 * @param action {Object}
	 * @param action.keys {Array} A list of unreceived keys
	 * @return {Object} updated state
	 */
	addUnreceivedKeys: (state, action) => {
		if (action?.keys?.length) {
			let newData = {...state.byKey};
			action.keys.forEach(key => {
				newData[key] = {key, unreceived: true};
			});
			return {...state, byKey: newData};
		} else {
			return state;
		}
	},

	/**
	 * Add new or updated existing index
	 * @param state {Object}
	 * @param action {Object}
	 * @param action.data {Array} A collection of models to add
	 * @param action.filter {Object}
	 * @param action.order {Array}
	 * @param action.start {number}
	 * @param action.length {number}
	 * @param action.count {number}
	 * @param action.changedOn {string}
	 * @return {Object} updated state
	 */
	addIndex: (state, action) => {
		if (action?.data) {
			const updatedIndexes = state.indexes ? [...state.indexes] : [];
			const indexOfIndex = updatedIndexes.length
				? _findIndex(state.indexes, index => {
						return (
							_isEqual(index.filter, action.filter) &&
							_isEqual(index.order, action.order)
						);
				  })
				: -1;

			// update existing index
			if (indexOfIndex > -1) {
				const updatedIndex = {...updatedIndexes[indexOfIndex]};

				// register models to index
				const updatedIndexIndex = commonHelpers.registerModelsToIndex(
					{...updatedIndex.index},
					action.data,
					action.start
				);

				// Remove loading indicator if data does not come
				if (action.length) {
					for (let i = action.start; i < action.start + action.length; i++) {
						if (updatedIndexIndex[i] === true) {
							delete updatedIndexIndex[i];
						}
					}
				}

				updatedIndexes[indexOfIndex] = {
					...updatedIndex,
					count: action.count || updatedIndex.count || null,
					changedOn: action.changedOn || updatedIndex.changedOn || null,
					index: updatedIndexIndex,
				};
			}

			// add new index
			else {
				updatedIndexes.push({
					filter: action.filter || null,
					order: action.order || null,
					count: action.count || null,
					changedOn: action.changedOn || null,
					index: commonHelpers.registerModelsToIndex(
						{},
						action.data,
						action.start
					),
				});
			}

			return {...state, indexes: updatedIndexes};
		} else {
			return state;
		}
	},

	/**
	 * Register usage of indexed data
	 * @param state {Object}
	 * @param action {Object}
	 * @param action.data {Array} A collection of models to add
	 * @param action.componentId {string}
	 * @param action.filterByActive {Object}
	 * @param action.filter {Object}
	 * @param action.order {Array}
	 * @param action.start {number}
	 * @param action.length {number}
	 * @return {Object} updated state
	 */
	registerUseIndexed: (state, action) => {
		let newUse = {
			filterByActive: action.filterByActive,
			filter: action.filter,
			order: action.order,
			start: action.start,
			length: action.length,
		};

		let existingUse = false;
		if (state.inUse.indexes && state.inUse.indexes[action.componentId]) {
			existingUse = _find(state.inUse.indexes[action.componentId], newUse);
		}

		// add use if it doesn't already exist
		if (!existingUse) {
			return {
				...state,
				inUse: {
					...state.inUse,
					indexes: {
						...state.inUse.indexes,
						[action.componentId]:
							state.inUse.indexes && state.inUse.indexes[action.componentId]
								? [...state.inUse.indexes[action.componentId], newUse]
								: [newUse],
					},
				},
			};
		} else {
			return state;
		}
	},

	/**
	 * Clear the usage of indexed data
	 * @param state {Object}
	 * @param action {Object}
	 * @param action.componentId {string}
	 * @return {Object} updated state
	 */
	useIndexedClear: (state, action) => {
		if (
			action.componentId &&
			state.inUse?.indexes?.hasOwnProperty(action.componentId)
		) {
			let indexes = {...state.inUse.indexes};
			delete indexes[action.componentId];
			return {
				...state,
				inUse: {...state.inUse, indexes: _isEmpty(indexes) ? null : indexes},
			};
		} else {
			return state;
		}
	},

	/**
	 * Clear all usages of indexed data
	 * @param state {Object}
	 * @param action {Object}
	 * @return {Object} updated state
	 */
	useIndexedClearAll: (state, action) => {
		if (state.inUse && state.inUse?.indexes) {
			return {...state, inUse: {...state.inUse, indexes: null}};
		} else {
			return state;
		}
	},

	/**
	 * Register the usage of a model with key
	 * @param state {Object}
	 * @param action {Object}
	 * @param action.componentId {Object} string
	 * @param action.keys {Array} list of keys
	 * @return {Object} updated state
	 */
	useKeysRegister: (state, action) => {
		if (action.componentId && action.keys?.length) {
			return {
				...state,
				inUse: {
					...state.inUse,
					keys: {
						...state.inUse.keys,
						[action.componentId]: state.inUse.keys?.[action.componentId]
							? _union(state.inUse.keys[action.componentId], action.keys)
							: action.keys,
					},
				},
			};
		} else {
			return state;
		}
	},

	/**
	 * Clear the usage of models for component
	 * @param state {Object}
	 * @param action {Object}
	 * @param action.componentId {string}
	 * @return {Object} updated state
	 */
	useKeysClear: (state, action) => {
		if (action.componentId) {
			let keys = {...state.inUse.keys};
			delete keys[action.componentId];

			return {
				...state,
				inUse: {
					...state.inUse,
					keys: _isEmpty(keys) ? null : keys,
				},
			};
		} else {
			return state;
		}
	},

	/**
	 * Mark model as deleted
	 * @param state {Object}
	 * @param action {Object}
	 * @param action.key {string}
	 * @return {Object} updated state
	 */
	markDeleted: (state, action) => {
		if (action.key && state.byKey?.[action.key]) {
			return {
				...state,
				byKey: {
					...state.byKey,
					[action.key]: {
						...state.byKey[action.key],
						removed: true,
					},
				},
			};
		} else {
			return state;
		}
	},

	/**
	 * Remove models from byKey
	 * @param state {Object}
	 * @param action {Object}
	 * @param action.keys {Array} list of model keys to remove
	 * @return {Object} updated state
	 */
	remove: (state, action) => {
		if (action.keys?.length && state.byKey) {
			const updatedByKey = _omit(state.byKey, action.keys);

			return {
				...state,
				byKey: _isEmpty(updatedByKey) ? null : updatedByKey,
			};
		} else {
			return state;
		}
	},

	removeEdited: (state, action) => {
		let newData = state.editedByKey
			? _.omit(state.editedByKey, action.keys)
			: null;
		return {...state, editedByKey: newData};
	},

	removeEditedActive: state => {
		let newData = state.editedByKey
			? _.omit(state.editedByKey, state.activeKey)
			: null;
		return {...state, editedByKey: newData};
	},

	removeEditedProperty: (state, action) => {
		let newEditedModelData =
			state.editedByKey &&
			state.editedByKey[action.key] &&
			state.editedByKey[action.key].data
				? _.omit(state.editedByKey[action.key].data, action.property)
				: null;

		if (newEditedModelData && !_.isEmpty(newEditedModelData)) {
			return {
				...state,
				editedByKey: {
					...state.editedByKey,
					[action.key]: {
						...state.editedByKey[action.key],
						data: newEditedModelData,
					},
				},
			};
		} else if (newEditedModelData && _.isEmpty(newEditedModelData)) {
			let editedModels = {...state.editedByKey};
			delete editedModels[action.key];

			return {...state, editedByKey: editedModels};
		} else {
			return state;
		}
	},

	// todo test
	removeEditedPropertyValues: (state, action) => {
		const dataTypeSingular = action.dataType.slice(0, -1);
		const keyProperty = dataTypeSingular + 'Key';
		const keysProperty = dataTypeSingular + 'Keys';

		let editedData = {...state.editedByKey};
		if (!_.isEmpty(editedData)) {
			let updatedEdited = {};
			let propertyUpdated = false;
			_.forIn(editedData, (model, key) => {
				if (model.data && model.data[keyProperty]) {
					let keyExists = _.includes(action.keys, model.data[keyProperty]);
					if (keyExists) {
						updatedEdited[key] = {
							...model,
							data: {...model.data, [keyProperty]: null},
						};
						propertyUpdated = true;
					} else {
						updatedEdited[key] = model;
					}
				} else if (model.data && model.data[keysProperty]) {
					let updatedKeys = _.difference(model.data[keysProperty], action.keys);
					if (updatedKeys.length !== model.data[keysProperty]) {
						updatedEdited[key] = {
							...model,
							data: {...model.data, [keysProperty]: updatedKeys},
						};
						propertyUpdated = true;
					} else {
						updatedEdited[key] = model;
					}
				} else {
					updatedEdited[key] = model;
				}
			});
			return propertyUpdated ? {...state, editedByKey: updatedEdited} : state;
		} else {
			return state;
		}
	},

	setActive: (state, action) => {
		return {...state, activeKey: action.key, activeKeys: null};
	},

	setActiveMultiple: (state, action) => {
		return {...state, activeKeys: action.keys, activeKey: null};
	},

	updateEdited: (state, action) => {
		let newEditedData = {...state.editedByKey};
		if (action.data && action.data.length) {
			action.data.forEach(model => {
				if (newEditedData[model.key]) {
					newEditedData[model.key] = {
						...newEditedData[model.key],
						data: {
							...newEditedData[model.key].data,
							...model.data,
						},
					};
				} else {
					newEditedData[model.key] = model;
				}
			});
		}
		return {...state, editedByKey: newEditedData};
	},

	clearIndexes: (state, action) => {
		let indexes = _.map(state.indexes, index => {
			return {
				...index,
				index: null,
				count: null,
				changedOn: null,
				outdated: index.index,
				outdatedCount: index.count,
			};
		});

		return {
			...state,
			indexes: indexes.length ? indexes : null,
		};
	},

	/**
	 * Useful for invalidate data before refresh indexes
	 * action.order
	 * action.filter
	 * */
	clearIndex: (state, action) => {
		if (state.indexes) {
			const indexes = state.indexes.map(index => {
				const correspondIndex = commonHelpers.isCorrespondingIndex(
					index,
					action.filter,
					action.order
				);
				if (correspondIndex) {
					index.outdated = index.index;
					index.outdatedCount = index.count;
					index.index = null;
					index.count = null;
					index.changedOn = null;
				}
				return index;
			});

			return {
				...state,
				indexes: [...indexes],
			};
		} else {
			return state;
		}
	},

	dataSetOutdated: (state, action) => {
		if (state.byKey) {
			let byKey = {};
			_.each(state.byKey, (model, key) => {
				byKey[key] = {
					...model,
					outdated: true,
				};
			});
			return {
				...state,
				byKey,
			};
		} else {
			return state;
		}
	},

	cleanupOnLogout: (state, action) => {
		if (state.byKey) {
			let byKey = {};
			_.each(state.byKey, (model, key) => {
				if (model.permissions && model.permissions.guest.get) {
					byKey[key] = {
						...model,
						permissions: {
							guest: model.permissions.guest,
						},
					};
				}
			});
			return {...state, byKey};
		} else {
			return state;
		}
	},

	/**
	 * Update whole state
	 * @param state {Object}
	 * @param action {Object}
	 * @return {Object}
	 */
	updateStore: (state, action) => {
		if (action) {
			const {type, ...data} = action;
			return {...state, ...data};
		} else {
			return state;
		}
	},
};
