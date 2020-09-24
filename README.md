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
- imageURL : 'http://image.tmdb.org/t/p/original/some-image-url'

## download 

```js
const path = 'some-path/some-image-name.jpg'
const url = 'http://some-url.com/file'

const someAsyncFunc = async () => {

        const result = await tmdb.download(path, url)
        /* result is true if succees and will throw an error if fialed */ 
}

someAsyncFunc()
```

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

