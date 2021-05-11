import {assert} from 'chai';
import getStoreSet from '../../_common/helpers/store';
import commonActionsTests from '../../_common/actions/actions';
import actions from '../../../../src/state/Periods/actions';
import {resetFetch, setFetch} from '../../../../src/state/_common/request';

const commonActions = ['useIndexed', 'useIndexedClear', 'useKeysClear'];
const store = 'PERIODS';
const dataType = 'periods';
const categoryPath = 'metadata';

describe('Cases/actions/_common', () => {
	const storeHelpers = getStoreSet();

	let getState = () => ({});

	let dispatch = storeHelpers.getDispatch(getState);

	afterEach(function () {
		resetFetch();
		storeHelpers.clearDispatchedActions();
	});

	commonActions.forEach(action => {
		const tests = commonActionsTests[action];
		tests.forEach(test => {
			it(test.name, () => {
				if (test.setFetch) {
					setFetch(test.setFetch(dataType, categoryPath));
				}

				if (typeof test.getState === 'function') {
					getState = test.getState(dataType);
					dispatch = storeHelpers.getDispatch(getState);
					dispatch(test.action(actions));
				} else {
					dispatch(test.action(actions));
				}

				return storeHelpers
					.runFunctionActions({dispatch, getState})
					.then(() => {
						assert.deepStrictEqual(
							storeHelpers.getDispatchedActions(),
							test.dispatchedActions.map(a => ({
								...a,
								type: `${store}.${a.type}`,
							}))
						);
					});
			});
		});
	});
});
