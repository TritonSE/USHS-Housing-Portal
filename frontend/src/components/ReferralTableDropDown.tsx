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

import { User } from "@/api/users";

// ABBREVIATIONS
// RT: Referral Table
// DD: Dropdown

const RT_Row_DD_Container = styled(FilterSubContainer)`
  position: relative;
`;

const RT_DD_Popup = styled(DropDownPopup)`
  max-height: 150px;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100%;
  z-index: 1;
`;

const RT_Row_DD_Row = styled(FilterRow)`
  max-height: 2vh;
  height: 100%;
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
  font-size: 14px;
  margin-left: 0;

  display: in-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export type ReferralTableDropDownProps = {
  values: User[] | string[];
  defaultValue: string;
  onSelect: (value: string) => void;
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
        <RT_DD_Popup>
          {props.values.map((value, idx) => (
            <RT_Row_DD_Row
              key={idx}
              onClick={() => {
                if (typeof value === "object") {
                  setDisplayedValue(value.firstName + " " + value.lastName);
                  props.onSelect(value._id);
                } else {
                  setDisplayedValue(value);
                  props.onSelect(value);
                }
                setIsActive(false);
              }}
            >
              <PopupBodyText>
                {typeof value === "object" ? value.firstName + " " + value.lastName : value}
              </PopupBodyText>
            </RT_Row_DD_Row>
          ))}
        </RT_DD_Popup>
      )}
    </RT_Row_DD_Container>
  );
};
