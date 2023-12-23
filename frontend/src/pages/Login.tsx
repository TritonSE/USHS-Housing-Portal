import { Helmet } from "react-helmet-async";

import { Page } from "@/components";

export function Login() {
  return (
    <Page>
      <Helmet>
        <title>Login | USHS Housing Portal</title>
      </Helmet>
      <h1>This is the login page.</h1>
    </Page>
  );
}
