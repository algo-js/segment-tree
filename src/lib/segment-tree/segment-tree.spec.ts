// tslint:disable:no-expression-statement
import test from 'ava';
import { SegmentTree } from './segment-tree';

const findSumLinear = array => array.reduce((s, v) => s + v, 0);
const findMaxLinear = array => {
  let max = -Infinity;
  for (let i = 0; i < array.length; ++i) {
    if (max < array[i]) {
      max = array[i];
    }
  }
  return max;
};

test('creates tree instance', t => {
  const input = [1, 2, 3, 4, -1, 2, -2, -3, -4, 10, -10];
  const tree = new SegmentTree(input, Math.min);

  t.truthy(tree);
});

test('creates tree instance and has query function', t => {
  const input = [1, 2, 3, 4, -1, 2, -2, -3, -4, 10, -10];
  const tree = new SegmentTree(input, Math.min);

  t.truthy(tree.query);
});

test('returns fallback value when input length is zero', t => {
  const input = [];
  const tree = new SegmentTree(input, (a, b) => a + b, 42);

  t.is(tree.query(0, 0), 42);
});

test('returns query result when input length equal 1', t => {
  const input = [1];
  const tree = new SegmentTree(input, Math.min);

  t.is(tree.query(0, 1), 1);
});

test('query without arguments returns overall sum', t => {
  const input = [1, 2, 3, 4, -1, 2, -2, -3, -4, 10, -10];
  const tree = new SegmentTree(input, (a, b) => a + b);

  t.is(tree.query(), 2);
});

test('works with indexes outside an input array 1', t => {
  const input = [1, 2, 3, 4, -1, 2, -2, -3, -4, 10, -10];
  const tree = new SegmentTree(input, (a, b) => a + b);

  t.is(tree.query(5, 50), -7);
});

test('works with indexes outside an input array 2', t => {
  const input = [1, 2, 3, 4, -1, 2, -2, -3, -4, 10, -10];
  const tree = new SegmentTree(input, (a, b) => a + b);

  t.is(tree.query(-55, 5), 11);
});

test('works with indexes outside an input array 3', t => {
  const input = [1, 2, 3, 4, -1, 2, -2, -3, -4, 10, -10];
  const tree = new SegmentTree(input, (a, b) => a + b);

  t.is(tree.query(-5500, 5000), 2);
});

test('works with indexes outside an input array 4', t => {
  const input = [1, 2, 3, 4, -1, 2, -2, -3, -4, 10, -10];
  const tree = new SegmentTree(input, (a, b) => a + b, 42);

  t.is(tree.query(3400, 5000), 42);
});

test('works with indexes outside an input array 5', t => {
  const input = [1, 2, 3, 4, -1, 2, -2, -3, -4, 10, -10];
  const tree = new SegmentTree(input, (a, b) => a + b, 42);

  t.is(tree.query(-5400, -3000), 42);
});

test('works with swapped indexes', t => {
  const input = [1, 2, 3, 4, -1, 2, -2, -3, -4, 10, -10];
  const tree = new SegmentTree(input, (a, b) => a + b);

  t.is(tree.query(5, 2), 8);
});

test('returns sum of large arrays', t => {
  const input = Array(1e7)
    .fill(0)
    .map((_, i) => Math.floor((Math.random() - 0.5) * 1e3));

  const minIndex = 1000;
  const maxIndex = 1e6;

  // O(n) sum
  const linearSum = findSumLinear(input.slice(minIndex, maxIndex + 1));

  const tree = new SegmentTree(input, (a, b) => a + b);

  // O(logn) sum
  const segmentTreeSum = tree.query(minIndex, maxIndex);

  t.is(segmentTreeSum, linearSum);
});

test('returns max of large arrays', t => {
  const input = Array(1e7)
    .fill(0)
    .map((_, i) => Math.floor((Math.random() - 0.5) * 1e9));

  const minIndex = 1e4;
  const maxIndex = 1e7 - 1e2;

  // O(n) max
  const linearMax = findMaxLinear(input.slice(minIndex, maxIndex + 1));

  const tree = new SegmentTree(input, Math.max);

  // O(logn) max
  const segmentTreeMax = tree.query(minIndex, maxIndex);

  t.is(segmentTreeMax, linearMax);
});
