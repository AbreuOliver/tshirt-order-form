import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
    // apiKey: "AIzaSyBP9A-hStf1yzxXoOChxRf6O_uLVJ3Qigc",
    // authDomain: "lr-volunteerregistration.firebaseapp.com",
    // projectId: "lr-volunteerregistration",
    // storageBucket: "lr-volunteerregistration.appspot.com",
    // messagingSenderId: "766855568975",
    // appId: "1:766855568975:web:a218e81a08b2fa9cb3d43a",
    // measurementId: "G-WWJ7CQ96EL"
    apiKey: "AIzaSyDAgytJ70v-L9ve9iFV97wFmxic0NMqFyY",
    authDomain: "t-shirt-registration.firebaseapp.com",
    projectId: "t-shirt-registration",
    storageBucket: "t-shirt-registration.appspot.com",
    messagingSenderId: "1030959619872",
    appId: "1:1030959619872:web:d77a3496b8c880b0344145"
});

var db = firebaseApp.firestore();

export { db };
