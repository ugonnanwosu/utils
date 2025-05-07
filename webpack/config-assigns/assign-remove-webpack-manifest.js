// libs
import _ from 'lodash'

// relative modules

// modules
import webpackContext from '@project-root/webpack-context'


/**
 * @param {Object} [context={}]
 * @param {Object} [config={}]
 */
export function assignRemoveWebpackManifest(context={}, config={}) {
  context = _.defaults(context, webpackContext);

  const {

  } = config;

  const {
    WebpackManifestPlugin,
  } = context;

  _.remove(config.plugins, (p) => {
    return p instanceof WebpackManifestPlugin;
  });
}

export default assignRemoveWebpackManifest