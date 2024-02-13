import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp(
  JSON.parse(import.meta.env.VITE_APP_FIREBASE as string) as FirebaseOptions,
);

export const auth = getAuth(app);
