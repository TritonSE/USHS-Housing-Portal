import styled from "styled-components";

import { FilterContainer, FilterRow, Sort } from "./FilterCommon";
import { FilterHeader } from "./FilterHeader";

const CheckboxFilterRow = styled(FilterRow)`
  padding-left: 20px;
`;

const FilterRadioButton = styled.img`
  height: 20px;
  width: 20px;
`;

const PopupBodyText = styled(Sort)`
  font-weight: 400;
  font-size: 12px;
  margin-left: 0;
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
          <FilterRadioButton
            src={
              props.value.has(idx) ? "/filled_filter_radio_button.svg" : "/filter_radio_button.svg"
            }
            onClick={() => {
              if (!props.value.has(idx)) {
                props.setValue(new Set(props.value).add(idx));
              } else {
                const newSet = new Set(props.value);
                newSet.delete(idx);
                props.setValue(newSet);
              }
            }}
          />
          <PopupBodyText>{text}</PopupBodyText>
        </CheckboxFilterRow>
      ))}
    </FilterContainer>
  );
};
