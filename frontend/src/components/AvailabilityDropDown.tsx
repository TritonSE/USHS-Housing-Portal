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

const AvailabilityRow = styled(FilterRow)``;

const FilterRadioButton = styled.img`
  height: 20px;
  width: 20px;
`;

const PopupBodyText = styled(Sort)`
  font-weight: 400;
  font-size: 12px;
  margin-left: 0;
`;

export type AvailabilityState = {
  selectedIdx: number;
  dropdownText: string;
};

export type AvailabilityDropDownProps = {
  value: AvailabilityState;
  setValue(val: AvailabilityState): void;
  onApply(): void;
};

export const AvailabilityDropDown = (props: AvailabilityDropDownProps) => {
  const [isActive, setIsActive] = useState(false);

  const availabilityOptions: string[] = ["Available", "Leased"];

  return (
    <FilterSubContainer>
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
                props.setValue({ ...props.value, selectedIdx: idx });
              }}
            >
              <FilterRadioButton
                src={
                  idx === props.value.selectedIdx
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
                dropdownText: availabilityOptions[props.value.selectedIdx],
              });
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
