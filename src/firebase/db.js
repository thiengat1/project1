import firebase from 'firebase'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCIRi1fQsmalEAzvifNgI5tw1cOnikJaqI",
    authDomain: "nolan-db2.firebaseapp.com",
    databaseURL: "https://nolan-db2.firebaseio.com",
    projectId: "nolan-db2",
    storageBucket: "nolan-db2.appspot.com",
    messagingSenderId: "46932529978",
    appId: "1:46932529978:web:8d5afc0f5025bec93cb603"
  };
  // Initialize Firebase
  export const db=firebase.initializeApp(firebaseConfig).firestore();