const dd = (val) => console.log(val)
const http = require('./http')

class TMDB {

    constructor(options = {}){
        this.params = { api_key: options.apiKey }
        this.state = {}
    }

    movies(){
        this.state.qt = '/movie'
        return this
    }

    shows(){
        this.state.qt = '/tv'
        return this
    }

    people(){
        this.state.qt = '/person'
        return this
    }

    seasons(sn = []){
        if(sn.length > 0) this.state.sn = sn.length > 20 ? this.chunk(sn, 20) : [ sn ]
        if(sn.length == 0) this.state.sn = []
        return this
    }

    async genres(params = {}){
        if(!this.state.qt) throw('genres can not be called directly!')
        let url = 'genre'.concat(this.state.qt,'/list?', this.buildQueryString(params))
        const { data:{ genres } } = await http.get(url)
        return genres
    }

    async trending(window = null, params = {}){
        if(!this.state.qt) throw('trending can not be called directly!')
        let url = 'trending'.concat(this.state.qt,'/', window == "week" ? "week" : "day",'?', this.buildQueryString(params))
        const { data } = await http.get(url)
        return data.results.length > 0 ? data.results : []
    }

    async search(keyphrase, params = {}){
        if(!this.state.qt) throw('search can not be called directly!')
        params.query = keyphrase
        let url = 'search'.concat(this.state.qt, '?', this.buildQueryString(params))
        const { data } = await http.get(url)
        return data.total_results > 0 ? data.results : []
    }

    async getById(id, params = {}){
        if(id == null) throw(`id is required but ${id} was given!`)
        let data = null
        if(!this.state.sn){
            data = await this.loadData(id, params)
        }else{
            if(this.state.sn.length > 0){
                const seasons = []
                for(let batch of this.state.sn){
                    const append = this.formatAppend(batch)
                    this.params.append_to_response = append
                    data = await this.loadData(id, params)
                    for(let key of append.split(',')){
                        if(data[key]){
                            seasons.push(data[key])
                            delete data[key]
                        }
                    }
                }
                data.seasons = seasons
                return data
            }else{
                data = await this.loadData(id, params)
                const sn = data.seasons.map(s => s.season_number)
                return await this.seasons(sn).getById(data.id)
            }
        }
        return data
    }

    async loadData(id, params = {}){
        const url = ''.concat(this.state.qt,'/', id, '?', this.buildQueryString(params))
        const { data } = await http.get(url)
        return data
    }

    formatAppend(array = []){
        return array.map(e => `season/${e}`).join(',')
    }

    buildQueryString(params = {}){
        return Object.keys(Object.assign(params, this.params))
            .map(key => key + '=' + params[key]).join('&');
    }

    chunk(array, chunk){
        let chunks = [], i = 0, n = array.length
        while (i < n) chunks.push(array.slice(i, i += chunk))
        return chunks
    }
}

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