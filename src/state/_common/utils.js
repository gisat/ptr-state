import {makeSelector} from '@taskworld.com/rereselect';

export function makeParameterizedSelector(
	displayName,
	selectionLogicGenerator
) {
	const memoized = new Map()
	return Object.assign(
		function selectorFactory(...args) {
			const key = args.join(',');
			if (memoized.has(key)) return memoized.get(key);
			const name = `${displayName}(${key})`;
			const selectionLogic = selectionLogicGenerator(...args);
			const selector = makeSelector(selectionLogic);
			selector.displayName = name;
			memoized.set(key, selector);
			return selector;
		},
		{ displayName }
	)
}