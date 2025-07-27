import styled from "styled-components";

import { FilterContainer } from "./FilterCommon";
import { FilterHeader } from "./FilterHeader";
import { FilterRangeInput } from "./FilterRangeInput";

const BedBathContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
`;

const BedBathHeader = styled.span`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
`;

export type BedBathState = {
  beds: {
    min: number;
    max: number;
  };
  baths: {
    min: number;
    max: number;
  };
};

export type BedBathFilterProps = {
  value: BedBathState;
  setValue(val: BedBathState): void;
};

export const BedBathFilter = (props: BedBathFilterProps) => {
  const handleBedsChange = (newBedsRange: { min: number; max: number }) => {
    props.setValue({
      ...props.value,
      beds: newBedsRange,
    });
  };

  const handleBathsChange = (newBathsRange: { min: number; max: number }) => {
    props.setValue({
      ...props.value,
      baths: newBathsRange,
    });
  };

  return (
    <FilterContainer>
      <FilterHeader title="Beds & Baths" />
      <BedBathContainer>
        <BedBathHeader>Bedrooms</BedBathHeader>
        <FilterRangeInput
          min={0}
          max={5}
          type="number"
          value={props.value.beds}
          setValue={handleBedsChange}
        />
        <BedBathHeader>Bathrooms</BedBathHeader>
        <FilterRangeInput
          min={0}
          max={5}
          type="number"
          value={props.value.baths}
          setValue={handleBathsChange}
        />
      </BedBathContainer>
    </FilterContainer>
  );
};
