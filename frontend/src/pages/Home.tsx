import React from "react";
import { Helmet } from "react-helmet-async";

import { getUsers } from "@/api/users";
import { Page } from "@/components";

export function Home() {
  React.useEffect(() => {
    // Example API call
    void getUsers().then(console.log);
  }, []);

  return (
    <Page>
      <Helmet>
        <title>Home | USHS Housing Portal</title>
      </Helmet>
      <h1>This is the home page.</h1>
    </Page>
  );
}
