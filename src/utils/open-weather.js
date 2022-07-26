const request = require('request')

const onecall = (lat, lon, exclude, units, apiKey) => {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${apiKey}`

    return new Promise((resolve, reject) => {
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                console.log(error)
                reject('Unable to connect to weather service.')
            } else if (response.statusCode === 200) {
                resolve(body)
            } else if (response.statusCode === 400) {
                resolve(null)
            } else {
                console.log(body)
                reject('Error response from weather service.')
            }                
        })
    })
}

const geo = (city, state, country, limit, apiKey) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${apiKey}`

    return new Promise((resolve, reject) => {
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                console.log(error)
                reject('Unable to connect to geocoding service.')
            } else if (response.statusCode === 200)  {
                resolve(body)
            } else {
                console.log(body)
                reject('Error response from geocoding service.')
            }  
        })
    })
}

module.exports = {
    onecall,
    geo
}