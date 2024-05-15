import styled from "styled-components";

import { FilterContainer } from "./FilterCommon";
import { FilterHeader } from "./FilterHeader";

const DateFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CustomInputDate = styled.input.attrs({
  type: "date",
})`
  background-color: #fbf7f3;
  color: black;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 230px;
  font-size: 16px;
`;

const FilterHeaderSpan = styled.span`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
`;

export const DateFilter = () => {
  return (
    <FilterContainer>
      <FilterHeader title="Date Available" />
      <DateFilterContainer>
        <FilterHeaderSpan>From</FilterHeaderSpan>
        <CustomInputDate />
        <FilterHeaderSpan>To</FilterHeaderSpan>
        <CustomInputDate />
      </DateFilterContainer>
    </FilterContainer>
  );
};
