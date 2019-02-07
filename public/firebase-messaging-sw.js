importScripts("https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js");

importScripts("http://cdn.date-fns.org/v2.0.0-alpha0/date_fns.min.js");

const maxNotificationAgeInHours = 2;

const config = {
    messagingSenderId: "603725741022"
 };
 firebase.initializeApp(config);
 const messaging = firebase.messaging();


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const time = dateFns.parse(payload['data']['timestamp']);
    const oldAgeTimeBorder = dateFns.subHours(new Date(), maxNotificationAgeInHours)

    // Check for to old messages
    if(1 !== dateFns.compareAsc(oldAgeTimeBorder, time)) {

        const dateToString = dateFns.format(time, 'HH:mm');

        if(0 === payload['data']['type'].localeCompare("coffee_ready")) {
            const notificationMessage = "Coffee ready since " + dateToString;
            const notificationTitle = notificationMessage
            const notificationOptions = {
                body: notificationMessage,
                icon: '/icon.png'
            };

            return self.registration.showNotification(notificationTitle,
                notificationOptions);
        }
    }
    else {
        console.log("drop message, it is to old");
    }
    // Normaly a Browser forces to show a notification
    // https://stackoverflow.com/questions/33092065/google-chrome-silent-push-notifications
    return new Promise(function () {});
});
// [END background_handler]
