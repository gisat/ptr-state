import {connect} from 'react-redux';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {utils} from '@gisatcz/ptr-utils'

const mapStateToProps = (state, ownProps) => {
	if (ownProps.stateMapSetKey) {
		return {
			activeMapKey: Select._deprecatedMaps.getMapSetActiveMapKey(state, ownProps.stateMapSetKey),
			activeMapView: Select._deprecatedMaps.getMapSetActiveMapView(state, ownProps.stateMapSetKey),
			maps: Select._deprecatedMaps.getMapSetMapKeys(state, ownProps.stateMapSetKey),
			view: Select._deprecatedMaps.getMapSetView(state, ownProps.stateMapSetKey),
			viewLimits: Select._deprecatedMaps.getMapSetViewLimits(state, ownProps.stateMapSetKey)
		}
	} else {
		return {
			backgroundLayer: Select._deprecatedMaps.getBackgroundLayer(state, ownProps.backgroundLayer),
			layers: Select._deprecatedMaps.getLayers(state, ownProps.layers)
		}
	}
};

const mapDispatchToPropsFactory = () => {
	const componentId = 'MapSet_' + utils.randomString(6);

	return (dispatch, ownProps) => {
		if (ownProps.stateMapSetKey) {
			return {
				updateView: (update) => {
					dispatch(Action._deprecatedMaps.updateSetView(ownProps.stateMapSetKey, update));
				},
				resetHeading: (mapKey) => {
					dispatch(Action._deprecatedMaps.resetViewHeading(mapKey));
				},
				onMapRemove: (mapKey) => {
					dispatch(Action._deprecatedMaps.removeMap(mapKey));
				}
			}
		} else {
			let setKey = ownProps.setKey || componentId;
			return {
				onMount: () => {
					dispatch(Action._deprecatedMaps.use(setKey, ownProps.backgroundLayer, ownProps.layers));
				},

				onUnmount: () => {
					dispatch(Action._deprecatedMaps.useClear(setKey));
				},

				refreshUse: () => {
					dispatch(Action._deprecatedMaps.use(setKey, ownProps.backgroundLayer, ownProps.layers));
				},
			}
		}
	}
};

export default connect(mapStateToProps, mapDispatchToPropsFactory);
