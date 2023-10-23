import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAdf8YG7JqrSvBdl3fX5NiYFriPZXoqW8E",
    authDomain: "mymoney-8a4b9.firebaseapp.com",
    projectId: "mymoney-8a4b9",
    storageBucket: "mymoney-8a4b9.appspot.com",
    messagingSenderId: "1023931473879",
    appId: "1:1023931473879:web:2159eccba0ab738e5cb592",
    measurementId: "G-Q4W858L3VS"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp } 
