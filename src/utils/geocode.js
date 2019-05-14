const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3VmZWxhbGV4YW5kZXIiLCJhIjoiY2p2YnNzcHFoMWJudTRlcGtsd2NkdXJjMiJ9.Z8mJO13GO_u75POuiawnOw&limit=1'
    request({ url: geocodeURL, json: true}, (error, { body }) => {
        // console.log('12', response.body.features)
        // console.log('12lenght', response.body.features.lenght)
        if (error) {
            callback('Unnable to connect to location services', undefined)
        } else if (body.features === undefined || body.features.length === 0) {
            callback('Unnable to find location. Try another place', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode