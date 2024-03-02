import React, { useContext, useState } from "react";
import styled from "styled-components";

import { ReferralTableRow } from "./ReferralTableRow";

import { Referral, getUnitReferrals } from "@/api/units";
import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";

type ReferralTableProps = {
  id: string;
};

const ReferralTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
      {referrals.map((referral, idx) => (
        <ReferralTableRow
          key={idx}
          name={referral.renterCandidate.firstName}
          contactInfo={referral.renterCandidate.email + "\n" + referral.renterCandidate.phone}
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
