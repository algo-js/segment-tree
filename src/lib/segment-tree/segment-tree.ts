import { isPowerOfTwo, nearestHighestPowerOfTwoResult } from '@algo-js/core';

export class SegmentTree {
  /**
   * Input array
   *
   * @type {number[]}
   * @private
   */
  private input: number[] = [];

  /**
   * Operation function
   *
   * @type {function}
   * @private
   */
  private operation: () => {};

  /**
   * Fallback value for non-intersect intervals
   *
   * @type {function}
   * @private
   */
  private fallbackValue: number = 0;

  /**
   * Tree instance
   *
   * @type {number[]}
   */
  private tree: number[] = null;

  /**
   * @param {number[]} input
   * @param {function} operation
   * @param {number} fallbackValue
   */
  constructor(input: number[], operation: () => {}, fallbackValue: number = 0) {
    this.input = input;
    this.operation = operation;
    this.fallbackValue = fallbackValue;

    this.tree = this.createTree();
  }

  private createTree(): number[] {
    let segmentTreeArrayLength;
    const inputArrayLength = this.input.length;

    let treeArrayLength = inputArrayLength;

    if (!isPowerOfTwo(inputArrayLength)) {
      // If original array length is not a power of two then we need to find
      // next number that is a power of two and use it to calculate
      // tree array size. This is happens because we need to fill empty children
      // in perfect binary tree with nulls.And those nulls need extra space.
      treeArrayLength = nearestHighestPowerOfTwoResult(inputArrayLength + 1);
    }

    segmentTreeArrayLength = 2 * treeArrayLength - 1;

    return new Array(segmentTreeArrayLength).fill(null);
  }
}
