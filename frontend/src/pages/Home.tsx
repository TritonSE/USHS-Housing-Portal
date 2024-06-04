import React, { useContext, useEffect, useState } from "react";
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
import { DataContext } from "@/contexts/DataContext";

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const HeaderText = styled.span`
  font-family: "Neutraface Text";
  font-size: 32px;
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
  justify-content: space-between;
`;

export type FilterContextType = {
  filters: FilterParams;
  setFilters: (filters: FilterParams) => void;
};

export const FiltersContext = React.createContext({} as FilterContextType);

const PropertiesRow = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: black;
  font-family: "Montserrat";
  font-size: 27px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const PendingButton = styled.div<{ selected: boolean }>`
  display: flex;
  width: 164px;
  height: 55px;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => (props.selected ? "12px" : "12px 0px 0px 12px")};
  border: 1px solid ${(props) => (props.selected ? "rgba(162, 61, 4, 0.80)" : "#EEE")};
  background: ${(props) => (props.selected ? "#B64201" : "#EEE")};
  color: ${(props) => (props.selected ? "#EEE" : "#2E2E2E")};
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  z-index: ${(props) => (props.selected ? 1 : 0)};
  cursor: pointer;
`;

const ListingsButton = styled(PendingButton)`
  border-radius: ${(props) => (props.selected ? "12px" : "0px 12px 12px 0px")};
  position: relative;
  left: -10px;
`;

const HomePageLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const UnitContent = styled.div`
  width: 100%;
  max-height: calc(100vh - 70px);
  overflow-y: scroll;
  padding: 70px 60px;
`;
export function Home() {
  const dataContext = useContext(DataContext);
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

  const refreshUnits = (approved: "pending" | "approved") => {
    const newFilters = { ...filters, approved };
    setFilters(newFilters);
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
          <UnitContent>
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
            <PropertiesRow>
              {filters.approved === "pending" ? (
                <HeaderText>Pending Approval</HeaderText>
              ) : (
                <HeaderText>Available Properties</HeaderText>
              )}
              {dataContext.currentUser?.isHousingLocator && (
                <ButtonsWrapper>
                  <PendingButton
                    onClick={() => {
                      refreshUnits("pending");
                    }}
                    selected={filters.approved === "pending"}
                  >
                    Pending Listings
                  </PendingButton>
                  <ListingsButton
                    onClick={() => {
                      refreshUnits("approved");
                    }}
                    selected={filters.approved === "approved"}
                  >
                    All Listings
                  </ListingsButton>
                </ButtonsWrapper>
              )}
            </PropertiesRow>
            {viewMode === "card" ? (
              <UnitCardGrid
                units={units}
                showPendingUnits={filters.approved === "pending"}
                refreshUnits={refreshUnits}
              />
            ) : (
              <UnitList units={units} />
            )}
          </UnitContent>
        </HomePageLayout>
      </Page>
    </FiltersContext.Provider>
  );
}
