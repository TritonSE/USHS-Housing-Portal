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
import { UnitList } from "@/components/UnitList";

const ButtonsWrapper = styled.div`
  display: flex;
  flex: row;
  justify-content: end;
  margin: 0;
  margin-right: 100px;
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
  const [viewMode, setViewMode] = useState("card");

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

  const handleCardView = () => {
    setViewMode("card");
  };

  const handleListView = () => {
    setViewMode("list");
  };

  return (
    <FiltersContext.Provider value={{ filters }}>
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
                  fetchUnits(newFilters);
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
