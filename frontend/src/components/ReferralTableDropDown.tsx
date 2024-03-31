import { useState } from "react";
import styled from "styled-components";

import {
  DropDownPopup,
  Dropdown,
  DropdownIcon,
  DropdownRow,
  FilterRow,
  FilterSubContainer,
  Sort,
} from "./FilterCommon";

// ABBREVIATIONS
// RT: Referral Table
// DD: Dropdown

const RT_Row_DD_Container = styled(FilterSubContainer)``;

const RT_Row_DD_Row = styled(FilterRow)`
  min-width: 9.24vw;
  max-width: 9.25vw;
  max-height: 2vh;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

const RT_Row_DD_Display = styled(DropdownRow)`
  min-width: 10.95vw;
  max-width: 11vw;
  max-height: 2vh;

  justify-content: space-between;
`;

const RT_Row_DD_Display_Text = styled.p`
  color: var(--Neutral-Black, #000);
  display: in-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
`;

const PopupBodyText = styled(Sort)`
  font-weight: 400;
  font-size: 12px;
  margin-left: 0;

  display: in-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export type ReferralTableDropDownProps = {
  values: string[];
  defaultValue: string;
};

export const ReferralTableDropDown = (props: ReferralTableDropDownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [displayedValue, setDisplayedValue] = useState(props.defaultValue);

  return (
    <RT_Row_DD_Container>
      <Dropdown
        onClick={() => {
          setIsActive(!isActive);
        }}
        active={isActive}
      >
        <RT_Row_DD_Display>
          <RT_Row_DD_Display_Text title={displayedValue}>{displayedValue}</RT_Row_DD_Display_Text>
          <DropdownIcon src={isActive ? "/up_arrow.svg" : "/dropdown.svg"} />
        </RT_Row_DD_Display>
      </Dropdown>
      {isActive && (
        <DropDownPopup>
          {props.values.map((value, idx) => (
            <RT_Row_DD_Row
              key={idx}
              onClick={() => {
                setDisplayedValue(value);
                setIsActive(false);
              }}
            >
              <PopupBodyText>{value}</PopupBodyText>
            </RT_Row_DD_Row>
          ))}
        </DropDownPopup>
      )}
    </RT_Row_DD_Container>
  );
};
