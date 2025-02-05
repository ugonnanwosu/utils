// libs


// libs [lodash]
import defaults from 'lodash/defaults'
import map from 'lodash/map'
import pick from 'lodash/pick'
import reduce from 'lodash/reduce'
import some from 'lodash/some'
import isEmpty from 'lodash/isEmpty'
import trim from 'lodash/trim'

// relative modules

// modules
import isBrowser from '@usn/utils/dom/is-browser'

const windowProps = [
  'height',
  'width',
  'screenX',
  'screenY',
  'noopener',
  'noreferrer',
];

/**
 * @param {Object} [options={}]
 */
export function openWindow(options={}) {

  if (!isBrowser()) {
    return;
  }

  const windowOptions = pick(window, windowProps);

  options = defaults({ ...options }, {
    ...windowOptions,
    target: '_blank',
  });

  const {
    url,
    target,
  } = options;

  const shouldAbort = some([
    isEmpty(trim(url)),
  ]);

  if (shouldAbort) {
    return;
  }

  const windowFeatures = pick(options, windowProps);

  const windowFeaturesArr = map(windowFeatures, (val, key) => {
    return `${key}=${val}`
  }, []);

  const windowFeaturesStr = windowFeaturesArr.join(',');

  console.log({
    windowFeaturesStr,
    url,
    target,
  });

  // window.open(url, target, windowFeaturesStr);
}

export default openWindow