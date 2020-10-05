import attributeRelations from './AttributeRelations/actions';
import attributeDataSources from './AttributeDataSources/actions';
import attributeData from './AttributeData/actions';
import spatialRelations from './SpatialRelations/actions';
import spatialDataSources from './SpatialDataSources/actions';
import spatialData from './SpatialData/actions';
import request from '../_common/request';
import commonActions from '../_common/actions';

import Select from "../Select";


const DEFAULT_RELATIONS_PAGNIATIONS = {
    offset: 0,
    limit: 100,
}

/**
 * @param filter {Object}
 * @return {function}
 */
function ensure(filter) {
    return (dispatch, getState) => {

        // Filter params - see Panther docs: Code/API/Data endpoint
        const {modifiers, layerTemplateKey, areaTreeLevelKey, styleKey, data} = filter;
        const {spatialFilter} = data;

        // select indexes
        const order = null;
        let areaRelationsIndex;
        if(areaTreeLevelKey) {
            areaRelationsIndex = Select.data.attributeRelations.getIndex(getState(), {...modifiers, areaTreeLevelKey}, order);
        }
        
        let spatialRelationsIndex;
        if(layerTemplateKey) {
            spatialRelationsIndex = Select.data.spatialRelations.getIndex(getState(),  {...modifiers, layerTemplateKey}, order);
        }

        const attributeRelationsIndex = Select.data.spatialRelations.getIndex(getState(), modifiers, order);
        
        
            // complete -> data sources - continue
            // incomplete -> loading of relations, ds, data - break

        // select data sources by key in relations
            // completed -> data - continue
            // incomplete -> loading of ds, data - break

        // ensure data



        const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const PAGE_SIZE = localConfig.requestPageSize || configDefaults.requestPageSize;

        if ((spatialRelationsIndex !== null || areaRelationsIndex !== null) && attributeRelationsIndex !== null) {
            //which data to load
        } else {
            const relations = {
                // start: 0,
                // length: 1000,
                offset: 0,
                limit: PAGE_SIZE,
            };
            const attributeFilter = null;
            const loadGeometry = true;
            const dataSourceKeys = null;
            const featureKeys = null;
            const spatialIndex = null;
            if(spatialFilter && !_.isEmpty(spatialFilter)) {
                return dispatch(loadIndexedPage(modifiers, layerTemplateKey, areaTreeLevelKey, styleKey, relations, featureKeys, spatialIndex, spatialFilter, attributeFilter, loadGeometry, dataSourceKeys, order)).then((response) => {
                    const promises = [];

                    // load remaining relations pages
                    // What is higer to load? attributeRelations or spatialRelations
                    const remainingRelationsPageCount = Math.ceil((Math.max(response.total.attributeRelations, response.total.spatialRelations) - PAGE_SIZE) / PAGE_SIZE);

                    for (let i = 0; i < remainingRelationsPageCount; i++) {
                        const relations = {
                            offset: (i + 1) * PAGE_SIZE,
                            limit: PAGE_SIZE
                        };
                        promises.push(dispatch(loadIndexedPage(modifiers, layerTemplateKey, areaTreeLevelKey, styleKey, relations, featureKeys, spatialIndex, spatialFilter, attributeFilter, loadGeometry, dataSourceKeys, order)))
                    }

                    //load rest tiles

                    const remainingTilesPageCount = spatialFilter.tiles.length;
                    //first tile is loaded while first request
                    for (let i = (remainingRelationsPageCount + 1 + remainingRelationsPageCount); i < remainingTilesPageCount; i++) {
                        const spatialIndex = {
                            tiles: [spatialFilter.tiles[i]],
                        };
                        promises.push(dispatch(loadIndexedPage(modifiers, layerTemplateKey, areaTreeLevelKey, styleKey, relations, featureKeys, spatialIndex, spatialFilter, attributeFilter, loadGeometry, dataSourceKeys, order)))
                    }

                    return Promise.all(promises);
                }).catch((err)=>{
                    if (err.message === 'Index outdated'){
                        dispatch(refreshIndex(getSubstate, dataType, filter, order, actionTypes, categoryPath));
                    } else {
                        throw new Error(`_common/actions#ensure: ${err}`);
                    }
                });
            } else {
                return dispatch(commonActions.actionGeneralError(new Error('Missing spatial filter XX')));
            }
        }
            // complete -> data sources - continue
            // incomplete -> loading of relations, ds, data - break

        // select data sources by key in relations
            // completed -> data - continue
            // incomplete -> loading of ds, data - break

        // ensure data
    }
}



