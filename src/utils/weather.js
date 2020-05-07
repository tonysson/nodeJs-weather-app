const request = require('request');

const weather = (longitude , latitude , callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=3ce0e7cc9fc901d5eb0ce379ef494d7c&query=' + longitude + ',' + latitude + '&units=m' ;

    request({url  , json: true }, (error , {body}) => {

        if(error){
            callback('Unabable to connect to weather service', undefined)
        }else if(body.error){
            callback('unable to find location', undefined)
        }else{
            callback(undefined, `${body.current.weather_descriptions} it is currently ${body.current.temperature} degres out. it feels like ${body.current.feelslike} degres out`)
        }
    });

}

module.exports = weather;


// const url = "http://api.weatherstack.com/current?access_key=3ce0e7cc9fc901d5eb0ce379ef494d7c&query=37.8267,-122.4233&units=f"

// /**
//  * si on specifie json: true cela nous permet de ne plus faire JSON.parse(), on a directement notre objet
//  */

// request({ url : url , json: true}, (error,response) => {

//     if(error){
//         console.log('Unabable to connect to weather service');

//     }else if(response.body.error){
//         console.log('unable to find location');

//     }else{
//         console.log(chalk.yellowBright(`${response.body.current.weather_descriptions} it is currently ${response.body.current.temperature} degres out. it feels like ${response.body.current.feelslike} degres out`));
//     }

// });

