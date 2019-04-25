function init() {
    //Compass Variables
    var compass = document.getElementById('compass');

    //Position Variables
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    //Compass Function
    if(window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event) {
            var alpha;
            //Check for iOS property
            if(event.webkitCompassHeading) {
                alpha = event.webkitCompassHeading;
                //Rotation is reversed for iOS
                compass.style.WebkitTransform = 'rotate(-' + alpha + 'deg)';
            }
            //non iOS
            else {
                alpha = event.alpha;
                webkitAlpha = alpha;
                if(!window.chrome) {
                    //Assume Android stock (this is crude, but good enough for our example) and apply offset
                    webkitAlpha = alpha-270;
                }
            }

            compass.style.Transform = 'rotate(' + alpha +'deg)';
            compass.style.WebkitTransform = 'rotate('+ webkitAlpha + 'deg)';
            //Rotation is reversed for FF
            compass.style.MozTransform = 'rotate(-' + alpha + 'deg)'; 
        }, false);
    }

    //Position Function
    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = '';
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating';
        navigator.geolocation.getCurrentPosition(success, error);
    }
} 