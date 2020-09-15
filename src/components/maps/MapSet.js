import {connect} from 'react-redux';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {utils} from '@gisatcz/ptr-utils'

const mapStateToProps = (state, ownProps) => {
	if (ownProps.stateMapSetKey) {
		return {
			activeMapKey: null,
			activeMapView: null,
			maps: null,
			view: null,
			viewLimits: null
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
