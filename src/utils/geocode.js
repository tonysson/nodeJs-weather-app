const request = require('request');

const geoCode = (address, callback) => {

    const url = ' https://api.mapbox.com/geocoding/v5/mapbox.places/ ' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2liaTA0MTIyMDE3IiwiYSI6ImNrOXVjdHg3cTAwaGczbG4yOXp0NW0yNWQifQ.yiZfv_SL38J_uF8rf3yytg&limit=1 '

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

};



module.exports = geoCode

// const map = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2liaTA0MTIyMDE3IiwiYSI6ImNrOXVjdHg3cTAwaGczbG4yOXp0NW0yNWQifQ.yiZfv_SL38J_uF8rf3yytg&limit=1"

// request({ url: map, json: true }, (error, response) => {

//     if (error) {
//         console.log(' Unabable to connect to location services');
//     } else if (response.body.features.length === 0) {
//         console.log('Unabable to find location, enter another search');

//     } else {
//         const longitude = response.body.features[0].center[0];
//         const latitude = response.body.features[0].center[1];
//         console.log(longitude, latitude);
//     }

// })

