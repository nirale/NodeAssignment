const request = require( 'request' );
const forecast = ( city, callback ) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=fb293e2a701962b8e44633a857b624d4&units=metric';
    request( {
        url,
        json: true
    }, ( error, response ) => {
        if ( error ) {
            callback( 'Unable to connect to Weather Service.', undefined );
        } else if ( response.body.error ) {
            console.log( 'Unable to find Location.' );
            callback( 'Unable to find Location.', undefined );
        }

        else {
            callback( undefined, {
                description: response.body.weather[0].description.charAt( 0 ).toUpperCase() + response.body.weather[0].description.slice( 1 ),
                temperature: response.body.main.temp,
                weatherMain: response.body.weather[0].main,
            } );
        }
    } );
}

module.exports = forecast;