//Server settings for android push notifications with node-gcm

// Load modules
var gcm = require('node-gcm');

// The apiKey of your project on FCM
var apiKey = "AAAA7qUjTrg:APA91bFW2oVQ1mE9u2ANPjFy8IfkMWVGrHs0f1b1Umd_K1DDfng9h0e0hRQih8mLaXCPvu35xHBq9recmJ1EGJiCk7o2qwdN2n3FYPwHr21_p4iP2z1mgZGDdZo-uFLGrRxpqXM5L_tRvudTQJTxxH2IpQC0VquYPQ";

//Initialize the service
var service = new gcm.Sender(apiKey);

var message = new gcm.Message();
//Define the message
//The title will be shown in the notification center
message.addData('title', 'Hello, World');
message.addData('body', 'This is a notification that will be displayed ASAP.');
//Set content-available = 1, the on('notification') event handler will be called even app running in background or closed
message.addData('content-available', '1');
//If you add force-start: 1 to the data payload the app will be restarted in background even if it was force closed.
message.addData('force-start', 1);
//priority can be 1 or 2, set priority will inform the user on the screen even though in the background or close the app.
message.addData('priority', 2);
//Add action buttons, set the foreground property to true the app will be brought to the front
//if foreground is false then the callback is run without the app being brought to the foreground.
message.addData('actions', [
  { "icon": "accept", "title": "Accept", "callback": "app.accept", "foreground": true},
  { "icon": "reject", "title": "Reject", "callback": "app.reject", "foreground": false},
]);

//Here get the devices from your database into an array
var deviceID = "fy4T9-e4OgY:APA91bEGoO3eJGWTRHhyBIXuQYw8-EBGgQp9eqPvbSaHBOFhvVKQ5itpteQtbIdv9VrGdAL5B1C3qxolV4xsgCKqURaD8SY9dc_tZBN2xN64FAOg6SgO7HscNQ7_JMcJDxP-sHiE-Aec";
service.send(message, { registrationTokens: [ deviceID ] }, function (err, response) {
	if(err) console.error(err);
	else 	console.log(response);
});
