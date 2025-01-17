/** @returns {Boolean} */
export function isBrowser() {
  return new Function("try {return this===window;}catch(e){ return false;}")();
}

export default isBrowser;
