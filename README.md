## GPS Coord – Web Application### Mobile Application Description*	The GPS Coord mobile web application was created in order to serve as research and data collection tool.*	The GPS Coord application will retrieve the user’s device coordinates and sync that data with the user’s device account at Google Drive.*	In our experience, publicly available GPS mobile applications included advertisements and additional third-party data which was unwanted.### General Information*	Chrome Apps for Mobile (MCA) was the chosen framework for the application development. <br>  [https://developer.chrome.com/apps/chrome_apps_on_mobile](https://developer.chrome.com/apps/chrome_apps_on_mobile)*	Chrome Apps for Mobile (MCA) is based on Apache Cordova*	With Chrome Apps, one can use HTML5, CSS, and JavaScript to create an experience comparable to native applications.*	Create, develop, debug and test application on the desktop and then publish to mobile.### Application FeaturesThe GPS Coord application is quite simple; it has four main features.  
1.	The ‘Find My Coordinates’ button retrieves the user’s device GPS coordinates and writes the current coordinates including data and timestamp to a data.txt file on Google Drive. 2.	The ‘Sync All Coords’ button executes a function that will write all saved coordinates on the chrome.storage.sync (similar to local storage) that is currently available on the device.3.	Clear Memory – will clear the chrome.storage.sync from the device.4.	Under Settings – GPS TrackerA feature that will continuously retrieve GPS coordinates of the user’s device (by default set to 30 seconds)  		a.	Track GPS – enable/disable  
		b.	Tracker Interval – alter timeout between GPS coordinates retrieval.####How to Find Syncable Data in Google Drive1.	Enter Google Drive 2.	In the search input box type – ‘Chrome Syncable Filesystem’3.	Inside this folder a sub-folder will appear (name structure similar to hfejkdhobxxxxxxxxxxxxxxx4.	You will find the syncable text files inside this folder ### Technical Information#### Chrome Apps Components:*	The manifest explains to Chrome about the app, what it is, how to launch it and the extra permissions that are required for it run.*	The background script is used to create the event page responsible for managing the app life-cycle.*	All code must be included in the Chrome App package including HTML, JS, CSS and Native Client modules.*	All icons and other assets must be included in the package as well.##### >> 	manifest.json##### Permissions:  
