const TMDB = require('./utils/tmdb')
const axios = require('axios')

exports = module.exports = (options) => new TMDB(options)
exports.TMDB = TMDB
exports.axios = axios