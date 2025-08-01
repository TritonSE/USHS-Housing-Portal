import { useState } from "react";
import styled from "styled-components";

import { ClickAwayListener } from "./ClickAwayListener";

import { DropDownPopup, DropdownIcon, FilterSubContainer, Sort } from "@/components/FilterCommon";

const SortDropDown = styled(DropDownPopup)`
  margin-top: 30px;
  padding-right: 70px;
  z-index: 1;
`;

const SortRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-center;
  align-items: flex-center;
  gap: 15px;
`;

const PopupSortText = styled(Sort)`
  margin: 0;
  font-weight: 300;
  font-size: 14px;
`;

export type SortDropDownCompProps = {
  value: number;
  setValue(selected: number): void;
};

const sortOptions = [
  "Price (High to Low)",
  "Price (Low to High)",
  "Newest",
  "Bedrooms (High to Low)",
  "Bedrooms (Low to High)",
  "Baths (High to Low)",
  "Baths (Low to High)",
];

export const SortDropDownComp = (props: SortDropDownCompProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsActive(false);
      }}
    >
      <FilterSubContainer>
        <SortRow
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <Sort active={isActive}>Sort: {sortOptions[props.value]}</Sort>
          <DropdownIcon src={isActive ? "/up_arrow.svg" : "/dropdown.svg"} />
        </SortRow>
        {isActive && (
          <SortDropDown>
            {sortOptions.map((text, idx) => (
              <PopupSortText
                key={idx}
                onClick={() => {
                  props.setValue(idx);
                  setIsActive(false);
                }}
              >
                {text}
              </PopupSortText>
            ))}
          </SortDropDown>
        )}
      </FilterSubContainer>
    </ClickAwayListener>
  );
};
