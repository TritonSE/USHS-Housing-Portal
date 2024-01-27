import firebase, { ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

firebase.initializeApp({
  credential: firebase.cert(JSON.parse(process.env.FIREBASE ?? "") as ServiceAccount),
});

module.exports = { firebaseAuth: getAuth() };
