/**
 *
 * @returns {Boolean}
 */
export function isNode() {
  return new Function("try {return this===global;}catch(e){return false;}")();
}

export default isNode;