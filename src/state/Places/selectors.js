import {createSelector} from 'reselect';
import {map as mapUtils} from '@gisatcz/ptr-utils';
import common from '../_common/selectors';

const getSubstate = state => state.places;

const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);
const getAllForActiveScope = common.getAllForActiveScope(getSubstate);
const getActiveKey = common.getActiveKey(getSubstate);
const getActiveKeys = common.getActiveKeys(getSubstate);
const getActive = common.getActive(getSubstate);
const getActivePlaces = common.getActiveModels(getSubstate);
const getByKey = common.getByKey(getSubstate);

const getDataByKey = common.getDataByKey(getSubstate);
const getDeletePermissionByKey = common.getDeletePermissionByKey(getSubstate);

const getEditedDataByKey = common.getEditedDataByKey(getSubstate);
const getIndexed = common.getIndexed(getSubstate);
const getUpdatePermissionByKey = common.getUpdatePermissionByKey(getSubstate);
const getUsedKeysForComponent = common.getUsedKeysForComponent(getSubstate);

const haveAllKeysRegisteredUse = common.haveAllKeysRegisteredUse(getSubstate);

const getActiveView = createSelector([getActive], place => {
	if (place && place.data && place.data.bbox) {
		return mapUtils.view.getViewFromBoundingBox(place.data.bbox, true);
	} else {
		return null;
	}
});

export default {
	getAll,
	getAllAsObject,
	getAllForActiveScope,
	getActiveKey,
	getActiveKeys,
	getActive,
	getActivePlaces,
	getActiveView,

	getByKey,

	getDataByKey,
	getDeletePermissionByKey,

	getEditedDataByKey,
	getIndexed,
	getUpdatePermissionByKey,
	getUsedKeysForComponent,
	getSubstate,

	haveAllKeysRegisteredUse,
};
