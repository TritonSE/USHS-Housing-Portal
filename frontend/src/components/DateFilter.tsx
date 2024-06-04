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

export type DateFilterValueType = {
  from: string;
  to: string;
};

export type DateFilterProps = {
  title: string;
  value: DateFilterValueType;
  setValue(value: DateFilterValueType): void;
};

export const DateFilter = (props: DateFilterProps) => {
  return (
    <FilterContainer>
      <FilterHeader title={props.title} />
      <DateFilterContainer>
        <FilterHeaderSpan>From</FilterHeaderSpan>
        <CustomInputDate
          value={props.value.from}
          onChange={(e) => {
            props.setValue({
              from: e.target.value,
              to: props.value.to,
            });
          }}
        />
        <FilterHeaderSpan>To</FilterHeaderSpan>
        <CustomInputDate
          value={props.value.to}
          onChange={(e) => {
            props.setValue({
              from: props.value.from,
              to: e.target.value,
            });
          }}
        />
      </DateFilterContainer>
    </FilterContainer>
  );
};
