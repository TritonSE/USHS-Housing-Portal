import { useState } from "react";
import styled from "styled-components";

import { ClickAwayListener } from "./ClickAwayListener";

import { REFERRAL_STATUSES, ReferralStatus } from "@/api/units";
import { DropDownPopup, DropdownIcon, FilterSubContainer, Sort } from "@/components/FilterCommon";

const SortDropDown = styled(DropDownPopup)`
  width: 180px;
  z-index: 1;
`;

const SortRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  border: 0.5px solid #cdcaca;
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
  min-width: 180px;
`;

const PopupSortText = styled(Sort)`
  margin: 0;
  font-weight: 300;
  font-size: 14px;
`;

export type StatusDropdownProps = {
  value: ReferralStatus;
  setValue(status: ReferralStatus): void;
};

const SORT_OPTIONS = ["Any", ...REFERRAL_STATUSES];

export const StatusDropdown = ({ value, setValue }: StatusDropdownProps) => {
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
          <Sort active={isActive}>Status: {value || "Any"}</Sort>
          <DropdownIcon src={isActive ? "/up_arrow.svg" : "/dropdown.svg"} />
        </SortRow>
        {isActive && (
          <SortDropDown>
            {SORT_OPTIONS.map((status, idx) => (
              <PopupSortText
                key={idx}
                onClick={() => {
                  if (status === "Any") {
                    setValue("");
                  } else {
                    setValue(status);
                  }
                  setIsActive(false);
                }}
              >
                {status}
              </PopupSortText>
            ))}
          </SortDropDown>
        )}
      </FilterSubContainer>
    </ClickAwayListener>
  );
};
