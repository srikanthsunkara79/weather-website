



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

messageOne.textConent = 'Loading...'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const location = searchElement.value
    console.log(location)
  
    const geoCodeURL = '/weather?address=' + encodeURIComponent(location)

    fetch(geoCodeURL).then(function (response) {
        response.json().then(function (data) {
            if (data.error) {
                messageTwo.textContent= data.error
            } else {
                messageOne.textContent = data.forecast.location
                messageTwo.textContent = 'The Weather Forecast is:' + 'It is ' + data.forecast.weather_description + ' today. The Temperature is ' + data.forecast.temperature + ' with a change of ' + data.forecast.rain_percentage * 100 + '%'
                console.log(data)
            }
        })
    })
})

