import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import { FilterParams } from "@/api/units";
import { SortDropDownComp } from "@/components/SortDropDown";
import { DropDownPopup, DropdownIcon, FilterSubContainer,
          Dropdown, FilterText, DropdownRow, Sort, PopupHeaderText,
          FilterRow, ApplyButton } from "@/components/FilterCommon";
import { BedBathDropDown } from "@/components/BedBathDropDown";

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

const AvailabilityRow = styled(FilterRow)``;

const FilterRadioButton = styled.img`
  height: 20px;
  width: 20px;
`;

const MinMaxDash = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 5px;
  margin-right: 5px;
`;

const DownArrowIcon = styled.img`
  height: 12px;
  width: 12px;
`;

const UpArrowIcon = styled.img`
  height: 12px;
  width: 12px;
`;

const ResetIcon = styled.img`
  height: 25px;
  width: 25px;
`;

// const DollarIcon = styled.img`
//   height: 8x;
//   width: 8px;
// `;

// const DownPaymentInput = styled.input`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   padding: 3px;
//   margin-left: 3px;
//   margin-right: 3px;
//   min-width: 100%;
//   border: 0;
//   background-color: transparent;

//   &::placeholder {
//     color: #cdcaca;
//     font-family: Montserrat;
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 600;
//   }
// `;

// const DownPaymentRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   padding: 10px;
//   border-radius: 3px;
//   border: 0.5px solid #cdcaca;
//   background: #f5f5f5;
//   box-shadow: 1px 1px 2px 0px rgba(228, 227, 226, 0.4);
// `;

const MinMaxBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 3px;
  border: 0.5px solid #cdcaca;
  background: #f5f5f5;
  box-shadow: 1px 1px 2px 0px rgba(228, 227, 226, 0.4);
  padding: 7px;
`;

const MinMaxRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

const MinMaxPopup = styled.div`
  position: absolute;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 85px;
  overflow: scroll;
  background-color: #fff;
  border: 0.5px solid #cdcaca;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(228, 227, 226, 0.4);
`;

const MinMaxPopupButton = styled.button`
  color: #000;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  border: 0;
  background-color: transparent;
  padding: 12px;
  min-width: 100%;

  &:hover {
    background: rgba(236, 133, 55, 0.2);
  }
`;

const PriceSubcontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;


const PriceFilterText = styled(FilterText)`
  padding-right: 80px;
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

const SortDropDown = styled(DropDownPopup)`
  margin-top: 30px;
  padding-right: 70px;
`;

const SortRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-center;
  align-items: flex-center;
  gap: 15px;
`;

const PopupBodyText = styled(Sort)`
  font-weight: 300;
  font-size: 12px;
  margin-left: 0;
`;

const PopupSortText = styled(Sort)`
  margin: 0;
  font-weight: 300;
  font-size: 14px;
`;

const PlaceholderText = styled.p<{ active: boolean }>`
  color: #cdcaca;
  font-family: Montserrat;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  padding-right: 5px;

  ${(props) =>
    props.active
      ? css`
          color: #000;
          padding-left: 11px;
          padding-right: 11px;
        `
      : css`
          color: #cdcaca;
        `}
