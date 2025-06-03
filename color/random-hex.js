// libs
import _ from 'lodash';

// relative modules

// modules


/**
 * @param {Object} [options={}]
 * @param {boolean} [options.useHash=false]
 * @return {string},
 */
export function randomHex(options={}) {

  options = _.defaults({ ...options }, {
    useHash: true,
  });

  const { useHash } = options;
  const prefix = useHash ? `#` : '';
  const hex = String("000000" +  Math.floor(Math.random()*16777215).toString(16)).slice(-6);
  return `${prefix}${hex}`;
}

export default randomHex