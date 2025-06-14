// libs
import _ from 'lodash'
import Express from 'express'

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} [next]
 * @return {Promise.<string>} HTML
 */
function useStripTrailingSlash(req, res, next) {
  const test = /\?[^]*\//.test(req.url);
  if (_.last(req.url) === '/' && req.url.length > 1 && !test) {
    res.redirect(301, req.url.slice(0, -1));
  } else {
    next();
  }
}

export default useStripTrailingSlash;