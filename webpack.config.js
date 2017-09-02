const path = require('path');

module.exports = {

  entry: './src/index.js',

  output: {
    filename: 'wowser-math.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'WowserMath',
    libraryTarget: 'umd'
  }

};
