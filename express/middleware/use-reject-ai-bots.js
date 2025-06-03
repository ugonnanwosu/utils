// libs
import _ from 'lodash';
import Express from 'express'


/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} [next]
 * @return {Promise.<string>} HTML
 */
function useStripTrailingSlash(req, res, next) {
  const userAgent = req.get('user-agent');

  console.log({
    userAgent,
  });

}

export default useStripTrailingSlash;