import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
  OptionLabel,
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
        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="LACDA"
            value="LACDA"
            checked={props.housingAuthority === "LACDA"}
            onChange={props.handleHousingAuthority}
          />
          LACDA
        </OptionLabel>

        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="HACLA"
            value="HACLA"
            checked={props.housingAuthority === "HACLA"}
            onChange={props.handleHousingAuthority}
          />
          HACLA
        </OptionLabel>

        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Other"
            value="Other"
            checked={props.housingAuthority === "Other"}
            onChange={props.handleHousingAuthority}
          />
          Other
        </OptionLabel>
      </div>
    </Margin32>
  );
};

export default HousingAuthority;
