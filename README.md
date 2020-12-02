# tmdb-agent

### Usage
```js
const tmdb = require('tmdb-agent')({
    apiKey: /* your-api-key */,
    timeout: 18000 /* optional, defaults to 12000 */
})

const someAsyncFunction = async () => {
    const movies = await tmdb.movies().search('some-movie-name', /* optional a year parameter*/ ).get()
    const movie = await tmdb.movies().withId('some-movie-id').get()
    const shows = await tmdb.shows().search('some-show-name', /* optional a year parameter*/).get()
    const show = await tmdb.shows().withId('some-show-id').get()
    const showSeasonsEpisodes = await tmdb.shows().seasons().withId('some-show-id')
    const showSeasonsOneEpisodes = await tmdb.shows().seasons([1]).withId('some-show-id')
}
```

### Search for movies by title
```js
const movies = await tmdb
    .movies()
    .search('some-movie-name', /* optional a year parameter*/ )
    .get()
```

### Search for movies by MTDB id
```js
const movie = await tmdb
    .movies()
    .withId('some-movie-id')
    .get()
```

### Search for show by title
```js
const shows = await tmdb
    .shows()
    .search('some-show-name', /* optional a year parameter*/)
    .get()
```

### Search for show by MTDB id
```js
const show = await tmdb
    .shows()
    .withId('some-show-id')
    .get()
```

### Search for show by MTDB id and load related season and episodes
```js
const showSeasonsEpisodes = await tmdb
    .shows()
    .seasons().withId('some-show-id')
    .get()
```

### Search for show by MTDB id and load a subset related season and episodes
```js
const showSeasonsEpisodes = await tmdb
    .shows()
    .seasons([1, 20, 40])
    .withId('some-show-id')
    .get()
```

### Get all valid genre for either shows or movies
```js
const allShowGenres = await tmdb
    .shows()
    .genres()
    .get()
const allMovieGenres = await tmdb
    .movies()
    .genres()
    .get()
```

### Get all trending shows, movies or people
```js
const allTrendingShows = await tmdb
    .shows()
    .trending('week')
    .get()
const allTrendingMovies = await tmdb
    .movies()
    .trending()
    .get()
const allTrendingMovies = await tmdb
    .people()
    .trending().get()
```

## Important URLs
- baseURL : 'https://api.themoviedb.org/3/'
- imageURL : 'http://image.tmdb.org/t/p/original/some-image-url'


## Important Image Sizes

```yaml
backdrop:
    - "w300"
    - "w780"
    - "w1280"
    - "original"
logo:
    - "w45"
    - "w92"
    - "w154"
    - "w185"
    - "w300"
    - "w500"
    - "original"
poster:
    - "w92"
    - "w154"
    - "w185"
    - "w342"
    - "w500"
    - "w780"
    - "original"
profile:
    - "w45"
    - "w185"
    - "h632"
    - "original"
still:
    - "w92"
    - "w185"
    - "w300"
    - "original"
```

