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

export type AvailabilityDropDownProps = {
  onApply(selected: number): void;
  registerResetCallback(callback: () => void): void;
};

export const AvailabilityDropDown = (props: AvailabilityDropDownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [dropdownText, setDropdownText] = useState("Availabile");

  const availabilityOptions: string[] = ["Available", "Leased"];

  const resetFilter = () => {
    setSelectedIdx(0);
    setDropdownText("Availablity");
  };

  // useEffect(() => {
  //   props.registerResetCallback(resetFilter);
  // }, []);

  return (
    <FilterSubContainer>
      <Dropdown
        onClick={() => {
          setIsActive(!isActive);
        }}
        active={isActive}
      >
        <DropdownRow>
          <FilterText>{dropdownText}</FilterText>
          <DropdownIcon src={isActive ? "/up_arrow.svg" : "/dropdown.svg"} />
        </DropdownRow>
      </Dropdown>
      {isActive && (
        <DropDownPopup>
          {availabilityOptions.map((text, idx) => (
            <AvailabilityRow
              key={idx}
              onClick={() => {
                setSelectedIdx(idx);
              }}
            >
              <FilterRadioButton
                src={
                  idx === selectedIdx
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
              setDropdownText(availabilityOptions[selectedIdx]);
              props.onApply(selectedIdx);
            }}
          >
            Apply
          </ApplyButton>
        </DropDownPopup>
      )}
    </FilterSubContainer>
  );
};
