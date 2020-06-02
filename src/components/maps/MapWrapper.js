import {connect} from 'react-redux';
import Action from '../../state/Action';

const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onMapRemove: (mapKey, setKey) => {
            dispatch(Action.maps.removeMapKeyFromSet(mapKey, setKey));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps);
