import styled from "styled-components";

import {
  CustomCheckboxRadio,
  FieldHeader,
  OptionLabel,
  OtherText,
  Required,
} from "@/components/ListingForm/CommonStyles";

export const WidthOffset = styled.label`
  width: 433px;
`;

type NumberBedroomsProps = {
  numberOfBedrooms: number | undefined;
  handleNumberOfBedrooms: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numberOfBedroomsOther: string | undefined;
  handleNumberOfBedroomsOther: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const NumberBedrooms = (props: NumberBedroomsProps) => {
  return (
    <WidthOffset>
      <FieldHeader>
        Number of Bedrooms <Required>*</Required>
      </FieldHeader>
      <div>
        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Bedroom_0"
            value="0"
            checked={props.numberOfBedrooms === 0 && props.numberOfBedroomsOther === undefined}
            onChange={props.handleNumberOfBedrooms}
          />
          0
        </OptionLabel>
        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Bedroom_1"
            value="1"
            checked={props.numberOfBedrooms === 1 && props.numberOfBedroomsOther === undefined}
            onChange={props.handleNumberOfBedrooms}
          />
          1
        </OptionLabel>
        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Bedroom_2"
            value="2"
            checked={props.numberOfBedrooms === 2 && props.numberOfBedroomsOther === undefined}
            onChange={props.handleNumberOfBedrooms}
          />
          2
        </OptionLabel>{" "}
        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Bedroom_3"
            value="3"
            checked={props.numberOfBedrooms === 3 && props.numberOfBedroomsOther === undefined}
            onChange={props.handleNumberOfBedrooms}
          />
          3
        </OptionLabel>
        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Bedroom_4"
            value="4"
            checked={props.numberOfBedrooms === 4 && props.numberOfBedroomsOther === undefined}
            onChange={props.handleNumberOfBedrooms}
          />
          4
        </OptionLabel>
        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Bedroom_Other"
            value=""
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
        </OptionLabel>
      </div>
    </WidthOffset>
  );
};
