import styled from "styled-components";

const RangeRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const RangeInput = styled.input.attrs({
  type: "text",
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

export const FilterRangeInput = (props: FilterRangeInputProps) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      props.setValue({
        ...props.value,
        [e.target.name]: newValue === "" ? 0 : parseInt(newValue),
      });
    }
  };

  return (
    <RangeRow>
      <RangeInputContainer>
        <RangeInputTitle>Min</RangeInputTitle>
        <RangeInput name="min" value={props.value.min} onChange={changeHandler} />
      </RangeInputContainer>
      <RangeDivider />
      <RangeInputContainer>
        <RangeInputTitle>Max</RangeInputTitle>
        <RangeInput name="max" value={props.value.max} onChange={changeHandler} />
      </RangeInputContainer>
    </RangeRow>
  );
};
