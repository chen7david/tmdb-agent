# TMDB-Agent

### Usage
```js
const tmdb = require('tmdb-agent')({
    apiKey: /* you-api-key */
})

const someAsyncFunction = async () => {
    const movies = await tmdb.movies().search('some-movie-name', /* optional a year parameter*/ )
    const movie = await tmdb.movies().getById('some-movie-id')
    const shows = await tmdb.shows().search('some-show-name')
    const show = await tmdb.shows().getById('some-show-id')
    const showSeasonsEpisodes = await tmdb.shows().eager().getById('some-show-id')
}
```

### Search for movies by title
```js
const movies = await tmdb.movies().search('some-movie-name', /* optional a year parameter*/ )
```

### Search for movies by MTDB id
```js
const movie = await tmdb.movies().getById('some-movie-id')
```

### Search for show by title
```js
const shows = await tmdb.shows().search('some-show-name')
```

### Search for show by MTDB id
```js
const show = await tmdb.shows().getById('some-show-id')
```

### Search for show by MTDB id and load related season and episodes
```js
const showSeasonsEpisodes = await tmdb.shows().eager().getById('some-show-id')
```

## Important URLs
- baseURL : 'https://api.themoviedb.org/3/'
- imageURL : 'http://image.tmdb.org/t/p/'
