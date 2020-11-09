import {connect} from 'react-redux';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {utils} from '@gisatcz/ptr-utils';

const mapStateToProps = (state, ownProps) => {
    if (ownProps.stateMapKey) {
        return {
            backgroundLayer: Select.maps.getMapBackgroundLayer(state, ownProps.stateMapKey),
            layers: Select.maps.getMapLayers(state, ownProps.stateMapKey),
            view: Select.maps.getView(state, ownProps.stateMapKey),
            viewLimits: Select.maps.getViewLimits(state, ownProps.stateMapKey),
			viewport: Select.maps.getViewportByMapKey(state, ownProps.stateMapKey),
            mapKey: ownProps.stateMapKey
        }
    } else {
        return {
            backgroundLayer: Select.maps.getBackgroundLayer(state, ownProps.backgroundLayer),
            layers: Select.maps.getLayers(state, ownProps.layers)
        }
    }
};

const mapDispatchToPropsFactory = () => {
    const componentId = 'Map_' + utils.randomString(6);

    return (dispatch, ownProps) => {
        if (ownProps.stateMapKey) {
            return {
                onMount: (mapWidth, mapHeight) => {
                    dispatch(Action.maps.use(ownProps.stateMapKey));
					dispatch(Action.maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight));
                },

                onUnmount: () => {
                    dispatch(Action.maps.useClear(ownProps.stateMapKey));
                },

                refreshUse: () => {
                    dispatch(Action.maps.use(ownProps.stateMapKey));
                },

                onViewChange: (update) => {
                    dispatch(Action.maps.updateMapAndSetView(ownProps.stateMapKey, update));
                },

				onPropViewChange: (update, mapWidth, mapHeight) => {
					dispatch(Action.maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight));
				},

                resetHeading: () => {
                    dispatch(Action.maps.resetViewHeading(ownProps.stateMapKey));
                },

                onClick: (view) => {
                    dispatch(Action.maps.setMapSetActiveMapKey(ownProps.stateMapKey));
                },
                onLayerClick: (mapKey, layerKey, selectedFeatureKeys) => {
                    dispatch(Action.maps.setLayerSelectedFeatureKeys(ownProps.stateMapKey, layerKey, selectedFeatureKeys))
                }
            }
        } else {
            let mapKey = ownProps.mapKey || componentId;

            return {
                onMount: () => {
                    dispatch(Action.maps.use(mapKey, ownProps.backgroundLayer, ownProps.layers));
                },

                onUnmount: () => {
                    dispatch(Action.maps.useClear(mapKey));
                },

                refreshUse: () => {
                    dispatch(Action.maps.use(mapKey, ownProps.backgroundLayer, ownProps.layers));
                },

                onViewChange: ownProps.onViewChange || ((update) => {}),

                onClick: ownProps.onClick || ((view) => {})
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToPropsFactory);
