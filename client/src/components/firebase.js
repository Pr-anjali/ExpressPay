import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyDvwYQa_ywff6wtF8_d1bkSaNl4-7k4TYw",
    authDomain: "expresspay-3ebb5.firebaseapp.com",
    projectId: "expresspay-3ebb5",
    storageBucket: "expresspay-3ebb5.appspot.com",
    messagingSenderId: "14295002025",
    appId: "1:14295002025:web:6b5ba3b95f47e3ade9f2b8"
  };
  firebase.initializeApp(config);
  export default firebase