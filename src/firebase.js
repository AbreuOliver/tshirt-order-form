import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDAgytJ70v-L9ve9iFV97wFmxic0NMqFyY",
    authDomain: "t-shirt-registration.firebaseapp.com",
    projectId: "t-shirt-registration",
    storageBucket: "t-shirt-registration.appspot.com",
    messagingSenderId: "1030959619872",
    appId: "1:1030959619872:web:d77a3496b8c880b0344145"
});

var db = firebaseApp.firestore();

export { db };
