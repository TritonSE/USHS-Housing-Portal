import styled from "styled-components";

import { ReferralTableDropDown } from "./ReferralTableDropDown";

import { User } from "@/api/users";

const referralStatuses = [
  "Referred",
  "Viewing",
  "Pending",
  "Approved",
  "Denied",
  "Leased",
  "Canceled",
];
type RenterTableRow = {
  index: number;
  unit: string;
  housingLocator: string;
  status: string;
  lastUpdate: string;
  onSelect: (value: string[]) => void;
};

// Abbreviation
// RTR: Referral Table Row
const RTR_Wrapper = styled.div<{ index: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2vh 2vw 2vh 2vw;
  background: ${(div) =>
    div.index % 2 ? "var(--Neutral-Gray0, #F3F3F3);" : "background: var(--Background, #FBF7F3);"};
`;

const RTR_Text_Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RTR_Text = styled.p`
  display: in-block;
  align-items: center;
  overflow: hidden;
  color: var(--Primary, #0c2b35);
  text-overflow: ellipsis;
  white-space: nowrap;

  min-width: 200px;
  max-width: 201px;

  /* Body 2 */
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: 0.32px;
`;

const RTR_Text_End = styled(RTR_Text)`
  display: flex;
  justify-content: flex-end;
  padding-right: 4vw;
`;

const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US");
};

export const RenterTableRow = (props: RenterTableRowProps) => {
  return (
    
  );
};
