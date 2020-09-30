const config  = require('./config')
const http = require('axios').create(config.http)
const dd = (val) => console.log(val)

http.interceptors.request.use(config => {
    config.url = encodeURI(config.url)
    dd({url: config.url})
    return config
}, error =>{
    console.log({'@request:': error})
    return Promise.reject(error)
})

http.interceptors.response.use(response => {
    return response
}, error =>{
    console.log({'@response:': error.response})
    return Promise.reject(error)
})

module.exports = http