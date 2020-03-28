const env = require('./../config')
const http = require('./http')
const { chunk } = require('./functions')

class TMDB {

    constructor(options){

        const { apiKey, baseURL, timeout } = options

        if(!apiKey) throw(`apiKey is required`)

        const config = {
            baseURL: env.baseURL,
            timeout: env.timeout,
        }

        if(baseURL) config.baseURL = baseURL
        if(timeout) config.timeout = timeout

        this.http = http(config)
        this.apiKey = apiKey
        this.queryType = null
        this.results = null
    }

    shows(){
        this.queryType = env.showType
        return this
    }
    movies(){
        this.queryType = env.movieType
        return this
    }

    async search(keyword, config = {}){
        const { year } = config
        if(!this.queryType) throw('please specify your queryType')
        let url = 'search/'.concat(this.queryType, '?api_key=', this.apiKey, '&query=', keyword)
        if(year) url = url.concat('&year=', year)
        const { data } = await this.http.get(url)
        this.queryType = null
        this.results = data
        return this
    }

    async getById(id){
        if(id == null) return null
        const url = '/'.concat(this.queryType,'/', id, '?api_key=', this.apiKey)
        const { data } = await this.http.get(url)
        return data
    }

    async getSeasons(showId, seasonNumbers = []){
        const batches = chunk(seasonNumbers, 20)
        let seasons = []
        let episodes = []
        let show = null
        for(let batch of batches){
            let url = '/'.concat(this.queryType,'/', showId,'?api_key=', this.apiKey,'&append_to_response=')
            for(let i of batch){ url = url.concat('season','/', i,',') }
            const { data } = await this.http.get(url)
            show = data
            for(let i of batch){
                const season = data['season/'+i]
                episodes = episodes.concat(season.episodes)
                seasons.push(season)
            }
        }
        show.seasons = seasons
        show.episodes = episodes

        return show
    }
}

exports = module.exports = (options) => new TMDB(options)
exports.TMDB = TMDB