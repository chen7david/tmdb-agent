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


```js
const movies = await tmdb.movies().search('some-movie-name', /* optional a year parameter*/ )
```

```js
const movie = await tmdb.movies().getById('some-movie-id')
```

```js
const shows = await tmdb.shows().search('some-show-name')
```

```js
const show = await tmdb.shows().getById('some-show-id')
```

```js
const showSeasonsEpisodes = await tmdb.shows().eager().getById('some-show-id')
```
