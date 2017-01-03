# Ionic2-push-notification
## Client-Side Code
* Install Node, Ionic, cordova and node_modules
<pre>$ npm install -g ionic
$ npm install -g cordova@6.3.1</pre>

* Clone this repository
<pre>$ git clone https://github.com/TongZhangzt/Ionic2-push-notification.git
$ cd Ionic2-push-notification
$ npm install</pre>

* Install Phonegap Plugin, set you sender id
<pre>$ Cordova pulgin add phonegap-plugin-push --variable SENDER_ID="xxxxxx"</pre>

* Replace sender_id in app.component.js

### Android
Build and run in Android
<pre>$ ionic platform add android
$ ionic run android</pre>

### iOS
Build and run in ios
<pre>$ ionic platform add ios
$ ionic build ios</pre>

In ios app, you need to run the xcode file in the platforms/ios folder with Xcode.

## Server-Side Code
* Replace the device token printed in console for push notifications in gcmService.js.

* Run the server code to push notifications:
<pre>$ cd server
$ npm install
$ node gcmService</pre>

Go to localhost:3000/push to send a push notification
