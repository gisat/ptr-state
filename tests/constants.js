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
	'getSubstate',
	'getUsedKeysForComponent',
	'haveAllKeysRegisteredUse',
];

export const expectedMetadataSelectors = [
	...baseMetadataSelectors,
	'getActiveKeys',
	'getActiveModels',
];

export const expectedScopesSelectors = [...baseMetadataSelectors];
