const config  = require('./../config')
const http = require('axios').create(config.http)

http.interceptors.request.use(config => {
    config.url = encodeURI(config.url)
    return config
}, error =>{
    console.log({'@request-error': error})
    return Promise.reject(error)
})

http.interceptors.response.use(response => {
    return response
}, error =>{
    console.log({'@response-error': error.response})
    return Promise.reject(error)
})

module.exports = http