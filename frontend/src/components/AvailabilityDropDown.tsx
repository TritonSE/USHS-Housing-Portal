import { useState } from "react";
import styled from "styled-components";

import { ClickAwayListener } from "./ClickAwayListener";

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

const AvailabilityRow = styled(FilterRow)``;

const FilterRadioButton = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

const PopupBodyText = styled(Sort)`
  font-weight: 400;
  font-size: 12px;
  margin-left: 0;
`;

const AvailabilitySubContainer = styled(FilterSubContainer)`
  min-width: 183px;
`;

export type AvailabilityState = {
  dropdownText: string;
};

export type AvailabilityDisplayState = {
  selectedIdx: number;
};

export type AvailabilityDropDownProps = {
  value: AvailabilityState;
  setValue(val: AvailabilityState): void;
  displayValue: AvailabilityDisplayState;
  setDisplayValue(val: AvailabilityDisplayState): void;
};

export const AvailabilityDropDown = (props: AvailabilityDropDownProps) => {
  const [isActive, setIsActive] = useState(false);

  const availabilityOptions: string[] = ["Available", "Leased"];

  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsActive(false);
      }}
    >
      <AvailabilitySubContainer>
        <Dropdown
          onClick={() => {
            setIsActive(!isActive);
          }}
          active={isActive}
        >
          <DropdownRow>
            <FilterText>{props.value.dropdownText}</FilterText>
            <DropdownIcon src={isActive ? "/up_arrow.svg" : "/dropdown.svg"} />
          </DropdownRow>
        </Dropdown>
        {isActive && (
          <DropDownPopup>
            {availabilityOptions.map((text, idx) => (
              <AvailabilityRow
                key={idx}
                onClick={() => {
                  props.setDisplayValue({ ...props.displayValue, selectedIdx: idx });
                }}
              >
                <FilterRadioButton
                  src={
                    idx === props.displayValue.selectedIdx
                      ? "/filled_filter_radio_button.svg"
                      : "/filter_radio_button.svg"
                  }
                />
                <PopupBodyText>{text}</PopupBodyText>
              </AvailabilityRow>
            ))}
            <ApplyButton
              onClick={() => {
                setIsActive(false);
                props.setValue({
                  ...props.value,
                  dropdownText: availabilityOptions[props.displayValue.selectedIdx],
                });
              }}
            >
              Apply
            </ApplyButton>
          </DropDownPopup>
        )}
      </AvailabilitySubContainer>
    </ClickAwayListener>
  );
};
