import styled, { css } from "styled-components";
import { useState } from "react";

const FilterSortContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: transparent;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 28px;
  margin-left: 95px;
  margin-right: 95px;
  margin-top: 95px;
  margin-bottom: 16px;
  background-color: transparent;
  flex-wrap: wrap;
`;

const SearchBar = styled.input`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3px;
  min-width: 16rem;
  border: 0;

  &::placeholder {
    color: #000;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 600;
  }
`;

const SearchIcon = styled.img`
  height: 20px;
  width: 20px;
`;

const SearchRow = styled.div`
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

const FilterSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
`;

const Dropdown = styled.button<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  border-radius: 5px;
  ${(props) =>
    props.active
      ? css`
          border: 0.5px solid #ec8537;
        `
      : css`
          border: 0.5px solid #cdcaca;
        `}
  background-color: #fff;
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
`;

const DropdownRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-center;
  gap: 50px;
`;

const DropdownIcon = styled.img`
  height: 20px;
  width: 20px;
`;

const AvailabilityDropDown = styled.div`
  position: absolute;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  background-color: #fff;
  border: 0.5px solid #ec8537;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
  gap: 12px;
`;

const AvailabilityRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const FilterRadioButton = styled.img`
  height: 20px;
  width: 20px;
`;

const FilterText = styled.p`
  color: #000;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
`;

const ApplyButton = styled.button`
  border-radius: 5px;
  background: #b64201;
  border: 0;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const ApplyButtonText = styled.p`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 300;
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

const ResetIcon = styled.img`
  height: 25px;
  width: 25px;
`;

const Sort = styled.button`
  color: #111010;
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  background-color: transparent;
  border-color: transparent;
  margin-left: 95px;
`;

const DropdownText = styled(Sort)`
  margin: 0;
  font-weight: 300;
  font-size: 12px;
`;

const SortRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-center;
  gap: 15px;
`;

export const FilterDropdown = () => {
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  return (
    <FilterSortContainer>
      <FilterContainer>
        <SearchRow>
          <SearchBar placeholder="Search Property" />
          <SearchIcon src="/search.svg" />
        </SearchRow>

        {availabilityOpen ? (
          <FilterSubContainer>
            <Dropdown
              onClick={() => {
                setAvailabilityOpen(false);
              }}
              active={true}
            >
              <DropdownRow>
                <FilterText>Availability</FilterText>
                <DropdownIcon src="/up_arrow.svg" />
              </DropdownRow>
            </Dropdown>

            <AvailabilityDropDown>
              <AvailabilityRow>
                <FilterRadioButton src="/filter_radio_button.svg" />
                <DropdownText>Available</DropdownText>
              </AvailabilityRow>

              <AvailabilityRow>
                <FilterRadioButton src="/filter_radio_button.svg" />
                <DropdownText>Leased</DropdownText>
              </AvailabilityRow>

              <ApplyButton>
                <ApplyButtonText>Apply</ApplyButtonText>
              </ApplyButton>
            </AvailabilityDropDown>
          </FilterSubContainer>
        ) : (
          <Dropdown
            onClick={() => {
              setAvailabilityOpen(true);
            }}
            active={false}
          >
            <DropdownRow>
              <FilterText>Availability</FilterText>
              <DropdownIcon src="/dropdown.svg" />
            </DropdownRow>
          </Dropdown>
        )}

        <Dropdown>
          <DropdownRow>
            <FilterText>Price</FilterText>
            <DropdownIcon src="/dropdown.svg" />
          </DropdownRow>
        </Dropdown>

        <Dropdown>
          <DropdownRow>
            <FilterText>Beds & Bath</FilterText>
            <DropdownIcon src="/dropdown.svg" />
          </DropdownRow>
        </Dropdown>

        <ResetFilterButton>
          <ResetFilterRow>
            <ResetIcon src="/refresh.svg" />
            <ResetFilterText> Reset filters</ResetFilterText>
          </ResetFilterRow>
        </ResetFilterButton>
      </FilterContainer>

      <SortRow>
        <Sort>Sort: Price (Hight to Low)</Sort>
        <DropdownIcon src="/dropdown.svg" />
      </SortRow>
    </FilterSortContainer>
  );
};

export default FilterDropdown;
