const dd = (val) => console.log(val)

const tmdb = require('./index')({
    apiKey: 'your-api-key',
    timeout: 12000,
})

// const x = [...Array(200).keys()]

const run = async () => {

    try {
        const data = await tmdb
            .movies()
            // .shows()
            // .people()
            // .trending()
            // .genres()
            // .search('star trek discovery')
            // .season()
            .withId(12)
            .get()
        dd(data)
    } catch (err) {
        dd(err)
    }
}

run()