import styled from "styled-components";

import { CheckboxRadioText, FilterContainer, FilterRow } from "./FilterCommon";
import { FilterHeader } from "./FilterHeader";
import { CustomCheckboxRadio, OtherText } from "./ListingForm/CommonStyles";

const RadioButtonRow = styled(FilterRow)`
  padding-left: 20px;
`;

export type RadioButtonFilterProps = {
  title: string;
  options: string[];
  value: number;
  setValue(val: number): void;
  otherValue?: string;
  setOtherValue?(val: string | undefined): void;
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
              if (props.setOtherValue) props.setOtherValue(undefined);
            }}
          />
          <CheckboxRadioText htmlFor={`${props.title}_radiobutton_${idx}`}>
            {text}
          </CheckboxRadioText>
        </RadioButtonRow>
      ))}
      {props.setOtherValue && (
        <RadioButtonRow>
          <CustomCheckboxRadio
            id={`${props.title}_radiobutton_other`}
            type="radio"
            checked={props.value === -1}
            onChange={() => {
              props.setValue(-1);
            }}
          />
          <OtherText
            type="text"
            name="Authority_other_text"
            value={props.otherValue ?? ""}
            onChange={(e) => {
              if (props.setOtherValue) {
                props.setValue(-1);
                props.setOtherValue(e.target.value);
              }
            }}
          />
        </RadioButtonRow>
      )}
    </FilterContainer>
  );
};
