import { ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIREBASE ?? "") as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseAuth = getAuth();

module.exports = { firebaseAuth };
