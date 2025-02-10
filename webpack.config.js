// libs

// modules
const ProjectConfig = require('./project-config');

const {
  moduleAliases,
} = ProjectConfig

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.css',
      '.scss',
    ],
    modules: [
      'node_modules',
    ],
    alias: {
      ...moduleAliases,
    },
  }
}