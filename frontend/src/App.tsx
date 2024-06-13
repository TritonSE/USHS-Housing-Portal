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
  Referrals,
  RenterCandidatePage,
  UnitDetails,
} from "@/pages";
import { GlobalStyle, StyledComponentsManager, theme } from "@/theme";

function AppRouter() {
  const { signedIn } = useContext(AuthContext);
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
            <Route path="/new-listing" element={<HousingLocatorForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/unit/:id" element={<UnitDetails />} />
            <Route path="/candidate/:id" element={<RenterCandidatePage />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Common Routes */}
        <Route path="/listing-form" element={<LandlordListingForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <StyledComponentsManager>
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
    </StyledComponentsManager>
  );
}
