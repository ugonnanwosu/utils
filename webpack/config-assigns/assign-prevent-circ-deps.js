// libs
import _ from 'lodash'
import CircularDependencyPlugin from 'circular-dependency-plugin'

// relative modules

// modules
import webpackContext from '@project-root/webpack-context'

/**
 * @param {Object} [context={}]
 * @param {Object} [config={}] //
 */
export function assignPreventCircDeps(context={}, config={}) {
  context = _.defaults(context, webpackContext);

  const {

  } = context;

  config.plugins.push(...[
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      cwd: process.cwd(),
    })
  ]);

  return config;
}

export default assignPreventCircDeps