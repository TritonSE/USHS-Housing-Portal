/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
  Required,
} from "@/components/ListingForm/CommonStyles";

type HousingAuthorityProps = {
  housingAuthority: string;
  handleHousingAuthority: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const HousingAuthority = (props: HousingAuthorityProps) => {
  return (
    <Margin32>
      <FieldHeader>
        Select housing authority <Required>*</Required>
      </FieldHeader>
      <div>
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="LACDA"
            value="LACDA"
            checked={props.housingAuthority === "LACDA"}
            onChange={props.handleHousingAuthority}
          />
          LACDA
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="HACLA"
            value="HACLA"
            checked={props.housingAuthority === "HACLA"}
            onChange={props.handleHousingAuthority}
          />
          HACLA
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="Other"
            value="Other"
            checked={props.housingAuthority === "Other"}
            onChange={props.handleHousingAuthority}
          />
          Other
        </label>
      </div>
    </Margin32>
  );
};

export default HousingAuthority;
