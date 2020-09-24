import common from '../../_common/selectors';

const getSubstate = (state) => state.data.attributeRelations;

const getIndex = common.getIndex(getSubstate);

export default {
    getIndex
};