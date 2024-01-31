import styled, { css } from "styled-components";
import { useState } from "react";
import { DropDownPopup, DropdownIcon, FilterSubContainer, Sort } from "@/components/FilterCommon";

const SortDropDown = styled(DropDownPopup)`
  margin-top: 30px;
  padding-right: 70px;
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

export const SortDropDownComp = () => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState("Price (High to Low)");

  const sortOptions = ["Price (High to Low)", "Price (Low to High)",
            "Newest", "Bedrooms", "Baths"];

  return (    
    <FilterSubContainer>
      <SortRow onClick={() => {setIsActive(!isActive)}}>
        <Sort active={isActive}>Sort: {selected}</Sort>
        <DropdownIcon src={isActive ? "/up_arrow.svg" : "/dropdown.svg"} />
      </SortRow>
      {isActive && (
        <SortDropDown>
          {sortOptions.map((text, idx) => (
            <PopupSortText key={idx} onClick={() => {
              setSelected(text);
              setIsActive(false);}}>
               {text}
              </PopupSortText>
          ))}
        </SortDropDown>
      )}
    </FilterSubContainer>
  );
}
