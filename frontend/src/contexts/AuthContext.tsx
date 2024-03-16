import { User, onAuthStateChanged } from "firebase/auth";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

import { auth } from "@/firebase";

type ProviderProps = {
  children: ReactNode;
};

type contextType = {
  currentUser: User | undefined | null;
  signedIn: boolean;
  loading: boolean;
};

export const AuthContext = React.createContext<contextType>({
  currentUser: null,
  signedIn: false,
  loading: false,
});

export function AuthProvider({ children }: ProviderProps) {
  const [currentUser, setUser] = useState<User | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | undefined | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ currentUser, signedIn: !!currentUser, loading }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
