// libs
const _ = require('lodash');
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

const includePaths = _.reduce(moduleAliases, (arr, path, key) => {
  arr.push(path);
  return arr;
}, []);

/** @namespace */
const ProjectConfig = {
  excludedWebpackNodeModules,
  includePaths,
  moduleAliases,
  pathSlug,
}

module.exports = ProjectConfig