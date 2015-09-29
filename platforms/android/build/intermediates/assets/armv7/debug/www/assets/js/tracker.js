// GPS TRACKER
  document.addEventListener('DOMContentLoaded', function () {

      // Turn TRACKER ON/OFF
          document.getElementById("switch-id-2").addEventListener("click", getTracker);
          var timeOut = 30000;
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
      // GET TRACKER TIME (SECONDS)
            $( "#tracksec" ).focusout( function() {
            var xd = document.getElementById('tracksec');
            var trackTime = xd.value/1000; // Convert to Seconds
            if (trackTime == 0){
              timeOut = 30000;
            }else{timeOut = trackTime;}

            });

});