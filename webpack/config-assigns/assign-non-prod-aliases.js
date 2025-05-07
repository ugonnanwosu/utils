// libs
import _ from 'lodash'

// relative modules

// modules

// modules
import webpackContext from '@project-root/webpack-context'

/**
 * @param {Object} [context={}]
 * @param {Object} [config={}] //
 */
export function assignNonProdAliases(context={}, config={}) {
  context = _.defaults(context, webpackContext);

  const {

  } = context;

  _.forEach({ ...config.resolve.alias }, (aliasPath, key) => {
    const isNonProd = _.endsWith(`${key}`, ':non-prod');
    if (isNonProd) {
      config.resolve.alias[key] = `${aliasPath}/empty-aliases`;
    }
  });

  return config;
}

export default assignNonProdAliases