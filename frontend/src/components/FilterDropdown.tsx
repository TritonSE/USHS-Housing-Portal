import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Button } from "./Button";

import { SortDropDownComp } from "@/components/SortDropDown";
import { DataContext } from "@/contexts/DataContext";
import { FiltersContext } from "@/pages/Home";

const AllFiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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

export const SearchBarInput = styled.input`
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

export const SearchIcon = styled.img`
  height: 20px;
  width: 20px;
`;

export const SearchBarContainer = styled.div`
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

export type FilterDropdownProps = {
  searchText: string;
  sortIndex: number;
};

export const FilterDropdown = (props: FilterDropdownProps) => {
  const { filters, setFilters } = useContext(FiltersContext);
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);

  return (
    <AllFiltersContainer>
      <FiltersFirstRow>
        <SearchBarContainer>
          <SearchBarInput
            placeholder="Search Property"
            value={props.searchText}
            onChange={(event) => {
              setFilters({ ...filters, search: event.target.value });
            }}
          />
          <SearchIcon src="/search.svg" />
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
      </FiltersFirstRow>

      <SortDropDownComp
        value={props.sortIndex}
        setValue={(val: number) => {
          setFilters({ ...filters, sort: String(val) });
        }}
      />
    </AllFiltersContainer>
  );
};

export default FilterDropdown;
