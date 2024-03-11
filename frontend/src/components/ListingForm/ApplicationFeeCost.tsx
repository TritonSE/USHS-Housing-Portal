/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from "styled-components";

import { CustomCheckboxRadio, Margin32 } from "@/components/ListingForm/CommonStyles";
import { Textbox } from "@/components/ListingForm/Textbox";

type ApplicationFeeCostProps = {
  applicationFeeCost: number | undefined;
  handleApplicationFeeCost: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const MarginOffset = styled.div`
  margin-bottom: -40px;
`;

export const ApplicationFeeCost = (props: ApplicationFeeCostProps) => {
  return (
    <Margin32>
      <MarginOffset>
        <Textbox
          placeholder="Enter FULL amount"
          elementName="Application Fee Cost"
          requiredField={true}
          name="Application Fee Cost"
          value={
            props.applicationFeeCost !== undefined && props.applicationFeeCost !== 0
              ? props.applicationFeeCost
              : ""
          }
          handler={props.handleApplicationFeeCost}
        />
      </MarginOffset>
      <br />

      <label>
        <CustomCheckboxRadio
          type="radio"
          name="appFeeCostN/A"
          value="0"
          checked={props.applicationFeeCost === 0}
          onChange={props.handleApplicationFeeCost}
        />
        N/A
      </label>
    </Margin32>
  );
};
