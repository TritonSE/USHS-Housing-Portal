import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

const app = initializeApp(
  JSON.parse(import.meta.env.VITE_APP_FIREBASE as string) as FirebaseOptions,
);

export const auth = getAuth(app);

export const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("Logged out successfully.");
    })
    .catch((error) => {
      console.log(error);
    });
};
