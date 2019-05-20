const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPaths = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',  viewsPath)
hbs.registerPartials(partialsPaths)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alex Kufel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About iPhone 7)))',
        name: 'Alex Kufel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Did you need a help?',
        helpPage: 'This is a Help page(under construction)',
        name: 'Alex Kufel'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    

    // res.send({
    //     forecast: 'forecast',
    //     location: 'Minsk',
    //     address: req.query.address

    // })
})

app.get('/products', (req, res) => {
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

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found',
        errorMessage: 'Page not found',
        name: 'Alex Kufel'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'My 404 page',
        errorMessage: 'Page not found',
        name: 'Alex Kufel'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})