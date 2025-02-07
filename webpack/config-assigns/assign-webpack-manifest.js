// libs
import _ from 'lodash'

// relative modules

// modules
import webpackContext from '@project-root/webpack-context'


/**
 * @param {Object} [context={}]
 * @param {Object} [config={}]
 */
export function assignWebpackManifest(context={}, config={}) {
  context = _.defaults(context, webpackContext);

  const {

  } = config;

  const {
    WebpackManifestPlugin,
  } = context;

  config.plugins.push(...[
    new WebpackManifestPlugin({
      fileName: 'webpack-manifest.json'
    })
  ]);

}

export default assignWebpackManifest