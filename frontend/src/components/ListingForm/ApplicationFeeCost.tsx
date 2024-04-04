import styled from "styled-components";

import { CustomCheckboxRadio, Margin32, OptionLabel } from "@/components/ListingForm/CommonStyles";
import { Textbox } from "@/components/ListingForm/Textbox";

type ApplicationFeeCostProps = {
  applicationFeeCost: string | undefined;
  handleApplicationFeeCost: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const MarginOffset = styled.div`
  margin-bottom: -20px;
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
          value={props.applicationFeeCost === "0" ? "" : props.applicationFeeCost}
          handler={props.handleApplicationFeeCost}
        />
      </MarginOffset>
      <OptionLabel>
        <CustomCheckboxRadio
          type="radio"
          name="appFeeCostN/A"
          value="0"
          checked={props.applicationFeeCost === "0"}
          onChange={props.handleApplicationFeeCost}
        />
        N/A
      </OptionLabel>
    </Margin32>
  );
};
