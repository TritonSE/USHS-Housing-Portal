import { useEffect, useRef, useState } from "react";
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
  const [numBedBath, setNumBedBath] = useState({ beds: 1, baths: 0.5 });
  const [searchText, setSearchText] = useState("");
  const [sortIndex, setSortIndex] = useState(0);
  const [availabilityIndex, setAvailabilityIndex] = useState(0);
  const [price, setPrice] = useState({ minPrice: -1, maxPrice: -1 });

  const resetFunctions = useRef(Array<() => void>);

  const applyFilters = () => {
    const filters = {
      search: searchText ?? undefined,
      beds: numBedBath.beds,
      baths: numBedBath.baths,
      sort: sortIndex,
      availability: availabilityIndex,
      minPrice: price.minPrice === -1 ? undefined : price.minPrice,
      maxPrice: price.maxPrice === -1 ? undefined : price.maxPrice,
    };

    props.refreshUnits(filters as FilterParams);
  };

  const resetFilters = () => {
    setNumBedBath({ beds: 1, baths: 0.5 });
    setSearchText("");
    setSortIndex(0);
    setAvailabilityIndex(0);
    setPrice({ minPrice: -1, maxPrice: -1 });

    resetFunctions.current.prototype.forEach((callback: () => void) => {
      callback();
    });
  };

  const registerResetCallback = (callback: () => void) => {
    resetFunctions.current.prototype.push(callback);
  };

  useEffect(() => {
    applyFilters();
  }, [searchText, numBedBath, sortIndex, availabilityIndex, price]);

  const BedBathChangeHandler = (beds: number, baths: number) => {
    setNumBedBath({ beds, baths });
  };

  const SortChangeHandler = (sortType: number) => {
    setSortIndex(sortType);
  };

  const AvailabilityChangeHandler = (availIndex: number) => {
    setAvailabilityIndex(availIndex);
  };

  const MinMaxPriceChangeHandler = (minPrice: number, maxPrice: number) => {
    setPrice({ minPrice, maxPrice });
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
          <SearchIcon src="/search.svg" />
        </SearchBarContainer>

        {/* AVAILABILITY FILTER */}
        <AvailabilityDropDown
          onApply={AvailabilityChangeHandler}
          registerResetCallback={registerResetCallback}
        />

        {/* PRICE FILTER */}
        <PriceDropDown
          onApply={MinMaxPriceChangeHandler}
          registerResetCallback={registerResetCallback}
        />

        {/* BED AND BATH FILTER */}
        <BedBathDropDown
          onApply={BedBathChangeHandler}
          registerResetCallback={registerResetCallback}
        />

        <ResetFilterButton onClick={resetFilters}>
          <ResetFilterRow>
            <ResetIcon src="/refresh.svg" />
            <ResetFilterText> Reset filters</ResetFilterText>
          </ResetFilterRow>
        </ResetFilterButton>
      </FiltersFirstRow>

      <SortDropDownComp value={sortIndex} onApply={SortChangeHandler} />
    </AllFiltersContainer>
  );
};

export default FilterDropdown;
