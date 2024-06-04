import { FilterContainer } from "./FilterCommon";
import { FilterHeader } from "./FilterHeader";
import { FilterRangeInput, FilterRangeInputProps } from "./FilterRangeInput";

export type MinMaxFilterProps = FilterRangeInputProps & {
  title: string;
};

export const MinMaxFilter = (props: MinMaxFilterProps) => {
  return (
    <FilterContainer>
      <FilterHeader title={props.title} />
      <FilterRangeInput {...props} />
    </FilterContainer>
  );
};
