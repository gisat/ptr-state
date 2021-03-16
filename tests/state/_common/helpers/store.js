export default function getStoreSet() {
	let dispatchedActions = [];

	const clearDispatchedActions = function () {
		dispatchedActions = [];
	};

	const getDispatch = (getState, optDispatch) => {
		return action => {
			const dispatch = getDispatch(getState, optDispatch);
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					//apply reducer
					if (optDispatch) {
						//skip if action is Promise instance
						if (typeof res === 'object' && typeof res.then === 'function') {
							//do nothing
						} else {
							optDispatch(res);
						}
					}
					dispatchedActions.push(res);
				}

				return res;
			}

			if (optDispatch) {
				optDispatch(action);
			}
			dispatchedActions.push(action);
		};
	};

	const runFunctionActions = function ({dispatch, getState}) {
		return new Promise((resolve, reject) => {
			const promises = [];
			for (let i = 0; i < dispatchedActions.length; i++) {
				const action = dispatchedActions[i];

				if (typeof action === 'function') {
					promises.push(action(dispatch, getState));
					dispatchedActions[i] = null;
				} else if (action instanceof Promise) {
					promises.push(action);
					dispatchedActions[i] = null;
				} else if (Array.isArray(action)) {
					dispatchedActions = [...dispatchedActions, ...action];
					dispatchedActions[i] = null;
				}
			}

			dispatchedActions = dispatchedActions.filter(a => a != null);

			if (promises.length > 0) {
				return Promise.all(promises)
					.then(() => runFunctionActions({dispatch, getState}))
					.then(() => resolve());
			}

			resolve();
		});
	};

	const getDispatchedActions = () => {
		return [...dispatchedActions];
	};

	return {
		getDispatchedActions,
		clearDispatchedActions,
		getDispatch,
		runFunctionActions,
	};
}
