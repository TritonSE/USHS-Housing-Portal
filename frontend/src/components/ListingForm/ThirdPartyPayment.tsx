import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
  OptionLabel,
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
        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="Yes"
            value="Yes"
            checked={props.thirdPartyPayment !== undefined && props.thirdPartyPayment}
            onChange={props.handleThirdPartyPayment}
          />
          Yes
        </OptionLabel>
        <OptionLabel>
          <CustomCheckboxRadio
            type="radio"
            name="No"
            value="No"
            checked={props.thirdPartyPayment !== undefined && !props.thirdPartyPayment}
            onChange={props.handleThirdPartyPayment}
          />
          No
        </OptionLabel>
      </div>
    </Margin32>
  );
};