function loadIndexedPage(modifiers, layerTemplateKey, areaTreeLevelKey, styleKey, relations, featureKeys, spatialIndex, spatialFilter, attributeFilter, loadGeometry, dataSourceKeys, order) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const PAGE_SIZE = localConfig.requestPageSize || configDefaults.requestPageSize;
		const apiPath = 'backend/rest/data/filtered';

		let payload = {
            modifiers,

            // which layer you want
            ...(layerTemplateKey && {layerTemplateKey}),
            ...(areaTreeLevelKey && {areaTreeLevelKey}),

            // get attributes from style
            ...(styleKey && {styleKey}),

            // pagination for relations (& data sources)
            ...(relations && {relations} || DEFAULT_RELATIONS_PAGNIATIONS),

            data: {
                // list of features you want
                ...(featureKeys && {featureKeys}),

                // which tiles you want (pseudo-pagination)
                // spatialIndex: {
                //     tiles: [[lon, lat], ...],
                // },
                ...(spatialIndex && {spatialIndex}),

                // extent
                spatialFilter,

                // filter features by attribute value
                // attributeFilter: {
                //     'attribute-uuid': "blue",
                //     'attribute-uuid': {
                //         in: [12, 13]
                //     },
                //     ...
                // },
                ...(attributeFilter && {attributeFilter}),
                
                //request for geometry
                geometry: loadGeometry === false ? false : true,
                
                // use data source keys as filter or add them to filter
                ...(dataSourceKeys && {dataSourceKeys}),
            },
        };

		return request(localConfig, apiPath, 'POST', null, payload)
			.then(result => {
				if (result.errors) {
					throw new Error(result.errors[dataType] || 'no data');
				} else {
                    if(result.data) {
                        const mergedRelationsSpatialFilter = {
                            ...modifiers,
                            ...(layerTemplateKey && {layerTemplateKey}),
                            ...(areaTreeLevelKey && {areaTreeLevelKey}),
                        }
                        if(result.data.spatialRelations) {
                            //TODO relations.offset
                            const changes = null;
                            dispatch(spatialRelations.receiveIndexed(result.data.spatialRelations, mergedRelationsSpatialFilter, order, relations.offset, result.total.spatialRelations, changes));
                        }

                        if(result.data.spatialDataSources) {
                            //TODO relations.offset
                            //TODO result.total.spatialRelations ?
                            const changes = null;
                            dispatch(spatialDataSources.receiveIndexed(result.data.spatialDataSources, mergedRelationsSpatialFilter, order, relations.offset, result.total.spatialRelations, changes));
                        }

                        if(result.data.spatialData) {
                            //TODO add level to indexes on BE?
                            //TODO indexes
                            const changes = null;
                            const level = spatialFilter.level
                            dispatch(spatialData.receiveIndexed(result.data.spatialData, mergedRelationsSpatialFilter, level, order, changes));
                        }
                        return result;
                    } else {
                        const error = new Error('no data');
                        dispatch(commonActions.actionGeneralError(error));        
                        return error;
                    }

					// dispatch(receiveIndexedAttribute(result, filter, order, start));
				}
			})
			.catch(error => {
				dispatch(commonActions.actionGeneralError(error));
				return error; //todo do we need to return this
			});
	};
}

export default {
    attributeData,
    attributeDataSources,
    attributeRelations,
    spatialData,
    spatialDataSources,
    spatialRelations,

    ensure
}
