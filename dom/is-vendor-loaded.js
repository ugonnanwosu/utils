// libs
import _ from 'lodash'

// relative modules

// modules
import isBrowser from '@usn/utils/dom/is-browser'

/**
 * @param {string} name
 * @param {Object} [options={}]
 * @param {Object} [options.vendorScripts]
 */
export function isVendorLoaded(name, options={}) {
  options = _.defaults({ ...options }, {
    vendorScripts: [],
  });

  const {
    vendorScripts,
  } = options;

  const found = _.find(vendorScripts, { name });

  const shouldAbort = _.some([
    !isBrowser(),
    _.isEmpty(found),
  ]);

  if (shouldAbort) {
    // console.error(new Error('Not found'));
    return false;
  }

  const {
    // name,
    disabled,
    initialLoad,
    windowDef,
    vendorSrc,
    fallbackSrc,
  } = found;

  const isLoaded = !_.isNil(window[windowDef]);

  return isLoaded;
}

export default isVendorLoaded