const express = require( 'express' ); // learn this is a function
const path = require( 'path' );
const hbs = require( 'hbs' );
const app = express();
const port = process.env.PORT || 3000;
const forecast = require( '../src/utilities/weather' );

viewsPath = path.join( __dirname, '/templates/views' );
app.use( express.static( path.join( __dirname, '../public' ) ) );

app.set( 'view engine', 'hbs' );
app.set( 'views', viewsPath );

app.get( '', ( req, res ) => {
    res.render( 'index', {
        title: 'Weather',
        name: 'Kshitij Nirale'
    } )
} )

app.get( '/weather', ( req, res ) => {

    if ( !req.query.address ) {
        return res.send( {
            error: 'Please provide address.'
        } )
    } else {

        forecast( req.query.address, ( err, forecastData ) => {
            if ( err ) {
                return res.send( {
                    error: err
                } )
            }
            res.send( {
                address: req.query.address,
                forecast: forecastData,
            } )
        } )
    }
}
)

app.listen( port, () => {
    console.log( 'Server is running on port ' + port );
} )