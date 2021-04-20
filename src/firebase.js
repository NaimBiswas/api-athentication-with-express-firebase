const firebase = require("firebase")


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyC0tORv3fDl2gP3XDAxvqpUFpc9SHf4lGE",
   authDomain: "authentications-aed5f.firebaseapp.com",
   projectId: "authentications-aed5f",
   storageBucket: "authentications-aed5f.appspot.com",
   messagingSenderId: "356306666870",
   appId: "1:356306666870:web:7d68acf9c529f95d3aa657",
   measurementId: "G-MPMEMYT8FY"
};

const FirebaseApp = firebase.initializeApp(firebaseConfig);
const db = FirebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();



module.exports = { auth, provider, db };
