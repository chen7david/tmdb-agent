const TMDB = require('./utils/tmdb')

exports = module.exports = (options = {}) => {
    if(!options.apiKey) throw('apiKey required!')
    return new TMDB(options)
}

exports.tmdb = (options = {}) => async (ctx, next) => {
    if(!options.apiKey) throw('apiKey required!')
    ctx.tmdb = new TMDB(options) 
    await next()
}

exports.TMDB = TMDB