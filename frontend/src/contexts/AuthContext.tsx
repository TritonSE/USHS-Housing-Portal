import { FirebaseOptions, initializeApp } from "firebase/app";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

type ProviderProps = {
  children: ReactNode;
};

type contextType = {
  currentUser: User | null;
  signedIn: boolean;
};

export const AuthContext = React.createContext<contextType>({ currentUser: null, signedIn: false });

export function AuthProvider({ children }: ProviderProps) {
  const [currentUser, setUser] = useState<User | null>(null);

  const app = initializeApp(
    JSON.parse(import.meta.env.VITE_APP_FIREBASE as string) as FirebaseOptions,
  );
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });

  const value = useMemo(() => ({ currentUser, signedIn: currentUser !== null }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
