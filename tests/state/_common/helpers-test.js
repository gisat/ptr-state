import {assert} from 'chai';
import helpers from '../../../src/state/_common/helpers';

describe('state/_common/helpers', function () {
	describe('getIndex', function () {
		const tests = [
			{
				name: 'empty indexes',
				indexes: [],
				filter: 'fil',
				order: 'asc',
				expectedResult: null,
			},
			{
				name: 'indexes',
				indexes: [
					{filter: 'fil2', order: 'desc'},
					{filter: 'fil', order: 'desc'},
					{filter: 'fil', order: 'asc'},
					{filter: 'fil2', order: 'asc'},
				],
				filter: 'fil',
				order: 'asc',
				expectedResult: {filter: 'fil', order: 'asc'},
			},
		];
		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					helpers.getIndex(test.indexes, test.filter, test.order),
					test.expectedResult
				);
			});
		});
	});

	describe('getUniqueIndexes', function () {
		const tests = [
			{
				name: 'empty',
				indexes: [],
				expectedResult: null,
			},
			{
				name: 'unique indexes',
				indexes: [
					{filter: 'fil2', order: 'desc'},
					{filter: 'fil', order: 'desc'},
					{filter: 'fil', order: 'asc'},
					{filter: 'fil2', order: 'asc'},
				],
				expectedResult: [
					{filter: 'fil2', order: 'desc'},
					{filter: 'fil', order: 'desc'},
					{filter: 'fil', order: 'asc'},
					{filter: 'fil2', order: 'asc'},
				],
			},
			{
				name: 'non unique indexes',
				indexes: [
					{filter: 'fil2', order: 'desc'},
					{filter: 'fil', order: 'desc'},
					{filter: 'fil', order: 'asc'},
					{filter: 'fil2', order: 'asc'},

					// exact duplicities
					{filter: 'fil2', order: 'desc'},
					{filter: 'fil', order: 'desc'},
					{filter: 'fil', order: 'asc'},
					{filter: 'fil2', order: 'asc'},

					// duplicities with additional prop
					{filter: 'fil2', order: 'desc', p: true},
					{filter: 'fil', order: 'desc', p: true},
					{filter: 'fil', order: 'asc', p: true},
					{filter: 'fil2', order: 'asc', p: true},
				],
				expectedResult: [
					{filter: 'fil2', order: 'desc'},
					{filter: 'fil', order: 'desc'},
					{filter: 'fil', order: 'asc'},
					{filter: 'fil2', order: 'asc'},
				],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					helpers.getUniqueIndexes(test.indexes),
					test.expectedResult
				);
			});
		});
	});

	describe('isCorrespondingIndex', function () {
		const tests = [
			{
				name: 'corresponding',
				index: {
					filter: 'fil',
					order: 'asc',
				},
				filter: 'fil',
				order: 'asc',
				expectedResult: true,
			},
			{
				name: 'corresponding with extra key',
				index: {
					filter: 'fil',
					order: 'asc',
					extraKey: 'val',
				},
				filter: 'fil',
				order: 'asc',
				expectedResult: true,
			},
			{
				name: 'different order',
				index: {
					filter: 'fil',
					order: 'asc',
				},
				filter: 'fil',
				order: 'desc',
				expectedResult: false,
			},
			{
				name: 'different filter',
				index: {
					filter: 'fil',
					order: 'asc',
				},
				filter: 'fil2',
				order: 'asc',
				expectedResult: false,
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.strictEqual(
					helpers.isCorrespondingIndex(
						test.index,
						test.filter,
						test.order
					),
					test.expectedResult
				);
			});
		});
	});

	describe('itemFitFilter', function () {
		const tests = [
			{
				name: 'fits null filter',
				filter: null,
				item: {
					data: {
						sameProp: 'John',
						likeProp: 'always matches',
						inProp: 'two',
						notInProp: 'this',
						linkKey: 'val',
					},
				},
				expectedResult: true,
			},
			{
				name: 'fits all filter types',
				filter: {
					sameProp: 'John',
					likeProp: {like: true},
					inProp: {in: ['one', 'two', 'three']},
					notInProp: {notin: ['notThis', 'andThis']},
					link: 'val',
				},
				item: {
					data: {
						sameProp: 'John',
						likeProp: 'always matches',
						inProp: 'two',
						notInProp: 'this',
						linkKey: 'val',
					},
				},
				expectedResult: true,
			},
			{
				name: 'does not fit same prop',
				filter: {
					sameProp: 'John',
				},
				item: {
					data: {
						sameProp: 'Johnny',
					},
				},
				expectedResult: false,
			},
			{
				name: 'does not fit in prop',
				filter: {
					inProp: {in: ['one', 'two', 'three']},
				},
				item: {
					data: {
						inProp: 'four',
					},
				},
				expectedResult: false,
			},
			{
				name: 'does not fit notin prop',
				filter: {
					notInProp: {notin: ['notThis', 'andThis']},
				},
				item: {
					data: {
						notInProp: 'notThis',
					},
				},
				expectedResult: false,
			},
			{
				name: 'does not fit link prop',
				filter: {
					link: 'val',
				},
				item: {
					data: {
						linkKey: 'notval',
					},
				},
				expectedResult: false,
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.strictEqual(
					helpers.itemFitFilter(test.filter, test.item),
					test.expectedResult
				);
			});
		});
	});
});
