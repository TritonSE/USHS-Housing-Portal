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
  refetchData: () => void;
};

export const DataContext = React.createContext<contextType>({
  currentUser: null,
  allHousingLocators: [],
  allReferringStaff: [],
  refetchData: () => null,
});

export function DataProvider({ children }: ProviderProps) {
  const [allHousingLocators, setAllHousingLocators] = useState<User[]>([]);
  const [allReferringStaff, setAllReferringStaff] = useState<User[]>([]);
  const [currentUser, setUser] = useState<User | null>(null);
  const auth = useContext(AuthContext);

  const fetchData = useCallback(async () => {
    if (auth.currentUser) {
      const response = await getUsers();
      if (response.success) {
        const data = response.data;
        setAllHousingLocators(data.filter((user: User) => user.isHousingLocator));
        setAllReferringStaff(data.filter((user: User) => !user.isHousingLocator));
        setUser(
          data.find((user: User) => auth.currentUser && user.email === auth.currentUser.email) ??
            null,
        );
      } else {
        console.error(response.error);
      }
    }
  }, [auth]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [auth]);

  const value = useMemo(
    () => ({ allHousingLocators, allReferringStaff, currentUser, refetchData: fetchData }),
    [allHousingLocators, allReferringStaff, currentUser],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
