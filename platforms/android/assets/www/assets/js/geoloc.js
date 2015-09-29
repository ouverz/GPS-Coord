
//*****************************************************//
// default settings for the built-in function options - 
// navigator.geolocation.getCurrentPosition 

// enableHighAccuracy: Defines that the app would like to receive the best possible results (Boolean).
// timeout: The maximum length of time (msec) that is allowed to pass from the call to geolocation.getCurrentPosition until the corresponding geolocationSuccess callback is invoked (Number).
// maximumAge: Accept a cached position whose age is not greater than the specified time in milliseconds (Number).
//*****************************************************//
var options = {
  enableHighAccuracy: true,
  timeout: 30000,
  maximumAge: 75000
};

var x;
var pos = {};

//*****************************************************//
            // Show Position Coordinates
//*****************************************************//
function showPosition(position) {

  pos.latitude = position.coords.latitude;
  pos.longitude = position.coords.longitude;

  // Show Cords 
  x.innerHTML = 'Latitude: ' + position.coords.latitude + '<br/>' + 'Longitude: ' + position.coords.longitude;
  console.log('x.innerHTML=' +x.innerHTML);

}

  function getLocation() {

  if (navigator.geolocation) {
//*****************************************************//
// geolocation.getCurrentPosition (asyncronous) returns the device's current position 
// to the geolocationSuccess callback with a Position object as the parameter. 
// If there is an error, the geolocationError callback is invoked with a PositionError object.
//*****************************************************//
  navigator.geolocation.getCurrentPosition(showPosition, showError, options);
  
  } else {
    
    console.log('In getLocation NOT SUPPORTED');
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
   
  }

//*****************************************************//
// showError function - Returns error if previous call is unsuccesfull
//*****************************************************//

  function showError(error) {
    console.log('error');
    // switch(error.code) {
    //     case error.PERMISSION_DENIED:
    //         x.innerHTML = "User denied the request for Geolocation."
    //         $('#cords').addClass('errormsg');
    //         break;
    //     case error.POSITION_UNAVAILABLE:
    //         x.innerHTML = "GPS information is currently unavailable."
    //         $('#cords').addClass('errormsg');
    //         break;
    //     case error.TIMEOUT:
    //         x.innerHTML = "The request to get user location timed out."
    //         $('#cords').addClass('errormsg');
    //         break;
    //     case error.UNKNOWN_ERROR:
    //         x.innerHTML = "An unknown error occurred."
    //         $('#cords').addClass('errormsg');
    //         break;
    // }
}

//*****************************************************//
                  // Event Listener 
//*****************************************************//

  document.addEventListener('DOMContentLoaded', function () {
    // Get cords element content
    // cords contains the retrieved device coordinates

    x = document.getElementById("cords");

    // document.getElementById('getCords').addEventListener('click', getLocation());
    
    // Parent
    // bulk is the list of buttons on the main app screen
    var ul = document.getElementById('bulk');

    // add click EventListener to entire list
    ul.addEventListener('click', function (e) {
    //  console.log('In click event');

      // Clicked element
     var target = e.target; 
      
     // getCords - the button labeled 'Find My Coordinates'
     if (target.id === 'getCords'){

        // Check if the element is a LI
         console.log('IN LI :' + target.id); 
        // call getLocation - get device coordinates
       asd = getLocation();      

     }

      // Calls the function to save the data to file
      doExportToDisk2();
      //if ( pos.latitude != '' ) {
        //GoogleSync();
        //doExportToDisk2();
        //console.log('Google sync');
      //}

  }); // ul.addEventListener  - END

//*****************************************************//
                // GPS TRACKER FEATURE
//*****************************************************//

          //
          // Turn TRACKER ON/OFF
          //
          document.getElementById("switch-id-2").addEventListener("click", getTracker);
          // default 30 seconds callback for the getLocation function
          var timeOut = 30000;
          // getTracker checks if the 'switch' button is enabled or disabled
          // Enabling will callback the getLocation function every 30 seconds (by default).
          // The user may change the timeout in the app settings themselves.
          // See 'Get Tracker Time' section below.
          function getTracker () {
             if ($('#switch-id-2').is(':checked')) {
              console.log('checked');
              console.log('<br/>');

              getLocation();
              setTimeout(getTracker, timeOut);

              }
               else {
                console.log('off');
                clearTimeout(timeOut);
                return $('#switch-id-2').removeAttr('checked')
               }
            }
//*****************************************************//            
          // GET TRACKER TIME (SECONDS)
//*****************************************************//
            // Checks if the user has altered the timeout time

            $( "#tracksec" ).focusout( function() {
            var xd = document.getElementById('tracksec');
            var trackTime = xd.value/1000; // Convert to Seconds
            if (trackTime == 0){
              timeOut = 30000;
            }else{timeOut = trackTime;}

            });
                     


}); // document.addEventListener - END
