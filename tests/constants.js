export const sampleSubstoreName = 'sub';

// Selectors -------------------------------------------------------------------
const baseMetadataSelectors = [
	'getActive',
	'getActiveKey',
	'getAll',
	'getAllAsObject',
	'getByKey',
	'getByKeys',
	'getByKeysAsObject',
	'getDataByKey',
	'getDeletePermissionByKey',
	'getEditedActive',
	'getEditedAll',
	'getEditedAllAsObject',
	'getEditedByKey',
	'getEditedDataByKey',
	'getEditedKeys',
	'getIndexed',
	'getStateToSave',
	'getSubstate',
	'getUpdatePermissionByKey',
	'getUsedKeysForComponent',
	'haveAllKeysRegisteredUse',
];

export const expectedMetadataSelectors = [
	...baseMetadataSelectors,
	'getActiveKeys',
	'getActiveModels',
];

export const expectedScopesSelectors = [...baseMetadataSelectors];
export const expectedLayerTreesSelectors = [...baseMetadataSelectors];
export const expectedStylesSelectors = [...baseMetadataSelectors];
export const expectedViewsSelectors = [...baseMetadataSelectors];

// Action types ----------------------------------------------------------------
const baseMetadataActionTypes = [
	'ADD',
	'ADD_UNRECEIVED',
	'DELETE',
	'MARK_DELETED',
	'EDITED.REMOVE',
	'EDITED.REMOVE_PROPERTY',
	'EDITED.UPDATE',
	'ENSURE.ERROR',
	'INDEX.ADD',
	'INDEX.CLEAR_INDEX',
	'INDEX.CLEAR_ALL',
	'LOAD.ERROR',
	'LOAD.REQUEST',
	'UPDATE_STORE',
	'USE.INDEXED.CLEAR',
	'USE.INDEXED.CLEAR_ALL',
	'USE.INDEXED.REGISTER',
	'USE.KEYS.CLEAR',
	'USE.KEYS.REGISTER',
];

export const expectedSpecificMetadataActionTypes = [
	...baseMetadataActionTypes,
	'EDITED.REMOVE_ACTIVE',
	'SET_ACTIVE_KEY',
	'SET_ACTIVE_KEYS',
];

export const expectedLayerTreesActionTypes = [...baseMetadataActionTypes];
export const expectedScopesActionTypes = [
	...baseMetadataActionTypes,
	'EDITED.REMOVE_ACTIVE',
	'SET_ACTIVE_KEY',
];
export const expectedViewsActionTypes = [
	...baseMetadataActionTypes,
	'EDITED.REMOVE_ACTIVE',
	'SET_ACTIVE_KEY',
];

export const expectedCommonMetadataActionTypes = [
	'COMMON.DATA.SET_OUTDATED',
	'COMMON.DATA.CLEANUP_ON_LOGOUT',
];
