import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import app from "../../firebase";

import { createUser } from "@/api/users";
import { Page } from "@/components";

export function Login() {
  const auth = getAuth(app);
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

        createUser({ firstName, lastName, email }).then((result) => {
          if (result.success) {
            navigate("/");
          } else {
            alert(result.error);
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <Page>
      <Helmet>
        <title>Login | USHS Housing Portal</title>
      </Helmet>
      <h1>This is the login page.</h1>
      <button
        onClick={() => {
          login();
        }}
      >
        Login
      </button>
    </Page>
  );
}
