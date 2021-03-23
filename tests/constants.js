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
