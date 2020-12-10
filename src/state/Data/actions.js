import attributeRelations from './AttributeRelations/actions';
import attributeDataSources from './AttributeDataSources/actions';
import attributeData from './AttributeData/actions';
import spatialRelations from './SpatialRelations/actions';
import spatialDataSources from './SpatialDataSources/actions';
import spatialData from './SpatialData/actions';
import request from '../_common/request';
import commonActions from '../_common/actions';

import Select from "../Select";
import {getMissingTiles} from './helpers';

const DEFAULT_RELATIONS_PAGE = {
    offset: 0,
    limit: 100,
}

const isSpatialDataEmpty = (spatialData) => {
    if(spatialData && !_.isEmpty(spatialData) ) {
        const sd = Object.values(spatialData);
        return !sd.some(data => data?.data && !_.isEmpty(data.data));
    } else {
        return true;
    }
}

/**
 * @return {function}
 */
//FIXME - load missing attribute data?
function loadMissingAttributeData(spatialFilter, styleKey, order, mergedSpatialFilter, mergedAttributeFilter) {
    return (dispatch, getState) => {
        const localConfig = Select.app.getCompleteLocalConfiguration(getState());
        const PAGE_SIZE = localConfig.requestPageSize || configDefaults.requestPageSize;

        //which spatial data to load

        //get spatial data index with loaded and loading data
        const attributeDataIndex = Select.data.attributeData.getIndex(getState(),  mergedAttributeFilter, order) || [];
        
        //diff spatial data loaded/loading and to load
        const missingAttributeDataTiles = getMissingTiles(attributeDataIndex, spatialFilter) || [];
        const promises = [];

        //if no relations or ds, then load them in first request
        const attributeRelations = Select.data.attributeRelations.getIndex(getState(),  mergedAttributeFilter, order);
        const attributeDataSources = Select.data.attributeDataSources.getIndex(getState(),  mergedAttributeFilter, order);
        let loadRelationsAndDS = !(!_.isEmpty(attributeRelations) && !_.isEmpty(attributeDataSources));

        for (const tile of missingAttributeDataTiles) {
            const spatialIndex = {
                tiles: [tile],
            }

            // TODO
            // relations:false
            const relations = {
                // start: 0,
                // length: 1000,
                offset: 0,
                limit: PAGE_SIZE,
            };
            const attributeFilter = null;
            const loadGeometry = false;

            //only if missing on first request
            let loadRelations = false;
            if(loadRelationsAndDS) {
                loadRelations = true;
                loadRelationsAndDS = false;
            };

            const dataSourceKeys = null;
            const featureKeys = null;
            promises.push(dispatch(loadIndexedPage(styleKey, relations, featureKeys, spatialIndex, spatialFilter, attributeFilter, loadGeometry, loadRelations, dataSourceKeys, order, mergedSpatialFilter, mergedAttributeFilter))) 
        }
        return Promise.all(promises);
    }
}

/**
 * @return {function}
 */
function loadMissingSpatialData(spatialFilter, styleKey, order, mergedSpatialFilter, mergedAttributeFilter) {
    return (dispatch, getState) => {
        //which spatial data to load

        //get spatial data index with loaded and loading data
        const spatialDataIndex = Select.data.spatialData.getIndex(getState(),  mergedSpatialFilter, order) || [];
        
        //diff spatial data loaded/loading and to load
        const missingSpatialDataTiles = getMissingTiles(spatialDataIndex, spatialFilter) || [];
        const promises = [];
        for (const tile of missingSpatialDataTiles) {
            const spatialIndex = {
                tiles: [tile],
            }

            // TODO
            // relations:false
            const relations = {};
            const attributeFilter = null;
            const loadGeometry = true;
            const loadRelations = false;
            const dataSourceKeys = null;
            const featureKeys = null;
            promises.push(dispatch(loadIndexedPage(styleKey, relations, featureKeys, spatialIndex, spatialFilter, attributeFilter, loadGeometry, loadRelations, dataSourceKeys, order, mergedSpatialFilter, mergedAttributeFilter))) 
        }
        return Promise.all(promises);
    }
}
/**
 * @return {function}
 */
