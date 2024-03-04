import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { FilterParams, Unit, getUnits } from "@/api/units";
import { FilterDropdown } from "@/components/FilterDropdown";
import { NavBar } from "@/components/NavBar";
import { Page } from "@/components/Page";
import { UnitCardGrid } from "@/components/UnitCardGrid";

export function Home() {
  const [units, setUnits] = useState<Unit[]>([]);

  const fetchUnits = (filterParams: FilterParams) => {
    getUnits(filterParams)
      .then((response) => {
        if (response.success) setUnits(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUnits({});
  }, []);

  return (
    <Page>
      <Helmet>
        <title>Home | USHS Housing Portal</title>
      </Helmet>
      <NavBar page="Home" />
      <FilterDropdown refreshUnits={fetchUnits}></FilterDropdown>
      <UnitCardGrid units={units} />
    </Page>
  );
}
