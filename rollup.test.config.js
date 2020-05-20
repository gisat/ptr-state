import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import multi from '@rollup/plugin-multi-entry';

const env = process.env.NODE_ENV;

const lodashExternal = [
	'lodash/isObject',
	'lodash/isEqual',
	'lodash/find',
	'lodash/map',
	'lodash/remove',
	'lodash/forIn',
	'lodash/chunk',
	'lodash/flatten',
	'lodash/each',
	'lodash/isArray',
	'lodash/difference',
	'lodash/includes',
	'lodash/omit',
	'lodash/union',
	'lodash/sortBy',
	'lodash/reduce',
	'lodash/uniq',
	'lodash/pick',
	'lodash/pickBy',
	'lodash/forEach',
	'lodash/without',
	'lodash/isNumber',
	'lodash/cloneDeep',
	'lodash/merge',
	'lodash/reject',
	'lodash/filter',
	'lodash/isUndefined',
	'lodash/omitBy',
	'lodash/orderBy',
	'lodash/compact',
	'lodash/values',
	'lodash/get',
	'lodash/isMatch',
	'lodash/uniqBy',
	'lodash/intersection',
	'lodash/isEmpty',
];

export default {
	input: 'tests/**/*-test.js',
	external: [
		'react',
		'prop-types',
		'redux',
		'redux-thunk',
		'redux-logger',
		'@manaflair/redux-batch',
		'react-redux',
		'connected-react-router',
		'react-router-dom',
		'react-router',
		'@gisatcz/ptr-utils',
		'@gisatcz/ptr-core',
		'path',
		'moment',
		'reselect',
		're-reselect',
		'isomorphic-fetch',
		'query-string',
		...lodashExternal,
	],
	output: {
		file: 'build/bundle-tests.js',
		format: env,
		globals: {
			// 'lodash/random': '_.random'
		},
		exports: 'named' /** Disable warning for default imports */,
		sourcemap: true,
	},
	plugins: [
		multi(),
		babel({
			plugins: ['lodash'],
		}),
		commonjs({
			include: 'node_modules/**',
		}),
	],
};
