// libs
import defaults from 'lodash/defaults'

// modules

export function containMinLeft(options={}) {
  options = defaults({ ...options }, {
    gutter: 0,
  });

  const { width, gutter } = options;
  return 0;
}

export default containMinLeft;