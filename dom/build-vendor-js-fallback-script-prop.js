// libs
import _ from 'lodash';

// relative modules

// modules

/**
 * @param {Object} [options={}]
 * @param {string} [options.windowDef] - eg "React"
 * @param {string} [options.vendorSrc] - eg "//unpkg.com/react@18/umd/react.production.min.js"
 * @param {string} [options.fallbackSrc] - eg "//mycdn.com/libs/react/19.0.0/react.production.min.js"
 * @return {Array}
 */
export function buildVendorJsFallbackScriptProp(options={}) {
  options = _.defaults(options, {

  });

  const {
    windowDef,
    vendorSrc,
    fallbackSrc,
  } = options;

  const content = `\
window.${windowDef} || document.write('<script crossorigin src="${fallbackSrc}"><\x3C/script>')
`;

  return [
    {
      src: vendorSrc,
    },
    // {
    //   content,
    // }
  ]
}

export default buildVendorJsFallbackScriptProp