import { FilterContainer } from "./FilterCommon";
import { FilterHeader } from "./FilterHeader";
import { FilterRangeInput } from "./FilterRangeInput";

export type MinMaxFilterProps = {
  title: string;
};

export const MinMaxFitler = (props: MinMaxFilterProps) => {
  return (
    <FilterContainer>
      <FilterHeader title={props.title} />
      <FilterRangeInput />
    </FilterContainer>
  );
};
