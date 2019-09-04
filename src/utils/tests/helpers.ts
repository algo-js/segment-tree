/**
 * @param array
 * @param minIndex
 * @param maxIndex
 */
export function findSumLinear(
  array: number[],
  minIndex: number,
  maxIndex: number
): number {
  let sum = 0;
  for (let i = minIndex; i <= maxIndex; ++i) {
    sum += array[i];
  }
  return sum;
}

/**
 * @param array
 * @param minIndex
 * @param maxIndex
 */
export function findMaxLinear(
  array: number[],
  minIndex: number,
  maxIndex: number
): number {
  let max = -Infinity;
  for (let i = minIndex; i <= maxIndex; ++i) {
    if (max < array[i]) {
      max = array[i];
    }
  }
  return max;
}

/**
 * @param array
 * @param minIndex
 * @param maxIndex
 */
export function findMinLinear(
  array: number[],
  minIndex: number,
  maxIndex: number
): number {
  let min = Infinity;
  for (let i = minIndex; i <= maxIndex; ++i) {
    if (min > array[i]) {
      min = array[i];
    }
  }
  return min;
}

/**
 * @param {number} arrayLength
 * @returns {number[]}
 */
export function generateIndexPair(arrayLength): number[] {
  const lastIndex = arrayLength - 1;
  const minIndex = generateNumber(0, lastIndex - 1);

  return [minIndex, generateNumber(minIndex, lastIndex)];
}

/**
 * @param min
 * @param max
 */
export function generateNumber(min, max): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}
