import { useState } from "react";
import styled from "styled-components";

import { BedBathFilter } from "./BedBathFilter";
import { CheckboxFilter } from "./CheckboxFilter";
import { DateFilter } from "./DateFilter";
import { MinMaxFitler } from "./MinMaxFilter";
import { RadioButtonFilter } from "./RadioButtonFilter";

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

const FiltersText = styled.span`
  font-weight: 700;
  font-size: 28px;
  padding-top: 68px;
  width: 248px;
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

export const FitlerPanel = () => {
  const [availabilityState, setAvailabilityState] = useState<number>(0);
  const [housingAuthorityState, setHousingAuthorityState] = useState<number>(0);
  const [accessibilityState, setAccessibilityState] = useState<Set<number>>(new Set());
  const [rentalCriteriaState, setRentalCriteriaState] = useState<Set<number>>(new Set());
  const [additionalRulesState, setAdditionalRulesState] = useState<Set<number>>(new Set());
  const [bedBathState, setBedBathState] = useState({
    beds: 1,
    baths: 0.5,
  });

  return (
    <PanelBackground>
      <FiltersText>Filters</FiltersText>
      <RadioButtonFilter
        title="Availability"
        options={AvailabilityOptions}
        value={availabilityState}
        setValue={setAvailabilityState}
      />
      <MinMaxFitler title="Price" />
      <MinMaxFitler title="Security Deposit" />
      <MinMaxFitler title="Application Fee" />
      <MinMaxFitler title="Size" />
      <BedBathFilter value={bedBathState} setValue={setBedBathState} />
      <DateFilter />
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
      <ApplyButton>Apply</ApplyButton>
    </PanelBackground>
  );
};
