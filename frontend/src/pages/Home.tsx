import React from "react";
import { Helmet } from "react-helmet-async";

import { getUsers } from "@/api/users";
import { Page } from "@/components/Page";
import { FilterDropdown } from "@/components/FilterDropdown";
import { UnitCardGrid } from "@/components/UnitCardGrid";
import { getUnits, FilterParams } from "@/api/units";

export function Home() {
  React.useEffect(() => {
    // Example API call
    void getUsers().then(console.log);
  }, []);

  const fetchUnits = (filterParams: FilterParams) => {
    getUnits(filterParams);
  }

  return (
    <Page>
      <Helmet>
        <title>Home | USHS Housing Portal</title>
      </Helmet>
      {/* <h1>This is the home page.</h1> */}
      <FilterDropdown refreshUnits={fetchUnits}></FilterDropdown>
      <UnitCardGrid />
    </Page>
  );
}
