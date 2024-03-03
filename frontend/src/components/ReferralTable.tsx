import React, { useContext, useState } from "react";
import styled from "styled-components";

import { ReferralTableRow } from "./ReferralTableRow";

import { Referral, getUnitReferrals } from "@/api/units";
import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";

type ReferralTableProps = {
  id: string;
};

const TableColumnNames = [
  "Name",
  "Contact Info",
  "Referring Staff",
  "Housing Locator",
  "Status",
  "Last Update",
];

const ReferralTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ReferralTableTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0vh 7vw 0vh 7vw;
`;

const ReferralTableTitle = styled.h2`
  color: #000;

  font-family: "Neutra Text";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 125%;
  letter-spacing: 0.64px;
`;

const ReferralTableButton = styled.button`
  display: inline-flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 12px;
  border: none;
  background: var(--Primary, #b64201);
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

const ReferralTableButtonIcon = styled.img`
  width: 19px;
  height: 19px;
`;

const ReferralTableColumnHeaders = styled.div`
  display: flex;
  margin: 3vh 6vw 1vh 6vw;
  justify-content: space-between;
  flex-grow: 1;
  background: #ffffff;
`;

const ReferralTableColumnHeader = styled.div`
  display: flex
  justify-content: flex-start;
  color: var(--Neutral-Black, #000);

  min-width: 200px;
  max-width: 201px;

  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: 0.32px;
  padding: 1vh 0px 1vh 1vw;
`;

export const ReferralTable = (props: ReferralTableProps) => {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referringStaff, setReferringStaff] = useState<string[]>([]);
  const [housingLocators, setHousingLocators] = useState<string[]>([]);

  const getAllReferringStaff = (): string[] => {
    return dataContext.allCaseManagers.map((manager) => manager.firstName + " " + manager.lastName);
  };

  const getAllHousingLocators = (): string[] => {
    return dataContext.allHousingLocators.map(
      (locator) => locator.firstName + " " + locator.lastName,
    );
  };

  React.useEffect(() => {
    if (authContext.currentUser) {
      void getUnitReferrals(props.id).then((res) => {
        if (res.success) {
          setReferrals(res.data);
          console.log(referrals);
        }
      });
    }

    if (dataContext) {
      setReferringStaff(getAllReferringStaff());
      setHousingLocators(getAllHousingLocators());
      console.log(dataContext);
    }
  }, [authContext, dataContext]);

  const getReferringStaff = (staffId: string): string => {
    const staff = dataContext.allCaseManagers.find((manager) => manager._id === staffId);
    return staff === undefined ? "N/A" : staff.firstName + " " + staff.lastName;
  };

  const getHousingLocator = (locatorId: string): string => {
    const locator = dataContext.allHousingLocators.find(
      (currLocator) => currLocator._id === locatorId,
    );
    return locator === undefined ? "N/A" : locator.firstName + " " + locator.lastName;
  };

  if (!referrals) {
    return <div>No Referrals</div>;
  }

  if (!authContext || !dataContext) {
    return <div>Loading Referral Table...</div>;
  }

  return (
    <ReferralTableContainer>
      <ReferralTableTitleSection>
        <ReferralTableTitle>Referrals:</ReferralTableTitle>
        <ReferralTableButton>
          <ReferralTableButtonIcon src={"/plus_sign.svg"} />
          Add Referral
        </ReferralTableButton>
      </ReferralTableTitleSection>

      <ReferralTableColumnHeaders>
        {TableColumnNames.map((name, idx) => (
          <ReferralTableColumnHeader key={idx}>{name}</ReferralTableColumnHeader>
        ))}
      </ReferralTableColumnHeaders>

      {referrals.map((referral, idx) => (
        <ReferralTableRow
          key={idx}
          name={referral.renterCandidate.firstName}
          email={referral.renterCandidate.email}
          phone={referral.renterCandidate.phone}
          referringStaff={getReferringStaff(referral.assignedReferringStaffId)}
          allReferringStaff={referringStaff}
          housingLocator={getHousingLocator(referral.assignedHousingLocatorId)}
          allHousingLocators={housingLocators}
          status={referral.status}
          lastUpdate={referral.updatedAt.toString()}
        />
      ))}
    </ReferralTableContainer>
  );
};
