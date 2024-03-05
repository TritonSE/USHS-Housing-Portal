/* eslint-disable jsx-a11y/label-has-associated-control */

import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
  Required,
} from "@/components/ListingForm/CommonStyles";

type ThirdPartyPaymentProps = {
  thirdPartyPayment: boolean | undefined;
  handleThirdPartyPayment: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ThirdPartyPayment = (props: ThirdPartyPaymentProps) => {
  return (
    <Margin32>
      <FieldHeader>
        3rd party payment accepting <Required>*</Required>
      </FieldHeader>
      <div>
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="Yes"
            value="Yes"
            checked={props.thirdPartyPayment !== undefined && props.thirdPartyPayment}
            onChange={props.handleThirdPartyPayment}
          />
          Yes
        </label>
        <label>
          <br />
          <CustomCheckboxRadio
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
