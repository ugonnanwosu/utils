/**
 * This mutates the array
 * @param {Array} input
 * @param {int} fromIndex
 * @param {int} toIndex
 * @return {Array}
 */
export function move(input, fromIndex, toIndex) {

  if (toIndex >= input.length) {
    let k = toIndex - input.length + 1;
    while (k--) {
      input.push(undefined);
    }
  }

  input.splice(toIndex, 0, input.splice(fromIndex, 1)[0]);
  return input;
}

export default move;