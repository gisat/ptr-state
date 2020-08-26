import attributeRelations from './AttributeRelations/actions';
import attributeDataSources from './AttributeDataSources/actions';
import attributeData from './AttributeData/actions';
import spatialRelations from './SpatialRelations/actions';
import spatialDataSources from './SpatialDataSources/actions';
import spatialData from './SpatialData/actions';

import Select from "../Select";

/**
 * @param filter {Object}
 * @return {function}
 */
function ensure(filter) {
    return (dispatch, getState) => {

        // Filter params - see Panther docs: Code/API/Data endpoint
        const {relationsFilter, spatialFilter, attributeFilter, order, offset, limit, attributeKeys, featureKeys, geometry} = filter;

        // select indexes
        const spatialRelationsIndex = Select.data.spatialRelations.getIndex(getState(), spatialFilter, order);
        const attributeRelationsIndex = Select.data.spatialRelations.getIndex(getState(), spatialFilter, order);


            // complete -> data sources - continue
            // incomplete -> loading of relations, ds, data - break

        // select data sources by key in relations
            // completed -> data - continue
            // incomplete -> loading of ds, data - break

        // ensure data
    }
}

export default {
    attributeData,
    attributeDataSources,
    attributeRelations,
    spatialData,
    spatialDataSources,
    spatialRelations
}
