  
  var savedFileEntry, fileDisplayPath;
//*****************************************************//
  // First part -
  // Calls to store data (coordinates and timestamp) into
  // chrome.storage.sync - similar to localstorage
  // Second part - 
  // chrome.syncFileSystem.requestFileSystem Syncs entire
  // Cords array into a file on Google Drive
//*****************************************************//

  function doExportToDisk() {
 //    if (savedFileEntry) {

 //   exportToFileEntry(savedFileEntry);

 // } else {


//*****************************************************//
          // Coordinates Data Object - newCord
//*****************************************************//

  // newCord data object
  // newCord - stores the latest/current device position

    // newCord.longitude - current longitude
    // newCord.longitude - current longitude 
    // newCord.dateime - current time and date stamp

  var newCord = {};

  newCord.longitude = pos.longitude;
  newCord.latitude = pos.latitude;
  newCord.datetime = Date.now();
  //
  // Retreives and Syncs current coordinates from geoloc.js
  // Saves into a data object array - cords []
  //

  chrome.storage.sync.get('cords', function(result) {
     cords = [];

    console.log('cords result:' + JSON.stringify(result));

    if (result.cords)
      cords = result.cords;
      //
      // Append newCords to cords data object array
      //
      cords.push(newCord);

      chrome.storage.sync.set({'cords': cords}, function() {
        // after save

          console.log('after save cord =' + newCord);

      });
  });

  //
  //  ErrorHandler - displays error if cords retrieval is unsuccessfull
  //
    function errorHandler(){
      status_msg = 'Coordinates were not saved';
      status.innerHTML = status_msg;
      console.log('errorHandler msg');
    };

 console.log("before localStorage");

//*****************************************************//
          // Save a file in the FileSystem.
 //*****************************************************//

 chrome.syncFileSystem.requestFileSystem(function(fs){
  
      console.log('inside GoogleSync');
  
        fs.root.getFile('cords_array.txt', {create: true}, function(fileEntry){

          file = fileEntry;
          writeData();
        })
          

  function writeData(){
    console.log('inside writeData');
 // var data = document.querySelector("#data").value;
    if(file) {
            console.log('inside if file');

      file.createWriter(function(writer){
        
          writer.onwriteend = function(e){
          
              //console.log('data blob data :' + JSON.stringify([data

            console.log("write completed");
          }

          writer.onerror = function(e){

            console.log("write error");
          }

          // Turns a JavaScript object into a JSON string
          // Entire cords array into data variable
          data = JSON.stringify(cords);
          // 
          // Write the new blob into a file
          // 
        writer.write(new Blob([data], {type: 'text/plain'}));  
        console.log('data blob array :' + JSON.stringify([data]));
        
      });

    } // if file - END  

} // writeData - END

//  chrome.syncFileSystem - END
})


  } // doExportToDisk - END

//*****************************************************//
      // Export 2 - Save Current Cords to Google Drive file
//*****************************************************//

  //
  // chrome.storage.sync.get - Syncs and retrieves a data object with chrome sync storage 
  // In this case it counts the number of user clicks 
  //

function doExportToDisk2() {
   console.log('in doExportToDisk2'); 

   // newCord data object
  // newCord - stores the latest/current device position

    // newCord.longitude - current longitude
    // newCord.longitude - current longitude 
    // newCord.dateime - current time and date stamp

  var newCord = {};
  
  newCord.longitude = pos.longitude;
  newCord.latitude = pos.latitude;
  newCord.datetime = Date.now();
  
  //console.log('newCord values :' + JSON.stringify(newCord));
    
  //
  // Retreives and Syncs current coordinates from geoloc.js
  // Saves into a data object array - cords []
  //

  chrome.storage.sync.get('cords', function(result) {
    var cords = [];

    console.log('cords result:' + JSON.stringify(result));
    if (result.cords)
      cords = result.cords;

    //  console.log('cords:' + cords);
    //  console.log('newCord:' + newCord);

      //
      // Append newCords to cords data object array
      //
      cords.push(newCord);

      chrome.storage.sync.set({'cords': cords}, function() {
        // after save
      });
  });
  
   //
  //  ErrorHandler - displays error if cords retrieval is unsuccessfull
  //
  
    function errorHandler(){
      status_msg = 'Coordinates were not saved';
      status.innerHTML = status_msg;
      console.log('errorHandler msg');
    };

 console.log("before localStorage");
 
 //*****************************************************//
      // Save data to Google Drive - data.txt
//*****************************************************//

  chrome.syncFileSystem.requestFileSystem(function(fs){
  
      console.log('inside GoogleSync');
  
        fs.root.getFile('data.txt', {create: true}, function(fileEntry){

          file = fileEntry;
          writeData();
          
        })
          

  function writeData(){
    console.log('inside writeData');
 // var data = document.querySelector("#data").value;
    if(file) {
            console.log('inside if file');

      file.createWriter(function(writer){
        
          writer.onwriteend = function(e){
          
              //console.log('data blob data :' + JSON.stringify([data

            console.log("write completed");
          }

          writer.onerror = function(e){

            console.log("write error");
          }
                // Turns a JavaScript object into a JSON string
                // Current device coordinates into data variable
                //
                  data = JSON.stringify(newCord);
                // 
                // Write the new blob into a file
                //
                  writer.write(new Blob([data], {type: 'text/plain'}));
              
                 console.log('data blob data :' + JSON.stringify([data]));
          });

        } // if file - END  

      } // writeData - END

    })//  chrome.syncFileSystem - END

} // doExportToDisk2 - END


function tracker(){
    console.log("tracker is on");
}


//*****************************************************//
      // Clear Chrome Local Storage
      // not function properly - need to recheck
//*****************************************************//

// function clearStorage(){
//     chrome.storage.sync.clear();
//     chrome.local.storage.clear();
//     console.log('cleared mem');
      
// }
  // Event Listener - Sync entire Cords array to Google Drive
  document.getElementById('exportToDisk').addEventListener('click', doExportToDisk);
  
  // Event Listener - clear chrome local storage
  // document.getElementById('clear').addEventListener('click', clearStorage);
  
  // Export to default file without append 
  //document.getElementById('saveToDisk').addEventListener('click', doExportToDisk2);

  



//})();
