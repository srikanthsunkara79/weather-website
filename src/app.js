const path = require('path')
const express = require('express')
const hsb = require('hbs')
const geoCode = require('./utils/geoCode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 2000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views loaction 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hsb.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Srikanth Sunkara',
    })
})
app.get('/about', function (req, res) {
    res.render('about', {
        title: 'About Me',
        name: 'Srikanth Sunkara',
    })
})
app.get('/help', function (req, res) {
    res.render('help', {
        title: 'Help',
        message1: 'Welcome to the Help Page',
        message2: 'Please tell me about your query',
        name: 'Srikanth Sunkara'
    })
})

app.get('/weather', function (req, res) {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
        geoCode(req.query.address, function (error, { latitude, longitude, location } = {}) {
            if (error !== undefined) {
                return res.send({ error })
            }
            forecast(latitude, longitude,
                function (error, forecastData) {
                    if (error = undefined) {
                        return res.send({ error })
                    }
                    res.send({
                        forecast: forecastData
                    })
                })
        })
})

app.get('/products', function (req, res) {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', function (req, res) {
    res.render('404', {
        title: '404',
        name: 'Sriaknth Sunkara',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', function (req, res) {
    res.render('404', {
        title: '404',
        name: 'Srikanth Sunkara',
        errorMessage: 'Page Not Found'
    })
})



app.listen(port, function () {
    console.log('Server is up on port', port)
})