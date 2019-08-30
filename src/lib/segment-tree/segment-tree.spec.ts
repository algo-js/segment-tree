// tslint:disable:no-expression-statement
import test from 'ava';
import { SegmentTree } from './segment-tree';

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

test('returns query result when input length equal 1', t => {
  const input = [1];
  const tree = new SegmentTree(input, Math.min, -Infinity);

  t.is(tree.query(0, 1), 1);
});
