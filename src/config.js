import firebase from 'firebase' 
import 'firebase/firestore' 
import 'firebase/auth'
 
 // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDzf6NNDEJz5LQbXhfINTNNXRbtK11Kcb8",
    authDomain: "buzzer-5c166.firebaseapp.com",
    projectId: "buzzer-5c166",
    storageBucket: "buzzer-5c166.appspot.com",
    messagingSenderId: "612409323131",
    appId: "1:612409323131:web:17df71924dd3c9978bfcde"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const auth = firebase.auth();
  const db = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export {auth,db,timestamp}