import styled from "styled-components";

import { CheckboxRadioText, FilterContainer, FilterRow } from "./FilterCommon";
import { FilterHeader } from "./FilterHeader";
import { CustomCheckboxRadio } from "./ListingForm/CommonStyles";

const CheckboxFilterRow = styled(FilterRow)`
  padding-left: 20px;
`;

export type CheckboxFilterProps = {
  title: string;
  options: string[];
  value: Set<number>;
  setValue(val: Set<number>): void;
};

export const CheckboxFilter = (props: CheckboxFilterProps) => {
  return (
    <FilterContainer>
      <FilterHeader title={props.title} />
      {props.options.map((text, idx) => (
        <CheckboxFilterRow key={idx}>
          <CustomCheckboxRadio 
            id={`${props.title}_checkbox_${idx}`}
            type="checkbox" 
            checked={props.value.has(idx)}
            onChange={e => {
              if (e.target.checked) {
                props.setValue(new Set(props.value).add(idx));
              } else {
                const newSet = new Set(props.value);
                newSet.delete(idx);
                props.setValue(newSet);
              }
            }}
          />
          <CheckboxRadioText htmlFor={`${props.title}_checkbox_${idx}`}>{text}</CheckboxRadioText>
        </CheckboxFilterRow>
      ))}
    </FilterContainer>
  );
};
