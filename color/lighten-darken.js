// libs
import _ from 'lodash'

// relative modules

// modules


/**
 * @see https://css-tricks.com/snippets/javascript/lighten-darken-color/
 * @param {string} col
 * @param {number} [amount]
 * @param {Object} [options={}]
 * @param {boolean} [options.useHash]
 */
export function lightenDarken(col, amount,  options={}) {
  options = _.defaults(options, {
    useHash: false,
  });

  const {
    useHash,
  } = options;

  const colStartsWithHash = col[0] === "#";

  if (colStartsWithHash) {
    col = col.slice(1);
  }

  const shouldUseHash = _.some([
    colStartsWithHash,
    useHash,
  ]);

  const num = parseInt(col, 16);

  let r = (num >> 16) + amount;

  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  let b = ((num >> 8) & 0x00FF) + amount;

  if (b > 255) {
    b = 255
  } else if (b < 0) {
    b = 0;
  }

  let g = (num & 0x0000FF) + amount;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  return (shouldUseHash ? '#' : '') + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
}

export default lightenDarken