`;

interface FilterDropdownProps {
  refreshUnits(filterParams: FilterParams): void
};

export const FilterDropdown = (props: FilterDropdownProps) => {
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [minPriceOpen, setMinPriceOpen] = useState(false);
  const [maxPriceOpen, setMaxPriceOpen] = useState(false);
  const [available, setAvailable] = useState(false);
  const [leased, setLeased] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState("Availability");
  const [minPriceState, setMinPriceState] = useState("No Min");
  const [maxPriceState, setMaxPriceState] = useState("No Max");
  const [priceRangeState, setPriceRangeState] = useState("Price");
  const [minPriceSelected, setMinPriceSelected] = useState(false);
  const [maxPriceSelected, setMaxPriceSelected] = useState(false);

  const [numBedBath, setNumBedBath] = useState({beds: 1, baths: 0.5});
  const [searchText, setSearchText] = useState("");
  const [sortIndex, setSortIndex] = useState(1);

  const applyFilters = () => {
    const filters = {
      search: searchText ?? undefined,
      beds: numBedBath.beds,
      baths: numBedBath.baths,
      sort: sortIndex
    };

    props.refreshUnits(filters as FilterParams);
  }

  const resetFilters = () => {
    setSearchText("");
    setSortIndex(0);
  }

  useEffect(() => {
    applyFilters();
  }, [searchText, numBedBath, sortIndex])

  const BedBathChangeHandler = (beds: number, baths: number) => {
    setNumBedBath({ beds, baths });
  }

  const SortChangeHandler = (sortType: number) => {
    setSortIndex(sortType);  
  }

  return (
    <AllFiltersContainer>
      <FiltersFirstRow>
        <SearchBarContainer>
          <SearchBarInput placeholder="Search Property" value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
          }}/>
          <SearchIcon src="/search.svg" />
        </SearchBarContainer>

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
                <FilterText>{availabilityStatus}</FilterText>
                <DropdownIcon src="/up_arrow.svg" />
              </DropdownRow>
            </Dropdown>

            <DropDownPopup>
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
                <PopupBodyText>Available</PopupBodyText>
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
                <PopupBodyText>Leased</PopupBodyText>
              </AvailabilityRow>

              <ApplyButton
                onClick={() =>
                  available
                    ? (setAvailabilityStatus("Available"), setAvailabilityOpen(false))
                    : (setAvailabilityStatus("Leased"), setAvailabilityOpen(false))
                }
              >
                Apply
              </ApplyButton>
            </DropDownPopup>
          </FilterSubContainer>
        ) : (
          <FilterSubContainer>
            <Dropdown
              onClick={() => {
                setAvailabilityOpen(true);
              }}
              active={false}
            >
              <DropdownRow>
                <FilterText>{availabilityStatus}</FilterText>
                <DropdownIcon src="/dropdown.svg" />
              </DropdownRow>
            </Dropdown>
          </FilterSubContainer>
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
                <PriceFilterText>{priceRangeState}</PriceFilterText>
                <DropdownIcon src="/up_arrow.svg" />
              </DropdownRow>
            </Dropdown>
            <DropDownPopup>
              <PopupHeaderText>Price</PopupHeaderText>
              <MinMaxRow>
                <PriceSubcontainer>
                  <MinMaxBox
                    onClick={() => {
                      setMinPriceOpen(!minPriceOpen);
                    }}
                  >
                    <PlaceholderText active={minPriceSelected}>{minPriceState}</PlaceholderText>
                    {minPriceOpen ? (
                      <UpArrowIcon src="/price_up_arrow.svg" />
                    ) : (
                      <DownArrowIcon src="/down_arrow.svg" />
                    )}
                  </MinMaxBox>
                  {minPriceOpen ? (
                    <MinMaxPopup>
                      <MinMaxPopupButton
                        onClick={() => {
                          setMinPriceState("$0k");
                          setMinPriceOpen(false);
                          setMinPriceSelected(true);
                        }}
                      >
                        $0
                      </MinMaxPopupButton>
                      <MinMaxPopupButton
                        onClick={() => {
                          setMinPriceState("$50k");
                          setMinPriceOpen(false);
                          setMinPriceSelected(true);
                        }}
                      >
                        $50k
                      </MinMaxPopupButton>
                      <MinMaxPopupButton
                        onClick={() => {
                          setMinPriceState("$100k");
                          setMinPriceOpen(false);
                          setMinPriceSelected(true);
                        }}
                      >
                        $100k
                      </MinMaxPopupButton>
                      <MinMaxPopupButton
                        onClick={() => {
                          setMinPriceState("$150k");
                          setMinPriceOpen(false);
                          setMinPriceSelected(true);
                        }}
                      >
                        $150k
                      </MinMaxPopupButton>
                    </MinMaxPopup>
                  ) : null}
                </PriceSubcontainer>

                <MinMaxDash src="/min_max_dash.svg" />
                <PriceSubcontainer>
                  <MinMaxBox
                    onClick={() => {
                      setMaxPriceOpen(!maxPriceOpen);
                    }}
                  >
                    <PlaceholderText active={maxPriceSelected}>{maxPriceState}</PlaceholderText>
                    {maxPriceOpen ? (
                      <UpArrowIcon src="/price_up_arrow.svg" />
                    ) : (
                      <DownArrowIcon src="/down_arrow.svg" />
                    )}
                  </MinMaxBox>
                  {maxPriceOpen ? (
                    <MinMaxPopup>
                      <MinMaxPopupButton
                        onClick={() => {
                          setMaxPriceState("$50k");
                          setMaxPriceOpen(false);
                          setMaxPriceSelected(true);
                        }}
                      >
                        $50k
                      </MinMaxPopupButton>
                      <MinMaxPopupButton
                        onClick={() => {
                          setMaxPriceState("$100k");
                          setMaxPriceOpen(false);
                          setMaxPriceSelected(true);
                        }}
                      >
                        $100k
                      </MinMaxPopupButton>
                      <MinMaxPopupButton
                        onClick={() => {
                          setMaxPriceState("$150k");
                          setMaxPriceOpen(false);
                          setMaxPriceSelected(true);
                        }}
                      >
                        $150k
                      </MinMaxPopupButton>
                      <MinMaxPopupButton
                        onClick={() => {
                          setMaxPriceState("$200k");
                          setMaxPriceOpen(false);
                          setMaxPriceSelected(true);
                        }}
                      >
                        $200
                      </MinMaxPopupButton>
                    </MinMaxPopup>
                  ) : null}
                </PriceSubcontainer>
              </MinMaxRow>
              {/* <PopupHeaderText>Down Payment</PopupHeaderText>
              <DownPaymentRow>
                <DollarIcon src="/dollar.svg" />
                <DownPaymentInput placeholder="0" />
              </DownPaymentRow> */}
              <ApplyButton
                onClick={() => {
                  setPriceRangeState(minPriceState + " - " + maxPriceState);
                  setPriceOpen(false);
                }}
              >
                Apply
              </ApplyButton>
            </DropDownPopup>
          </FilterSubContainer>
        ) : (
          <Dropdown
            onClick={() => {
              setPriceOpen(true);
            }}
            active={false}
          >
            <DropdownRow>
              <PriceFilterText>{priceRangeState}</PriceFilterText>
              <DropdownIcon src="/dropdown.svg" />
            </DropdownRow>
          </Dropdown>
        )}

        {/* BED AND BATH FILTER */}
        <BedBathDropDown onApply={BedBathChangeHandler}/>

        <ResetFilterButton onClick={resetFilters}>
          <ResetFilterRow>
            <ResetIcon src="/refresh.svg" />
            <ResetFilterText> Reset filters</ResetFilterText>
          </ResetFilterRow>
        </ResetFilterButton>
      </FiltersFirstRow>

      <SortDropDownComp value={sortIndex} onApply={SortChangeHandler}/>
    </AllFiltersContainer>
  );
};

export default FilterDropdown;