function ensureDataAndRelations(spatialFilter, styleKey, order, mergedSpatialFilter, mergedAttributeFilter) {
    return (dispatch, getState) => {
        const localConfig = Select.app.getCompleteLocalConfiguration(getState());
        const PAGE_SIZE = localConfig.requestPageSize || configDefaults.requestPageSize;

        const relations = {
            // start: 0,
            // length: 1000,
            offset: 0,
            limit: PAGE_SIZE,
        };
        const attributeFilter = null;
        const loadGeometry = true;
        const loadRelations = true;
        const dataSourceKeys = null;
        const featureKeys = null;
        const spatialIndex = null;
        if(spatialFilter && !_.isEmpty(spatialFilter)) {
            return dispatch(loadIndexedPage(styleKey, relations, featureKeys, spatialIndex, spatialFilter, attributeFilter, loadGeometry, loadRelations, dataSourceKeys, order, mergedSpatialFilter, mergedAttributeFilter)).then((response) => {
                if(response instanceof Error) {
                    return;
                    throw response;
                }
                
                const promises = [];

                //Check if some of returned spatialDataSources are type of vector. Otherwise theri is no reason to make further requests.
                const spatialDataSources = response?.data?.spatialDataSources || [];
                const allSourcesAreVectors = spatialDataSources.every(ds => ds.data?.type === 'vector');
                if(!allSourcesAreVectors) {
                    return
                }

                // load remaining relations pages
                // What is higer to load? attributeRelations or spatialRelations
                const remainingRelationsPageCount = Math.ceil((Math.max(response.total.attributeRelations, response.total.spatialRelations) - PAGE_SIZE) / PAGE_SIZE);
                let tilesPagination = 0;
                for (let i = 0; i < remainingRelationsPageCount; i++) {
                    const relations = {
                        offset: (i + 1) * PAGE_SIZE,
                        limit: PAGE_SIZE
                    };

                    tilesPagination = i + 1;
                    const spatialIndex = {
                        tiles: [spatialFilter.tiles[tilesPagination]],
                    };
                    promises.push(dispatch(loadIndexedPage(styleKey, relations, featureKeys, spatialIndex, spatialFilter, attributeFilter, loadGeometry, loadRelations, dataSourceKeys, order, mergedSpatialFilter, mergedAttributeFilter)))
                }

                //load rest tiles
                const remainingTilesPageCount = spatialFilter.tiles.length;
                //first tile is loaded while first request
                for (let i = (tilesPagination + 1); i < remainingTilesPageCount; i++) {
                    const spatialIndex = {
                        tiles: [spatialFilter.tiles[i]],
                    };

                    const relations = {};
                    const loadRestTilesRelations = false;
                    promises.push(dispatch(loadIndexedPage(styleKey, relations, featureKeys, spatialIndex, spatialFilter, attributeFilter, loadGeometry, loadRestTilesRelations, dataSourceKeys, order, mergedSpatialFilter, mergedAttributeFilter)))
                }

                return Promise.all(promises);
            }).catch((err)=>{
                if (err?.message === 'Index outdated'){
                    dispatch(refreshIndex(getSubstate, dataType, filter, order, actionTypes, categoryPath));
                } else {
                    throw new Error(`data/actions#ensure: ${err}`);
                }
            });
        } else {
            return dispatch(commonActions.actionGeneralError(new Error('Missing spatial filter')));
        }
    }
}

const hasMissingAttributesData = (attributeDataIndex, spatialFilter) => {
    const missingAttributeDataTiles = getMissingTiles(attributeDataIndex, spatialFilter) || spatialFilter.tiles;
    return (missingAttributeDataTiles && missingAttributeDataTiles.length && missingAttributeDataTiles.length > 0) ? true : false;
}

