import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCd1JDAHdFwknXD2rKg_g4WWGCwOJDkjIk",
    authDomain: "coffee-page-moc.firebaseapp.com",
    databaseURL: "https://coffee-page-moc.firebaseio.com",
    projectId: "coffee-page-moc",
    storageBucket: "coffee-page-moc.appspot.com",
    messagingSenderId: "603725741022"
});
const base = Rebase.createClass(firebaseApp.database());
export {firebaseApp}; // named export
export default base; // default export