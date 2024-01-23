// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyAJFvTWgave4ivziIFD4Y3tgbn3B4ucdwY",
  authDomain: "ushs-housing-portal-staging.firebaseapp.com",
  projectId: "ushs-housing-portal-staging",
  storageBucket: "ushs-housing-portal-staging.appspot.com",
  messagingSenderId: "967235553382",
  appId: "1:967235553382:web:369f1b0d75f887bac685a7",
});

export const auth = getAuth(app);
export default app;
