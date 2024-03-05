import { Margin32, Required } from "@/components/ListingForm/CommonStyles";

type HousingAuthorityProps = {
  housingAuthority: string;
  handleHousingAuthority: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const HousingAuthority = (props: HousingAuthorityProps) => {
  return (
    <Margin32>
      <h3>
        Select housing authority <Required>*</Required>
      </h3>
      <div>
        <label>
          <input
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
          <input
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
          <input
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
