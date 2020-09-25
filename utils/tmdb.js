const http = require('./http')
const fs = require('fs')
const path = require('path')
const { sizes, imageURL }  = require('./../config')

class TMDB {
    constructor(options = {}){
        this.apiKey = options.apiKey
        this.queryType = ''
        this.eagerState = false
        this.result = null
        if(options.basePath) this.basePath = path.resolve(__dirname, '../../../', options.basePath)
    }

    movies(){
        this.queryType = 'movie'
        return this
    }

    shows(){
        this.queryType = 'tv'
        return this
    }

    people(){
        this.queryType = 'person'
        return this
    }

    async genres(){
        if(!this.queryType) throw('genres can not be called directly!')
        let url = '/genre/'.concat(this.queryType,'/list?api_key=', this.apiKey, '&language=en-US')
        const { data:{ genres } } = await http.get(url)
        return genres
    }

    async trending(window = null){
        if(!this.queryType) throw('trending can not be called directly!')
        let url = '/trending/'.concat(this.queryType,'/', window == "week" ? "week" : "day",'?api_key=', this.apiKey)
        const { data } = await http.get(url)
        return data.results.length > 0 ? data.results : []
    }

    eager(){
        this.eagerState = true
        return this
    }

    async search(keyphrase, options = {}){
        const { year } = options
        if(!this.queryType) throw('search can not be called directly!')
        let url = '/search/'.concat(this.queryType, '?api_key=', this.apiKey, '&query=', keyphrase)
        if(year) url = url.concat('&year=', year)
        const { data } = await http.get(url)
        return data.total_results > 0 ? data.results : []
    }

    async getById(id){
        if(id == null) throw(`id is required but ${id} was given!`)
        const url = '/'.concat(this.queryType,'/', id, '?api_key=', this.apiKey)
        const { data } = await http.get(url)
        if(this.eagerState && data && data.seasons) {
            await this.load(data)
            this.eagerState = false
        }
        return data
    }

    async load(show){
        const numbers = show.seasons.map(el => el.season_number)
        const batches = this.chunk(numbers, 20)
        let seasons = [], episodes = []

        for(let batch of batches){
            let url = '/tv'.concat('/', show.id,'?api_key=', this.apiKey,'&append_to_response=')
            for(let i of batch){ url = url.concat('season','/', i,',') }
            const { data } = await http.get(url)
            for(let i of batch){
                const season = data['season/'+i]
                episodes = episodes.concat(season.episodes)
                seasons.push(season)
                delete data['season/'+i]
            }
        }
        show.seasons = seasons
        show.episodes = episodes
        return show
    }

    chunk(array, chunk){
        let chunks = [], i = 0, n = array.length
        while (i < n) chunks.push(array.slice(i, i += chunk))
        return chunks
    }

    async download(dest, url){
        try {
            const { data } = await http.get(url, {responseType: 'stream'})
            const file = fs.createWriteStream(dest)

            return new Promise((resolve, reject) => {
                file.on('error', (err) => reject(err))
                data.pipe(file)
                file.on('finish', () => resolve(true))
            })
        } catch (err) {
            fs.unlink(dest, (err) => err ? err : false)
        }
    }

    async savePoster(imgURL){
        for(let size of sizes.poster){
            await this.saveImgFile(size, imgURL)
        }
    }
    
    async saveBackdrop(imgURL){
        for(let size of sizes.backdrop){
            await this.saveImgFile(size, imgURL)
        }
    }

    async saveStill(imgURL){
        for(let size of sizes.still){
            await this.saveImgFile(size, imgURL)
        }
    }

    async saveLogo(imgURL){
        for(let size of sizes.logo){
            await this.saveImgFile(size, imgURL)
        }
    }

    async saveProfile(imgURL){
        for(let size of sizes.profile){
            await this.saveImgFile(size, imgURL)
        }
    }

    async saveImgFile(size, imgURL){
        let url = imageURL.concat(size,imgURL)
        let dest = path.join(this.basePath, size)
        let filePath = path.join(this.basePath, size, imgURL)
        this.mkdir(dest)
        await this.download(filePath, url)
    }

    exist(path){
        return fs.existsSync(path)
    }

    mkdir(path, config = { recursive: true }){
        if(!this.exist(path)) fs.mkdirSync(path, config)
    }

}

module.exports = TMDB