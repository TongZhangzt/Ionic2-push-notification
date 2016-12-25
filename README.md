# Ionic2-push-notification
## Getting Started

* Clone this repository

* Install Ionic, cordova and node_modules

    ```bash
    $ npm install -g ionic
    $ sudo npm install -g cordova@6.3.1
    $ npm install
    ```
  
* _Replace **YOUR_SENDER_ID** in **config.xml and app.ts** with above **SENDER_ID**_

### Android

```bash
    $ ionic platform add android
    $ ionic build android
    $ ionic run android
```

### iOS
    ```bash
    $ ionic platform add ios
    $ ionic build ios
    ```    
    Run using XCode


####Use device token printed in console for push notifications using below server code

 
## Server Code
=================

It has server code used to send Push Notification to iOS and Android device.## 
