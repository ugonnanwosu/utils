import isBrowser from '@usn/utils/dom/is-browser'

/**
 *
 * @param {string} css
 */
function injectCSS(css='') {

  if (!isBrowser()) {
    console.error('This can only be used in browser environment');
    return;
  }

  const el = document.createElement('style');
  el.innerText = css;
  document.head.appendChild(el);
  return el;
}

export default injectCSS;