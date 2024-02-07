import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { Page } from "@/components";
import { AuthContext } from "@/contexts/AuthContext";
import { auth } from "@/firebase";

export function Home() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  //Everything below is testing for auth context, feel free to delete
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Page>
      <Helmet>
        <title>Home | USHS Housing Portal</title>
      </Helmet>
      {authContext.signedIn ? (
        <h1>{"Welcome, " + authContext.currentUser?.displayName}</h1>
      ) : (
        <h1>Please log in to begin.</h1>
      )}
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
      <button onClick={logOut}>Log Out</button>
    </Page>
  );
}
