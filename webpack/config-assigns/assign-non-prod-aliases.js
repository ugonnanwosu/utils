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

  // need to change the `config.module.rules` where the test is ` /\.(s)?css$/`

  const stylRule = _.find(config.module.rules, { test: /\.(s)?css$/ }) || { include: [] };


  // dedupe style-rule

  _.forEach(config.module.rules, (rule, ruleIndex) => {
    const shouldParse = _.every([
      _.isArray(rule?.include),
      !_.isEmpty(rule?.include),
    ]);

    if (shouldParse) {

      _.forEach({ ...config.resolve.alias }, (aliasPath, key) => {
        const isNonProd = _.endsWith(`${key}`, ':non-prod');

        if (isNonProd) {

          // find the relevant path in the `rule.include` array
          // append `"/empty-aliases"` to the end of the string

          const index = _.lastIndexOf(rule.include, aliasPath);


          if (index > -1) {
            rule.include[index] = `${aliasPath}/empty-aliases`;
          }

          // config.resolve.alias[key] = `${aliasPath}/empty-aliases`;
        }
      });
    }
  })

  _.forEach({ ...config.resolve.alias }, (aliasPath, key) => {
    const isNonProd = _.endsWith(`${key}`, ':non-prod');
    if (isNonProd) {
      config.resolve.alias[key] = `${aliasPath}/empty-aliases`;
    }
  });

  return config;
}

export default assignNonProdAliases