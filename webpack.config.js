module.exports = {
  output: {
    library: 'csv',
    libraryTarget: 'umd',
    path: './dist',
    filename: 'csv.js'
  },
  entry: {
    library: './src/csv.js'
  }
}
