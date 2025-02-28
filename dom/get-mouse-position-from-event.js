// libs

// libs [lodash]
import defaults from 'lodash/defaults'

// relative modules

// modules


/**
 * @param {MouseEvent|TouchEvent} [e]
 * @param {Object} [options={}]
 */
export function getMousePositionFromEvent(e, options={}) {
  options = defaults({ ...options }, {

  });

  const {

  } = options;

  const {
    clientX,
    clientY,
  } = e;

  return {
    x: clientX,
    y: clientY,
  }
}

export default getMousePositionFromEvent