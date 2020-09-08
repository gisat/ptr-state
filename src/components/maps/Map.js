import {connect} from 'react-redux';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {utils} from '@gisatcz/ptr-utils';

const mapStateToProps = (state, ownProps) => {
    if (ownProps.stateMapKey) {
        return {
            backgroundLayer: Select._deprecatedMaps.getMapBackgroundLayer(state, ownProps.stateMapKey),
            layers: Select._deprecatedMaps.getMapLayers(state, ownProps.stateMapKey),
            view: Select._deprecatedMaps.getView(state, ownProps.stateMapKey),
            viewLimits: Select._deprecatedMaps.getViewLimits(state, ownProps.stateMapKey),
            mapKey: ownProps.stateMapKey
        }
    } else {
        return {
            backgroundLayer: Select._deprecatedMaps.getBackgroundLayer(state, ownProps.backgroundLayer),
            layers: Select._deprecatedMaps.getLayers(state, ownProps.layers)
        }
    }
};

const mapDispatchToPropsFactory = () => {
    const componentId = 'Map_' + utils.randomString(6);

    return (dispatch, ownProps) => {
        if (ownProps.stateMapKey) {
            return {
                onMount: () => {
                    dispatch(Action._deprecatedMaps.use(ownProps.stateMapKey));
                },

                onUnmount: () => {
                    dispatch(Action._deprecatedMaps.useClear(ownProps.stateMapKey));
                },

                refreshUse: () => {
                    dispatch(Action._deprecatedMaps.use(ownProps.stateMapKey));
                },

                onViewChange: (update) => {
                    dispatch(Action._deprecatedMaps.updateMapAndSetView(ownProps.stateMapKey, update));
                },

                resetHeading: () => {
                    dispatch(Action._deprecatedMaps.resetViewHeading(ownProps.stateMapKey));
                },

                onClick: (view) => {
                    dispatch(Action._deprecatedMaps.setMapSetActiveMapKey(ownProps.stateMapKey));
                },
                onLayerClick: (mapKey, layerKey, selectedFeatureKeys) => {
                    dispatch(Action._deprecatedMaps.setLayerSelectedFeatureKeys(ownProps.stateMapKey, layerKey, selectedFeatureKeys))
                }
            }
        } else {
            let mapKey = ownProps.mapKey || componentId;

            return {
                onMount: () => {
                    dispatch(Action._deprecatedMaps.use(mapKey, ownProps.backgroundLayer, ownProps.layers));
                },

                onUnmount: () => {
                    dispatch(Action._deprecatedMaps.useClear(mapKey));
                },

                refreshUse: () => {
                    dispatch(Action._deprecatedMaps.use(mapKey, ownProps.backgroundLayer, ownProps.layers));
                },

                onViewChange: ownProps.onViewChange || ((update) => {}),

                onClick: ownProps.onClick || ((view) => {})
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToPropsFactory);
