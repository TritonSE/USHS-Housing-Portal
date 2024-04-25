import { useState } from "react";
import styled from "styled-components";

import { SearchBarContainer, SearchBarInput, SearchIcon } from "./FilterDropdown";

const FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const FilterRadioButton = styled.img`
  height: 32px;
  width: 32x;
`;

const ButtonAndText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const FilterText = styled.span`
  color: black;
  font-size: 20px;
  font-family: Montserrat;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0.4px;
  word-wrap: break-word;
`;

type ReferralFilterProps = {
  option1: string;
  option2: string;
};

export const ReferralFilter = ({ option1, option2 }: ReferralFilterProps) => {
  const [filter, setFilter] = useState<string>(option1);

  const handleFilterChange = (filterId: string) => {
    setFilter(filterId);
    console.log(filter);
  };

  return (
    <FilterRow>
      <ButtonAndText>
        <FilterRadioButton
          onClick={() => {
            handleFilterChange(option1);
          }}
          src={
            filter === option1
              ? "ic_baseline-radio-button-checked.svg"
              : "ic_baseline-radio-button-unchecked.svg"
          }
        />
        <FilterText>{option1}</FilterText>
      </ButtonAndText>
      <ButtonAndText>
        <FilterRadioButton
          onClick={() => {
            handleFilterChange(option2);
          }}
          src={
            filter === option2
              ? "ic_baseline-radio-button-checked.svg"
              : "ic_baseline-radio-button-unchecked.svg"
          }
        />
        <FilterText>{option2}</FilterText>
      </ButtonAndText>
      <SearchBarContainer>
        <SearchBarInput placeholder="Search Client" />
        <SearchIcon src="/search.svg" />
      </SearchBarContainer>
    </FilterRow>
  );
};

export default ReferralFilter;
