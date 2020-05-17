const request = require('request')

const forcast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=70b1509b18e19a23cfbaf27ee8e699b2&query=${latitude},${longitude}`

    request({ url, json: true }, (error, {body}  = {}) => {     // Destructuring Object (arg: {body})
        if (error) {
            callback(`Unable to connect to '${error.hostname}'. Error Code: ${error.code}`, undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {           
            const location = `${body.location.name},${body.location.region},${body.location.country}`
            const time = `${body.location.localtime}`
            const forecast = `Feels like ${body.current.weather_descriptions[0]} with Temperature ${body.current.feelslike}*C and Humidity ${body.current.humidity}%`
            
            callback(undefined, {location, time, forecast})  // Property Shorthand, second arg
        }
    })
}

module.exports = forcast