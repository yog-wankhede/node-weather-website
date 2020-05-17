const request = require('request')

const geoCode = (address, callback) => {

    const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieW9nd2Fua2hlZGUiLCJhIjoiY2thYXVlczRhMGl1ODJ0b2kwMzNqODZ3dCJ9.EevBysTw5gdZB-ms2lYbWQ`

    request({ url: geoCodeUrl, json: true }, (error, {body} = {}) => {  // Destructuring Object (arg: {body})
        if (error) {
           callback(`Unable to connect to '${error.hostname}'. Error Code: ${error.code}`, undefined)
        } else if (body.features.length === 0) {
            callback(`Unable to find location`, undefined)
        } else {
            const location = body.features[0].place_name
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            
            callback(undefined, {location, latitude, longitude}) // Property Shorthand, second arg
        }
    })
}

module.exports = geoCode