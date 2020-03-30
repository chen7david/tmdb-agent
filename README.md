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
    const tvshow = await tmdb.shows().load('some-show-id')
    const tvshowWithSeasonsAndEpisodes = await tmdb.loadShow('some-show-name')
}
```

###End Points
```js
const url = '/movies?keyphrase=some-movie-name' /* returns an array of matches movies */
const url = '/movie?id=1419' /* returns an a single movie match */


const url = '/shows?keyphrase=some-show-name' /* returns an a single show match */
const url = '/show?id=1419' /* returns an a single show match */
```