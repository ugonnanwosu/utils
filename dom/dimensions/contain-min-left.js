// libs
import _ from 'lodash';

// modules

export function containMinLeft(options={}) {
  options = _.defaults({ ...options }, {
    gutter: 0,
  });

  const { width, gutter } = options;
  return 0;
}

export default containMinLeft;