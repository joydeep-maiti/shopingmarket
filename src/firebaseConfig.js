const firebase = require("firebase/app");
// Add the Firebase products that you want to use
// require("firebase/firestore");
require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyCtKlD5e5heLjkVjdvKAvAZlUKCA6kYVlI",
    authDomain: "marketplace-a3727.firebaseapp.com",
    databaseURL: "https://marketplace-a3727.firebaseio.com",
    projectId: "marketplace-a3727",
    storageBucket: "marketplace-a3727.appspot.com",
    messagingSenderId: "606195364307",
    appId: "1:606195364307:web:1f761aac1d70a9f3923f26",
    measurementId: "G-8BD663QY6W"
};

firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const storage = firebase.storage().ref();

// exports.DB = db;
// exports.storage = storage;

export const storageRef = firebase.storage().ref();