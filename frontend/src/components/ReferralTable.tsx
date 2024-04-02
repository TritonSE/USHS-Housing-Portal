import React, { useContext, useState } from "react";
import styled from "styled-components";

import { Button } from "./Button";
import { ReferralTablePagination } from "./ReferralTablePagination";
import { ReferralTableRow } from "./ReferralTableRow";

import { Referral, User, getUnitReferrals } from "@/api/units";
import { ReferralPopup } from "@/components/ReferralPopup";
import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";

type ReferralTableProps = {
  id: string;
};

const ENTRIES_PER_PAGE = 5;

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
  margin-top: 44px;
`;

const ReferralTableTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReferralTableTitle = styled.h2`
  color: #000;

  font-family: "Neutraface Text", sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 125%;
  letter-spacing: 0.64px;
`;

const ReferralTableButton = styled(Button)`
  display: inline-flex;
  padding: 6px 16px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 12px;
  border: none;
  background: #b64201;
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
  flex-direction: row;
  justify-content: space-between;
  padding: 2vh 2vw 2vh 2vw;
  margin: 2vh 0vw 0vh 0vw;
  flex-grow: 1;
  background: #ffffff;
`;

const ReferralTableColumnHeader = styled.div`
  display: flex
  justify-content: flex-start;
  color: var(--Neutral-Black, #000);

  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: 0.32px;

  min-width: 200px;
  max-width: 201px;
`;

const ReferralTableColumnHeaderEnd = styled(ReferralTableColumnHeader)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReferralTableFooter = styled.div`
  padding-left: 85%;
  margin: 1vh 0vw 3vh 0vw;
`;

const ReferralTablePlaceholder = styled.div`
  padding: 12px 2vw;
`;

export const ReferralTable = (props: ReferralTableProps) => {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referringStaff, setReferringStaff] = useState<string[]>([]);
  const [housingLocators, setHousingLocators] = useState<string[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [popup, setPopup] = useState<boolean>(false);

  const getAllReferringStaff = (): string[] => {
    return dataContext.allReferringStaff.map(
      (manager) => manager.firstName + " " + manager.lastName,
    );
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
        }
      });
    }

    if (dataContext) {
      setReferringStaff(getAllReferringStaff());
      setHousingLocators(getAllHousingLocators());
    }
  }, [authContext, dataContext]);

  const getReferringStaff = (assignedReferringStaff: User): string => {
    const staff = dataContext.allReferringStaff.find(
      (manager) => manager._id === assignedReferringStaff._id,
    );
    return staff === undefined ? "N/A" : staff.firstName + " " + staff.lastName;
  };

  const getHousingLocator = (assignedHousingLocator: User): string => {
    const locator = dataContext.allHousingLocators.find(
      (currLocator) => currLocator._id === assignedHousingLocator._id,
    );
    return locator === undefined ? "N/A" : locator.firstName + " " + locator.lastName;
  };

  if (!authContext || !dataContext) {
    return <ReferralTablePlaceholder>Loading Referrals Table...</ReferralTablePlaceholder>;
  }

  return (
    <ReferralTableContainer>
      <ReferralTableTitleSection>
        <ReferralTableTitle>Referrals:</ReferralTableTitle>
        <ReferralTableButton
          kind="primary"
          onClick={() => {
            setPopup(true);
          }}
        >
          <ReferralTableButtonIcon src={"/plus_sign.svg"} />
          Add Referral
        </ReferralTableButton>
        <ReferralPopup
          active={popup}
          onClose={() => {
            setPopup(false);
          }}
        />
      </ReferralTableTitleSection>

      <ReferralTableColumnHeaders>
        {TableColumnNames.map((name, idx) =>
          idx === TableColumnNames.length - 1 ? (
            <ReferralTableColumnHeaderEnd key={idx}>{name}</ReferralTableColumnHeaderEnd>
          ) : (
            <ReferralTableColumnHeader key={idx}>{name}</ReferralTableColumnHeader>
          ),
        )}
      </ReferralTableColumnHeaders>

      {referrals && referrals.length > 0 ? (
        <>
          {referrals
            .slice((pageNumber - 1) * ENTRIES_PER_PAGE, pageNumber * ENTRIES_PER_PAGE)
            .map((referral, idx) => (
              <ReferralTableRow
                key={Math.random()}
                index={idx}
                name={referral.renterCandidate.firstName}
                email={referral.renterCandidate.email}
                phone={referral.renterCandidate.phone}
                referringStaff={getReferringStaff(referral.assignedReferringStaff)}
                allReferringStaff={referringStaff}
                housingLocator={getHousingLocator(referral.assignedHousingLocator)}
                allHousingLocators={housingLocators}
                status={referral.status}
                lastUpdate={referral.updatedAt.toString()}
              />
            ))}
          <ReferralTableFooter>
            <ReferralTablePagination
              totalPages={Math.ceil(referrals.length / ENTRIES_PER_PAGE)}
              currPage={pageNumber}
              setPageNumber={setPageNumber}
            />
          </ReferralTableFooter>
        </>
      ) : (
        <ReferralTablePlaceholder>None</ReferralTablePlaceholder>
      )}
    </ReferralTableContainer>
  );
};
