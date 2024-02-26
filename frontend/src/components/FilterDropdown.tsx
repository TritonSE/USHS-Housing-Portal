import { useState } from "react";
import styled from "styled-components";

import { FilterParams } from "@/api/units";
import { AvailabilityDropDown } from "@/components/AvailabilityDropDown";
import { BedBathDropDown } from "@/components/BedBathDropDown";
import { FilterText } from "@/components/FilterCommon";
import { PriceDropDown } from "@/components/PriceDropDown";
import { SortDropDownComp } from "@/components/SortDropDown";

const AllFiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 95px;
  margin-right: 95px;
  margin-top: 95px;
  gap: 16px;
`;

const FiltersFirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 28px;
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

type FilterDropdownProps = {
  refreshUnits(filterParams: FilterParams): void;
};

export const FilterDropdown = (props: FilterDropdownProps) => {
  const [bedBathState, setBedBathState] = useState({
    beds: 1,
    baths: 0.5,
    bedsDisplay: 1,
    bathsDisplay: 0.5,
    notApplied: true,
  });
  const [searchText, setSearchText] = useState("");
  const [sortIndex, setSortIndex] = useState(0);
  const [availabilityState, setAvailabilityState] = useState({
    selectedIdx: 0,
    dropdownText: "Available",
  });
  const [priceState, setPriceState] = useState({
    minPrice: -1,
    maxPrice: -1,
    minPriceDisplay: -1,
    maxPriceDisplay: -1,
    notApplied: true,
  });

  const applyFilters = () => {
    const filters = {
      search: searchText ?? undefined,
      beds: bedBathState.beds,
      baths: bedBathState.baths,
      sort: sortIndex,
      availability: availabilityState.dropdownText,
      minPrice: priceState.minPrice === -1 ? undefined : priceState.minPrice,
      maxPrice: priceState.maxPrice === -1 ? undefined : priceState.maxPrice,
    };

    props.refreshUnits(filters);
    console.log(filters);
  };

  const resetFilters = () => {
    setBedBathState({ beds: 1, baths: 0.5, bedsDisplay: 1, bathsDisplay: 0.5, notApplied: true });
    setSearchText("");
    setSortIndex(0);
    setAvailabilityState({ selectedIdx: 0, dropdownText: "Available" });
    setPriceState({
      minPrice: -1,
      maxPrice: -1,
      minPriceDisplay: -1,
      maxPriceDisplay: -1,
      notApplied: true,
    });

    applyFilters();
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
              applyFilters();
            }}
          />
          <SearchIcon src="/search.svg" onClick={applyFilters} />
        </SearchBarContainer>

        {/* AVAILABILITY FILTER */}
        <AvailabilityDropDown
          value={availabilityState}
          setValue={setAvailabilityState}
          onApply={applyFilters}
        />

        {/* PRICE FILTER */}
        <PriceDropDown value={priceState} setValue={setPriceState} onApply={applyFilters} />

        {/* BED AND BATH FILTER */}
        <BedBathDropDown value={bedBathState} setValue={setBedBathState} onApply={applyFilters} />

        <ResetFilterButton onClick={resetFilters}>
          <ResetFilterRow>
            <ResetIcon src="/refresh.svg" />
            <ResetFilterText> Reset filters</ResetFilterText>
          </ResetFilterRow>
        </ResetFilterButton>
      </FiltersFirstRow>

      <SortDropDownComp value={sortIndex} setValue={setSortIndex} onApply={applyFilters} />
    </AllFiltersContainer>
  );
};

export default FilterDropdown;
