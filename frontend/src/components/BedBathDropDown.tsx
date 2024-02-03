import { useEffect, useState } from "react";
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

export type BedBathDropDownProps = {
  onApply(beds: number, baths: number): void;
  registerResetCallback(callback: () => void): void;
};

export const BedBathDropDown = (props: BedBathDropDownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [numBed, setNumBed] = useState(1);
  const [numBath, setNumBath] = useState(0.5);
  const [dropdownText, setDropdownText] = useState("Beds & Bath");

  const resetFitler = () => {
    setNumBath(0.5);
    setNumBed(1);
    setDropdownText("Beds & Bath");
  };

  useEffect(() => {
    props.registerResetCallback(resetFitler);
  }, []);

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
              <PopupHeaderText>{numBed}+</PopupHeaderText>
            </BedBox>
            <AdjustButton
              onClick={() => {
                if (numBed > 1) setNumBed(numBed - 1);
              }}
            >
              -
            </AdjustButton>
            <AdjustButton
              onClick={() => {
                if (numBed < 4) setNumBed(numBed + 1);
              }}
            >
              +
            </AdjustButton>
          </BnbRow>
          <PopupHeaderText>Bathrooms</PopupHeaderText>
          <BnbRow>
            <BathBox>
              <PopupHeaderText>{numBath}+</PopupHeaderText>
            </BathBox>
            <AdjustButton
              onClick={() => {
                if (numBath > 0.5) setNumBath(numBath - 0.5);
              }}
            >
              -
            </AdjustButton>
            <AdjustButton
              onClick={() => {
                if (numBath < 2) setNumBath(numBath + 0.5);
              }}
            >
              +
            </AdjustButton>
          </BnbRow>
          <ApplyButton
            onClick={() => {
              setDropdownText(`${numBed}+ bds, ${numBath}+ ba`);
              setIsActive(false);
              props.onApply(numBed, numBath);
            }}
          >
            Apply
          </ApplyButton>
        </DropDownPopup>
      )}
    </FilterSubContainer>
  );
};
