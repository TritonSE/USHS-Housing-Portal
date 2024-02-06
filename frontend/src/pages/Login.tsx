import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { createUser } from "@/api/users";
import { Page } from "@/components";
import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";
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
  padding: 20vh 364.6px 0vh 365px;
  // max-height: 70vh;
`;
const Button = styled.button`
  padding: 12px 32px;
  background-color: #b64201;
  border-radius: 14px;
  color: #ffffff;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.32px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
`;
const Image = styled.img`
  width: 600px;
  height: 250px;
`;
const Error = styled.div`
  color: red;
`;

export function Login() {
  const [errorMessage, setError] = useState<string>();

  const provider = new GoogleAuthProvider();
  provider.addScope("email");
  provider.addScope("profile");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dataContext = useContext(DataContext);
  const navigate = useNavigate();

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        const names = user.displayName?.split(" ") ?? ["", ""];
        const firstName = names[0];
        const lastName = names[1];

        const email = user.email ?? "";

        createUser({ firstName, lastName, email })
          .then((res) => {
            console.log(res);
            navigate("/"); //filler for now
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error: FirebaseError) => {
        console.log(error);
        if (error.code !== "auth/internal-error" && error.message.includes("Cloud Function")) {
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
          <Image src="USHSLogo.png" alt="" />
          <Button onClick={login}>Log in with Google</Button>
        </Wrapper>
        {errorMessage && <Error>{errorMessage}</Error>}
      </Items>
    </Page>
  );
}
