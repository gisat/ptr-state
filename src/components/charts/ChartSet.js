import {connect} from 'react-redux';
import Select from '../../state/Select';

const mapStateToProps = (state, ownProps) => {
    return {
        set: Select.charts.getSetByKey(state, ownProps.setKey),
        charts: Select.charts.getChartsBySetKeyAsObject(state, ownProps.setKey),
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // Action.charts.add
    }
};

export default connect(mapStateToProps, mapDispatchToProps);
