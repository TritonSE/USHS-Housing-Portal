import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { FilterParams, Unit, getUnits } from "@/api/units";
import { FilterDropdown } from "@/components/FilterDropdown";
import { FitlerPanel } from "@/components/FilterPanel";
import { NavBar } from "@/components/NavBar";
import { Page } from "@/components/Page";
import { UnitCardGrid } from "@/components/UnitCardGrid";

export const FiltersContext = React.createContext({
  filters: {} as FilterParams,
});

const HomePageLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const FilterPadding = styled.div`
  min-width: 250px;
  height: 100%;
`;

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
        if (response.success) setUnits(response.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchUnits(filters);
  }, [filters]);

  return (
    <Page>
      <Helmet>
        <title>Home | USHS Housing Portal</title>
      </Helmet>
      <NavBar page="Home" />
      <HomePageLayout>
        <FitlerPanel></FitlerPanel>
        <FilterPadding />
        <div>
          <FilterDropdown
            value={filters}
            refreshUnits={(filterParams) => {
              filterParams.approved = filters.approved;
              setFilters(filterParams);
            }}
          ></FilterDropdown>
          <UnitCardGrid
            units={units}
            refreshUnits={(approved) => {
              const newFilters = { ...filters, approved };
              fetchUnits(newFilters);
              setFilters(newFilters);
            }}
          />
        </div>
      </HomePageLayout>
    </Page>
  );
}
