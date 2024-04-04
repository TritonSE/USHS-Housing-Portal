import styled from "styled-components";

import { AdditionalRulesRegulations } from "./AdditionalRulesRegulations";
import { MidSectionHeader } from "./Headers/HeaderStyles";
import { PaymentRentingCriteria } from "./PaymentRentingCriteria";
import { Textbox } from "./Textbox";
import { handleCheckBoxNA } from "./helpers";

const HousingLocatorSection = styled.div`
  h2,
  h3 {
    color: #b64201;
  }
`;

type HousingLocatorFieldsProps = {
  whereFindUnit: string;
  handleWhereFindUnit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentRentingCriteria: string[];
  setPaymentRentingCriteria: React.Dispatch<React.SetStateAction<string[]>>;
  additionalRulesRegulations: string[];
  setAdditionalRulesRegulations: React.Dispatch<React.SetStateAction<string[]>>;
  additionalCommentsHL: string;
  handleAdditionalCommentsHL: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const HousingLocatorFields = ({
  whereFindUnit,
  handleWhereFindUnit,
  paymentRentingCriteria,
  setPaymentRentingCriteria,
  additionalRulesRegulations,
  setAdditionalRulesRegulations,
  additionalCommentsHL,
  handleAdditionalCommentsHL,
}: HousingLocatorFieldsProps) => {
  return (
    <HousingLocatorSection>
      <MidSectionHeader>Fill Out Additional Information</MidSectionHeader>
      <Textbox
        elementName="Where did you find the unit?"
        requiredField={true}
        name="whereFindUnit"
        value={whereFindUnit}
        handler={handleWhereFindUnit}
      />
      <PaymentRentingCriteria
        paymentRentingCriteria={paymentRentingCriteria}
        setPaymentRentingCriteria={setPaymentRentingCriteria}
        handleCheckBoxNA={handleCheckBoxNA}
        notRequired={true}
      />
      <AdditionalRulesRegulations
        additionalRulesRegulations={additionalRulesRegulations}
        setAdditionalRulesRegulations={setAdditionalRulesRegulations}
        handleCheckBoxNA={handleCheckBoxNA}
      />
      <Textbox
        elementName="Internal Comments"
        kind="textarea"
        rows={5}
        name="additionalCommentsHL"
        value={additionalCommentsHL}
        handler={handleAdditionalCommentsHL}
      />
    </HousingLocatorSection>
  );
};
