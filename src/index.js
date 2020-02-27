import {commonActionTypesDefinitions} from "./constants/ActionTypes";
import Action from "./state/Action";
import Select from "./state/Select";

import commonActions from "./state/_common/actions";
import commonHelpers from "./state/_common/helpers";
import commonReducers, {DEFAULT_INITIAL_STATE} from "./state/_common/reducers";
import commonSelectors from "./state/_common/selectors";

import _deprecatedSelectionsReducers from "./state/_deprecatedSelections/reducers";
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
import layersTreesReducers from './state/LayersTrees/reducers';
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

// TODO obsolete
import spatialVectorDataSourcesActions from './state/SpatialDataSources/vector/actions';
import spatialVectorDataSourcesSelectors from './state/SpatialDataSources/vector/selectors';


const _deprecatedSelectionsActions = Action._deprecatedSelections;
const _deprecatedSelectionsSelectors = Select._deprecatedSelections;

const appActions = Action.app;
const appSelectors = Select.app;

const areaRelationsActions = Action.areaRelations;
const areaRelationsSelectors = Select.areaRelations;

const areasActions = Action.areas;
const areasSelectors = Select.areas;

const attributeDataActions = Action.attributeData;
const attributeDataSelectors = Select.attributeData;

const attributeDataSourcesActions = Action.attributeDataSources;
const attributeDataSourcesSelectors = Select.attributeDataSources;

const attributeRelationsActions = Action.attributeRelations;
const attributeRelationsSelectors = Select.attributeRelations;

const attributesActions = Action.attributes;
const attributesSelectors = Select.attributes;

const attributeSetsActions = Action.attributeSets;
const attributeSetsSelectors = Select.attributeSets;

const attributeStatisticsActions = Action.attributeStatistics;
const attributeStatisticsSelectors = Select.attributeStatistics;

const casesActions = Action.cases;
const casesSelectors = Select.cases;

const chartsActions = Action.charts;
const chartsSelectors = Select.charts;

const componentsActions = Action.components;
const componentsSelectors = Select.components;

const layerPeriodsActions = Action.layerPeriods;
const layerPeriodsSelectors = Select.layerPeriods;

const layersTreesActions = Action.layersTrees;
const layersTreesSelectors = Select.layersTrees;

const layerTemplatesActions = Action.layerTemplates;
const layerTemplatesSelectors = Select.layerTemplates;

const mapsActions = Action.maps;
const mapsSelectors = Select.maps;

const periodsActions = Action.periods;
const periodsSelectors = Select.periods;

const placesActions = Action.places;
const placesSelectors = Select.places;

const scenariosActions = Action.scenarios;
const scenariosSelectors = Select.scenarios;

const scopesActions = Action.scopes;
const scopesSelectors = Select.scopes;

const screensActions = Action.screens;
const screensSelectors = Select.screens;

const selectionsActions = Action.selections;
const selectionsSelectors = Select.selections;

const snapshotsActions = Action.snapshots;
const snapshotsSelectors = Select.snapshots;

const spatialDataActions = Action.spatialData;
const spatialDataSelectors = Select.spatialData;

const spatialDataSourcesActions = Action.spatialDataSources;
const spatialDataSourcesSelectors = Select.spatialDataSources;

const spatialRelationsActions = Action.spatialRelations;
const spatialRelationsSelectors = Select.spatialRelations;

const stylesActions = Action.styles;
const stylesSelectors = Select.styles;

const tagsActions = Action.tags;
const tagsSelectors = Select.tags;

const usersActions = Action.users;
const usersSelectors = Select.users;

const viewsActions = Action.views;
const viewsSelectors = Select.views;

const windowsActions = Action.windows;
const windowsSelectors = Select.windows;

export {
    commonActionTypesDefinitions,
    Action,
    Select,

    commonActions,
    commonHelpers,
    commonReducers,
    commonSelectors,

    DEFAULT_INITIAL_STATE,

    _deprecatedSelectionsActions,
    _deprecatedSelectionsReducers,
    _deprecatedSelectionsSelectors,

    appActions,
    appReducers,
    appSelectors,

    areaRelationsActions,
    areaRelationsReducers,
    areaRelationsSelectors,

    areasActions,
    areasReducers,
    areasSelectors,

    attributeDataActions,
    attributeDataReducers,
    attributeDataSelectors,

    attributeDataSourcesActions,
    attributeDataSourcesReducers,
    attributeDataSourcesSelectors,

    attributeRelationsActions,
    attributeRelationsReducers,
    attributeRelationsSelectors,

    attributesActions,
    attributesReducers,
    attributesSelectors,

    attributeSetsActions,
    attributeSetsReducers,
    attributeSetsSelectors,

    attributeStatisticsActions,
    attributeStatisticsReducers,
    attributeStatisticsSelectors,

    casesActions,
    casesReducers,
    casesSelectors,

    chartsActions,
    chartsReducers,
    chartsSelectors,

    componentsActions,
    componentsReducers,
    componentsSelectors,

    layerPeriodsActions,
    layerPeriodsReducers,
    layerPeriodsSelectors,

    layersTreesActions,
    layersTreesReducers,
    layersTreesSelectors,

    layerTemplatesActions,
    layerTemplatesReducers,
    layerTemplatesSelectors,

    mapsActions,
    mapsReducers,
    mapsSelectors,

    periodsActions,
    periodsReducers,
    periodsSelectors,

    placesActions,
    placesReducers,
    placesSelectors,

    scenariosActions,
    scenariosReducers,
    scenariosSelectors,

    scopesActions,
    scopesReducers,
    scopesSelectors,

    screensActions,
    screensReducers,
    screensSelectors,

    selectionsActions,
    selectionsReducers,
    selectionsSelectors,

    snapshotsActions,
    snapshotsReducers,
    snapshotsSelectors,

    spatialDataActions,
    spatialDataReducers,
    spatialDataSelectors,

    spatialDataSourcesActions,
    spatialDataSourcesReducers,
    spatialDataSourcesSelectors,

    // TODO obsolete
    spatialVectorDataSourcesActions,
    spatialVectorDataSourcesReducers,
    spatialVectorDataSourcesSelectors,

    spatialRelationsActions,
    spatialRelationsReducers,
    spatialRelationsSelectors,

    stylesActions,
    stylesReducers,
    stylesSelectors,

    tagsActions,
    tagsReducers,
    tagsSelectors,

    usersActions,
    usersReducers,
    usersSelectors,

    viewsActions,
    viewsReducers,
    viewsSelectors,

    windowsActions,
    windowsReducers,
    windowsSelectors
}

export default {
    commonActionTypesDefinitions,
    Action,
    Select,

    commonActions,
    commonHelpers,
    commonReducers,
    commonSelectors,

    DEFAULT_INITIAL_STATE
}