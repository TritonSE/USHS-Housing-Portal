import { useContext, useState } from "react";
import styled from "styled-components";

import { BedBathFilter } from "./BedBathFilter";
import { CheckboxFilter } from "./CheckboxFilter";
import { DateFilter } from "./DateFilter";
import { MinMaxFilter } from "./MinMaxFilter";
import { RadioButtonFilter } from "./RadioButtonFilter";

import {
  ACCESSIBILITY_OPTIONS,
  ADDITIONAL_RULES_OPTIONS,
  AVAILABILITY_OPTIONS,
  HOUSING_AUTHORITY_OPTIONS,
  RENTAL_CRITERIA_OPTIONS,
} from "@/api/units";
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

export const FilterPanel = () => {
  const { filters, setFilters } = useContext(FiltersContext);

  const [availabilityState, setAvailabilityState] = useState<number>(
    filters.availability ? AVAILABILITY_OPTIONS.indexOf(filters.availability) : 0,
  );
  const [housingAuthorityState, setHousingAuthorityState] = useState<number>(
    filters.housingAuthority ? HOUSING_AUTHORITY_OPTIONS.indexOf(filters.housingAuthority) : 0,
  );
  const [accessibilityState, setAccessibilityState] = useState<Set<number>>(
    new Set(
      filters.accessibility
        ? filters.accessibility.map((option) => ACCESSIBILITY_OPTIONS.indexOf(option))
        : [],
    ),
  );
  const [rentalCriteriaState, setRentalCriteriaState] = useState<Set<number>>(
    new Set(
      filters.rentalCriteria
        ? filters.rentalCriteria.map((option) => RENTAL_CRITERIA_OPTIONS.indexOf(option))
        : [],
    ),
  );
  const [additionalRulesState, setAdditionalRulesState] = useState<Set<number>>(
    new Set(
      filters.additionalRules
        ? filters.additionalRules.map((option) => ADDITIONAL_RULES_OPTIONS.indexOf(option))
        : [],
    ),
  );
  const [bedBathState, setBedBathState] = useState({
    beds: filters.beds ?? 1,
    baths: filters.baths ?? 0.5,
  });
  const [priceState, setPriceState] = useState({
    min: filters.minPrice ?? 0,
    max: filters.maxPrice ?? 10000,
  });
  const [securityDepositState, setSecurityDepositState] = useState({
    min: filters.minSecurityDeposit ?? 0,
    max: filters.maxSecurityDeposit ?? 10000,
  });
  const [applicationFeeState, setApplicationFeeState] = useState({
    min: filters.minApplicationFee ?? 0,
    max: filters.maxApplicationFee ?? 10000,
  });
  const [sizeState, setSizeState] = useState({
    min: filters.minSize ?? 0,
    max: filters.maxSize ?? 10000,
  });
  const [dateState, setDateState] = useState({
    from: filters.fromDate ?? "",
    to: filters.toDate ?? "",
  });

  const applyFilters = () => {
    const newFilters = {
      availability: AVAILABILITY_OPTIONS[availabilityState],
      housingAuthority: HOUSING_AUTHORITY_OPTIONS[housingAuthorityState],
      accessibility: Array.from(accessibilityState).map((index) => ACCESSIBILITY_OPTIONS[index]),

      rentalCriteria: Array.from(rentalCriteriaState).map(
        (index) => RENTAL_CRITERIA_OPTIONS[index],
      ),

      additionalRules: Array.from(additionalRulesState).map(
        (index) => ADDITIONAL_RULES_OPTIONS[index],
      ),
      beds: bedBathState.beds,
      baths: bedBathState.baths,
      minPrice: priceState.min,
      maxPrice: priceState.max,
      minSecurityDeposit: securityDepositState.min,
      maxSecurityDeposit: securityDepositState.max,
      minApplicationFee: applicationFeeState.min,
      maxApplicationFee: applicationFeeState.max,
      minSize: sizeState.min,
      maxSize: sizeState.max,
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
        options={AVAILABILITY_OPTIONS}
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
        options={HOUSING_AUTHORITY_OPTIONS}
        value={housingAuthorityState}
        setValue={setHousingAuthorityState}
      />
      <CheckboxFilter
        title="Accessibility"
        options={ACCESSIBILITY_OPTIONS}
        value={accessibilityState}
        setValue={setAccessibilityState}
      />
      <CheckboxFilter
        title="Rental Criteria"
        options={RENTAL_CRITERIA_OPTIONS}
        value={rentalCriteriaState}
        setValue={setRentalCriteriaState}
      />
      <CheckboxFilter
        title="Additional Rules"
        options={ADDITIONAL_RULES_OPTIONS}
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
