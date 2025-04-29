// libs
import _ from 'lodash'


// relative modules

// modules
import fallbackTo from '@usn/utils/misc/fallback-to'



/**
 * @param {MouseEvent|TouchEvent|Object} [e]
 * @param {Object} [options={}]
 */
export function getMousePositionFromEvent(e={}, options={}) {
  options = _.defaults({ ...options }, {

  });

  const {

  } = options;

  const {
    clientX,
    clientY,
    touches,
    changedTouches,
  } = e;

  const x = fallbackTo([
    changedTouches?.[0]?.clientX,
    clientX,
  ]);

  const y = fallbackTo([
    changedTouches?.[0]?.clientY,
    clientY,
  ]);

  return {
    x,
    y,
  }
}

export default getMousePositionFromEvent