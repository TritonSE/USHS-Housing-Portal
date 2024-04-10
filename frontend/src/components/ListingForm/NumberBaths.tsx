import {
  CustomCheckboxRadio,
  FieldHeader,
  OptionLabel,
  OtherText,
  Required,
} from "@/components/ListingForm/CommonStyles";

type NumberBathsProps = {
  numberOfBaths: number | undefined;
  handleNumberOfBaths: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numberOfBathsOther: string | undefined;
  handleNumberOfBathsOther: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const NumberBaths = (props: NumberBathsProps) => {
  return (
    <div>
      <FieldHeader>
        Number of Baths <Required>*</Required>
      </FieldHeader>
      <div>
        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Baths_1"
            value="1"
            checked={props.numberOfBaths === 1 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          1
        </OptionLabel>

        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Baths_1.5"
            value="1.5"
            checked={props.numberOfBaths === 1.5 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          1.5
        </OptionLabel>

        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Baths_2"
            value="2"
            checked={props.numberOfBaths === 2 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          2
        </OptionLabel>

        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Baths_2.5"
            value="2.5"
            checked={props.numberOfBaths === 2.5 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          2.5
        </OptionLabel>

        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Baths_3"
            value="3"
            checked={props.numberOfBaths === 3 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          3
        </OptionLabel>

        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Baths_Other"
            value=""
            checked={props.numberOfBathsOther !== undefined}
            onChange={props.handleNumberOfBathsOther}
          />
          Other:{" "}
          <OtherText
            type="text"
            name="Bath_other_text"
            value={props.numberOfBathsOther ?? ""}
            onChange={props.handleNumberOfBathsOther}
          />
        </OptionLabel>
      </div>
    </div>
  );
};
