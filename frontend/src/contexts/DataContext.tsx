import React, { ReactNode, useEffect, useMemo, useState, useCallback, useContext } from "react";
import { User } from "../../../backend/src/models/user.ts";
import { getUsers } from "../../../backend/src/services/user.ts";
import { AuthContext } from "./AuthContext.tsx";

type ProviderProps = {
    children: ReactNode;
};

type contextType = {
    allHousingLocators: [string];
    allCaseManagers: [string];
    currentUser: User | null;
};

export const DataContext = React.createContext<contextType>({ currentUser: null, allHousingLocators: [''], allCaseManagers: ['']});

export function DataProvider({ children }: ProviderProps) {
    const [allHousingLocators, setAllHousingLocators] = useState<[string]>(['']);
    const [allCaseManagers, setAllCaseManagers] = useState<[string]>(['']);
    const [currentUser, setUser] = useState<User | null>(null);
    const auth = useContext(AuthContext);

    const fetchData = useCallback(async () => {
        const data = await getUsers();
        setAllHousingLocators(data.filter((user: User) => user.isHousingLocator));
        setAllCaseManagers(data.filter((user: User) => !user.isHousingLocator));
        setUser(data.find((user: User) => user.email === auth.currentUser.email));
    }, [auth]);

    useEffect(() => {
        fetchData();
    }, [auth]);

    const value = useMemo(() => ({ allHousingLocators, allCaseManagers, currentUser }), [allHousingLocators, allCaseManagers, currentUser]);

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
