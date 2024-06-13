import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
  OptionLabel,
  Required,
} from "@/components/ListingForm/CommonStyles";

type SharingHousingProps = {
  sharingHousing: string;
  handleSharingHousing: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SharingHousing = (props: SharingHousingProps) => {
  return (
    <Margin32>
      <FieldHeader>
        Is this property shared housing? <Required>*</Required>
      </FieldHeader>
      <div>
        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="sharingHousingYes"
            value="Yes"
            checked={props.sharingHousing === "Yes"}
            onChange={props.handleSharingHousing}
          />
          Yes
        </OptionLabel>

        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="sharingHousingNo"
            value="No"
            checked={props.sharingHousing === "No"}
            onChange={props.handleSharingHousing}
          />
          No
        </OptionLabel>

        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="sharingHousingUncertain"
            value="Uncertain"
            checked={props.sharingHousing === "Uncertain"}
            onChange={props.handleSharingHousing}
          />
          Uncertain
        </OptionLabel>
      </div>
    </Margin32>
  );
};
