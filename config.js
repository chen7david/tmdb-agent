module.exports = {
    http: {
        baseURL: 'https://api.themoviedb.org/3/',
        timeout: 12000,
    },
    imageURL: 'http://image.tmdb.org/t/p/',
    sizes: {
        all: ["w45","w92","w154","w185","w300","w342","w500","h632","w780","w1280","original"],
        backdrop: ["w300","w780","w1280","original"],
        logo: ["w45","w92","w154","w185","w300","w500","original"],
        poster: ["w92","w154","w185","w342","w500","w780","original"],
        profile: ["w45","w185","h632","original"],
        still: ["w92","w185","w300","original"]
    }
}