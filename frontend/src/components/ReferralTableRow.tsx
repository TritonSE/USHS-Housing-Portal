import styled from "styled-components";

import { ReferralTableDropDown } from "./ReferralTableDropDown";

const referralStatuses = [
  "Referred",
  "Viewing",
  "Pending",
  "Approved",
  "Denied",
  "Leased",
  "Canceled",
];
type ReferralTableRowProps = {
  name: string;
  contactInfo: string; // email;phone-number
  referringStaff: string;
  allReferringStaff: string[];
  housingLocator: string;
  allHousingLocators: string[];
  status: string;
  lastUpdate: string;
};

// Abbreviation
// RTR: Referral Table Row
const RTR_Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0vh 5vw 0vh 5vw;
  padding: 2vh 2vw 2vh 2vw;
`;

const RTR_Text = styled.p`
  overflow: hidden;
  color: var(--Primary, #0c2b35);
  text-overflow: ellipsis;
  white-space: nowrap;

  /* Body 2 */
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: 0.32px;
`;

const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US");
};

export const ReferralTableRow = (props: ReferralTableRowProps) => {
  return (
    <RTR_Wrapper>
      <RTR_Text>{props.name}</RTR_Text>
      <RTR_Text>{props.contactInfo}</RTR_Text>
      {/* Referring Staff (Case Manager) */}
      <ReferralTableDropDown values={props.allReferringStaff} defaultValue={props.referringStaff} />
      {/* Housing Locator */}
      <ReferralTableDropDown
        values={props.allHousingLocators}
        defaultValue={props.housingLocator}
      />
      {/* Status */}
      <ReferralTableDropDown values={referralStatuses} defaultValue={props.status} />

      <RTR_Text>{formatDate(props.lastUpdate)}</RTR_Text>
    </RTR_Wrapper>
  );
};
