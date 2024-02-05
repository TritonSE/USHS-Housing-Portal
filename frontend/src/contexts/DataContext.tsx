import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { User } from "../../../backend/src/models/user.ts";
import { get } from "../api/requests.ts";

import { AuthContext } from "./AuthContext.tsx";

type ProviderProps = {
  children: ReactNode;
};

type contextType = {
  allHousingLocators: User[];
  allCaseManagers: User[];
  currentUser: User | null;
};

export const DataContext = React.createContext<contextType>({
  currentUser: null,
  allHousingLocators: [],
  allCaseManagers: [],
});

export function DataProvider({ children }: ProviderProps) {
  const [allHousingLocators, setAllHousingLocators] = useState<User[]>([]);
  const [allCaseManagers, setAllCaseManagers] = useState<User[]>([]);
  const [currentUser, setUser] = useState<User | null>(null);
  const auth = useContext(AuthContext);

  const fetchData = useCallback(async () => {
    const jsonData = await get("/users");
    const data = (await jsonData.json()) as User[];
    setAllHousingLocators(data.filter((user: User) => user.isHousingLocator));
    setAllCaseManagers(data.filter((user: User) => !user.isHousingLocator));
    setUser(
      data.find((user: User) => auth.currentUser && user.email === auth.currentUser.email) ?? null,
    );
  }, [auth]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [auth]);

  const value = useMemo(
    () => ({ allHousingLocators, allCaseManagers, currentUser }),
    [allHousingLocators, allCaseManagers, currentUser],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
