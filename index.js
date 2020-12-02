const url = require('url')
const path = require('path')
const agent = require('./http')
const dd = (val) => console.log(val)

class TMDB {

    constructor(options = {}){
        this.query()
        this.uri.query.api_key = options.apiKey
        this.state = {}
        this.agent = agent( options.timeout ? options : {})
    }

    _chunk(array, size){
        let chunks = [], i = 0, n = array.length
        while (i < n) chunks.push(array.slice(i, i += size))
        return chunks
    } 

    query(){
        this.uri = { query: {} }
        return this
    }

    movies(){
        this.uri.pathname = 'movie'
        return this
    }

    shows(){
        this.uri.pathname = 'tv'
        return this
    }

    people(){ 
        this.uri.pathname = 'person'
        return this
    }

    genres(params = {}){
        this.uri.pathname = path.join('genre', this.uri.pathname, 'list')
        Object.assign(this.uri.query, params)
        return this
    }

    trending(window = 'week'){
        if(!this.uri.pathname) throw('please select a type before calling trending!')
        this.uri.pathname = path.join('trending', this.uri.pathname, window)
        return this
    }

    search(query, params = {}){
        if(params.year &&  this.uri.pathname == 'tv')
            params.first_air_date_year = params.year
        this.uri.pathname = path.join('search', this.uri.pathname)
        Object.assign(this.uri.query, {query}, params)
        return this
    }

    withId(id = null, params = {}){
        if(id == null) throw(`id is required but ${id} was given!`)
        this.uri.pathname = path.join(this.uri.pathname, `${id}`)
        Object.assign(this.uri.query, params)
        return this
    }

    seasons(sn = []){
        if(sn.length > 0) this.state.sn = sn.length > 20 ? this._chunk(sn, 20) : [ sn ]
        if(sn.length == 0) this.state.sn = []
        return this
    }

    async loadSeasons(show){
        if(!show) return null
        const seasons = []
        const set = this.state.sn.length > 0 ? this.state.sn : 
            show.seasons.map(s => s.season_number)
        const batches = this._chunk(set, 20)
        for(let bacth of batches){
            const param = bacth.map(e => `season/${e}`).join(',')
            this.uri.query.append_to_response = param
            const { data } = await this.agent.get(url.format(this.uri))
            for(let key of param.split(',')){
                if(data[key]){ seasons.push(data[key])}
            }
        }
        return seasons
    }

    async get(){
        const uri = url.format(this.uri)
        let { data } = await this.agent.get(uri)
        if(this.state.sn) data.seasons = await this.loadSeasons(data)
        return data
    }
    
}

exports = module.exports = (options = {}) => {
    if(!options.apiKey) throw('apiKey required!')
    return new TMDB(options)
}

exports.koatmdb = (options = {}) => async (ctx, next) => {
    if(!options.apiKey) throw('apiKey required!')
    ctx.$tmdb = new TMDB(options) 
    await next()
}

exports.TMDB = TMDB