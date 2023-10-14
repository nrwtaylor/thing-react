const webpack = require("webpack");

const fs = require('fs');
const path = require('path');
const https = require('https');
const { override } = require('customize-cra');


const options = {
//  key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
//  cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),

  key: fs.readFileSync(path.resolve('/etc/ssl/private/pilothouse.key')),
  cert: fs.readFileSync(path.resolve('/etc/ssl/certs/pilothouse.crt')),


};

const overrideDevServer = (config) => {
  if (process.env.NODE_ENV === 'development') {
    config.https = options;
  }
  return config;
};

module.exports = override(overrideDevServer);


module.exports = function override (config, env) {
console.log('override')
//let loaders = config.resolve
//loaders.fallback = {
config.resolve.fallback = {
"fs": false,
"tls": false,
"net": false,
"http": require.resolve("stream-http"),
"https": false,
"zlib": require.resolve("browserify-zlib") ,
"path": require.resolve("path-browserify"),
"stream": require.resolve("stream-browserify"),
"util": require.resolve("util/"),
"crypto": require.resolve("crypto-browserify")
}


return config
} 



//const fs = require('fs');
//const path = require('path');
//const https = require('https');
//const { override, addWebpackDevServer } = require('customize-cra');
/*
const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),
};

module.exports = function override(config, env) {
  if (env === 'development') {
    config.devServer.https = true;
    config.devServer.before = function (app) {
      // Replace 'src/App' with the path to your main App component
      const appModule = require('src/App');
      app.use(appModule);
    };
  }
  return config;
};
*/






/*
module.exports = function override(config) {
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
  });
  config.resolve.fallback = fallback;

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  return config;
};
*/
