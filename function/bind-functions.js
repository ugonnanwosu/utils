// libs

// libs [lodash]
import extend from 'lodash/extend'
import reduce from 'lodash/reduce'

/**
 *
 * @param {Object.<function>} input
 * @param args
 // * @return {Object.<function>}
 */
export function bindFunctions(input, ...args) {
  const funcs = reduce(input, (o, handler, key) => {
    const boundHandler = handler.bind(this, ...args);
    extend(o, {
      [key]: boundHandler,
    });
    return o;
  }, {});

  return funcs;
}

export default bindFunctions;