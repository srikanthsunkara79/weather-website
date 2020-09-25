const request = require('request')

const forecast = function (latitude, longitude, callBack) {
    const url = 'http://api.weatherstack.com/current?access_key=4deb4e23a17d464c6afef95a3b99c8da&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)

    request({ url, json: true },
        function (error, {body}) {
            if (error) {
                callBack('Unable to connec to weather service!')
            } else if (body.error) {
                callBack('Unable to find location')
            } else {
                const data = {
                    location: body.location.name,
                    temperature: body.current.temperature,
                    feelsLike: body.current.feelslike,
                    rain_percentage: body.current.precip,
                    weather_description: body.current.weather_descriptions[0]
                }
                callBack(undefined, data)
            }

        }
    )

}

module.exports = forecast