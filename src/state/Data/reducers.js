import {combineReducers} from 'redux';

import attributeRelations from './AttributeRelations/reducers';
import attributeDataSources from './AttributeDataSources/reducers';
import attributeData from './AttributeData/reducers';
import components from './Components/reducers';
import spatialRelations from './SpatialRelations/reducers';
import spatialDataSources from './SpatialDataSources/reducers';
import spatialData from './SpatialData/reducers';

export default combineReducers({
	attributeData,
	attributeDataSources,
	attributeRelations,
	components,
	spatialData,
	spatialDataSources,
	spatialRelations,
});