const axios = require('axios')

exports = module.exports = (options) => {

    const { baseURL, headers, timeout } = options
    if(!baseURL) throw(`baseURL is required`)
    const config = { baseURL }
    if(headers) config.headers = headers
    if(timeout) config.timeout = timeout
    const http = axios.create(config)

    // INTERCEPTORS 
    http.interceptors.request.use(config => {
        config.url = encodeURI(config.url)
        console.log({url:config.url})
        return config
    }, error =>{
        console.log({'@req-error': error})
        return Promise.reject(error)
    })

    http.interceptors.response.use(response => {
        // console.log(response.data)
        return response
    }, error =>{
        console.log({'@req-error': error.response})
        return Promise.reject(error)
    })

    return http
}


exports.axios = axios