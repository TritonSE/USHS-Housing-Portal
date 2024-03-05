import { Required } from "@/components/ListingForm/CommonStyles";

type NumberBathsProps = {
  numberOfBaths: number | undefined;
  handleNumberOfBaths: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numberOfBathsOther: number | undefined;
  handleNumberOfBathsOther: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function NumberBaths(props: NumberBathsProps) {
  return (
    <div>
      <h3>
        Number of Baths <Required>*</Required>
      </h3>
      <div>
        <label>
          <input
            type="radio"
            name="Baths_1"
            value="1"
            checked={props.numberOfBaths === 1 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          1
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="Baths_1.5"
            value="1.5"
            checked={props.numberOfBaths === 1.5 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          1.5
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="Baths_2"
            value="2"
            checked={props.numberOfBaths === 2 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          2
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="Baths_2.5"
            value="2.5"
            checked={props.numberOfBaths === 2.5 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          2.5
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="Baths_3"
            value="3"
            checked={props.numberOfBaths === 3 && props.numberOfBathsOther === undefined}
            onChange={props.handleNumberOfBaths}
          />
          3
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="Baths_Other"
            // value="-2"
            checked={props.numberOfBathsOther !== undefined}
            onChange={props.handleNumberOfBathsOther}
          />
          Other:{" "}
          <input
            type="text"
            name="Bath_other_text"
            value={props.numberOfBathsOther ?? ""}
            onChange={props.handleNumberOfBathsOther}
          />
        </label>
      </div>
    </div>
  );
}

export default NumberBaths;
