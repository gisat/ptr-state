import {utils} from '@gisatcz/ptr-utils';

export default utils.deepKeyMirror({
	INITIALIZE: 'INITIALIZE',

	APP: {
		SET_KEY: null,
		SET_BASE_URL: null,
		SET_LOCAL_CONFIGURATION: null,
		UPDATE_LOCAL_CONFIGURATION: null,
		RECEIVE_CONFIGURATION: null,
	},

	AREAS: {
		AREA_TREE_LEVELS: {
			ADD: null,
			ADD_UNRECEIVED: null,
			ENSURE: {
				ERROR: null,
			},
			INDEX: {
				ADD: null,
				CLEAR_ALL: null,
			},
			LOAD: {
				ERROR: null,
				REQUEST: null,
			},
			SET_ACTIVE_KEY: null,
			USE: {
				INDEXED: {
					CLEAR: null,
					REGISTER: null,
				},
				KEYS: {
					CLEAR: null,
					REGISTER: null,
				},
			},
		},
		AREA_TREES: {
			ADD: null,
			ADD_UNRECEIVED: null,
			ENSURE: {
				ERROR: null,
			},
			INDEX: {
				ADD: null,
				CLEAR_ALL: null,
			},
			LOAD: {
				ERROR: null,
				REQUEST: null,
			},
			SET_ACTIVE_KEY: null,
			USE: {
				INDEXED: {
					CLEAR: null,
					REGISTER: null,
				},
				KEYS: {
					CLEAR: null,
					REGISTER: null,
				},
			},
		},
	},

	AREA_RELATIONS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null,
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null,
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				CLEAR_ALL: null,
				REGISTER: null,
			},
		},
	},

	ATTRIBUTES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null,
		},
		INDEX: {
			ADD: null,
			ADD_BATCH: null,
			CLEAR_ALL: null,
			CLEAR_INDEX: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null,
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null,
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null,
			},
			INDEXED_BATCH: {
				REGISTER: null,
			},
		},
	},

	ATTRIBUTE_SETS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null,
		},
		INDEX: {
			ADD: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null,
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null,
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null,
			},
		},
	},

	CASES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null,
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null,
			CLEAR_INDEX: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null,
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null,
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null,
			},
		},
	},

	COMMON: {
		DATA: {
			CLEANUP_ON_LOGOUT: null,
			SET_OUTDATED: null,
		},
		EDITED: {
			REMOVE_PROPERTY_VALUES: null,
		},
	},

	COMPONENTS: {
		UPDATE: null,
		SET: null,
	},

	DATA: {
		ATTRIBUTE_DATA: {
			ADD: null,
			ADD_WITH_INDEX: null,
			UPDATE: null,
			INDEX: {
				ADD: null,
				REMOVE: null,
			},
		},
		ATTRIBUTE_DATA_SOURCES: {
			ADD: null,
			INDEX: {
				ADD: null,
			},
		},
		ATTRIBUTE_RELATIONS: {
			ADD: null,
			INDEX: {
				ADD: null,
			},
		},
		SPATIAL_DATA: {
			ADD: null,
			ADD_WITH_INDEX: null,
			INDEX: {
				ADD: null,
				REMOVE: null,
			},
		},
		SPATIAL_DATA_SOURCES: {
			ADD: null,
			INDEX: {
				ADD: null,
			},
		},
		SPATIAL_RELATIONS: {
			ADD: null,
			INDEX: {
				ADD: null,
			},
		},
	},

	LAYER_TEMPLATES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null,
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null,
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null,
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null,
			},
		},
	},

	MAPS: {
		SET: {
			SET_ACTIVE_MAP_KEY: null,
			SET_BACKGROUND_LAYER: null,
			VIEW: {
				SET: null,
				UPDATE: null,
			},
		},
		MAP: {
			LAYERS: {
				SET_STYLE_KEY: null,
			},
			VIEWPORT: {
				SET: null,
			},
			VIEW: {
				SET: null,
				UPDATE: null,
			},
		},
		UPDATE: null,
	},

	PERIODS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null,
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null,
			CLEAR_INDEX: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null,
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null,
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null,
			},
		},
	},

	PLACES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null,
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null,
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null,
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null,
			},
		},
	},

	REDIRECT_TO_VIEW: 'REDIRECT_TO_VIEW',

	SCENARIOS: {
		ADD: null,
		ADD_UNRECEIVED: null,
	},

	SCOPES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null,
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null,
		},
		SET_ACTIVE_KEY: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null,
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null,
			},
		},
	},

	SCREENS: {
		ADD: null,
		CLOSE: null,
		OPEN: null,
		REMOVE: null,
		REMOVE_ALL: null,
		RETRACT: null,
		SETS: {
			ADD: null,
			REMOVE: null,
		},
		TOP_HISTORY: null,
		UPDATE: null,
	},

	SELECTIONS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		SET_ACTIVE_KEY: null,
		SET: {
			FEATURE_KEYS_FILTER: {
				KEYS: null,
			},
		},
		CLEAR: {
			FEATURE_KEYS_FILTER: null,
		},
	},

	STYLES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null,
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null,
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				CLEAR_ALL: null,
				REGISTER: null,
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null,
			},
		},
	},

	TAGS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null,
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null,
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null,
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null,
			},
		},
	},

	USERS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		GROUPS: {
			ADD: null,
			ADD_UNRECEIVED: null,
			INDEX: {
				ADD: null,
				CLEAR_ALL: null,
			},
			USE: {
				INDEXED: {
					CLEAR: null,
					REGISTER: null,
				},
				KEYS: {
					CLEAR: null,
					REGISTER: null,
				},
			},
		},
		SET_ACTIVE_KEY: null,
		CURRENT: {
			REQUEST: null,
		},
		LOGIN: {
			REQUEST: null,
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null,
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null,
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null,
			},
		},
	},

	LAYER_TREES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null,
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null,
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null,
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null,
			},
		},
	},

	VIEWS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null,
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null,
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null,
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null,
			},
		},
	},

	WINDOWS: {
		ADD: null,
		OPEN: null,
		REMOVE: null,
		SETS: {
			ADD: null,
			REMOVE: null,
		},
		TOP: null,
		UPDATE: null,
	},
});
