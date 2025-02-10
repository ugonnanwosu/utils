// libs
import every from 'lodash/every'

// modules
import isNode from '@usn/utils/dom/is-node'

const isWebpacked = typeof IS_WEBPACKED !== 'undefined' ? IS_WEBPACKED : false; // eslint-disable-line

export function shouldImportStyle() {
  return every([
    !isNode(),
    isWebpacked,
  ]);
}

export default shouldImportStyle;