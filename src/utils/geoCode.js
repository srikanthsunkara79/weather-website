const request = require('request')

const geoCode = function (address, callBack) {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375 & access_token=pk.eyJ1Ijoic3Jpa2FudGhzdW5rYXJhIiwiYSI6ImNrZmM4ajNlYTE2djAycW9mMTF3b2VqaG8ifQ.pibFI - FOZkVJgFo8KT4G6w & limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic3Jpa2FudGhzdW5rYXJhIiwiYSI6ImNrZmM4ajNlYTE2djAycW9mMTF3b2VqaG8ifQ.pibFI-FOZkVJgFo8KT4G6w'

    request({ url, json: true },
        function (error, {body}) {
            if (error) {
                callBack('Unable to connect to location services!')
            } else if (body.message) {
                callBack('Invalid URL')
            } else if (body.features.length === 0) {
                callBack('Unable to find location. Try another search')
            } else {
                callBack(undefined, {
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    place: body.features[0].place_name
                })
            }
        }
    )
}


module.exports = geoCode