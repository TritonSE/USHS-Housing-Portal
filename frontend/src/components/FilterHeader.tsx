import styled from "styled-components";

const FilterHeaderContainer = styled.div`
  width: 228px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cdcacacc;
  display: flex;
`;

const FilterHeaderText = styled.span`
  font-weight: 700;
  font-size: 16px;
  font-family: "Montserrat";
`;

export type FilterHeaderProps = {
  title: string;
};

export const FilterHeader = (props: FilterHeaderProps) => {
  return (
    <FilterHeaderContainer>
      <FilterHeaderText>{props.title}</FilterHeaderText>
    </FilterHeaderContainer>
  );
};
