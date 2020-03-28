# TMDB-Agent

### Usage
```js
const tmdb = require('tmdb-agent')({
    apiKey: /* you-api-key */
})

const someAsyncFunction = async () => {
    const movies = await tmdb.movies().search('some-movie-name', /* optional a year parameter*/ )
    const movie = await tmdb.movies().find('some-movie-name', /* optional a year parameter*/ )
    const tvshows = await tmdb.shows().search('some-show-name')
    const tvshow = await tmdb.shows().find('some-show-name')
    const tvshowWithSeasonsAndEpisodes = await tmdb.loadShow('some-show-name')
}
```