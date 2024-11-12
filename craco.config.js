const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add the environment variables to the build
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          "process.env.REACT_BASE_URL": JSON.stringify(process.env.REACT_BASE_URL),
		  "process.env.REACT_VAPID_KEY": JSON.stringify(process.env.REACT_VAPID_KEY),
		  "process.env.REACT_APP_FIREBASE_API_KEY": JSON.stringify(process.env.REACT_APP_FIREBASE_API_KEY),
          "process.env.REACT_APP_FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
          "process.env.REACT_APP_FIREBASE_PROJECT_ID": JSON.stringify(process.env.REACT_APP_FIREBASE_PROJECT_ID),
          "process.env.REACT_APP_FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
          "process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
          "process.env.REACT_APP_FIREBASE_APP_ID": JSON.stringify(process.env.REACT_APP_FIREBASE_APP_ID),
          "process.env.REACT_APP_FIREBASE_MEASUREMENT_ID": JSON.stringify(process.env.REACT_APP_FIREBASE_MEASUREMENT_ID),
        })
      );

      // Configure polyfills for Node.js modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        vm: require.resolve("vm-browserify"),
        crypto: require.resolve("crypto-browserify"),
        buffer: require.resolve("buffer/"),
        process: require.resolve("process/browser"),
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
        url: require.resolve("url/"),
        assert: require.resolve("assert/"),
        util: require.resolve("util/"),
      };

      // Ensure service worker uses module syntax
      webpackConfig.module.rules.push({
        test: /firebase-messaging-sw\.js$/,
        loader: 'file-loader', // Ensure that the service worker is bundled properly
        options: {
          name: 'firebase-messaging-sw.js', // Set the correct file name for your service worker
        },
      });

      return webpackConfig;
    },
  },
  eslint: {
    enable: true,  // Ensures ESLint is enabled
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        changeOrigin: true,
      },
    },
  },
};
