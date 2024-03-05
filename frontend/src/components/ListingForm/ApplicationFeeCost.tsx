import Textbox from "./Textbox";

import { Margin32, Required } from "@/components/ListingForm/CommonStyles";

type ApplicationFeeCostProps = {
  applicationFeeCost: number | undefined;
  handleApplicationFeeCost: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ApplicationFeeCost = (props: ApplicationFeeCostProps) => {
  return (
    <Margin32>
      <h3>
        Application Fee Cost
        <Required>*</Required>
      </h3>
      <div>
        <div id="app-fee-cost-box">
          <Textbox
            placeholder="Enter FULL amount"
            name="Application Fee Cost"
            value={
              props.applicationFeeCost !== undefined && props.applicationFeeCost !== 0
                ? props.applicationFeeCost
                : ""
            }
            handler={props.handleApplicationFeeCost}
          />
        </div>
        <br />

        <label>
          <input
            type="radio"
            name="appFeeCostN/A"
            value="0"
            checked={props.applicationFeeCost === 0}
            onChange={props.handleApplicationFeeCost}
          />
          N/A
        </label>
      </div>
    </Margin32>
  );
};
