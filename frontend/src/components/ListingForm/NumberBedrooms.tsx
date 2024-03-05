import { Required } from "@/components/ListingForm/CommonStyles";

type NumberBedroomsProps = {
  numberOfBedrooms: number | undefined;
  handleNumberOfBedrooms: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numberOfBedroomsOther: number | undefined;
  handleNumberOfBedroomsOther: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function NumberBedrooms(props: NumberBedroomsProps) {
  return (
    <label id="num-beds">
      <h3>
        Number of Bedrooms <Required>*</Required>
      </h3>
      <div>
        <label>
          <input
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
          <input
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
          <input
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
          <input
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
          <input
            type="radio"
            name="Bedroom_Other"
            // value="-2"
            checked={props.numberOfBedroomsOther !== undefined}
            onChange={props.handleNumberOfBedroomsOther}
          />
          Other:{" "}
          <input
            type="text"
            name="Bedroom_other_text"
            value={props.numberOfBedroomsOther ?? ""}
            onChange={props.handleNumberOfBedroomsOther}
          />
        </label>
      </div>
    </label>
  );
}
export default NumberBedrooms;
