// libs
import _ from 'lodash'

/**
 *
 * @param {Object} options
 * @param {string} options.src
 * @returns {Promise.<Image>}
 */
export function loadImage(options={}) {
  options = _.defaults(options, {

  });

  const {
    src,
  } = options;

  return new Promise((resolve, reject) => {

    if (_.isEmpty(src)) {
      reject(new Error('no src provided'));
    }

    const img = new Image;

    _.extend(img, {
      onload: () => resolve(img),
      onerror: (error) => {
        return reject(error);
      },
    });

    _.defer(() => {
      _.extend(img, {
        src,
      });
    })

    if (img.complete) {
      resolve(img);
    }
  });
}


/**
 *
 * @type {function}
 * @property {string} src
 * @returns {Promise}
 */
export const memoLoadImage = _.memoize(async (src) => {
  return await loadImage({
    src,
  });
});

const LoadImageUtils = {
  memoLoadImage,
  loadImage,
}

export default LoadImageUtils;
