const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  fixBabelImports,
  addLessLoader,
} = require("customize-cra");

const path = require("path");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "lib",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {},
  }),
  addDecoratorsLegacy(),
  disableEsLint(),

  /*
  addWebpackResolve({
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      // Must be below test-utils
    },
  }),
  */
  function (config, env) {
    const alias = config.resolve.alias || {};

    config.resolve.alias = alias;
    return config;
  }
);
