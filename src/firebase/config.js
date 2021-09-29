import firebase from "firebase/app";

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyBAiUbCUQFZ-F28WToQ0SCWx15fx2J_SdQ",
    authDomain: "chat-app-24fd5.firebaseapp.com",
    projectId: "chat-app-24fd5",
    storageBucket: "chat-app-24fd5.appspot.com",
    messagingSenderId: "281148289022",
    appId: "1:281148289022:web:4c39c3aff7606c728fdaaf",
    measurementId: "G-KH449B7K3W"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  firebase.analytics();

  const auth = firebase.auth();
  const db = firebase.firestore();

  export {db, auth};
  export default firebase;