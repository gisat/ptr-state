import {assert} from 'chai';
import actions from '../../../src/state/Maps/actions';

describe('state/Maps/actions', function () {
	let dispatchedActions = [];
	const dispatch = function (action) {
		dispatchedActions.push(action);
	};

	const clearDispatchedActions = function () {
		dispatchedActions = [];
	};

	afterEach(function () {
		clearDispatchedActions();
	});

	describe('updateMapLayer', function () {

		it('Dispatch update', function () {

			const getState = () => ({
				maps: {
					maps: {
						map1: {
							key: 'map1',
							data: {
								layers: [{
									key: 'layer1'
								}]
							}
						}
					}
				}
			})



			actions.updateMapLayer('map1', 'layer1', {layerTemplateKey: 'layerTemplateKey1'})(dispatch, getState)
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'MAPS.MAP.LAYERS.LAYER.UPDATE',
					mapKey:'map1',
					layerKey:'layer1' ,
					update: {layerTemplateKey: 'layerTemplateKey1'},
				},
			]);
		});

		it('Fail dispatch on undefined layer in state', function () {

			const getState = () => ({
				maps: {
					maps: {
						map1: {
							key: 'map1',
							data: {
								layers: [{
									key: 'layer1'
								}]
							}
						}
					}
				}
			})



			actions.updateMapLayer('map1', 'layer2', {layerTemplateKey: 'layerTemplateKey1'})(dispatch, getState)
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'ERROR',
				},
			]);
		});

		it('Fail dispatch on undefined map', function () {

			const getState = () => ({
				maps: {
					maps: {
						map1: {
							key: 'map1',
							data: {
								layers: [{
									key: 'layer1'
								}]
							}
						}
					}
				}
			})



			actions.updateMapLayer('map2', 'layer1', {layerTemplateKey: 'layerTemplateKey1'})(dispatch, getState)
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'ERROR',
				},
			]);
		});
	});

});
