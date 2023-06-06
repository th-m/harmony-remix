

import type { FirebaseApp} from 'firebase/app';
import { initializeApp } from 'firebase/app';
import type { Analytics} from "firebase/analytics";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { EmailAuthProvider, getAuth, GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";
import type { Auth} from "firebase/auth";

import { firebaseConfig } from './firebase.utils';
const googleProvider = new GoogleAuthProvider();
const emailProvider = new EmailAuthProvider();
const githubProvider = new GithubAuthProvider();
// export const auth = getAuth(app);

  
  export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/',
    signInOptions: [
      googleProvider.providerId,
      emailProvider.providerId,
      // githubProvider.providerId
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };
  // Initialize Firebase
  export let app:FirebaseApp|null = null;
  export let analytics:Analytics|null = null;
  export let auth:Auth|null = null;
  
  if(!app){
     app = initializeApp(firebaseConfig, 'client');
  }
  if(!analytics){
     analytics = getAnalytics(app);
  }
  if(!auth){
    auth = getAuth(app);
  }

  