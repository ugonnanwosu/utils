// libs
import _ from 'lodash'

// relative modules

// modules
import projectConfig from '@project-root/project-config'

/**
 * @param {Object} [options={}]
 */
const ecmaScriptRule = {
    test: /\.(js|jsx|ts|tsx)$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          // Make sure cacheDirectory is disabled so that Babel ???
          // always rebuilds dependent module
          cacheDirectory: false,
          plugins: [
            '@babel/plugin-transform-runtime',
          ],
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ]
        }
      },
    ],
    include: [
      ...projectConfig.includePaths,
    ],
    exclude: [
      /webpack\/runtime/,
    ]
}

export default ecmaScriptRule