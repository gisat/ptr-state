import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reduxBatch} from '@manaflair/redux-batch';
import {connect, Provider} from 'react-redux';

import connects from "./components/connects";

import commonActionTypes from "./constants/ActionTypes";
import Action from "./state/Action";
import Select from "./state/Select";

import commonActions from "./state/_common/actions";
import commonHelpers from "./state/_common/helpers";
import commonReducers, {DEFAULT_INITIAL_STATE} from "./state/_common/reducers";
import commonSelectors from "./state/_common/selectors";

import appReducers from './state/App/reducers';
import areasReducers from './state/Areas/reducers';
import areaRelationsReducers from './state/AreaRelations/reducers';
import attributesReducers from './state/Attributes/reducers';
import attributeDataReducers from './state/AttributeData/reducers';
import attributeDataSourcesReducers from './state/AttributeDataSources/reducers';
import attributeRelationsReducers from './state/AttributeRelations/reducers';
import attributeSetsReducers from './state/AttributeSets/reducers';
import casesReducers from './state/Cases/reducers';
import componentsReducers from './state/Components/reducers';
import chartsReducers from './state/Charts/reducers';
import layerPeriodsReducers from './state/LayerPeriods/reducers';
import layerTemplatesReducers from './state/LayerTemplates/reducers';
import layerTreesReducers from './state/LayerTrees/reducers';
import mapsReducers from './state/Maps/reducers';
import periodsReducers from './state/Periods/reducers';
import placesReducers from './state/Places/reducers';
import scenariosReducers from './state/Scenarios/reducers';
import scopesReducers from './state/Scopes/reducers';
import screensReducers from './state/Screens/reducers';
import selectionsReducers from './state/Selections/reducers';
import snapshotsReducers from './state/Snapshots/reducers';
import spatialDataReducers from './state/SpatialData/reducers';
import spatialDataSourcesReducers from './state/SpatialDataSources/reducers';
import spatialVectorDataSourcesReducers from './state/SpatialDataSources/vector/reducers';
import spatialRelationsReducers from './state/SpatialRelations/reducers';
import stylesReducers from './state/Styles/reducers';
import attributeStatisticsReducers from './state/AttributeStatistics/reducers';
import tagsReducers from './state/Tags/reducers';
import usersReducers from './state/Users/reducers';
import viewsReducers from './state/Views/reducers';
import windowsReducers from './state/Windows/reducers';


const baseStores = {
	app: appReducers,
	areas: areasReducers,
	areaRelations: areaRelationsReducers,
	attributes: attributesReducers,
	attributeRelations: attributeRelationsReducers,
	attributeStatistics: attributeStatisticsReducers,
	attributeSets: attributeSetsReducers,
	attributeData: attributeDataReducers,
	attributeDataSources: attributeDataSourcesReducers,
	cases: casesReducers,
	charts: chartsReducers,
	components: componentsReducers,
	layerPeriods: layerPeriodsReducers,
	layerTemplates: layerTemplatesReducers,
	layerTrees: layerTreesReducers,
	maps: mapsReducers,
	periods: periodsReducers,
	places: placesReducers,
	scenarios: scenariosReducers,
	scopes: scopesReducers,
	screens: screensReducers,
	selections: selectionsReducers,
	snapshots: snapshotsReducers,
	spatialData: spatialDataReducers,
	spatialDataSources: spatialDataSourcesReducers,
	spatialVectorDataSources: spatialVectorDataSourcesReducers,
	spatialRelations: spatialRelationsReducers,
	styles: stylesReducers,
	tags: tagsReducers,
	users: usersReducers,
	views: viewsReducers,
	windows: windowsReducers,
};

const createBaseStore = (specificStores, rootStores, middleware) => {
	let appliedMiddleware = applyMiddleware(thunk, ...middleware);
	if (process.env.NODE_ENV === 'development') {
		appliedMiddleware = applyMiddleware(thunk, logger, ...middleware);
	}
	let stores = specificStores ? {...baseStores, ...rootStores, specific: combineReducers(specificStores)} : {...baseStores, ...rootStores};
	return createStore(combineReducers(stores), compose(reduxBatch, appliedMiddleware, reduxBatch, applyMiddleware(thunk), reduxBatch));
};

export {
	createStore,
	combineReducers,
	applyMiddleware,
	compose,

	connect,
	Provider,

	baseStores,
	createBaseStore,

	connects,

	commonActionTypes,
	Action,
	Select,

	commonActions,
	commonHelpers,
	commonReducers,
	commonSelectors,

	DEFAULT_INITIAL_STATE,

	thunk,
	logger,
	reduxBatch,
}

// TODO remove?
export default {
	commonActionTypes,
	Action,
	Select,

	commonActions,
	commonHelpers,
	commonReducers,
	commonSelectors,

	DEFAULT_INITIAL_STATE
}