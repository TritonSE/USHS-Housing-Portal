import styled, { css } from "styled-components";
import { useState } from "react";

const FilterSortContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: transparent;
  margin-left: 95px;
  margin-right: 95px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 28px;
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
  padding: 15px;
  background-color: #fff;
  border: 0.5px solid #ec8537;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
  gap: 12px;
`;

const BnbDropdown = styled(AvailabilityDropDown)`
  padding-right: 30px;
`;
const SortDropDown = styled(AvailabilityDropDown)`
  margin-top: 35px;
  padding-right: 70px;
`;
const AvailabilityRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const BnbRow = styled(AvailabilityRow)`
  gap: 13px;
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

const PriceFilterText = styled(FilterText)`
  padding-right: 80px;
`;

const ApplyButton = styled.button`
  border-radius: 5px;
  background: #b64201;
  border: 0;
  padding-left: 55px;
  padding-right: 55px;
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

const Sort = styled.button<{ active: boolean }>`
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  background-color: transparent;
  border-color: transparent;

  ${(props) =>
    props.active
      ? css`
          color: #ec8537;
        `
      : css`
          color: #111010;
        `}
`;

const DropdownText = styled(Sort)`
  font-weight: 300;
  font-size: 12px;
  margin-left: 0;
`;

const SortRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-center;
  align-items: flex-center;
  gap: 15px;
`;

const SortText = styled(Sort)`
  margin: 0;
  font-weight: 300;
  font-size: 14px;
`;

const BnbText = styled(Sort)`
  margin: 0;
  font-weight: 700;
  font-size: 14px;
`;

const BedBox = styled.div`
  border-radius: 3px;
  border: 0.5px solid #cdcaca;
  background-color: #f5f5f5;
  box-shadow: 1px 1px 2px 0px rgba(228, 227, 226, 0.4);
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const BathBox = styled(BedBox)`
  padding-left: 22px;
  padding-right: 22px;
`;

const AdjustButton = styled.button`
  color: #fff;
  border: 0;
  border-radius: 5px;
  background: var(--Primary, #b64201);
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 7px;
  padding-right: 7px;
`;

export const FilterDropdown = () => {
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [bnbOpen, setBnbOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [available, setAvailable] = useState(false);
  const [leased, setLeased] = useState(false);

  return (
    <FilterSortContainer>
      <FilterContainer>
        <SearchRow>
          <SearchBar placeholder="Search Property" />
          <SearchIcon src="/search.svg" />
        </SearchRow>

        {/* AVAILABILITY FILTER */}
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
              <AvailabilityRow
                onClick={() => {
                  setAvailable(!available);
                  setLeased(false);
                }}
              >
                {available ? (
                  <FilterRadioButton src="/filled_filter_radio_button.svg" />
                ) : (
                  <FilterRadioButton src="/filter_radio_button.svg" />
                )}
                <DropdownText>Available</DropdownText>
              </AvailabilityRow>

              <AvailabilityRow
                onClick={() => {
                  setAvailable(false);
                  setLeased(!leased);
                }}
              >
                {leased ? (
                  <FilterRadioButton src="/filled_filter_radio_button.svg" />
                ) : (
                  <FilterRadioButton src="/filter_radio_button.svg" />
                )}
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

        {/* PRICE FILTER */}
        {priceOpen ? (
          <FilterSubContainer>
            <Dropdown
              onClick={() => {
                setPriceOpen(false);
              }}
              active={true}
            >
              <DropdownRow>
                <PriceFilterText>Price</PriceFilterText>
                <DropdownIcon src="/up_arrow.svg" />
              </DropdownRow>
            </Dropdown>
            <AvailabilityDropDown></AvailabilityDropDown>
          </FilterSubContainer>
        ) : (
          <Dropdown
            onClick={() => {
              setPriceOpen(true);
            }}
            active={false}
          >
            <DropdownRow>
              <PriceFilterText>Price</PriceFilterText>
              <DropdownIcon src="/dropdown.svg" />
            </DropdownRow>
          </Dropdown>
        )}

        {/* BEDS AND BATH FILTER */}
        {bnbOpen ? (
          <FilterSubContainer>
            <Dropdown
              onClick={() => {
                setBnbOpen(false);
              }}
              active={true}
            >
              <DropdownRow>
                <FilterText>Beds & Bath</FilterText>
                <DropdownIcon src="/up_arrow.svg" />
              </DropdownRow>
            </Dropdown>
            <BnbDropdown>
              <BnbText>Bedrooms</BnbText>
              <BnbRow>
                <BedBox>
                  <BnbText>1+</BnbText>
                </BedBox>
                <AdjustButton>+</AdjustButton>
                <AdjustButton>-</AdjustButton>
              </BnbRow>
              <BnbText>Baths</BnbText>
              <BnbRow>
                <BathBox>
                  <BnbText>0.5+</BnbText>
                </BathBox>
                <AdjustButton>+</AdjustButton>
                <AdjustButton>-</AdjustButton>
              </BnbRow>
              <ApplyButton>
                <ApplyButtonText>Apply</ApplyButtonText>
              </ApplyButton>
            </BnbDropdown>
          </FilterSubContainer>
        ) : (
          <Dropdown
            onClick={() => {
              setBnbOpen(true);
            }}
            active={false}
          >
            <DropdownRow>
              <FilterText>Beds & Bath</FilterText>
              <DropdownIcon src="/dropdown.svg" />
            </DropdownRow>
          </Dropdown>
        )}

        <ResetFilterButton>
          <ResetFilterRow>
            <ResetIcon src="/refresh.svg" />
            <ResetFilterText> Reset filters</ResetFilterText>
          </ResetFilterRow>
        </ResetFilterButton>
      </FilterContainer>

      {sortOpen ? (
        <FilterSubContainer>
          <SortRow
            onClick={() => {
              setSortOpen(false);
            }}
          >
            <Sort active={true}>Sort: Price (Hight to Low)</Sort>
            <DropdownIcon src="/up_arrow.svg" />
          </SortRow>
          <SortDropDown>
            <SortText>Price (High to Low)</SortText>
            <SortText>Price (Low to High)</SortText>
            <SortText>Newest</SortText>
            <SortText>Bedrooms</SortText>
            <SortText>Baths</SortText>
          </SortDropDown>
        </FilterSubContainer>
      ) : (
        <SortRow
          onClick={() => {
            setSortOpen(true);
          }}
        >
          <Sort active={false}>Sort: Price (Hight to Low)</Sort>
          <DropdownIcon src="/dropdown.svg" />
        </SortRow>
      )}
    </FilterSortContainer>
  );
};

export default FilterDropdown;
