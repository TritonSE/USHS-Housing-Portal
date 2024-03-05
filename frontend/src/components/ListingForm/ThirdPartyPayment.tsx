// import styled from "styled-components";

import { CustomCheckboxRadio, Margin32, Required } from "@/components/ListingForm/CommonStyles";

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
          <CustomCheckboxRadio
            type="radio"
            name="Yes"
            value="Yes"
            checked={props.thirdPartyPayment !== undefined && props.thirdPartyPayment}
            onChange={props.handleThirdPartyPayment}
          />
          Yes
        <br />
          <CustomCheckboxRadio
            type="radio"
            name="No"
            value="No"
            checked={props.thirdPartyPayment !== undefined && !props.thirdPartyPayment}
            onChange={props.handleThirdPartyPayment}
          />
          No
      </div>
    </Margin32>
  );
};
