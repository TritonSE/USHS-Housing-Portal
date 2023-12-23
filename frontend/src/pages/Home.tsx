import { Helmet } from "react-helmet-async";

import { Page } from "@/components";

export function Home() {
  return (
    <Page>
      <Helmet>
        <title>Home | USHS Housing Portal</title>
      </Helmet>
      <h1>This is the home page.</h1>
    </Page>
  );
}
