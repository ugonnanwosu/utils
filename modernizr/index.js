import isBrowser from '@usn/utils/dom/is-browser'

const Modernizr = isBrowser() ? window?.Modernizr : {}

export default Modernizr