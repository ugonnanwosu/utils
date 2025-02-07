// libs

// relative modules

// modules
import projectConfig from '@project-root/project-config'

const {
  includePaths
} = projectConfig

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      modules: true,
      sourceMap: true,
      indentWidth: 2,
      includePaths: [
        ...includePaths,
      ]
    }
  }
}

export default sassLoader
