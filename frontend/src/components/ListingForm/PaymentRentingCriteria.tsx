/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
  Required,
} from "@/components/ListingForm/CommonStyles";

type PaymentRentingCriteriaProps = {
  notRequired?: boolean;
  paymentRentingCriteria: string[];
  setPaymentRentingCriteria: React.Dispatch<React.SetStateAction<string[]>>;
  handleCheckBoxNA: (
    option: string,
    getter: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => void;
};
export const PaymentRentingCriteria = (props: PaymentRentingCriteriaProps) => {
  return (
    <Margin32>
      <FieldHeader>
        Payment/Renting Criteria {!props.notRequired && <Required>*</Required>}
      </FieldHeader>
      <label>
        <CustomCheckboxRadio
          type="checkbox"
          name="3rd party payment accepting"
          value="3rd party payment accepting"
          checked={props.paymentRentingCriteria.includes("3rd party payment accepting")}
          onChange={() => {
            props.handleCheckBoxNA(
              "3rd party payment accepting",
              props.paymentRentingCriteria,
              props.setPaymentRentingCriteria,
            );
          }}
        />
        3rd party payment accepting
      </label>
      <br />
      <label>
        <CustomCheckboxRadio
          type="checkbox"
          name="Credit check required"
          value="Credit check required"
          checked={props.paymentRentingCriteria.includes("Credit check required")}
          onChange={() => {
            props.handleCheckBoxNA(
              "Credit check required",
              props.paymentRentingCriteria,
              props.setPaymentRentingCriteria,
            );
          }}
        />
        Credit check required
      </label>
      <br />
      <label>
        <CustomCheckboxRadio
          type="checkbox"
          name="Background check required"
          value="Background check required"
          checked={props.paymentRentingCriteria.includes("Background check required")}
          onChange={() => {
            props.handleCheckBoxNA(
              "Background check required",
              props.paymentRentingCriteria,
              props.setPaymentRentingCriteria,
            );
          }}
        />
        Background check required
      </label>
      <br />
      <label>
        <CustomCheckboxRadio
          type="checkbox"
          name="Program letter required"
          value="Program letter required"
          checked={props.paymentRentingCriteria.includes("Program letter required")}
          onChange={() => {
            props.handleCheckBoxNA(
              "Program letter required",
              props.paymentRentingCriteria,
              props.setPaymentRentingCriteria,
            );
          }}
        />
        Program letter required
      </label>
    </Margin32>
  );
};
