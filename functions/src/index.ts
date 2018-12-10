import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true,
});   

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const registerToken = functions.https.onRequest((request, response) => {
    //insert check here
    return cors(request, response, () => {
        response.status(200).send("Token: " + request.body['token']);

        admin.messaging().subscribeToTopic(request.body['token'], 'coffee')
          .then(function(subscribeResponse) {
            // See the MessagingTopicManagementResponse reference documentation
            // for the contents of response.
            console.log('Successfully subscribed to topic:', subscribeResponse);
            console.log('Successfully subscribed to topic:', request.body['token']);
          })
          .catch(function(error) {
            console.log('Error subscribing to topic:', error);
          });
    });
});

/*
curl \
    -X POST \
    -H "Content-Type:application/json" \
    -H "X-MyHeader: 123" \
    https://us-central1-coffee-page-moc.cloudfunctions.net/registerToken \
    -d '{"token":"bla blup token"}'
*/