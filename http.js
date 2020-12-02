const axios = require('axios')
const dd = (val) => console.log(val)

/* REQUEST HANDLERS */
const requestConfigHandler = async (config) => {
    dd({'@NetworkFetching:': config.url})
    return config
}

const requestErrorHandler = async (error) => {
    dd({'@NetworkRequestError:': error})
    return Promise.reject(error)
}

/* RESPONSE HANDLERS */
const responseConfigHandler = async (response) => {
    return response;
}

async function responseErrorHandler (error){
    dd({'@NetworkResponseError:': error.message})
    return Promise.reject(error)
}


module.exports = (options = {}) => {
    
    const config = {
        baseURL: require('./config').url.tmdb,
        timeout: require('./config').timeout,
    }

    Object.assign(config, options)
    const http = axios.create(config)

    http.interceptors.request.use(requestConfigHandler, requestErrorHandler)
    http.interceptors.response.use(responseConfigHandler, responseErrorHandler)

    return http
}