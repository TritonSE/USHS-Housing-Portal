import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
  OptionLabel,
  OtherText,
  Required,
} from "@/components/ListingForm/CommonStyles";

type HousingAuthorityProps = {
  housingAuthority: string | undefined;
  handleHousingAuthority: (event: React.ChangeEvent<HTMLInputElement>) => void;
  housingAuthorityOther: string | undefined;
  handleHousingAuthorityOther: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
            checked={
              props.housingAuthority === "LACDA" && props.housingAuthorityOther === undefined
            }
            onChange={props.handleHousingAuthority}
          />
          LACDA
        </OptionLabel>

        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="HACLA"
            value="HACLA"
            checked={
              props.housingAuthority === "HACLA" && props.housingAuthorityOther === undefined
            }
            onChange={props.handleHousingAuthority}
          />
          HACLA
        </OptionLabel>

        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            value=""
            checked={props.housingAuthorityOther !== undefined}
            onChange={props.handleHousingAuthorityOther}
          />
          Other:
          <OtherText
            type="text"
            name="Authority_other_text"
            value={props.housingAuthorityOther ?? ""}
            onChange={props.handleHousingAuthorityOther}
          />
        </OptionLabel>
      </div>
    </Margin32>
  );
};

export default HousingAuthority;
