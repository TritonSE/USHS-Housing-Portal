import React, { useContext, useState } from "react";
import styled from "styled-components";

import { Button } from "./Button";
import { ReferralTableDropDown } from "./ReferralTableDropDown";
import { Table } from "./Table";
import { UserDropdown } from "./UserDropdown";

import { updateReferral, updateReferralRequest } from "@/api/referrals";
import { REFERRAL_STATUSES, Referral, ReferralStatus, getUnitReferrals } from "@/api/units";
import { User } from "@/api/users";
import { ReferralPopup } from "@/components/ReferralPopup";
import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";

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
  margin-top: 40px;
`;

const ReferralTableTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
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

const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US");
};

type ReferralTableProps = {
  id: string;
};

enum ReferralUpdateType {
  ReferringStaff = "referringStaff",
  HousingLocator = "housingLocator",
  Status = "status",
}

export const ReferralTable = (props: ReferralTableProps) => {
  const authContext = useContext(AuthContext);
  const { allHousingLocators, allReferringStaff } = useContext(DataContext);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [popup, setPopup] = useState<boolean>(false);

  const getAllReferrals = () => {
    getUnitReferrals(props.id)
      .then((res) => {
        if (res.success) {
          setReferrals(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (authContext.currentUser) {
      getAllReferrals();
    }
  }, [authContext]);

  const handleUpdate = (
    referral: Referral,
    value: User | ReferralStatus,
    updateType: ReferralUpdateType,
  ) => {
    const id = referral._id;
    let request = {} as updateReferralRequest;

    switch (updateType) {
      case ReferralUpdateType.ReferringStaff:
        request = {
          id,
          housingLocator: referral.assignedHousingLocator?._id,
          referringStaff: (value as User)._id,
          status: referral.status,
        };
        break;
      case ReferralUpdateType.HousingLocator:
        request = {
          id,
          housingLocator: (value as User)._id,
          referringStaff: referral.assignedReferringStaff._id,
          status: referral.status,
        };
        break;
      default:
        request = {
          id,
          housingLocator: referral.assignedHousingLocator?._id,
          referringStaff: referral.assignedReferringStaff._id,
          status: value as ReferralStatus,
        };
        break;
    }

    updateReferral(request)
      .then((result) => {
        if (result.success) {
          getAllReferrals();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          onSubmit={getAllReferrals}
        />
      </ReferralTableTitleSection>

      <Table
        columns={TableColumnNames}
        rows={referrals.map((referral, idx) => {
          const {
            status,
            renterCandidate,
            assignedReferringStaff,
            assignedHousingLocator,
            updatedAt,
          } = referral;
          return [
            renterCandidate.firstName + " " + renterCandidate.lastName,
            <>
              {renterCandidate.email} <br /> {renterCandidate.phone}
            </>,
            <UserDropdown
              key={`rs-select-${idx}`}
              width="100%"
              placeholder="Search"
              onSelect={(value) => {
                handleUpdate(referral, value as User, ReferralUpdateType.ReferringStaff);
              }}
              initialSelection={assignedReferringStaff}
              options={allReferringStaff}
            />,
            <UserDropdown
              key={`hl-select-${idx}`}
              width="100%"
              placeholder="Search"
              onSelect={(value) => {
                handleUpdate(referral, value as User, ReferralUpdateType.HousingLocator);
              }}
              initialSelection={assignedHousingLocator}
              options={allHousingLocators}
            />,
            <ReferralTableDropDown
              key={`status-select-${idx}`}
              onSelect={(value) => {
                handleUpdate(referral, value, ReferralUpdateType.Status);
              }}
              values={REFERRAL_STATUSES}
              defaultValue={status}
            />,
            <>{formatDate(updatedAt.toString())}</>,
          ];
        })}
        rowsPerPage={ENTRIES_PER_PAGE}
      />
    </ReferralTableContainer>
  );
};
