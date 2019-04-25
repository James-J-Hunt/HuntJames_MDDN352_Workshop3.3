function init() {
    var compass = document.getElementById('compass');

    var dataContainerOrientation = document.getElementById('dataContainerOrientation');
    
        if(window.DeviceOrientationEvent) {

        window.addEventListener('deviceorientation', function(event) {
            var alpha;
            var beta = event.beta;
            var gamma = event.gamma;

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

            compass.style.Transform = 'rotate(' + alpha + 'deg)';
            compass.style.WebkitTransform = 'rotate('+ webkitAlpha + 'deg)';
            //Rotation is reversed for FF
            compass.style.MozTransform = 'rotate(-' + alpha + 'deg)'; 

            if(alpha!=null || beta!=null || gamma!=null) 
                dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
        }, false);
    }
} 