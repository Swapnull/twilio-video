const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpack: (config) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsConfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsConfigPathsPlugin()];
    }

    return config;
  },
  target: 'serverless',
};
