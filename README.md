## GPSCords

#### General Information

Use GPS Cords mobile web application to retrieve, save and sync your device GPS coordinates with Google Drive. 

> **Note:**
 The app was created in order to serve as research and data collection tool. 
In our experience, publicly available GPS mobile applications included advertisements and additional third-party data which was unwanted.

#### Framework

> **Note:**
Chrome Apps for Mobile (MCA) was the chosen framework for the application development. 
https://developer.chrome.com/apps/chrome_apps_on_mobile

> Chrome Apps for Mobile (MCA) is based on Apache Cordova
•	Create, develop, debug and test application on the desktop and then publish to mobile.

#### Chrome Apps Components:

>**Note:**
The manifest explains to Chrome about the app, what it is, how to launch it and the extra permissions that are required for it run.
The background script is used to create the event page responsible for managing the app life-cycle.
All code must be included in the Chrome App package including HTML, JS, CSS and Native Client modules.

***manifest.json***

•	"permissions": ["geolocation", "storage", "unlimitedStorage", "syncFileSystem", {"fileSystem": ["write"]}

Declaring permissions that will initiate during run time to use chrome APIs. 
geolocation – HTML5 geolocation API

storage – chrome.storage API. Provides similar behavior to localStorage. Enables the user to store data as an object.

unlimitedStorage – permits an unlimited quota for storing client-side data.

syncFileSystem – use of this API allows to save and sync data to Google Drive. 
“It provides app-specific syncable storage for offline and caching usage so that the same data can be available across different client” (chrome.syncFileSystem).

fileSystem: write – write permissions

https://developer.chrome.com/extensions/declare_permissions

background script:
>**Note:**
>The background script is used to create the event page responsible for managing the app life-cycle. The line defines the name of the background script as background.js and the directory path reference by default suggest the file is in the default directory (www).

•	"background": {"scripts": ["background.js"]}

*Sockets:* 

The chrome.socket API allows to send and receive data over the network using the TCP and UDP sockets.

•	"sockets": 

	"tcp": "connect": "localhost:80"
    "udp": "send": "localhost:80"
Icons:

The path directory to the application icons

•	"icons": 

    "16": "assets/icons/Server-16.png",
    "128": "assets/icons/Server-128.png"

***background.js***
Default file and settings created with the Chrome Apps tutorial.

***index.html***
The default html page (main page) of the web application. 
>**Note:**
> A basic HTML5 syntax but the developer must have in mind that the code must adhere to the Content Security Policy (CSP) which is used in order to reduce cross-site scripting. 
> Therefore, no JavaScript is used directly in the HTML pages but the scripts are called into the HTML via the common `<script>` tags at the bottom of the code.

***geoloc.js***
>**Note:**
> Calls for the geolocation API and retrieves current position (latitude and longitude coordinates).

- showPosition() – saves the coordinates into two separate variables – pos.latitude and pos.longitude and then displays the coordinates in the app in its dedicated location in index.html.

- getLocation() – calls `navigator.geolocation.getCurrentPosition` function and returns the device’s current position or an error message if the callback is unsuccessful.

- getTracker() – enables and disables the tracking feature. Tracking calls getLocation() on a continuous and predefined basis (Default – 30 seconds). The user can change the call time in milliseconds in the app settings.

#### Technical 
Version
1.0

#### Installation
In order to develop and debug the application, several resources are required:
1.Node.js version 0.10.0 (or higher) with npm
2. Java JDK 7 (or higher)
3. Android SDK version 4.4.2 (or higher)
4. Apache Ant

*** additional information can be found at: https://developer.chrome.com/apps/chrome_apps_on_mobile

Want to contribute ? Please feel free to do so !!!
