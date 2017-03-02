const Config = require('webpack-config').default;
const path = require('path');
const paths = require('../config/paths');
const appPackage = require(paths.appPackageJson);

module.exports = function extendWebpackConfig(baseConfig, mode) {
  const appConfig = appPackage.webpackConfig && appPackage.webpackConfig.hasOwnProperty(mode) ? require(path.join(path.dirname(paths.appPackageJson), appPackage.webpackConfig[mode])) : null

  let config = new Config().merge(baseConfig)

  if(typeof appConfig === 'function') {
    config = appConfig(config)
  }
  else {
    config.merge(appConfig)
  }

  return config
};
