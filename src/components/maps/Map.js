import {connect} from 'react-redux';
import {setState} from '@jvitela/recompute';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {utils} from '@gisatcz/ptr-utils';

const mapStateToProps = (state, ownProps) => {
	setState(state);

    if (ownProps.stateMapKey) {
        return {
            backgroundLayer: Select.maps.getMapBackgroundLayer(ownProps.stateMapKey),
            layers: null,
            view: Select.maps.getViewByMapKey(state, ownProps.stateMapKey),
            viewLimits: Select.maps.getViewLimitsByMapKey(state, ownProps.stateMapKey),
            mapKey: ownProps.stateMapKey
        }
    } else {
        return {
            backgroundLayer: null,
            layers: null
        }
    }
};

const mapDispatchToPropsFactory = () => {
    const componentId = 'Map_' + utils.randomString(6);

    return (dispatch, ownProps) => {
        if (ownProps.stateMapKey) {
            return {
                onMount: (mapWidth, mapHeight) => {
					dispatch(Action.maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight));
                    dispatch(Action.maps.use(ownProps.stateMapKey, null, null, mapWidth, mapHeight));
                },

                onResize: (mapWidth, mapHeight) => {
                	dispatch(Action.maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight));
                    dispatch(Action.maps.use(ownProps.stateMapKey, null, null, mapWidth, mapHeight));
                },

                onUnmount: () => {

                },

                refreshUse: () => {

                },

                onViewChange: (update) => {
                    dispatch(Action.maps.updateMapAndSetView(ownProps.stateMapKey, update));
                },

                onPropViewChange: (update, mapWidth, mapHeight) => {
					dispatch(Action.maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight));
                    dispatch(Action.maps.use(ownProps.stateMapKey, undefined, undefined, mapWidth, mapHeight));
                },

                resetHeading: () => {

                },

                onClick: (view) => {
                    dispatch(Action.maps.setMapSetActiveMapKey(ownProps.stateMapKey));
                },
                onLayerClick: (mapKey, layerKey, selectedFeatureKeys) => {

                }
            }
        } else {
            let mapKey = ownProps.mapKey || componentId;

            return {
                onMount: () => {
                    dispatch(Action.maps.use(mapKey, ownProps.backgroundLayer, ownProps.layers));
                },

                onUnmount: () => {

                },

                refreshUse: () => {

                },

                onViewChange: ownProps.onViewChange || ((update) => {}),

                onClick: ownProps.onClick || ((view) => {})
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToPropsFactory);
