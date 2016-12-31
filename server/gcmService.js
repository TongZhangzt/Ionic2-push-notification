//Server settings for android push notifications with node-gcm

// Load modules
var express = require('express');
var gcm = require('node-gcm');

// The apiKey of your project on FCM
var app = express();
var apiKey = "AAAA7AbHQo0:APA91bGkqtyOZiYJKMKGQepD_4cWG5tUgbqZRGqAjipCqc3kTTkLDobbIsVpdlhT4cQ3yMzdRlitLPwyK0biTO_4YLQhFdEXoL97YXHhLpNDPNe4-KiUkNxQC0iMfciORhGPdV1y-xfri_gbXjJznWCKzpqS7wt-ng";

//Set up the server
var server = app.listen(3000, function() {
    console.log('server is just fine!');
});

//Define the basic route
app.get('/', function(req, res) {
    res.send("This is basic route");
});

app.get('/push', function(req, res) {
    //Initialize the service
    var service = new gcm.Sender(apiKey);
    var message = new gcm.Message();

    //the number of times to retry sending the message if it fails
    var retry_times = 4;

    //Define the message

    //The title will be shown in the notification center
    message.addData('title', 'Hello, World');
    message.addData('body', 'This is a notification that will be displayed ASAP.');
    //Set content-available = 1, the on('notification') event handler will be called even app running in background or closed
    message.addData('content-available', '1');
    //If you add force-start: 1 to the data payload the app will be restarted in background even if it was force closed.
    //message.addData('force-start', 1);
    //priority can be 1 or 2, set priority will inform the user on the screen even though in the background or close the app.
    message.addData('priority', 2);

    message.addData('id', Math.random());

    //Add action buttons, set the foreground property to true the app will be brought to the front
    //if foreground is false then the callback is run without the app being brought to the foreground.
    message.addData('actions', [
        { "icon": "accept", "title": "Accept", "callback": "app.accept", "foreground": true },
        { "icon": "reject", "title": "Reject", "callback": "app.reject", "foreground": false },
    ]);

    //Here get the devices from your database into an array
    var apiKey = "AAAA7qUjTrg:APA91bFW2oVQ1mE9u2ANPjFy8IfkMWVGrHs0f1b1Umd_K1DDfng9h0e0hRQih8mLaXCPvu35xHBq9recmJ1EGJiCk7o2qwdN2n3FYPwHr21_p4iP2z1mgZGDdZo-uFLGrRxpqXM5L_tRvudTQJTxxH2IpQC0VquYPQ";
    service.send(message, { registrationTokens: [deviceID] }, retry_times, function(err, response) {
        if (err)
            console.error(err);
        else
            console.log(response);
    });
});