const hasMissingSpatialData = (spatialDataIndex, spatialFilter) => {
    const missingSpatialDataTiles = getMissingTiles(spatialDataIndex, spatialFilter) || spatialFilter.tiles;
    return (missingSpatialDataTiles && missingSpatialDataTiles.length && missingSpatialDataTiles.length > 0) ? true : false;
}

const hasSpatialOrAreaRelations = (state, areaTreeLevelKey, layerTemplateKey, mergedSpatialFilter, order) => {
    let spatialRelationsIndex = null;
    let areaRelationsIndex = null;

    if(layerTemplateKey) {
        spatialRelationsIndex = Select.data.spatialRelations.getIndex(state,  mergedSpatialFilter, order);
    }

    // FIXME
    if(areaTreeLevelKey) {
        //FIXME - attributeRelations why?
        // areaRelationsIndex = Select.data.attributeRelations.getIndex(getState(), mergedSpatialFilter, order);
    }
    

    
    return spatialRelationsIndex !== null || areaRelationsIndex !== null

}

/**
 * @param filter {Object}
 * @return {function}
 */
function ensure(filter) {
    return (dispatch, getState) => {

        // Filter params - see Panther docs: Code/API/Data endpoint
        const {styleKey, data, mergedFilter} = filter;
        const {spatialFilter} = data;
        const {areaTreeLevelKey, layerTemplateKey} = mergedFilter;
        const mergedSpatialFilter = mergedFilter;
        const mergedAttributeFilter = {...mergedFilter, styleKey};
        // select indexes
        const order = null;

        const spatialDataIndex = Select.data.spatialData.getIndex(getState(),  mergedSpatialFilter, order) || [];
        const attributeDataIndex = Select.data.attributeData.getIndex(getState(),  mergedAttributeFilter, order) || [];

        const missingAttributesData = hasMissingAttributesData(attributeDataIndex, spatialFilter);
        const missingSpatialData = hasMissingSpatialData(spatialDataIndex, spatialFilter);
        const filterHasSpatialOrAreaRelations = hasSpatialOrAreaRelations(getState(), areaTreeLevelKey, layerTemplateKey, mergedSpatialFilter, order);

        if(!filterHasSpatialOrAreaRelations) {
            return dispatch(ensureDataAndRelations(spatialFilter, styleKey, order, mergedSpatialFilter, mergedAttributeFilter));
        }

        if(missingSpatialData) {
            return dispatch(loadMissingSpatialData(spatialFilter, styleKey, order, mergedSpatialFilter, mergedAttributeFilter));
        }

        if(missingAttributesData) {
            return dispatch(loadMissingAttributeData(spatialFilter, styleKey, order, mergedSpatialFilter, mergedAttributeFilter));
        }

    }
}



