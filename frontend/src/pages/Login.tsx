import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { createUser } from "@/api/users";
import { Page } from "@/components";
import { Button } from "@/components/Button";
import { auth } from "@/firebase";

const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1vh;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 13.67vh;
  padding: 22.5vh 364.6px 0vh 365px;
`;

const Image = styled.img`
  height: auto;
  width: auto;
  max-width: 80%;
`;
const Error = styled.div`
  color: red;
`;

export function Login() {
  const [errorMessage, setError] = useState<string>();

  const provider = new GoogleAuthProvider();
  provider.addScope("email");
  provider.addScope("profile");

  const navigate = useNavigate();

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        const names = user.displayName?.split(" ") ?? ["", ""];
        const firstName = names[0];
        const lastName = names[1];

        const email = user.email ?? "";

        // 404 User already exists error does not need to be caught
        // This is okay because we need to call this every time
        // to ensure the user is in the database if not already
        void createUser({ firstName, lastName, email }).then(() => {
          navigate("/");
        });
      })
      .catch((error: FirebaseError) => {
        console.error(error);
        if (error.code === "auth/internal-error" && error.message.includes("Cloud Function")) {
          setError("You are not authorized to sign in.");
        }
      });
  };

  return (
    <Page>
      <Helmet>
        <title>Login | USHS Housing Portal</title>
      </Helmet>
      <Items>
        <Wrapper>
          <Image src="USHSWideLogo.svg" alt="" />
          <Button kind="primary" onClick={login}>
            Log in with Google
          </Button>
        </Wrapper>
        {errorMessage && <Error>{errorMessage}</Error>}
      </Items>
    </Page>
  );
}
