// libs
const _ = require('lodash')
const { readdirSync } = require('fs')

// modules
const ProjectConfig = require('./project-config')

const {
  excludedWebpackNodeModules,
  moduleAliases,
  pathSlug,
} = ProjectConfig;

function getDirectories(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter(direct => direct.isDirectory())
    .map(direct => direct.name);
}

const dirs = getDirectories('node_modules');
const excludedDirs = _.reduce(excludedWebpackNodeModules, (arr, path) => {
  const dir = _.first(path.split('/'));
  arr.push(dir);
  return _.uniq(arr);
}, [])
_.pullAll(dirs, excludedDirs);

const ignore = _.reduce(moduleAliases, (arr, path, key) => {
  arr.push(...[
    `${path}/node_modules`,
  ]);
  return arr;
}, []);

const moduleResolverAliases = _.reduce(moduleAliases, (acc, path, key) => {
  _.extend(acc, {
    [`${key}`]: `${path}`,
  });
  return acc;
}, {
  [`${pathSlug}`]: './',
});

/**
 * NOTE
 * Babel-node has a (known) bug that where `ignore` & `only` are discarded unless the cli is passed an empty --ignore ' '
 * Standard regex does not appear to work here (possibly windows issue?) so all the node_modules need to be mapped if there
 * excluding the custom libraries to be included.
 */

const babelConfig = {
  ignore,
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    ["module-resolver", {
      "root": ["./"],
      "alias": moduleResolverAliases,
    }]
  ]
};

module.exports = babelConfig