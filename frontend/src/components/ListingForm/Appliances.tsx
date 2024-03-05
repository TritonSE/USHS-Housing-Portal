import {
  Margin32,
  RadioCheckBoxContainer,
  RadioCheckboxCol,
  Required,
} from "@/components/ListingForm/CommonStyles";

type ApplicancesProps = {
  appliances: string[];
  setAppliances: React.Dispatch<React.SetStateAction<string[]>>;
  handleCheckBoxNA: (
    option: string,
    getter: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => void;
};

function Appliances(props: ApplicancesProps) {
  return (
    <Margin32>
      <h3>
        Select All Appliances that Apply or N/A <Required>*</Required>
      </h3>
      <RadioCheckBoxContainer>
        <RadioCheckboxCol>
          <label>
            <input
              type="checkbox"
              name="Refrigerator"
              value="Refrigerator"
              checked={props.appliances.includes("Refrigerator")}
              onChange={() => {
                props.handleCheckBoxNA("Refrigerator", props.appliances, props.setAppliances);
              }}
            />
            Refrigerator
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Dishwasher"
              value="Dishwasher"
              checked={props.appliances.includes("Dishwasher")}
              onChange={() => {
                props.handleCheckBoxNA("Dishwasher", props.appliances, props.setAppliances);
              }}
            />
            Dishwasher
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Disposal"
              value="Disposal"
              checked={props.appliances.includes("Disposal")}
              onChange={() => {
                props.handleCheckBoxNA("Disposal", props.appliances, props.setAppliances);
              }}
            />
            Disposal
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Microwave"
              value="Microwave"
              checked={props.appliances.includes("Microwave")}
              onChange={() => {
                props.handleCheckBoxNA("Microwave", props.appliances, props.setAppliances);
              }}
            />
            Microwave
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Central AC/Heat"
              value="Central AC/Heat"
              checked={props.appliances.includes("Central AC/Heat")}
              onChange={() => {
                props.handleCheckBoxNA("Central AC/Heat", props.appliances, props.setAppliances);
              }}
            />
            Central AC/Heat
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Window unit AC"
              value="Window unit AC"
              checked={props.appliances.includes("Window unit AC")}
              onChange={() => {
                props.handleCheckBoxNA("Window unit AC", props.appliances, props.setAppliances);
              }}
            />
            Window unit AC
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Wall unit header - gas"
              value="Wall unit header - gas"
              checked={props.appliances.includes("Wall unit header - gas")}
              onChange={() => {
                props.handleCheckBoxNA(
                  "Wall unit header - gas",
                  props.appliances,
                  props.setAppliances,
                );
              }}
            />
            Wall unit header - gas
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Wall unit heater - electric"
              value="Wall unit heater - electric"
              checked={props.appliances.includes("Wall unit heater - electric")}
              onChange={() => {
                props.handleCheckBoxNA(
                  "Wall unit heater - electric",
                  props.appliances,
                  props.setAppliances,
                );
              }}
            />
            Wall unit heater - electric
          </label>
        </RadioCheckboxCol>
        <div>
          <label>
            <input
              type="checkbox"
              name="Landry hookups in unit"
              value="Landry hookups in unit"
              checked={props.appliances.includes("Landry hookups in unit")}
              onChange={() => {
                props.handleCheckBoxNA(
                  "Landry hookups in unit",
                  props.appliances,
                  props.setAppliances,
                );
              }}
            />
            Landry hookups in unit
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Water header - gas"
              value="Water header - gas"
              checked={props.appliances.includes("Water header - gas")}
              onChange={() => {
                props.handleCheckBoxNA("Water header - gas", props.appliances, props.setAppliances);
              }}
            />
            Water header - gas
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Water heater - electric"
              value="Water heater - electric"
              checked={props.appliances.includes("Water heater - electric")}
              onChange={() => {
                props.handleCheckBoxNA(
                  "Water heater - electric",
                  props.appliances,
                  props.setAppliances,
                );
              }}
            />
            Water heater - electric
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Laundry facilities on site"
              value="Laundry facilities on site"
              checked={props.appliances.includes("Laundry facilities on site")}
              onChange={() => {
                props.handleCheckBoxNA(
                  "Laundry facilities on site",
                  props.appliances,
                  props.setAppliances,
                );
              }}
            />
            Laundry facilities on site
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Laundry appliances in unit"
              value="Laundry appliances in unit"
              checked={props.appliances.includes("Laundry appliances in unit")}
              onChange={() => {
                props.handleCheckBoxNA(
                  "Laundry appliances in unit",
                  props.appliances,
                  props.setAppliances,
                );
              }}
            />
            Laundry appliances in unit
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Stove/oven"
              value="Stove/oven"
              checked={props.appliances.includes("Stove/oven")}
              onChange={() => {
                props.handleCheckBoxNA("Stove/oven", props.appliances, props.setAppliances);
              }}
            />
            Stove/oven
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="applianceN/A"
              value="N/A"
              checked={props.appliances.includes("N/A")}
              onChange={() => {
                props.handleCheckBoxNA("N/A", props.appliances, props.setAppliances);
              }}
            />
            N/A
          </label>
        </div>
        <br />
      </RadioCheckBoxContainer>
    </Margin32>
  );
}

export default Appliances;