*	"permissions": ["geolocation", "storage", "unlimitedStorage", "syncFileSystem", {"fileSystem": ["write"]}Declaring permissions that will initiate during run time to use chrome APIs. * geolocation – HTML5 geolocation API* storage – chrome.storage API. Provides similar behavior to localStorage. Enables the user to store data as an object.* unlimitedStorage – permits an unlimited quota for storing client-side data.* syncFileSystem – use of this API allows to save and sync data to Google Drive. “It provides app-specific syncable storage for offline and caching usage so that the same data can be available across different client” (chrome.syncFileSystem).Currently is available on Chrome apps only (as an extension of Chrome), is not support on mobile.* fileSystem: write – write permissions** for more information on premissions:  
[https://developer.chrome.com/extensions/declare_permissions](https://developer.chrome.com/extensions/declare_permissions)
##### >> Background Script:The background script is used to create the event page responsible for managing the app life-cycle. The line defines the name of the background script as background.js and the directory path reference by default suggest the file is in the default directory (www).  
*	"background": {"scripts": ["background.js"]}  
*   Sockets:The chrome.socket API allows to send and receive data over the network using the TCP and UDP sockets.	``` "sockets": *	        "tcp": "connect": "localhost:80",
           "udp": "send": "localhost:80"
  ```
Icons: The path directory to the application icons
  ```* 	"icons": {    "16": "assets/icons/Server-16.png",    "128": "assets/icons/Server-128.png"```*	background.jsDefault file and settings created with the Chrome Apps tutorial.##### >>	index.htmlThe default html page (main page) of the web application. A basic HTML5 syntax but the developer must have in mind that the code must adhere to the Content Security Policy (CSP) which is used in order to reduce cross-site scripting. Therefore, no JavaScript is used directly in the HTML pages but the scripts are called into the HTML via the common <script> tags at the bottom of the code.##### >>	index.cssThe styling file for the main html page.##### >>	geoloc.jsCalls for the geolocation API and retrieves current position (latitude and longitude coordinates).* function showPosition() – saves the coordinates into two separate variables – pos.latitude and pos.longitude and then displays the coordinates in the app in its dedicated location in index.html.  
* function setPosition () – retrieves the user’s device coordinates as a variable and sets the coordinates into the variable pos.latitude and pos.longitutude. This ensures that the coordinates have been retrieved and only then will this data be saved in chrome.storage.sync and consequently into a text file on Google Drive.* function getLocation() – calls the navigator.geolocation.getCurrentPosition function and returns the device’s current position or an error message if the callback is unsuccessful. Calls setPosition.* function getTracker() – enables and disables the tracking feature.   
* Tracking calls getLocation() on a continuous and predefined basis (Default – 30 seconds). The user can change the call time in milliseconds in the app settings.##### >>	exportToDisk.jsThe file contains functions two functions doExportToDisk() and doExportToDisk2() which contain the same code except that one saving the entire array (all cached history of the device coordinates) and the other only saves the last known device coordinates.  
doExportToDisk() – saves the entire array of coordinates including time and date stamp on the user’s device (chrome.storage.sync).  
 newCord – current device coordinates in appended to the array.```
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

```* chrome.syncFileSystem API – is an API used to sync and save data on Google Drive.[For more information:]( https://developer.chrome.com/apps/syncFileSystem - method-requestFileSystem)* chrome.syncFileSystem.requestFileSystem – returns the syncable filesystem of Google Drive, provided the user is logged-in to his/her account.* fs.root.getfile – creates the file (with specified filename) if the file does not exist.
```
 chrome.syncFileSystem.requestFileSystem(function(fs){
  
 console.log('inside GoogleSync');
  
 fs.root.getFile('data.txt', {create: true}, function(fileEntry){

     file = fileEntry;
     writeData();
          
   })
```* Inside the callback, we call fs.root.getFile() with the name of the file to create. It is possible to pass an absolute or relative path, but it must be valid. The second argument getFile() is an object describing the function's behavior if the file does not exist. In the code above, “create: true” creates the file if it doesn't exist and produces an error if it does (exclusive: true). When create: false, the file is simply fetched and returned.Key difference between the two doExportToDisk functions are what the writer.write line does in the writeData function. In doExportToDisk() the data variable contains the entire ‘cords’ array.```
// Turns a JavaScript object into a JSON string
// Entire cords array into data variable
   data = JSON.stringify(cords);
// 
// Write the new blob into a file
// 
writer.write(new Blob([data], {type: 'text/plain'}));  
console.log('data blob array :' + JSON.stringify([data]));
```
* doExportToDisk2() - saves the current/last coordinates including time and date stamp on the user’s device (chrome.storage.sync).  
In this function the data variable (See screenshot below) contains only the latest device coordinates (newCord).```
data = JSON.stringify(newCord);
// 
// Write the new blob into a file
//
writer.write(new Blob([data], {type: 'text/plain'}));
console.log('data blob data :' + JSON.stringify([data]));
```#### Required RepositoriesIn order to develop and debug the application, several resources are required: 1.Node.js version 0.10.0 (or higher) with npm 2. Java JDK 7 (or higher) 3. Android SDK version 4.4.2 (or higher) 4. Apache Ant** [Additional information can be found at:] (https://developer.chrome.com/apps/chrome_apps_on_mobile)#### How to Install the packaged app into Chrome as an Extension?1.	Open Chrome2.	Enter the Chrome menu  Preferences3.	Click ‘Extensions’ on the left side4.	Select ‘Developer mode’ on the top right side5.	Select ‘Load unpacked extension’ to add new packaged apps6.	Select the parent directory for the packaged app.
7. Select “Launch” to launch application.`![Chrome Preferences](chrome_prefs.png)`