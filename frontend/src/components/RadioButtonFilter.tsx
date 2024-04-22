import styled from "styled-components";

import { FilterContainer, FilterRow, Sort } from "./FilterCommon";
import { FilterHeader } from "./FilterHeader";

const RadioButtonRow = styled(FilterRow)`
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
          <FilterRadioButton
            src={
              props.value === idx ? "/filled_filter_radio_button.svg" : "/filter_radio_button.svg"
            }
            onClick={() => {
              props.setValue(idx);
            }}
          />
          <PopupBodyText>{text}</PopupBodyText>
        </RadioButtonRow>
      ))}
    </FilterContainer>
  );
};
