// libs
import _ from 'lodash'

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

  const windowOptions = _.pick(window, windowProps);

  options = _.defaults({ ...options }, {
    ...windowOptions,
    target: '_blank',
  });

  const {
    url,
    target,
  } = options;

  const shouldAbort = _.some([
    _.isEmpty(_.trim(url)),
  ]);

  if (shouldAbort) {
    return;
  }

  const windowFeatures = _.pick(options, windowProps);

  const windowFeaturesArr = _.map(windowFeatures, (val, key) => {
    return `${key}=${val}`
  }, []);

  const windowFeaturesStr = windowFeaturesArr.join(',');

  // window.open(url, target, windowFeaturesStr);
}

export default openWindow