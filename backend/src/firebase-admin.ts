import { ServiceAccount, cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = JSON.parse(process.env.FIREBASE ?? "") as ServiceAccount;

initializeApp({
  credential: cert(serviceAccount),
});

export const firebaseAuth = getAuth();
