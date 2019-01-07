import { firebaseApp as firebase } from "./re-base";
import axios from "axios";
import * as events from 'events'

export default class MessagingManager  extends events.EventEmitter {

    messaging = null;
    token = null;

    async onTokenRefresh() {
        console.log('Token Refresh');
        const token = await this.getToken();
        this.setToken(token);
    }

    onMessage(payload) {
        this.emit('Message', payload.data);
    }

    setToken(token) {
        this.token = token;
        this.emit('Token', token);
        if (null !== token) {
            this.sendTokenToServer(token);
        }
    }

    async start() {
        this.messaging = firebase.messaging();
        let messaging = this.messaging;
        messaging.usePublicVapidKey(
            'BI9uE9ZWPgBE8jXf28tnSqK6hKur8piCy7jp4Bx1OXce9bGxWnBJL9cszeHMzAprJcRuiq2z7LL29-T2eTXtf2o'
        );

        messaging.onTokenRefresh(this.onTokenRefresh.bind(this));
        messaging.onMessage(this.onMessage.bind(this));
        

        console.log('Requesting permission...');
        try {
            await messaging.requestPermission();

            console.log('Notification permission granted.');
            const token = await this.getToken();
            this.setToken(token);
        } catch (err) {
            console.log('Unable to get permission to notify.', err);
            this.setToken(null);
        };
    }

    async getToken() {
        try {
            const token = await this.messaging.getToken();
            if (token) {
                console.log('Token is: ', token);
            } else {
                console.log('No Instance ID token available. Request permission to generate one.');
            }
            return token;
        } catch (err) {
            console.log('An error occurred while retrieving token. ', err);
            //     // showToken('Error retrieving Instance ID token. ', err);
            //     // setTokenSentToServer(false);
            return null;
        }

    }

    async sendTokenToServer(currentToken) {
        if (window.localStorage.getItem('token') !== currentToken) {
            console.log('Sending token to server...');
            const jsonToken = {
                token: currentToken
            };
            console.log(jsonToken);

            try {
                const response = await axios({
                    method: 'post',
                    url: 'https://us-central1-coffee-page-moc.cloudfunctions.net/registerToken',
                    data: jsonToken
                });
                console.log(response);
                window.localStorage.setItem('token', currentToken);

            } catch (error) {
                console.log(error);
            }
        }
    }
}