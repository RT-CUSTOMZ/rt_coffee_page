import React from 'react';
import firebase from "firebase";
import axios from "axios";

const messaging = firebase.messaging();
messaging.usePublicVapidKey('BI9uE9ZWPgBE8jXf28tnSqK6hKur8piCy7jp4Bx1OXce9bGxWnBJL9cszeHMzAprJcRuiq2z7LL29-T2eTXtf2o');
messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(refreshedToken) {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false);
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        // [START_EXCLUDE]
        // Display new Instance ID token and clear UI of all previous messages.
        //resetUI();
        // [END_EXCLUDE]
    }).catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
        showToken('Unable to retrieve refreshed token ', err);
    });
});
// [END refresh_token]

// [START receive_message]
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
    // [START_EXCLUDE]
    // Update the UI to include the received message.
    //appendMessage(payload);
    // [END_EXCLUDE]
});
// [END receive_message]

/*  function resetUI() {
      clearMessages();
      showToken('loading...');
      // [START get_token]
      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      messaging.getToken().then(function(currentToken) {
          if (currentToken) {
              sendTokenToServer(currentToken);
              updateUIForPushEnabled(currentToken);
          } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
              // Show permission UI.
              updateUIForPushPermissionRequired();
              setTokenSentToServer(false);
          }
      }).catch(function(err) {
          console.log('An error occurred while retrieving token. ', err);
          showToken('Error retrieving Instance ID token. ', err);
          setTokenSentToServer(false);
      });
      // [END get_token]
  }
*/

function showToken(currentToken) {
    // Show token in console and UI.
    let tokenElement = document.querySelector('#token');
    tokenElement.textContent = currentToken;
}

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        /////////////////////////////////// PIA START
        // npm install axios
        // import nicht vergessen
        const jsonToken = {
            token: currentToken
        };
        console.log(jsonToken);

        axios({
            method: 'post',
            url: 'https://us-central1-coffee-page-moc.cloudfunctions.net/registerToken',
            data: jsonToken
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        /////////////////////////////////// PIA END
        // TODO(developer): Send the current token to your server.
        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }

}

function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
}

function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}

function requestPermission() {
    console.log('Requesting permission...');
    // [START request_permission]
    messaging.requestPermission().then(function() {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // [START_EXCLUDE]
        // In many cases once an app has been granted notification permission, it
        // should update its UI reflecting this.
        //resetUI();
        // [END_EXCLUDE]
    }).catch(function(err) {
        console.log('Unable to get permission to notify.', err);
    });
    // [END request_permission]
}

function deleteToken() {
    // Delete Instance ID token.
    // [START delete_token]
    messaging.getToken().then(function(currentToken) {
        messaging.deleteToken(currentToken).then(function() {
            console.log('Token deleted.');
            setTokenSentToServer(false);
            // [START_EXCLUDE]
            // Once token is deleted update UI.
            //resetUI();
            // [END_EXCLUDE]
        }).catch(function(err) {
            console.log('Unable to delete token. ', err);
        });
        // [END delete_token]
    }).catch(function(err) {
        console.log('Error retrieving Instance ID token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
    });

}


//resetUI();
export default class Messaging extends React.Component {

    render() {

        return(
            <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">

                <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
                    <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
                        <div
                            className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
                            <h3>Firebase Cloud Messaging</h3>
                        </div>
                    </div>
                </header>

                <main className="mdl-layout__content mdl-color--grey-100">
                    <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">

                        <div
                            className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                            <div className="mdl-card__supporting-text mdl-color-text--grey-600">

                                <div id="token_div" style="display: none;">
                                    <h4>Instance ID Token</h4>
                                    <p id="token" style="word-break: break-all;">
                                    </p>
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                            onClick={deleteToken}>Delete Token
                                    </button>
                                </div>

                                <div id="permission_div" style="display: none;">
                                    <h4>Needs Permission</h4>
                                    <p id="token">
                                    </p>
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                            onClick={requestPermission}>Request Permission
                                    </button>
                                </div>

                                <div id="messages">
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        )
    }
}