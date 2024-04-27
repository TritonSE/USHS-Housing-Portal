import styled from "styled-components";

import { CheckboxRadioText, FilterContainer, FilterRow } from "./FilterCommon";
import { FilterHeader } from "./FilterHeader";
import { CustomCheckboxRadio } from "./ListingForm/CommonStyles";

const RadioButtonRow = styled(FilterRow)`
  padding-left: 20px;
`;

export type RadioButtonFilterProps = {
  title: string;
  options: string[];
  value: number;
  setValue(val: number): void;
};

export const RadioButtonFilter = (props: RadioButtonFilterProps) => {
  return (
    <FilterContainer>
      <FilterHeader title={props.title} />
      {props.options.map((text, idx) => (
        <RadioButtonRow key={idx}>
          <CustomCheckboxRadio
            id={`${props.title}_radiobutton_${idx}`}
            type="radio"
            checked={props.value === idx}
            onChange={() => {
              props.setValue(idx);
            }}
          />
          <CheckboxRadioText htmlFor={`${props.title}_radiobutton_${idx}`}>
            {text}
          </CheckboxRadioText>
        </RadioButtonRow>
      ))}
    </FilterContainer>
  );
};
