import { useContext, useState } from "react";
import styled from "styled-components";

import { BedBathFilter } from "./BedBathFilter";
import { CheckboxFilter } from "./CheckboxFilter";
import { DateFilter } from "./DateFilter";
import { MinMaxFilter } from "./MinMaxFilter";
import { RadioButtonFilter } from "./RadioButtonFilter";

import { FiltersContext } from "@/pages/Home";

const PanelBackground = styled.div`
  min-width: 284px;
  background-color: #fff;

  position: fixed;
  top: 70px;
  bottom: 0;

  overflow-y: scroll;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 50px;

  padding-left: 23px;
`;

const FilterHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 7px;
`;

const FiltersText = styled.span`
  font-weight: 700;
  font-size: 28px;
  padding-top: 68px;
  width: 248px;
`;

const ClearFilterText = styled.button`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  color: #b64201;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid #b64201;
  background-color: #fff;
  width: 91px;
  height: 25px;
`;

const ApplyButton = styled.button`
  color: #b64201;
  background-color: #fff;
  position: fixed;
  bottom: 40px;
  left: 25px;
  border: 1px solid #b64201;
  border-radius: 5px;

  width: 137px;
  height: 44px;

  font-family: Montserrat;
  font-weight: 700;
  font-size: 16px;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  gap: 7px;
  align-items: center;
  justify-content: flex-start;
  padding-left: 12px;
`;

const EndFilterGap = styled.div`
  display: flex;
  min-height: 50px;
`;

const AvailabilityOptions = ["Available", "Leased"];

const HousingAuthorityOptions = ["LACDA", "HACLA"];

const AccessibilityOptions = ["First Floor", "> Second Floor", "Stairs Only", "Ramps", "Elevators"];

const RentalCriteriaOptions = [
  "3rd Party Payment",
  "Credit Check Required",
  "Background Check Required",
  "Program Letter Required",
];

const AdditionalRulesOptions = [
  "Pets Allowed",
  "Manager On Site",
  "Quiet Building",
  "Visitor Policies",
  "Kid Friendly",
  "Min-management Interaction",
  "High-management Interaction",
];

export const FilterPanel = () => {
  const { filters, setFilters } = useContext(FiltersContext);

  const [availabilityState, setAvailabilityState] = useState<number>(0);
  const [housingAuthorityState, setHousingAuthorityState] = useState<number>(0);
  const [accessibilityState, setAccessibilityState] = useState<Set<number>>(new Set());
  const [rentalCriteriaState, setRentalCriteriaState] = useState<Set<number>>(new Set());
  const [additionalRulesState, setAdditionalRulesState] = useState<Set<number>>(new Set());
  const [bedBathState, setBedBathState] = useState({
    beds: 1,
    baths: 0.5,
  });
  const [priceState, setPriceState] = useState({
    min: 0,
    max: 10000,
  });
  const [securityDepositState, setSecurityDepositState] = useState({
    min: 0,
    max: 10000,
  });
  const [applicationFeeState, setApplicationFeeState] = useState({
    min: 0,
    max: 10000,
  });
  const [sizeState, setSizeState] = useState({
    min: 0,
    max: 10000,
  });
  const [dateState, setDateState] = useState({
    from: "",
    to: "",
  });

  const applyFilters = () => {
    const newFilters = {
      availability: AvailabilityOptions[availabilityState],
      housingAuthority: HousingAuthorityOptions[housingAuthorityState],
      accessibility: JSON.stringify(
        Array.from(accessibilityState).map((index) => AccessibilityOptions[index]),
      ),
      rentalCriteria: JSON.stringify(
        Array.from(rentalCriteriaState).map((index) => RentalCriteriaOptions[index]),
      ),
      additionalRules: JSON.stringify(
        Array.from(additionalRulesState).map((index) => AdditionalRulesOptions[index]),
      ),
      beds: bedBathState.beds.toString(),
      baths: bedBathState.baths.toString(),
      minPrice: priceState.min.toString(),
      maxPrice: priceState.max.toString(),
      minSecurityDeposit: securityDepositState.min.toString(),
      maxSecurityDeposit: securityDepositState.max.toString(),
      minApplicationFee: applicationFeeState.min.toString(),
      maxApplicationFee: applicationFeeState.max.toString(),
      minSize: sizeState.min.toString(),
      maxSize: sizeState.max.toString(),
      fromDate: dateState.from,
      toDate: dateState.to,
    };

    setFilters({
      ...newFilters,
      approved: filters.approved,
      sort: filters.sort ?? "",
      search: filters.search ?? "",
    });
  };

  const resetFilters = () => {
    setAvailabilityState(0);
    setHousingAuthorityState(0);
    setAccessibilityState(new Set());
    setRentalCriteriaState(new Set());
    setAdditionalRulesState(new Set());
    setBedBathState({ beds: 1, baths: 0.5 });
    setPriceState({ min: 0, max: 10000 });
    setSecurityDepositState({ min: 0, max: 10000 });
    setApplicationFeeState({ min: 0, max: 10000 });
    setSizeState({ min: 0, max: 10000 });
    setDateState({ from: "", to: "" });

    setFilters({
      availability: "Available",
      approved: "approved",
    });
  };

  return (
    <PanelBackground>
      <FilterHeaderContainer>
        <FiltersText>Filters</FiltersText>
        <ClearFilterText onClick={resetFilters}>Clear All</ClearFilterText>
      </FilterHeaderContainer>
      <RadioButtonFilter
        title="Availability"
        options={AvailabilityOptions}
        value={availabilityState}
        setValue={setAvailabilityState}
      />
      <MinMaxFilter
        title="Price"
        min={0}
        max={10000}
        price="price"
        value={priceState}
        setValue={setPriceState}
      />
      <MinMaxFilter
        title="Security Deposit"
        min={0}
        max={10000}
        price="price"
        value={securityDepositState}
        setValue={setSecurityDepositState}
      />
      <MinMaxFilter
        title="Application Fee"
        min={0}
        max={10000}
        price="price"
        value={applicationFeeState}
        setValue={setApplicationFeeState}
      />
      <MinMaxFilter
        title="Size"
        min={0}
        max={10000}
        price="sqft"
        value={sizeState}
        setValue={setSizeState}
      />
      <BedBathFilter value={bedBathState} setValue={setBedBathState} />
      <DateFilter title="Date Available" value={dateState} setValue={setDateState} />
      <RadioButtonFilter
        title="Housing Authority"
        options={HousingAuthorityOptions}
        value={housingAuthorityState}
        setValue={setHousingAuthorityState}
      />
      <CheckboxFilter
        title="Accessibility"
        options={AccessibilityOptions}
        value={accessibilityState}
        setValue={setAccessibilityState}
      />
      <CheckboxFilter
        title="Rental Criteria"
        options={RentalCriteriaOptions}
        value={rentalCriteriaState}
        setValue={setRentalCriteriaState}
      />
      <CheckboxFilter
        title="Additional Rules"
        options={AdditionalRulesOptions}
        value={additionalRulesState}
        setValue={setAdditionalRulesState}
      />
      <EndFilterGap />
      <ApplyButton onClick={applyFilters}>
        <img src="mdi_filter.svg" alt="Filter Icon" />
        Apply
      </ApplyButton>
    </PanelBackground>
  );
};
