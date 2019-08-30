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
   * @type {function<*>}
   * @private
   */
  private operation: (...args) => number;

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
  constructor(
    input: number[],
    operation: (...args) => number,
    fallbackValue: number = 0
  ) {
    this.input = input;
    this.operation = operation;
    this.fallbackValue = fallbackValue;

    this.tree = this.createTree();

    this.buildTree();
  }

  /**
   * Query on segment tree in context of this.operation function
   *
   * @param {number} queryLeftIndex
   * @param {number} queryRightIndex
   * @return {number}
   */
  public query(queryLeftIndex, queryRightIndex): number {
    const leftIndex = 0;
    const rightIndex = this.input.length - 1;

    return this.queryRecursive(
      queryLeftIndex,
      queryRightIndex,
      leftIndex,
      rightIndex
    );
  }

  /**
   * @returns {number[]}
   */
  private createTree(): number[] {
    let arrayLength = this.input.length;

    if (!arrayLength) {
      return [];
    }

    if (arrayLength && !isPowerOfTwo(arrayLength)) {
      // If original array length is not a power of two then we need to find
      // next number that is a power of two and use it to calculate
      // tree array size. This is happens because we need to fill empty children
      // in perfect binary tree with nulls.And those nulls need extra space.
      arrayLength = nearestHighestPowerOfTwoResult(arrayLength + 1);
    }

    return new Array(2 * arrayLength - 1).fill(null);
  }

  /**
   * Build segment tree.
   */
  private buildTree(): void {
    const leftIndex = 0;
    const rightIndex = this.input.length - 1;

    this.buildTreeRecursively(leftIndex, rightIndex);
  }

  /**
   * Build segment tree recursively.
   *
   * @param {number} leftIndex
   * @param {number} rightIndex
   * @param {number} position
   */
  private buildTreeRecursively(leftIndex, rightIndex, position = 0): void {
    // If low input index and high input index are equal that would mean
    // the we have finished splitting and we are already came to the leaf
    // of the segment tree. We need to copy this leaf value from input
    // array to segment tree.
    if (leftIndex === rightIndex) {
      return void (this.tree[position] = this.input[leftIndex]);
    }

    // Split input array on two halves and process them recursively.
    const middleIndex = (leftIndex + rightIndex) >> 1;

    // Process left half of the input array.
    this.buildTreeRecursively(
      leftIndex,
      middleIndex,
      this.computeLeftChildIndex(position)
    );

    // Process right half of the input array.
    this.buildTreeRecursively(
      middleIndex + 1,
      rightIndex,
      this.computeRightChildIndex(position)
    );

    // Once every tree leaf is not empty we're able to build tree bottom up using
    // provided operation function.
    this.tree[position] = this.operation(
      this.tree[this.computeLeftChildIndex(position)],
      this.tree[this.computeRightChildIndex(position)]
    );
  }

  /**
   * Query on segment tree recursively in context of this.operation function
   *
   * @param {number} queryLeftIndex left index of the query
   * @param {number} queryRightIndex right index of the query
   * @param {number} leftIndex left index of input array segment
   * @param {number} rightIndex right index of input array segment
   * @param {number} position root position in binary tree
   * @return {number}
   */
  private queryRecursive(
    queryLeftIndex,
    queryRightIndex,
    leftIndex,
    rightIndex,
    position = 0
  ): number {
    if (queryLeftIndex <= leftIndex && queryRightIndex >= rightIndex) {
      // Total overlap
      return this.tree[position];
    }

    if (queryLeftIndex > rightIndex || queryRightIndex < leftIndex) {
      // No overlap. Return fallback value
      return this.fallbackValue;
    }

    // Partial overlap
    const middleIndex = (leftIndex + rightIndex) >> 1;

    const leftOperationResult = this.queryRecursive(
      queryLeftIndex,
      queryRightIndex,
      leftIndex,
      middleIndex,
      this.computeLeftChildIndex(position)
    );

    const rightOperationResult = this.queryRecursive(
      queryLeftIndex,
      queryRightIndex,
      middleIndex + 1,
      rightIndex,
      this.computeRightChildIndex(position)
    );

    return this.operation(leftOperationResult, rightOperationResult);
  }

  /**
   * Computes left child index
   *
   * @param {number} position
   * @returns {number}
   */
  private computeLeftChildIndex(position: number): number {
    return (position << 1) + 1;
  }

  /**
   * Computes right child index
   *
   * @param {number} position
   * @returns {number}
   */
  private computeRightChildIndex(position: number): number {
    return (position << 1) + 2;
  }
}
