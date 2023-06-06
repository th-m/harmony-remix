

import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { EmailAuthProvider, getAuth, GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";
import { Auth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();
const emailProvider = new EmailAuthProvider();
const githubProvider = new GithubAuthProvider();
// export const auth = getAuth(app);
const firebaseConfig = {
    apiKey: "AIzaSyA3fFOWtPJcj0UXpU364TSpYqCzGobjAm4",
    authDomain: "harmony-hub-97e53.firebaseapp.com",
    projectId: "harmony-hub-97e53",
    storageBucket: "harmony-hub-97e53.appspot.com",
    messagingSenderId: "904923119587",
    appId: "1:904923119587:web:e0e17abd3306f67a696ad6",
    measurementId: "G-N4WTFECX9B"
  };
  
  export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      googleProvider.providerId,
      emailProvider.providerId,
      githubProvider.providerId
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const analytics = getAnalytics(app);
  export const auth = getAuth(app);

  