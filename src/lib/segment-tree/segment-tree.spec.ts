// tslint:disable:no-expression-statement
import test from 'ava';
import {
  findMaxLinear,
  findMinLinear,
  findSumLinear,
  generateIndexPair,
  generateNumber
} from '../../utils/test/helpers';
import { SegmentTree } from './segment-tree';

const input = [1, 2, 3, 4, -1, 2, -2, -3, -4, 10, -10];
const largeInput = Array(1e7)
  .fill(0)
  .map((_, i) => Math.floor((Math.random() - 0.5) * 1e7));
const largeTestsNumber = 20;

test('creates tree instance', t => {
  const tree = new SegmentTree(input, Math.min);
  t.truthy(tree);
});

test('creates tree instance and has query function', t => {
  const tree = new SegmentTree(input, Math.min);
  t.truthy(tree.query);
});

test('returns fallback value when input length is zero', t => {
  const tree = new SegmentTree([], (a, b) => a + b, 42);
  t.is(tree.query(0, 0), 42);
});

test('returns query result when input length equal 1', t => {
  const tree = new SegmentTree([1], Math.min);
  t.is(tree.query(0, 1), 1);
});

test('query without arguments returns overall sum', t => {
  const tree = new SegmentTree(input, (a, b) => a + b);
  t.is(tree.query(), 2);
});

test('works with indexes outside an input array 1', t => {
  const tree = new SegmentTree(input, (a, b) => a + b);
  t.is(tree.query(5, 50), -7);
});

test('works with indexes outside an input array 2', t => {
  const tree = new SegmentTree(input, (a, b) => a + b);
  t.is(tree.query(-55, 5), 11);
});

test('works with indexes outside an input array 3', t => {
  const tree = new SegmentTree(input, (a, b) => a + b);
  t.is(tree.query(-5500, 5000), 2);
});

test('works with indexes outside an input array 4', t => {
  const tree = new SegmentTree(input, (a, b) => a + b, 42);
  t.is(tree.query(3400, 5000), 42);
});

test('works with indexes outside an input array 5', t => {
  const tree = new SegmentTree(input, (a, b) => a + b, 42);
  t.is(tree.query(-5400, -3000), 42);
});

test('works with swapped indexes', t => {
  const tree = new SegmentTree(input, (a, b) => a + b);
  t.is(tree.query(5, 2), 8);
});

test('returns sum of large subarrays', t => {
  const tree = new SegmentTree(largeInput, (a, b) => a + b);

  for (let i = 0; i < largeTestsNumber; ++i) {
    const [minIndex, maxIndex] = generateIndexPair(largeInput.length);

    // O(n)
    const linearResult = findSumLinear(largeInput, minIndex, maxIndex);
    // O(logn)
    const segmentTreeResult = tree.query(minIndex, maxIndex);

    t.is(segmentTreeResult, linearResult);
  }
});

test('returns max of large subarrays', t => {
  const tree = new SegmentTree(largeInput, Math.max, -Infinity);

  for (let i = 0; i < largeTestsNumber; ++i) {
    const [minIndex, maxIndex] = generateIndexPair(largeInput.length);

    // O(n)
    const linearResult = findMaxLinear(largeInput, minIndex, maxIndex);
    // O(logn)
    const segmentTreeResult = tree.query(minIndex, maxIndex);

    t.is(segmentTreeResult, linearResult);
  }
});

test('returns min of large subarrays', t => {
  const tree = new SegmentTree(largeInput, Math.min, Infinity);

  for (let i = 0; i < largeTestsNumber; ++i) {
    const [minIndex, maxIndex] = generateIndexPair(largeInput.length);

    // O(n)
    const linearResult = findMinLinear(largeInput, minIndex, maxIndex);
    // O(logn)
    const segmentTreeResult = tree.query(minIndex, maxIndex);

    t.is(segmentTreeResult, linearResult);
  }
});

test('updates specific index and returns correct overall sum', t => {
  const tree = new SegmentTree(input, (a, b) => a + b);

  tree.update(0, 2);

  t.is(tree.query(), 3);
});

test('updates specific index and returns updated value', t => {
  const tree = new SegmentTree(input, (a, b) => a + b);

  tree.update(0, 2);

  t.is(tree.query(0, 0), 2);
});

test('updates specific indexes and returns correct sums', t => {
  const tree = new SegmentTree(input, (a, b) => a + b);

  const updates = [
    [[0, 2], 3],
    [[0, 10], 11],
    [[1, 10], 19],
    [[2, -1023], -1007],
    [[7, 1e9], 999998996]
  ];

  for (const item of updates) {
    const [update, overall] = item;

    // @ts-ignore
    tree.update(...update);

    t.is(tree.query(), overall);
  }
});

test('random updates', t => {
  const largeInputCopy = largeInput.slice();
  const tree = new SegmentTree(largeInput, (a, b) => a + b);

  const testCases = 1e7;

  for (let i = 0; i < testCases; ++i) {
    const randomIndex = generateNumber(0, largeInput.length - 1);
    const randomValue = generateNumber(-1e7, 1e7);
    tree.update(randomIndex, randomValue, false);
    largeInputCopy[randomIndex] = randomValue;
  }

  t.is(
    tree.query(),
    findSumLinear(largeInputCopy, 0, largeInputCopy.length - 1)
  );
});
