const TMDB = require('./utils/tmdb')

exports = module.exports = (options) => new TMDB(options)
exports.TMDB = TMDB