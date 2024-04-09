import { useEffect, useState } from "react";
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
  margin-top: 55px;
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

type FilterDropdownProps = {
  value: FilterParams;
  refreshUnits(filterParams: FilterParams): void;
};

export const FilterDropdown = (props: FilterDropdownProps) => {
  const [bedBathState, setBedBathState] = useState({
    beds: Number(props.value.beds ?? 1),
    baths: Number(props.value.baths ?? 0.5),
  });
  const [bedBathDisplayState, setBedBathDisplayState] = useState({
    bedsDisplay: Number(props.value.beds ?? 1),
    bathsDisplay: Number(props.value.baths ?? 0.5),
    notApplied: props.value.beds === undefined && props.value.baths === undefined,
  });
  const [searchText, setSearchText] = useState(props.value.search ?? "");
  const [sortIndex, setSortIndex] = useState(Number(props.value.sort ?? 0));
  const [availabilityState, setAvailabilityState] = useState({
    dropdownText: props.value.availability ?? "Available",
  });
  const [AvailabilityDisplayState, setAvailabilityDisplayState] = useState({
    selectedIdx: props.value.availability === "Leased" ? 1 : 0,
  });
  const [priceState, setPriceState] = useState({
    minPrice: String(props.value.minPrice) === "undefined" ? -1 : Number(props.value.minPrice),
    maxPrice: String(props.value.maxPrice) === "undefined" ? -1 : Number(props.value.maxPrice),
  });

  const [priceDisplayState, setPriceDisplayState] = useState({
    minPriceDisplay:
      String(props.value.minPrice) === "undefined" ? -1 : Number(props.value.minPrice),
    maxPriceDisplay:
      String(props.value.maxPrice) === "undefined" ? -1 : Number(props.value.maxPrice),
    notApplied:
      String(props.value.minPrice) === "undefined" && String(props.value.maxPrice) === "undefined",
  });

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
    setBedBathDisplayState({ bedsDisplay: 1, bathsDisplay: 0.5, notApplied: true });
    setSearchText("");
    setSortIndex(0);
    setAvailabilityState({ dropdownText: "Available" });
    setAvailabilityDisplayState({ selectedIdx: 0 });
    setPriceState({
      minPrice: -1,
      maxPrice: -1,
    });
    setPriceDisplayState({
      minPriceDisplay: -1,
      maxPriceDisplay: -1,
      notApplied: true,
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

        {/* AVAILABILITY FILTER */}
        <AvailabilityDropDown
          value={availabilityState}
          setValue={setAvailabilityState}
          displayValue={AvailabilityDisplayState}
          setDisplayValue={setAvailabilityDisplayState}
        />

        {/* PRICE FILTER */}
        <PriceDropDown
          value={priceState}
          setValue={setPriceState}
          displayValue={priceDisplayState}
          setDisplayValue={setPriceDisplayState}
        />

        {/* BED AND BATH FILTER */}
        <BedBathDropDown
          value={bedBathState}
          setValue={setBedBathState}
          displayValue={bedBathDisplayState}
          setDisplayValue={setBedBathDisplayState}
        />

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
