import {connect} from 'react-redux';
import Action from '../../state/Action';

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		goToPlace: (placeString) => {
			dispatch(Action._deprecatedMaps.goToPlace(placeString))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps);
