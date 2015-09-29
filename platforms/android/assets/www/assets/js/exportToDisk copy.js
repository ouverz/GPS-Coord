  
  var savedFileEntry, fileDisplayPath;
//*****************************************************//
  // Calls to store data (coordinates and timestamp) into
  // chrome.storage - similar to localstorage
//*****************************************************//

  function doExportToDisk() {
    if (savedFileEntry) {

   exportToFileEntry(savedFileEntry);

 } else {

  var newClick = 0;
//*****************************************************//
  // chrome.storage.sync.get - Syncs and retrieves a data object with chrome sync storage 
  // In this case it counts the number of user clicks 
//*****************************************************//

  chrome.storage.sync.get('clickcount', function(result) {
    //console.log('clickcount result:' + JSON.stringify(result));
    if (result)
      newClick = result.clickcount;

      if (newClick > 0) {
        ++newClick;
        // chrome.storage.local.clickcount = Number(chrome.storage.local.clickcount) + 1;
      } else {
        newClick = 1;
        // chrome.storage.local.clickcount = 1;
      }
      // chrome.storage.sync.set - syncs the data object - clickcount

      chrome.storage.sync.set({'clickcount': newClick}, function() {
        // after save

      });
  });

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

 var writableFileEntry = '';

 //
 // chrome.fileSystem.chooseEntry - fileSystem API
 // create, navigate, read and write to user's local file system
 // type (Type of prompt to show) - openFile", "openWritableFile", "saveFile", or "openDirectory) 
  // default name (suggestedName), accept all file types (acceptsAllTypes - boolean)
 // ** Currently does not work on Chrome Apps Mobile
 // ** Works fine on the desktop version of the app 

 chrome.fileSystem.chooseEntry({type: 'saveFile',
  suggestedName: 'coordinates.txt',acceptsAllTypes: false},
  function(writableFileEntry) {
   console.log('writableFileEntry - here');
   //
   // creates a writeable entry - writeableFileEntry
   //
   writableFileEntry.createWriter(function(writer) {
     // console.log('After writableFileEntry - here');
      writer.onerror = errorHandler;
      writer.onwriteend = function(e) {
      //console.log('write complete');
        
        };

          console.log('before Blob - here');
          //var data = JSON.stringify(newCord);
          //writer.write(new Blob([data], {type: 'text/plain'}));
          console.log('check cords: ' + JSON.stringify(cords));
          // 
          // Turns a JavaScript object into a JSON string
          //
          var data = JSON.stringify(cords);
          // 
          // Write the new blob into a file
          //
          writer.write(new Blob([data], {type: 'text/plain'}));
    }, errorHandler);
});


}// End Else

  }

//*****************************************************//
      // Export 2 - Save to Default file
//*****************************************************//

  //
  // chrome.storage.sync.get - Syncs and retrieves a data object with chrome sync storage 
  // In this case it counts the number of user clicks 
  //

function doExportToDisk2() {
    if (savedFileEntry) {

   exportToFileEntry(savedFileEntry);

 } else {

  var newClick = 0;
  chrome.storage.sync.get('clickcount', function(result) {
    //console.log('clickcount result:' + JSON.stringify(result));
    if (result)
      newClick = result.clickcount;

      if (newClick > 0) {
        ++newClick;
        // chrome.storage.local.clickcount = Number(chrome.storage.local.clickcount) + 1;
      } else {
        newClick = 1;
        // chrome.storage.local.clickcount = 1;
      }
      chrome.storage.sync.set({'clickcount': newClick}, function() {
        // after save

          console.log('clickcount=' + newClick);
      });
  });


  var newCord = {};
  
  newCord.longitude = pos.longitude;
  newCord.latitude = pos.latitude;
  newCord.datetime = Date.now();
  chrome.storage.sync.get('cords', function(result) {
    var cords = [];

    console.log('cords result:' + JSON.stringify(result));
    if (result.cords)
      cords = result.cords;

    //  console.log('cords:' + cords);
    //  console.log('newCord:' + newCord);

      cords.push(newCord);

      chrome.storage.sync.set({'cords': cords}, function() {
        // after save
      });
  });
  
  //
  // ErrorHandler
  //
  
    function errorHandler(){
      status_msg = 'Coordinates were not saved';
      status.innerHTML = status_msg;
      console.log('errorHandler msg');
    };

 console.log("before localStorage");
 
 //
 // Save a file in the FileSystem.
 //
 var writableFileEntry = '';

chrome.fileSystem.chooseEntry({type: 'saveFile',
  suggestedName: 'coordinates.txt',acceptsAllTypes: false},
   function(writableFileEntry) {
 
   writableFileEntry.createWriter(function(writer) {
      console.log('After writableFileEntry - here');
      writer.onerror = errorHandler;
      writer.onwriteend = function(e) {
      console.log('write complete');
        };
        //  console.log('before Blob - here');
          var data = JSON.stringify(newCord);
          writer.write(new Blob([data], {type: 'text/plain'}));
          console.log('text data: ' + data);

    }, errorHandler);
});



}// Else - END

  } // doExportToDisk2 - END


//*****************************************************//
      // Save data to Google Drive - data.txt
//*****************************************************//


var file;

function GoogleSync() {
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
          
              //console.log('data blob data :' + JSON.stringify([data]));
        
        // //writer.write(blob);
              //writer.write(new Blob([data], {type: 'text/plain'}));

            console.log("write completed");
          }

          writer.onerror = function(e){

            console.log("write error");
          }

        //var blob = new Blob([data]);
        var data = JSON.stringify(x);
        console.log('data blob data :' + JSON.stringify([data]));
        
        // //writer.write(blob);
        writer.write(new Blob([data], {type: 'text/plain'})); 
         

      });

    } // if file - END  

} // writeData - END

//function readData(){

  // file.file(function(fileObject){

  //   var reader = new FileReader();

  //   reader.onloadend = function(e){

  //     document.querySelector("#data").value = this.result;
  //   }

  //   reader.readAsTest(fileObject);

  // })


//} readData - END


//  chrome.syncFileSystem - END
})

} // GoogleSync - END


function tracker(){
    console.log("tracker is on");
}


  // Export to Seperate file with append 
  document.getElementById('exportToDisk').addEventListener('click', doExportToDisk);

  // Export to default file without append 
  document.getElementById('saveToDisk').addEventListener('click', doExportToDisk2);

  



//})();
