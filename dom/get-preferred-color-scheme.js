// libs


// libs [lodash]

// relative modules

// modules
import isBrowser from '@usn/utils/dom/is-browser'
import THEME_MODE_CONSTANTS from '@usn/utils/constants/theme-mode-constants'

const {
  DARK,
  LIGHT,
} = THEME_MODE_CONSTANTS

/**
 * @return {string|null}
 */
export function getPreferredColorScheme() {
  let mode = null;

  if (isBrowser() && window.matchMedia) {
    if (window.matchMedia(`(prefers-color-scheme: ${DARK})`).matches) {
      mode = DARK;
    }

    if (window.matchMedia(`(prefers-color-scheme: ${LIGHT})`).matches) {
      mode = LIGHT;
    }
  }

  return mode;
}

export default getPreferredColorScheme