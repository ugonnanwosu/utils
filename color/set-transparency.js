// libs

// libs [lodash]

// relative modules

// modules
import hexToRgb from '@usn/utils/color/hex-to-rgb'

/**
 * @param {string} [hex]
 * @param {number} [alpha=1]
 */
export function setTransparency(hex, alpha=1) {

  const {
    r, g, b,
  } = hexToRgb(hex);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default setTransparency