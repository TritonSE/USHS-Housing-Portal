import styled from "styled-components";

const RangeRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const RangeInput = styled.input.attrs({
  type: "text",
  pattern: "[0-9]*",
})`
  width: 98px;
  padding: 5px;
`;

const RangeInputTitle = styled.span`
  color: #b4b4b4;
  font-size: 13px;
  font-family: "Montserrat";
  font-weight: 600;
`;

const RangeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 98px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;
`;

const RangeDivider = styled.span`
  border-bottom: 1px solid #cdcaca;
  width: 14px;
  padding-top: 15px;
`;

export type FilterRangeInputType = "price" | "sqft";

export type FilterRangeInputValue = {
  min: number;
  max: number;
};

export type FilterRangeInputProps = {
  min: number;
  max: number;
  price: FilterRangeInputType;
  value: FilterRangeInputValue;
  setValue(val: FilterRangeInputValue): void;
};

export const FilterRangeInput = () => {
  return (
    <RangeRow>
      <RangeInputContainer>
        <RangeInputTitle>Min</RangeInputTitle>
        <RangeInput />
      </RangeInputContainer>
      <RangeDivider />
      <RangeInputContainer>
        <RangeInputTitle>Max</RangeInputTitle>
        <RangeInput />
      </RangeInputContainer>
    </RangeRow>
  );
};
