import { Margin32, Required } from "@/components/ListingForm/CommonStyles";

type SharingHousingProps = {
  sharingHousing: string;
  handleSharingHousing: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function SharingHousing(props: SharingHousingProps) {
  return (
    <Margin32>
      <h3>
        Sharing house acceptable? <Required>*</Required>
      </h3>
      <div>
        <label>
          <input
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
          <input
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
          <input
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
}

export default SharingHousing;
