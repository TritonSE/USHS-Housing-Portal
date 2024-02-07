import { User, onAuthStateChanged } from "firebase/auth";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

import { auth } from "@/firebase";

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

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
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
