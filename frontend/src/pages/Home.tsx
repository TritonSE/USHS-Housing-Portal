import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { FilterParams, Unit, getUnits } from "@/api/units";
import { FilterDropdown } from "@/components/FilterDropdown";
import { FilterPanel } from "@/components/FilterPanel";
import { NavBar } from "@/components/NavBar";
import { Page } from "@/components/Page";
import { UnitCardGrid } from "@/components/UnitCardGrid";

export type FilterContextType = {
  filters: FilterParams;
  setFilters: (filters: FilterParams) => void;
};

export const FiltersContext = React.createContext({} as FilterContextType);

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
    <FiltersContext.Provider value={{ filters, setFilters }}>
      <Page>
        <Helmet>
          <title>Home | USHS Housing Portal</title>
        </Helmet>
        <NavBar page="Home" />
        <HomePageLayout>
          <FilterPanel />
          <FilterPadding />
          <div>
            <FilterDropdown />
            <UnitCardGrid
              units={units}
              refreshUnits={(approved) => {
                const newFilters = { ...filters, approved };
                setFilters(newFilters);
              }}
            />
          </div>
        </HomePageLayout>
      </Page>
    </FiltersContext.Provider>
  );
}
