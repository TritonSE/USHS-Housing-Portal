import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = JSON.parse(process.env.FIREBASE ?? "") as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseAuth = getAuth();
