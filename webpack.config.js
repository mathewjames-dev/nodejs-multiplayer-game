const path = require('path');

module.exports = {
  entry: {
    main: './public/scripts/main.js',
    vendor: './public/scripts/vendors/vendor.js',
  },
  output: {
    filename: './public/scripts/bundles/[name].bundle.js',
    path: path.resolve(__dirname),
  }
};