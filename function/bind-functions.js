// libs
import _ from 'lodash';

/**
 *
 * @param {Object.<function>} input
 * @param args
 * @return {*}
 */
export function bindFunctions(input, ...args) {
  const funcs = _.reduce(input, (o, handler, key) => {
    const boundHandler = handler.bind(this, ...args);
    _.extend(o, {
      [key]: boundHandler,
    });
    return o;
  }, {});

  return funcs;
}

export default bindFunctions;