const request = require('request')

const forecast = (la, lo, callback) => {
    const url = 'https://api.darksky.net/forecast/32320380ed2166e2c768c6f2b613f501/' + encodeURIComponent(la) + ',' + encodeURIComponent(lo) + '?units=si&lang=be'
    // console.log(url)
    request({ url, json: true }, (error, { body }) => {
        // console.log('ERROR ---->>>>>>', error)
        // console.log('RESPONSE ------->>>>>>', response)
        if (error) {
            callback('Unnable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unnable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        } 
    })

}

module.exports = forecast