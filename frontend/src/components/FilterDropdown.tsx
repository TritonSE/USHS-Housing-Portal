import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Button } from "./Button";

import { FilterParams } from "@/api/units";
// import { FilterText } from "@/components/FilterCommon";
import { SortDropDownComp } from "@/components/SortDropDown";
import { DataContext } from "@/contexts/DataContext";
import { FilterText } from "./FilterCommon";

const AllFiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 95px;
  margin-right: 95px;
  margin-top: 70px;
  gap: 16px;
`;

const FiltersFirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 33px;
  flex-wrap: wrap;
`;

const SearchBarInput = styled.input`
  padding: 3px;
  min-width: 16rem;
  border: 0;

  &::placeholder {
    color: #000;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 600;
  }

  &:focus {
    outline: none;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const SearchIcon = styled.img`
  height: 20px;
  width: 20px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  border: 0.5px solid #cdcaca;
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
`;

const ResetIcon = styled.img`
  height: 25px;
  width: 25px;
`;

const ResetFilterButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
`;

const ResetFilterText = styled(FilterText)`
  color: #b64201;
  font-weight: 500;
  padding-top: 2px;
`;

const ResetFilterRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-center;
  gap: 8px;
`;

const AddListings = styled(Button)`
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.32px;
  padding: 8px 20px;
`;

type FilterDropdownProps = {
  value: FilterParams;
  refreshUnits(filterParams: FilterParams): void;
};

export const FilterDropdown = (props: FilterDropdownProps) => {
  const [bedBathState, setBedBathState] = useState({
    beds: Number(props.value.beds ?? 1),
    baths: Number(props.value.baths ?? 0.5),
  });
  const [searchText, setSearchText] = useState("");
  const [sortIndex, setSortIndex] = useState(0);
  const [availabilityState, setAvailabilityState] = useState({
    dropdownText: props.value.availability ?? "Available",
  });
  const [priceState, setPriceState] = useState({
    minPrice: String(props.value.minPrice) === "undefined" ? -1 : Number(props.value.minPrice),
    maxPrice: String(props.value.maxPrice) === "undefined" ? -1 : Number(props.value.maxPrice),
  });

  const navigate = useNavigate();
  const dataContext = useContext(DataContext);

  const applyFilters = () => {
    const filters = {
      search: searchText ?? "undefined",
      beds: String(bedBathState.beds),
      baths: String(bedBathState.baths),
      sort: String(sortIndex),
      availability: availabilityState.dropdownText,
      minPrice: priceState.minPrice === -1 ? "undefined" : String(priceState.minPrice),
      maxPrice: priceState.maxPrice === -1 ? "undefined" : String(priceState.maxPrice),
    };

    props.refreshUnits(filters);
  };

  useEffect(() => {
    applyFilters();
  }, [sortIndex, searchText, priceState, bedBathState, availabilityState]);

  const resetFilters = () => {
    setBedBathState({ beds: 1, baths: 0.5 });
    setSearchText("");
    setSortIndex(0);
    setAvailabilityState({ dropdownText: "Available" });
    setPriceState({
      minPrice: -1,
      maxPrice: -1,
    });
  };

  return (
    <AllFiltersContainer>
      <FiltersFirstRow>
        <SearchBarContainer>
          <SearchBarInput
            placeholder="Search Property"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
          <SearchIcon src="/search.svg" onClick={applyFilters} />
        </SearchBarContainer>
        {dataContext.currentUser?.isHousingLocator && (
          <AddListings
            kind="primary"
            onClick={() => {
              navigate("/new-listing");
            }}
          >
            <img src="/plus_sign.svg" alt="" />
            <span>Listing</span>
          </AddListings>
        )}

        <ResetFilterButton onClick={resetFilters}>
          <ResetFilterRow>
            <ResetIcon src="/refresh.svg" />
            <ResetFilterText> Reset filters</ResetFilterText>
          </ResetFilterRow>
        </ResetFilterButton>
      </FiltersFirstRow>

      <SortDropDownComp value={sortIndex} setValue={setSortIndex} />
    </AllFiltersContainer>
  );
};

export default FilterDropdown;
