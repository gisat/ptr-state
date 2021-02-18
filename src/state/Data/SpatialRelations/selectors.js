import common from '../../_common/selectors';

const getSubstate = state => state.data.spatialRelations;

const getIndex = common.getIndex(getSubstate);

export default {
	getIndex,
};
