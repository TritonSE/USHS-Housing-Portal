import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { FilterParams, Unit, getUnits } from "@/api/units";
import { FilterDropdown } from "@/components/FilterDropdown";
import { NavBar } from "@/components/NavBar";
import { Page } from "@/components/Page";
import { UnitCardGrid } from "@/components/UnitCardGrid";

export const FiltersContext = React.createContext({
  filters: {} as FilterParams,
});

export function Home() {
  const previousFilters = useLocation().state as FilterParams;
  const [units, setUnits] = useState<Unit[]>([]);
  const [filters, setFilters] = useState<FilterParams>(
    previousFilters ?? {
      availability: "Available",
      approved: "approved",
    },
  );

  const fetchUnits = (filterParams: FilterParams) => {
    getUnits(filterParams)
      .then((response) => {
        if (response.success) {
          setUnits(response.data);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchUnits(filters);
  }, [filters]);

  return (
    <FiltersContext.Provider value={{ filters }}>
      <Page>
        <Helmet>
          <title>Home | USHS Housing Portal</title>
        </Helmet>
        <NavBar page="Home" />
        <FilterDropdown
          value={filters}
          refreshUnits={(filterParams) => {
            filterParams.approved = filters.approved;
            setFilters(filterParams);
          }}
        ></FilterDropdown>
        <UnitCardGrid
          units={units}
          showPendingUnits={filters.approved === "pending"}
          refreshUnits={(approved) => {
            const newFilters = { ...filters, approved };
            fetchUnits(newFilters);
            setFilters(newFilters);
          }}
        />
      </Page>
    </FiltersContext.Provider>
  );
}
