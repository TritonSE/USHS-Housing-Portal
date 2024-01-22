const firebase = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

firebase.initializeApp({
  credential: firebase.cert(JSON.parse(process.env.FIREBASE ?? ""))
});

module.exports = { firebaseAuth: getAuth() };