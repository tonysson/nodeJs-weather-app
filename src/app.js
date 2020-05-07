const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();

// define path for express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs') // on sspecifie a express quel template on veut utiliser
app.set('views', viewsPath ); // quand on ne nomme pas templates views, on precise a express
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath)); 

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Teyi lawson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Teyi lawson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Teyi lawson'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
          error: "You must provide an address"
        })
    }
    geoCode(req.query.address , (error , {longitude, latitude, location} = {}) =>{
        if(error){
            return res.send({error});
        }

        weather(longitude, latitude,  (error, weatherData) => {

            if(error){
                return res.send({error})
            }

            res.send({
                weather: weatherData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Teyi lawson',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Teyi lawson',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000)