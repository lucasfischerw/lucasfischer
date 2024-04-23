import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, GoogleAuthProvider, signInWithRedirect, updateEmail } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"
import { getFirestore, collection, doc, addDoc, onSnapshot, updateDoc, deleteDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAUtT057uGDE0W7uK2RV5mGaJsR6ySAsA",
    authDomain: "flipup-b861e.firebaseapp.com",
    projectId: "flipup-b861e",
    storageBucket: "flipup-b861e.appspot.com",
    messagingSenderId: "816504951931",
    appId: "1:816504951931:web:b37b800555b2b45b9dfede"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

signInWithEmailAndPassword(auth, "teste123@gmail.com", "teste123")
.then(async (userCredential) => {})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
});

auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log('User is signed in');
    } else {
        console.log('No user is signed in');
    }
});