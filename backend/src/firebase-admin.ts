import firebase from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

firebase.initializeApp({
  credential: firebase.cert(JSON.parse(process.env.FIREBASE ?? "")),
});

export const firebaseAuth = getAuth();
