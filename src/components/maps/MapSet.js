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
			viewLimits: Select.maps.getMapSetViewLimits(state, ownProps.stateMapSetKey)
		}
	} else {
		return {
			backgroundLayer: null,
			layers: null
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

				},
				onMapRemove: (mapKey) => {

				}
			}
		} else {
			let setKey = ownProps.setKey || componentId;
			return {
				onMount: () => {

				},

				onUnmount: () => {

				},

				refreshUse: () => {

				},
			}
		}
	}
};

export default connect(mapStateToProps, mapDispatchToPropsFactory);
