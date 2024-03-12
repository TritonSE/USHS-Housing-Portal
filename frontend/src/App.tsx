import { useContext } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

import {
  Home,
  HousingLocatorForm,
  LandlordListingForm,
  Login,
  Profile,
  UnitDetails,
} from "@/pages";
import { GlobalStyle, theme } from "@/theme";

function AppRouter() {
  const { signedIn } = useContext(AuthContext);
  console.log(signedIn);
  return (
    <BrowserRouter>
      <Routes>
        {!signedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        )}

        {signedIn && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/landlord-listing-form" element={<LandlordListingForm />} />
            <Route path="/housing-locator-form" element={<HousingLocatorForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/unit/:id" element={<UnitDetails />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <DataProvider>
          <GlobalStyle />
          <HelmetProvider>
            <AppRouter />
          </HelmetProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
