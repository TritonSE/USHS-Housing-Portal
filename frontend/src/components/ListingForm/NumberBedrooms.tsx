/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  CustomCheckboxRadio,
  FieldHeader,
  OtherText,
  Required,
} from "@/components/ListingForm/CommonStyles";
import styled from "styled-components";

export const WidthOffset = styled.label`
  width: 433px;
`;

type NumberBedroomsProps = {
  numberOfBedrooms: number | undefined;
  handleNumberOfBedrooms: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numberOfBedroomsOther: number | undefined;
  handleNumberOfBedroomsOther: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function NumberBedrooms(props: NumberBedroomsProps) {
  return (
    <WidthOffset>
      <FieldHeader>
        Number of Bedrooms <Required>*</Required>
      </FieldHeader>
      <div>
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="Bedroom_1"
            value="1"
            checked={props.numberOfBedrooms === 1 && props.numberOfBedroomsOther === undefined}
            onChange={props.handleNumberOfBedrooms}
          />
          1
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="Bedroom_2"
            value="2"
            checked={props.numberOfBedrooms === 2 && props.numberOfBedroomsOther === undefined}
            onChange={props.handleNumberOfBedrooms}
          />
          2
        </label>{" "}
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="Bedroom_3"
            value="3"
            checked={props.numberOfBedrooms === 3 && props.numberOfBedroomsOther === undefined}
            onChange={props.handleNumberOfBedrooms}
          />
          3
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="Bedroom_4"
            value="4"
            checked={props.numberOfBedrooms === 4 && props.numberOfBedroomsOther === undefined}
            onChange={props.handleNumberOfBedrooms}
          />
          4
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="Bedroom_Other"
            // value="-2"
            checked={props.numberOfBedroomsOther !== undefined}
            onChange={props.handleNumberOfBedroomsOther}
          />
          Other:{" "}
          <OtherText
            type="text"
            name="Bedroom_other_text"
            value={props.numberOfBedroomsOther ?? ""}
            onChange={props.handleNumberOfBedroomsOther}
          />
        </label>
      </div>
    </WidthOffset>
  );
}
export default NumberBedrooms;
