const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "stream": require.resolve("stream-browserify"),
          "util": require.resolve("util/"),
          "url": require.resolve("url/"),
          "assert": require.resolve("assert/"),
          "zlib": require.resolve("browserify-zlib"),
          "buffer": require.resolve("buffer/"),
        }
      },
      plugins: [
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
    },
  },
}; 