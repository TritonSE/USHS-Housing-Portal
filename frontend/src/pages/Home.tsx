import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { FilterParams, GetUnitsParams, Unit, getUnits } from "@/api/units";
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
    let query: GetUnitsParams = {
      sort: filterParams.sort,
      approved: filterParams.approved,
      search: filterParams.search,
      // Filter Panel Filters
      availability: filterParams.availability,
      housingAuthority: filterParams.housingAuthority,
      accessibility: filterParams.accessibility
        ? JSON.stringify(Array.from(filterParams.accessibility))
        : undefined,
      rentalCriteria: filterParams.rentalCriteria
        ? JSON.stringify(Array.from(filterParams.rentalCriteria))
        : undefined,
      additionalRules: filterParams.additionalRules
        ? JSON.stringify(Array.from(filterParams.additionalRules))
        : undefined,
      beds: filterParams.beds?.toString(),
      baths: filterParams.baths?.toString(),
      minPrice: filterParams.minPrice?.toString(),
      maxPrice: filterParams.maxPrice?.toString(),
      minSecurityDeposit: filterParams.minSecurityDeposit?.toString(),
      maxSecurityDeposit: filterParams.maxSecurityDeposit?.toString(),
      minApplicationFee: filterParams.minApplicationFee?.toString(),
      maxApplicationFee: filterParams.maxApplicationFee?.toString(),
      minSize: filterParams.minSize?.toString(),
      maxSize: filterParams.maxSize?.toString(),
      fromDate: filterParams.fromDate,
      toDate: filterParams.toDate,
    };

    query = Object.fromEntries(Object.entries(query).filter(([_, value]) => value !== undefined));

    getUnits(query)
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
            <FilterDropdown
              searchText={filters.search ?? ""}
              sortIndex={Number(filters.sort ?? 0)}
            />
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
