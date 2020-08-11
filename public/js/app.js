const search = document.querySelector( 'input' );
const weatherForm = document.querySelector( 'form' );
const cityName = document.querySelector( '.cityName' );
const discriptionText = document.querySelector( '.discriptionText' );
const temperature = document.querySelector( '.temperature' );


weatherForm.addEventListener( 'submit', ( e ) => {
    e.preventDefault();
    let location = search.value;
    // cityName.innerHTML = 'Loading ....';
    var d = new Date();
    var n = d.getDate();
    if ( isPrime( n ) ) {
        fetch( `http://localhost:3000/weather?address=${location}` )
            .then( ( response ) => {
                response.json()
                    .then(
                        ( data ) => {

                            if ( data.error ) {
                                console.log( 'Error :' + data.error );
                                cityName.innerHTML = data.error;
                                discriptionText.textContent = '- -';
                                temperature.innerHTML = '- -';
                            } else {
                                cityName.innerHTML = location;
                                discriptionText.textContent = data.forecast.description;
                                temperature.innerHTML = Math.floor( data.forecast.temperature ) + '&#176C';
                            }
                        }
                    )
            }, ( err ) => {
                console.log( 'Error ' + err );
            } );
    } else {
        discriptionText.textContent = 'Date is not prime';
    }
    function isPrime( num ) {
        for ( var i = 2; i < num; i++ )
            if ( num % i === 0 ) return false;
        return num > 1;
    }
} )