function loadIndexedPage(styleKey, relations, featureKeys, spatialIndex, spatialFilter, attributeFilter, loadGeometry, loadRelations, dataSourceKeys, order, mergedSpatialFilter, mergedAttributeFilter) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const PAGE_SIZE = localConfig.requestPageSize || configDefaults.requestPageSize;
		const apiPath = 'backend/rest/data/filtered';

        const {areaTreeLevelKey, layerTemplateKey, ...modifiers} = mergedSpatialFilter
        //what if we have already some DS or DR?
        //check if indexes are loading (ds, dr, data - all)
        const spatialRelationsIndex = Select.data.spatialRelations.getIndex(getState(), mergedSpatialFilter, order);
        const spatialDataSourceIndex = Select.data.spatialDataSources.getIndex(getState(), mergedSpatialFilter, order);
        const spatialDataIndex = Select.data.spatialData.getIndex(getState(),  mergedSpatialFilter, order) || [];
        const attributeDataIndex = Select.data.attributeData.getIndex(getState(),  mergedAttributeFilter, order) || [];
        //if spatialIndex is not defined, then use all tiles from spatialFilter as a missing 
        const missingSpatialDataTiles = getMissingTiles(spatialDataIndex, spatialIndex) || spatialFilter.tiles;
        
        //if spatialIndex is not defined, then use all tiles from spatialFilter as a missing 
        const missingAttributeDataTiles = getMissingTiles(attributeDataIndex, spatialIndex) || spatialFilter.tiles;

        //deside if we need load only attributes data

        if(spatialRelationsIndex && spatialDataSourceIndex && missingSpatialDataTiles?.length === 0 && missingAttributeDataTiles?.length === 0) {
            //only on first render of map, when all maps tryes to load data
            return new Promise((r,rj) => {
            });
        };

        //register indexes

        ////
        // Spatial
        ////
        // TODO register loading index on spatialRelations ?
        if(loadGeometry) {
            dispatch(spatialData.addLoadingIndex(mergedSpatialFilter, order, spatialFilter.level, missingSpatialDataTiles));
        }


        ////
        // Attribute
        ////
        // TODO register loading index on attributeRelations ?

		const payload = {
            modifiers,

            // which layer you want
            ...(layerTemplateKey && {layerTemplateKey}),
            ...(areaTreeLevelKey && {areaTreeLevelKey}),

            // get attributes from style
            ...(styleKey && {styleKey}),

            // pagination for relations (& data sources)
            ...(relations && {relations} || DEFAULT_RELATIONS_PAGE),

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
                
                //request for relations
                relations: loadRelations === false ? false : true,
                
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
						////
						// Attributes
						////
						if(result.data.attributeRelations && !_.isEmpty(result.data.attributeRelations)) {
							//TODO relations.offset
							const changes = null;
							dispatch(attributeRelations.receiveIndexed(result.data.attributeRelations, mergedAttributeFilter, order, relations.offset, result.total.attributeRelations, changes));
						}

						if(result.data.attributeDataSources && !_.isEmpty(result.data.attributeDataSources)) {
							//TODO relations.offset
							//TODO result.total.spatialRelations ?
							const changes = null;
							dispatch(attributeDataSources.receiveIndexed(result.data.attributeDataSources, mergedAttributeFilter, order, relations.offset, result.total.attributeRelations, changes));
						}

						if(result.data.spatialData && result.data.attributeData && !_.isEmpty(result.data.attributeData)) {
							//TODO add level to indexes on BE?
							//TODO indexes
							const changes = null;
							dispatch(attributeData.receiveIndexed(result.data.attributeData, result.data.spatialData, mergedAttributeFilter, order, changes));
						}

                        ////
                        // Spatial data
                        ////

                        if(result.data.spatialRelations && !_.isEmpty(result.data.spatialRelations)) {
                            //TODO relations.offset
                            const changes = null;
                            dispatch(spatialRelations.receiveIndexed(result.data.spatialRelations, mergedSpatialFilter, order, relations.offset, result.total.spatialRelations, changes));
                        }

                        if(result.data.spatialDataSources && !_.isEmpty(result.data.spatialDataSources)) {
                            //TODO relations.offset
                            //TODO result.total.spatialRelations ?
                            const changes = null;
                            dispatch(spatialDataSources.receiveIndexed(result.data.spatialDataSources, mergedSpatialFilter, order, relations.offset, result.total.spatialRelations, changes));
                        }

                        const spatialDataEmpty = isSpatialDataEmpty(result.data.spatialData);
                        if(!spatialDataEmpty) {
                            //TODO add level to indexes on BE?
                            //TODO indexes
                            const changes = null;
                            dispatch(spatialData.receiveIndexed(result.data.spatialData, mergedSpatialFilter, order, changes));
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

    ensure, //todo TESTS
    loadMissingSpatialData, //todo TESTS
    ensureDataAndRelations, //todo TESTS
}
