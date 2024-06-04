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
import { UnitList } from "@/components/UnitList";

const ButtonsWrapper = styled.div`
  display: flex;
  flex: row;
  justify-content: end;
  margin: 0;
  margin-top: 55px;
  margin-right: 100px;
  margin-left: 310px;
`;

const ToggleButtonWrapper = styled.div`
  display: flex;
  padding: 0;
  width: 195px;
  height: 140px;
  gap: 0px;
  border-radius: 100px 0px 0px 0px;
  opacity: 0px;
`;

const CardViewButton = styled.img<{ selected: boolean }>`
  width: 100px;
  height: 50px;
  padding: 7px 33px 8px 32px;
  gap: 8px;
  border-radius: 100px 0px 0px 100px;
  opacity: 0px;
  background: ${(props) => (props.selected ? "#ec85371a" : "#EEEEEE")};

  &:hover {
    opacity: 0px;
    background: #ec85371a;
    cursor: pointer;
  }
`;

const ListViewButton = styled(CardViewButton)`
  padding: 7px 32px 7px 32px;
  border-radius: 0px 100px 100px 0px;
  background: ${(props) => (props.selected ? "#ec85371a" : "#EEEEEE")};
`;

const SearchStateWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

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
  const [viewMode, setViewMode] = useState("card");

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

  const handleCardView = () => {
    setViewMode("card");
  };

  const handleListView = () => {
    setViewMode("list");
  };

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
            <SearchStateWrapper>
              <FilterDropdown
                searchText={filters.search ?? ""}
                sortIndex={Number(filters.sort ?? 0)}
              />
              <ButtonsWrapper>
                <ToggleButtonWrapper>
                  <CardViewButton
                    onClick={handleCardView}
                    selected={viewMode === "card"}
                    src={
                      viewMode === "card"
                        ? "card_view_icon_selected.svg"
                        : "card_view_icon_unselected.svg"
                    }
                  ></CardViewButton>
                  <ListViewButton
                    onClick={handleListView}
                    selected={viewMode === "list"}
                    src={
                      viewMode === "list"
                        ? "list_view_icon_selected.svg"
                        : "list_view_icon_unselected.svg"
                    }
                  ></ListViewButton>
                </ToggleButtonWrapper>
              </ButtonsWrapper>
            </SearchStateWrapper>
            {viewMode === "card" ? (
              <UnitCardGrid
                units={units}
                showPendingUnits={filters.approved === "pending"}
                refreshUnits={(approved) => {
                  const newFilters = { ...filters, approved };
                  fetchUnits(newFilters);
                  setFilters(newFilters);
                }}
              />
            ) : (
              <UnitList
                units={units}
                showPendingUnits={filters.approved === "pending"}
                refreshUnits={(approved) => {
                  const newFilters = { ...filters, approved };
                  setFilters(newFilters);
                }}
              />
            )}
          </div>
        </HomePageLayout>
      </Page>
    </FiltersContext.Provider>
  );
}
