import { Helmet } from "react-helmet-async";

import { FilterParams, getUnits } from "@/api/units";
import { FilterDropdown } from "@/components/FilterDropdown";
import { NavBar } from "@/components/NavBar";
import { Page } from "@/components/Page";
import { UnitCardGrid } from "@/components/UnitCardGrid";

export function Home() {
  const fetchUnits = (filterParams: FilterParams) => {
    getUnits(filterParams)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Page>
      <Helmet>
        <title>Home | USHS Housing Portal</title>
      </Helmet>
      <NavBar page="Home" />
      <FilterDropdown refreshUnits={fetchUnits}></FilterDropdown>
      <UnitCardGrid />
    </Page>
  );
}
