import {connect} from 'react-redux';
import Action from '../../state/Action';
import Select from '../../state/Select';

const mapStateToProps = (state, ownProps) => {
	let mapKey = Select._deprecatedMaps.getActiveMapKey(state);

	return {
		view: Select._deprecatedMaps.getView(state, mapKey),
		mapKey
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateView: (update, mapKey) => {
			dispatch(Action._deprecatedMaps.updateMapAndSetView(mapKey, update))
		},
		resetHeading: (mapKey) => {
			//todo disable button while reseting
			dispatch(Action._deprecatedMaps.resetViewHeading(mapKey))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps);
