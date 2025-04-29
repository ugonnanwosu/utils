// libs
import _ from 'lodash'

// relative modules

// modules
import isBrowser from '@usn/utils/dom/is-browser'

/**
 * @param {Object} [options={}]
 * @param {string} [options.title]
 * @param {string} [options.faviconSrc]
 */
export function updateHtmlHead(options={}) {
  options = _.defaults({...options}, {

  });

  const {
    title,
    faviconSrc,
  } = options;

  const hasTitle = !_.isEmpty(_.trim(title));
  const hasFavicon = !_.isEmpty(_.trim(faviconSrc));

  if (!isBrowser()) {
    return
  }

  const faviconNodes = document.querySelectorAll('link[rel="shortcut icon"]') || [];

  if (hasFavicon) {
    faviconNodes.forEach((node) => {
      node.remove();
    });

    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = faviconSrc;

    document.getElementsByTagName('head')[0].appendChild(link);
  }

  if (hasTitle) {
    document.querySelector('title').textContent = title;
  }

}

export default updateHtmlHead
