import {connect} from 'react-redux';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {utils} from '@gisatcz/ptr-utils'

const mapStateToProps = (state, ownProps) => {
	if (ownProps.stateMapSetKey) {
		return {
			activeMapKey: Select.maps.getMapSetActiveMapKey(state, ownProps.stateMapSetKey),
			activeMapView: Select.maps.getMapSetActiveMapView(state, ownProps.stateMapSetKey),
			maps: Select.maps.getMapSetMapKeys(state, ownProps.stateMapSetKey),
			view: Select.maps.getMapSetView(state, ownProps.stateMapSetKey),
			viewLimits: Select.maps.getMapSetViewLimits(state, ownProps.stateMapSetKey),
			activeMapViewport: Select.maps.getViewportByMapKey(state)
		}
	} else {
		return {
			backgroundLayer: Select.maps.getBackgroundLayer(state, ownProps.backgroundLayer),
			layers: Select.maps.getLayers(state, ownProps.layers)
		}
	}
};

const mapDispatchToPropsFactory = () => {
	const componentId = 'MapSet_' + utils.randomString(6);

	return (dispatch, ownProps) => {
		if (ownProps.stateMapSetKey) {
			return {
				updateView: (update) => {
					dispatch(Action.maps.updateSetView(ownProps.stateMapSetKey, update));
				},
				resetHeading: (mapKey) => {
					dispatch(Action.maps.resetViewHeading(mapKey));
				},
				onMapRemove: (mapKey) => {
					dispatch(Action.maps.removeMap(mapKey));
				}
			}
		} else {
			let setKey = ownProps.setKey || componentId;
			return {
				onMount: () => {
					dispatch(Action.maps.use(setKey, ownProps.backgroundLayer, ownProps.layers));
				},

				onUnmount: () => {
					dispatch(Action.maps.useClear(setKey));
				},

				refreshUse: () => {
					dispatch(Action.maps.use(setKey, ownProps.backgroundLayer, ownProps.layers));
				},
			}
		}
	}
};

export default connect(mapStateToProps, mapDispatchToPropsFactory);
