import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reduxBatch} from '@manaflair/redux-batch';
import {
	setState as setRecomputeState,
	createSelector as createRecomputeSelector,
	createObserver as createRecomputeObserver,
} from '@jvitela/recompute';
import {connect, Provider, ReactReduxContext} from 'react-redux';

import connects from './components/connects';
import MountWrapper from './components/MountWrapper';

import commonActionTypes from './constants/ActionTypes';
import Action from './state/Action';
import Select from './state/Select';

import commonActions from './state/_common/actions';
import commonHelpers from './state/_common/helpers';
import commonReducers, {DEFAULT_INITIAL_STATE} from './state/_common/reducers';
import commonSelectors from './state/_common/selectors';

import activeMetadataActions from './state/_activeMetadata/actions';
import {STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE} from './state/_activeMetadata/constants';

import appReducers from './state/App/reducers';
import areasReducers from './state/Areas/reducers';
import areaRelationsReducers from './state/AreaRelations/reducers';
import attributesReducers from './state/Attributes/reducers';
import attributeSetsReducers from './state/AttributeSets/reducers';
import casesReducers from './state/Cases/reducers';
import componentsReducers from './state/Components/reducers';
import dataReducers from './state/Data/reducers';
import layerTemplatesReducers from './state/LayerTemplates/reducers';
import layerTreesReducers from './state/LayerTrees/reducers';
import mapsReducers from './state/Maps/reducers';
import periodsReducers from './state/Periods/reducers';
import placesReducers from './state/Places/reducers';
import scenariosReducers from './state/Scenarios/reducers';
import scopesReducers from './state/Scopes/reducers';
import screensReducers from './state/Screens/reducers';
import selectionsReducers from './state/Selections/reducers';
import stylesReducers from './state/Styles/reducers';
import tagsReducers from './state/Tags/reducers';
import usersReducers from './state/Users/reducers';
import viewsReducers from './state/Views/reducers';
import windowsReducers from './state/Windows/reducers';

const baseStores = {
	app: appReducers,
	areas: areasReducers,
	areaRelations: areaRelationsReducers,
	attributes: attributesReducers,
	attributeSets: attributeSetsReducers,
	cases: casesReducers,
	components: componentsReducers,
	data: dataReducers,
	layerTemplates: layerTemplatesReducers,
	layerTrees: layerTreesReducers,
	maps: mapsReducers,
	periods: periodsReducers,
	places: placesReducers,
	scenarios: scenariosReducers,
	scopes: scopesReducers,
	screens: screensReducers,
	selections: selectionsReducers,
	styles: stylesReducers,
	tags: tagsReducers,
	users: usersReducers,
	views: viewsReducers,
	windows: windowsReducers,
};

/**
 * Helper function for creating redux store.
 * @param {Object} specificStores Object with speficic store/stores. Stores will by available in state under "specific" key.
 * @param {Array} rootStores Array of redux stores
 * @param {Array} middleware Array of redux middlewares.
 * @param {Object?} preloadedState Optional object used for store initialization as a default state.
 * @returns {Object} redux store instance
 */
const createBaseStore = (
	specificStores,
	rootStores = [],
	middleware = [],
	preloadedState
) => {
	const enhancedThunk = thunk.withExtraArgument(activeMetadataActions);

	let appliedMiddleware = applyMiddleware(enhancedThunk, ...middleware);
	if (process.env.NODE_ENV === 'development') {
		appliedMiddleware = applyMiddleware(enhancedThunk, logger, ...middleware);
	}
	let stores = specificStores
		? {...baseStores, ...rootStores, specific: combineReducers(specificStores)}
		: {...baseStores, ...rootStores};
	if (preloadedState) {
		return createStore(
			combineReducers(stores),
			preloadedState,
			compose(reduxBatch, appliedMiddleware, reduxBatch)
		);
	} else {
		return createStore(
			combineReducers(stores),
			compose(reduxBatch, appliedMiddleware, reduxBatch)
		);
	}
};

export {
	createStore,
	combineReducers,
	applyMiddleware,
	compose,
	connect,
	Provider,
	ReactReduxContext,
	MountWrapper,
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
	activeMetadataActions,
	STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE,
	thunk,
	logger,
	reduxBatch,
	createRecomputeObserver,
	createRecomputeSelector,
	setRecomputeState,
};

// TODO remove?
export default {
	commonActionTypes,
	Action,
	Select,

	commonActions,
	commonHelpers,
	commonReducers,
	commonSelectors,

	DEFAULT_INITIAL_STATE,
};
