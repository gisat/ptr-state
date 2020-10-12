import _ from "lodash";
import common from "../_common/selectors";
import StyleSelectors from "../Styles/selectors";
import {createSelector} from "reselect";
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';

const getSubstate = state => state.selections;
const getActive = common.getActive(getSubstate);
const getActiveKey = common.getActiveKey(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);

const getAllAsObjectWithStyles = createSelector(
	[
		getAllAsObject,
		StyleSelectors.getAllAsObject
	],
	(selections, allStyles) => {
		if (selections) {
			if (allStyles) {
				let selectionsWithStyles = {};
				_.forIn(selections, (selection, key) => {
					const styleKey = selection.data?.styleKey;
					if (styleKey && allStyles[styleKey]) {
						const selectionStyle = allStyles[styleKey].data?.definition?.rules?.[0].styles?.[0]; // TODO get first style of first rule for now
						if (selectionStyle) {
							selectionsWithStyles[key] = {
								...selection,
								data: {
									...selection.data,
									style: selectionStyle
								}
							}
						} else {
							selectionsWithStyles[key] = selection;
						}
					} else {
						selectionsWithStyles[key] = selection;
					}
				});

				return selectionsWithStyles;
			} else {
				return selections;
			}
		}
		else {
			return null;
		}
	}
);

const getAllAsObjectWithStylesObserver = createRecomputeObserver(getAllAsObjectWithStyles);

export default {
	getActiveKey,
	getActive,
	getAllAsObject,

	getAllAsObjectWithStyles,
	getAllAsObjectWithStylesObserver
}