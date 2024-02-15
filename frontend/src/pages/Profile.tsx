import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

import { Page } from "@/components";
import { NavBar } from "@/components/NavBar";
import { AuthContext } from "@/contexts/AuthContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function Profile() {
  const authContext = useContext(AuthContext);

  return (
    <Page>
      <Helmet>
        <title>Home | USHS Housing Portal</title>
      </Helmet>
      <NavBar page="Profile" />
      <Wrapper>
        {authContext.currentUser && (
          <>
            <h1>{"Current User: " + authContext.currentUser?.email}</h1>
            <img src={authContext.currentUser?.photoURL ?? ""} alt="Profile" />
          </>
        )}
      </Wrapper>
    </Page>
  );
}
