const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forcast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yogesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yogesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Yogesh',
        message:'How can I help you?'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Yogesh',
        errorMessage:'Help article not found' 
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address
    if (!address) {
        return res.send({
            error:'Please provide address'
        })
    }

    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forcast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            } else {
                res.send({
                    address:address,
                    forecast: forecastData,
                    latitude,
                    longitude
                })
            }
        })

    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Yogesh',
        errorMessage:'Page not found' 
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})