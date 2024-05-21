import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { SortDropDownComp } from "@/components/SortDropDown";
import { FiltersContext } from "@/pages/Home";

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

export const FilterDropdown = () => {
  const { filters, setFilters } = useContext(FiltersContext);

  const [searchText, setSearchText] = useState("");
  const [sortIndex, setSortIndex] = useState(0);

  const applyFilters = () => {
    setFilters({ ...filters, search: searchText ?? "undefined", sort: String(sortIndex) });
  };

  useEffect(() => {
    applyFilters();
  }, [sortIndex, searchText]);

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
      </FiltersFirstRow>

      <SortDropDownComp value={sortIndex} setValue={setSortIndex} />
    </AllFiltersContainer>
  );
};

export default FilterDropdown;
