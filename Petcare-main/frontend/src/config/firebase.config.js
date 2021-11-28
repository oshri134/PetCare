import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/database"
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBf5CQLP4jIVV5LtZ6ZiEnbAnk3TzmfUBA",
    authDomain: "petcare-676ec.firebaseapp.com",
    projectId: "petcare-676ec",
    storageBucket: "petcare-676ec.appspot.com",
    messagingSenderId: "803443646382",
    appId: "1:803443646382:web:136a94cd1b3696709c323f",
    measurementId: "G-ZG22TKWWT1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app;