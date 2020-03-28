const dd = (val) => console.log(val)

const tmdb = require('./utils/tmdb')({
    apiKey: 'c729bbc07bb8542dd22c1d740f0c5bf5'
})

const main = async () => {
    const fullShow = await tmdb.shows().search('lilo and stitch', {year: 2005})
    dd(fullShow)
}

main()