// import styled from "styled-components";

import { Margin32, Required } from "@/components/ListingForm/CommonStyles";

type ThirdPartyPaymentProps = {
  thirdPartyPayment: boolean | undefined;
  handleThirdPartyPayment: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ThirdPartyPayment = (props: ThirdPartyPaymentProps) => {
  return (
    <Margin32>
      <h3>
        3rd party payment accepting <Required>*</Required>
      </h3>
      <div>
        <label>
          <input
            type="radio"
            name="Yes"
            value="Yes"
            checked={props.thirdPartyPayment !== undefined && props.thirdPartyPayment}
            onChange={props.handleThirdPartyPayment}
          />
          Yes
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="No"
            value="No"
            checked={props.thirdPartyPayment !== undefined && !props.thirdPartyPayment}
            onChange={props.handleThirdPartyPayment}
          />
          No
        </label>
      </div>
    </Margin32>
  );
};
