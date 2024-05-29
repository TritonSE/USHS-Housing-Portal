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
  width: 100%;
  padding: 5px;
  border: none;

  &:focus {
    outline: none;
  }
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

const TextBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;

  border-radius: 1.861px;
  border: 0.465px solid #B4B4B4;
`;

const TextboxPrefix = styled.span`
  color: #000;
  font-family: Montserrat;
  font-size: 13.596px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 20.394px */
  letter-spacing: 0.272px;
`;

const TextboxSuffix = styled.span`
  color: #000;
  font-family: Montserrat;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 16.5px */
  letter-spacing: 0.22px;
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
        <TextBoxContainer>
          {props.price === "price" && <TextboxPrefix>$</TextboxPrefix>}  
          <RangeInput name="min" value={props.value.min} onChange={changeHandler} />
          {props.price === "sqft" && <TextboxSuffix>sqft</TextboxSuffix>}
        </TextBoxContainer>
      </RangeInputContainer>
      <RangeDivider />
      <RangeInputContainer>
        <RangeInputTitle>Max</RangeInputTitle>
        <TextBoxContainer>
          {props.price === "price" && <TextboxPrefix>$</TextboxPrefix>}  
          <RangeInput name="max" value={props.value.max} onChange={changeHandler} />
          {props.price === "sqft" && <TextboxSuffix>sqft</TextboxSuffix>}
        </TextBoxContainer>
      </RangeInputContainer>
    </RangeRow>
  );
};
