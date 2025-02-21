import mod from 'rst-rockboard-core/utils/number/mod'
/**
 * @param {Array} array
 * @param {int} index
 * @param {int} increment
 * @return {*}
 */
export function modIncrementIndex(array=[], index=-1, increment=1) {
  const newIndex = mod(index + increment, array.length);
  return newIndex;
}
export default modIncrementIndex