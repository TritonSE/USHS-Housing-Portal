import { useState } from "react";
import styled from "styled-components";

import {
  ApplyButton,
  DropDownPopup,
  Dropdown,
  DropdownIcon,
  DropdownRow,
  FilterRow,
  FilterSubContainer,
  FilterText,
  Sort,
} from "@/components/FilterCommon";

const BnbDropdownRow = styled(DropdownRow)`
  gap: 40px;
`;

const PopupHeaderText = styled(Sort)`
  margin: 0;
  font-weight: 700;
  font-size: 14px;
`;

const BnbRow = styled(FilterRow)`
  gap: 13px;
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

export type BedBathState = {
  beds: number,
  baths: number,
  bedsDisplay: number,
  bathsDisplay: number,
  notApplied: boolean,
}

export type BedBathDropDownProps = {
  value: BedBathState,
  setValue(val: BedBathState): void,
  onApply(): void,
};

export const BedBathDropDown = (props: BedBathDropDownProps) => {
  const [isActive, setIsActive] = useState(false);

  const dropdownText = props.value.notApplied ?
    "Beds & Bath" :
    `${props.value.beds}+ bds, ${props.value.baths}+ ba`;


  return (
    <FilterSubContainer>
      <Dropdown
        onClick={() => {
          setIsActive(!isActive);
        }}
        active={isActive}
      >
        <BnbDropdownRow>
          <FilterText>{dropdownText}</FilterText>
          <DropdownIcon src={isActive ? "/up_arrow.svg" : "/dropdown.svg"} />
        </BnbDropdownRow>
      </Dropdown>
      {isActive && (
        <DropDownPopup>
          <PopupHeaderText>Bedrooms</PopupHeaderText>
          <BnbRow>
            <BedBox>
              <PopupHeaderText>{props.value.bedsDisplay}+</PopupHeaderText>
            </BedBox>
            <AdjustButton
              onClick={() => {
                if (props.value.bedsDisplay > 1) 
                  props.setValue({ ...props.value, bedsDisplay: props.value.bedsDisplay - 1 });
              }}
            >
              -
            </AdjustButton>
            <AdjustButton
              onClick={() => {
                if (props.value.bedsDisplay < 4) 
                  props.setValue({ ...props.value, bedsDisplay: props.value.bedsDisplay + 1 });
              }}
            >
              +
            </AdjustButton>
          </BnbRow>
          <PopupHeaderText>Bathrooms</PopupHeaderText>
          <BnbRow>
            <BathBox>
              <PopupHeaderText>{props.value.bathsDisplay}+</PopupHeaderText>
            </BathBox>
            <AdjustButton
              onClick={() => {
                if (props.value.bathsDisplay > 0.5) 
                  props.setValue({ ...props.value, bathsDisplay: props.value.bathsDisplay - 0.5 });
              }}
            >
              -
            </AdjustButton>
            <AdjustButton
              onClick={() => {
                if (props.value.bathsDisplay < 2) 
                  props.setValue({ ...props.value, bathsDisplay: props.value.bathsDisplay + 0.5 });
              }}
            >
              +
            </AdjustButton>
          </BnbRow>
          <ApplyButton
            onClick={() => {
              setIsActive(false);
              props.setValue({ ...props.value, beds: props.value.bedsDisplay, baths: props.value.bathsDisplay, notApplied: false });
              props.onApply();
            }}
          >
            Apply
          </ApplyButton>
        </DropDownPopup>
      )}
    </FilterSubContainer>
  );
};
