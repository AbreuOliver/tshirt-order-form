import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBP9A-hStf1yzxXoOChxRf6O_uLVJ3Qigc",
    authDomain: "lr-volunteerregistration.firebaseapp.com",
    projectId: "lr-volunteerregistration-2021",
    storageBucket: "lr-volunteerregistration.appspot.com",
    messagingSenderId: "766855568975",
    appId: "1:766855568975:web:a218e81a08b2fa9cb3d43a",
    measurementId: "G-WWJ7CQ96EL"
});

var db = firebaseApp.firestore();

export { db };
