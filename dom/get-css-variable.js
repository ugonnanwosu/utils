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

  const isEmpty = _.isEmpty(_.trim(name));

  const shouldAbort = _.some([
    !isBrowser(),
    isEmpty,
  ]);

  const shouldLogError = _.every([
    isBrowser(),
    isEmpty,
  ]);

  if (shouldLogError) {
    console.error(new Error(`Invalid CSS variable name provided`));
  }
  if (shouldAbort) {
    return '';
  }

  const kebabName = _.kebabCase(name);
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--${kebabName}`);

  // console.log({
  //   kebabName,
  //   doc: document.documentElement
  // })

  if (!value) {
    // console.error(new Error(`No CCS variable found for ${name}`));
  }

  return value;
}

export default getCssVariable;