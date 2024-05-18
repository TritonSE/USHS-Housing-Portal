import styled from "styled-components";

import { FilterContainer } from "./FilterCommon";
import { FilterHeader } from "./FilterHeader";

const BedBathContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const BedBathHeader = styled.span`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
`;

const BnbRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 13px;
`;

const Box = styled.div`
  border-radius: 3px;
  border: 0.5px solid #cdcaca;
  background-color: #f5f5f5;
  box-shadow: 1px 1px 2px 0px rgba(228, 227, 226, 0.4);
  width: 70px;
  height: 33px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AdjustButton = styled.button`
  color: #fff;
  border: 0;
  border-radius: 5px;
  background: var(--Primary, #b64201);
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 7px;
  padding-right: 7px;

  cursor: pointer;
  transition-duration: 150ms;
  &:hover {
    background: #ec8537;
  }
`;

export type BedBathState = {
  beds: number;
  baths: number;
};

export type BedBathFilterProps = {
  value: BedBathState;
  setValue(val: BedBathState): void;
};

export const BedBathFilter = (props: BedBathFilterProps) => {
  return (
    <FilterContainer>
      <FilterHeader title="Beds & Baths" />
      <BedBathContainer>
        <BedBathHeader>Bedrooms</BedBathHeader>
        <BnbRow>
          <Box>
            <BedBathHeader>{props.value.beds}+</BedBathHeader>
          </Box>
          <AdjustButton
            onClick={() => {
              if (props.value.beds > 1)
                props.setValue({
                  ...props.value,
                  beds: props.value.beds - 1,
                });
            }}
          >
            -
          </AdjustButton>
          <AdjustButton
            onClick={() => {
              if (props.value.beds < 4)
                props.setValue({
                  ...props.value,
                  beds: props.value.beds + 1,
                });
            }}
          >
            +
          </AdjustButton>
        </BnbRow>
        <BedBathHeader>Bathrooms</BedBathHeader>
        <BnbRow>
          <Box>
            <BedBathHeader>{props.value.baths}+</BedBathHeader>
          </Box>
          <AdjustButton
            onClick={() => {
              if (props.value.baths > 0.5)
                props.setValue({
                  ...props.value,
                  baths: props.value.baths - 0.5,
                });
            }}
          >
            -
          </AdjustButton>
          <AdjustButton
            onClick={() => {
              if (props.value.baths < 2)
                props.setValue({
                  ...props.value,
                  baths: props.value.baths + 0.5,
                });
            }}
          >
            +
          </AdjustButton>
        </BnbRow>
      </BedBathContainer>
    </FilterContainer>
  );
};
