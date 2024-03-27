/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
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
        Sharing house acceptable? <Required>*</Required>
      </FieldHeader>
      <div>
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="sharingHousingYes"
            value="Yes"
            checked={props.sharingHousing === "Yes"}
            onChange={props.handleSharingHousing}
          />
          Yes
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="sharingHousingNo"
            value="No"
            checked={props.sharingHousing === "No"}
            onChange={props.handleSharingHousing}
          />
          No
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="sharingHousingUncertain"
            value="Uncertain"
            checked={props.sharingHousing === "Uncertain"}
            onChange={props.handleSharingHousing}
          />
          Uncertain
        </label>
        <br />
      </div>
    </Margin32>
  );
};
