import { useState } from "react";
import styled from "styled-components";

import {
  DropDownPopup,
  Dropdown,
  DropdownIcon,
  DropdownRow,
  FilterRow,
  FilterSubContainer,
  FilterText,
  Sort,
} from "./FilterCommon";

const ReferralTableRow = styled(FilterRow)`
  min-width: 10vw;
  max-width: 11vw;
  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

const ReferralTableRowDropdownRow = styled(DropdownRow)`
  min-width: 10vw;
  max-width: 11vw;
  max-height: 2vh;
  overflow: hidden;
  justify-content: space-between;
`;

const PopupBodyText = styled(Sort)`
  font-weight: 400;
  font-size: 12px;
  margin-left: 0;
`;

export type ReferralTableDropDownProps = {
  values: string[];
  defaultValue: string;
};

export const ReferralTableDropDown = (props: ReferralTableDropDownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [displayedValue, setDisplayedValue] = useState(props.defaultValue);

  return (
    <FilterSubContainer>
      <Dropdown
        onClick={() => {
          setIsActive(!isActive);
        }}
        active={isActive}
      >
        <ReferralTableRowDropdownRow>
          <FilterText>{displayedValue}</FilterText>
          <DropdownIcon src={isActive ? "/up_arrow.svg" : "/dropdown.svg"} />
        </ReferralTableRowDropdownRow>
      </Dropdown>
      {isActive && (
        <DropDownPopup>
          {props.values.map((value, idx) => (
            <ReferralTableRow
              key={idx}
              onClick={() => {
                setDisplayedValue(value);
              }}
            >
              <PopupBodyText>{value}</PopupBodyText>
            </ReferralTableRow>
          ))}
        </DropDownPopup>
      )}
    </FilterSubContainer>
  );
};
