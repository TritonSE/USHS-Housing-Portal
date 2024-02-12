import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { User, getUsers } from "../api/users.ts";

import { AuthContext } from "./AuthContext.tsx";

type ProviderProps = {
  children: ReactNode;
};

type contextType = {
  allHousingLocators: User[];
  allReferringStaff: User[];
  currentUser: User | null;
};

export const DataContext = React.createContext<contextType>({
  currentUser: null,
  allHousingLocators: [],
  allReferringStaff: [],
});

export function DataProvider({ children }: ProviderProps) {
  const [allHousingLocators, setAllHousingLocators] = useState<User[]>([]);
  const [allReferringStaff, setALlReferringStaff] = useState<User[]>([]);
  const [currentUser, setUser] = useState<User | null>(null);
  const auth = useContext(AuthContext);

  const fetchData = useCallback(async () => {
    const response = await getUsers();
    if (response.success) {
      const data = response.data;
      setAllHousingLocators(data.filter((user: User) => user.isHousingLocator));
      setALlReferringStaff(data.filter((user: User) => !user.isHousingLocator));
      setUser(
        data.find((user: User) => auth.currentUser && user.email === auth.currentUser.email) ??
          null,
      );
    } else {
      console.error(response.error);
    }
  }, [auth]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [auth]);

  const value = useMemo(
    () => ({ allHousingLocators, allReferringStaff, currentUser }),
    [allHousingLocators, allReferringStaff, currentUser],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
