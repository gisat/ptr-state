import {connect} from 'react-redux';
import Action from '../../state/Action';
import Select from '../../state/Select';

const mapStateToProps = (state, ownProps) => {
	let mapKey = Select.maps.getActiveMapKey(state);

	return {
		view: Select.maps.getView(state, mapKey),
		mapKey
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateView: (update, mapKey) => {
			dispatch(Action.maps.updateMapAndSetView(mapKey, update))
		},
		resetHeading: (mapKey) => {
			//todo disable button while reseting
			dispatch(Action.maps.resetViewHeading(mapKey))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps);
