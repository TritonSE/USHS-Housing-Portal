import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { Page } from "@/components";
import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";
import { auth } from "@/firebase";

export function Home() {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
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

  const getInfo = () => {
    console.log(authContext.currentUser);
    console.log("Signed in?: " + authContext.signedIn);
    console.log(dataContext.currentUser);
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
      <button onClick={getInfo}>Log user info</button>
    </Page>
  );
}
