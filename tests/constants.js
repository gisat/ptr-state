export const sampleSubstoreName = 'sub';

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

export const expectedSpecificMetadataActionTypes = [
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
	'SET_ACTIVE_KEY',
	'SET_ACTIVE_KEYS',
	'USE.INDEXED.CLEAR',
	'USE.INDEXED.REGISTER',
	'USE.KEYS.CLEAR',
	'USE.KEYS.REGISTER',
];

export const expectedCommonMetadataActionTypes = [
	'COMMON.DATA.SET_OUTDATED',
	'COMMON.DATA.CLEANUP_ON_LOGOUT',
];
