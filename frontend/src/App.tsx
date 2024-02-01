import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

import { Home, Login } from "@/pages";
import { GlobalStyle, theme } from "@/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <DataProvider>
          <GlobalStyle />
          <HelmetProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </HelmetProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
