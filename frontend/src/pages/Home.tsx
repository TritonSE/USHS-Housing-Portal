import { Helmet } from "react-helmet-async";

import { Page } from "@/components";
import { NavBar } from "@/components/NavBar";

export function Home() {
  return (
    <Page>
      <Helmet>
        <title>Home | USHS Housing Portal</title>
      </Helmet>
      <NavBar page="Home" />
      <h1>This is the home page</h1>
    </Page>
  );
}
