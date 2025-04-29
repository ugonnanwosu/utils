// libs
import _ from 'lodash'

// modules
import isBrowser from '@usn/utils/dom/is-browser'

/**
 *
 * @param {string} name
 * @param {Object} [options={}]
 * @param {boolean} [options.debug=false]
 * @return {string}
 */
function getCssVariable(name='', options={}) {

  options = _.defaults(options, {
    debug: false,
  });

  const {
    debug,
  } = options;

  const shouldAbort = _.some([
    !isBrowser(),
    _.isEmpty(_.trim(name)),
  ]);

  if (shouldAbort) {
    console.error(new Error(`Invalid CSS variable name provided`));
    return '';
  }

  const kebabName = _.kebabCase(name);
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--${kebabName}`);

  console.log({
    kebabName,
    doc: document.documentElement
  })

  if (!value) {
    // console.error(new Error(`No CCS variable found for ${name}`));
  }

  return value;
}

export default getCssVariable;