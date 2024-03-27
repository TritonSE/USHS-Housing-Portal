/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  CustomCheckboxRadio,
  FieldHeader,
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
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="Baths_1"
            value="1"
            checked={props.numberOfBaths === 1 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          1
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="Baths_1.5"
            value="1.5"
            checked={props.numberOfBaths === 1.5 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          1.5
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="Baths_2"
            value="2"
            checked={props.numberOfBaths === 2 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          2
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="Baths_2.5"
            value="2.5"
            checked={props.numberOfBaths === 2.5 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          2.5
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="Baths_3"
            value="3"
            checked={props.numberOfBaths === 3 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          3
        </label>
        <br />
        <label>
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
        </label>
      </div>
    </div>
  );
};
