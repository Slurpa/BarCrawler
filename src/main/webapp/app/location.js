'use strict';

const getLocation = () => {
    let msg;

    if('geolocation' in navigator) {
        requestLocation();
    }
    else {
        msg = 'Sorry your browser does not support geolocation';
        console.log(msg);
    }

    function requestLocation() {
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(success, error, options);

        function success(position) {
            const longitude = position.coords.longitude;
            const latitutde = position.coords.latitude;
            msg = 'You are at longitude: ' + longitude + ', latitude: ' + latitutde;
            console.log(msg);
        }

        function error(err) {
            msg = 'Error: ' + err.message;
            console.log(msg);
        }
    }
};

module.exports = getLocation;