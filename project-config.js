// libs
const path = require('path');

// modules
const pathSlug = '@usn/utils'

const moduleAliases = {
  [pathSlug]: path.resolve(__dirname, './'),
  ['@env']: path.resolve(__dirname, './web/client/env.json'),

  // root
  ['@project-root']: path.resolve(__dirname, './'),
}

const excludedWebpackNodeModules = [

];

/** @namespace */
const ProjectConfig = {
  excludedWebpackNodeModules,
  moduleAliases,
  pathSlug,
}

module.exports = ProjectConfig