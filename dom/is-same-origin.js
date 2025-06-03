// libs
import _ from 'lodash'

// relative modules

// modules
import env from '@usn/utils/misc/env'

const [
  BASE_URL,
] = env([
  'BASE_URL',
]);

/**
 * @param {string} [url1]
 * @param {string} [url2]
 * @param {Object} [options={}]
 * @param {Boolean} [options.debug]
 */
export function isSameOrigin(url1, url2, options={}) {
  options = _.defaults({ ...options }, {
    debug: false,
  });

  const {
    debug,
  } = options;

  const shouldAbort = _.some([
    _.isEmpty(_.trim(url1)),
    _.isEmpty(_.trim(url2)),
  ]);

  if (shouldAbort) {
    return false;
  }

  const isRelative = (url) => _.startsWith(url, '/');

  const parsedUrl1 = isRelative(url1) ? `${BASE_URL}${url1}` : url1;
  const parsedUrl2 = isRelative(url2) ? `${BASE_URL}${url2}` : url2;

  const fullUrl1 = URL.canParse(parsedUrl1) && new URL(parsedUrl1);
  const fullUrl2 = URL.canParse(parsedUrl2) && new URL(parsedUrl2);

  const isSame = _.every([
    fullUrl1?.protocol === fullUrl2?.protocol,
    fullUrl1?.host === fullUrl2?.host,
    fullUrl1?.port === fullUrl2?.port,
  ]);

  return isSame;
}

export default isSameOrigin