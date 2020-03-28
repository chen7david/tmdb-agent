const dd = (val) => console.log(val)

const tmdb = require('./utils/tmdb')({
    apiKey: 'c729bbc07bb8542dd22c1d740f0c5bf5'
})

const main = async () => {
    const data  = await tmdb.shows().search('the simpsons').first()
    // const data  = await tmdb.shows().getById('456')
    // let seasonIds = data.seasons.map(el => el.season_number)
    // dd(seasonIds)
    dd(data)
}

main()