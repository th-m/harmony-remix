import { App, initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { Auth, getAuth } from "firebase-admin/auth";
import { firebaseConfig } from "./firebase.utils";

// export const adminApp = initializeApp(firebaseConfig);
let adminAuth: Auth | undefined;
let adminApp: App | undefined;

// let defaultDatabase = getDatabase(defaultApp);

// db = new Firestore({
//     projectId,
//     credentials:{
//       client_email,
//       private_key: process?.env?.SS_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     }
//   })
const clientEmail =
  "firebase-adminsdk-kubal@harmony-hub-97e53.iam.gserviceaccount.com";
const projectId = "harmony-hub-97e53";
const privateKey = process?.env?.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const initAdminAuth = () => {
  if (adminAuth) {
    return;
  }

  if (!adminApp) {
    adminApp = initializeApp({
      projectId,
      credential: credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }
  adminAuth = getAuth(adminApp);
};
export const getAdminAuth = () => {
  initAdminAuth();
  return adminAuth;
  // return adminAuth;
};
