import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button } from "./Button";
import { ReferralTableDropDown } from "./ReferralTableDropDown";
import { Table } from "./Table";
import { UserDropdown } from "./UserDropdown";
import { formatDate } from "./helpers";

import { UpdateReferralRequest, updateReferral } from "@/api/referrals";
import { REFERRAL_STATUSES, Referral, ReferralStatus, getUnitReferrals } from "@/api/units";
import { User } from "@/api/users";
import { ReferralPopup } from "@/components/ReferralPopup";
import { DataContext } from "@/contexts/DataContext";

const ENTRIES_PER_PAGE = 5;

const TABLE_COLUMN_NAMES = [
  "Name",
  "Contact Info",
  "Referring Staff",
  "Housing Locator",
  "Status",
  "Last Update",
];

const ReferralTableContainer = styled.div`
  margin-top: 0px;
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

const RenterCandidateLink = styled(Link)`
  text-align: center;
  text-decoration: underline;
  color: black;

  &:hover {
    color: #4248d4;
  }
`;

type ReferralTableProps = {
  id: string;
};

enum ReferralUpdateType {
  ReferringStaff = "referringStaff",
  HousingLocator = "housingLocator",
  Status = "status",
}

export const ReferralTable = (props: ReferralTableProps) => {
  const { currentUser, allReferringStaff } = useContext(DataContext);
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

  React.useEffect(getAllReferrals, []);

  const handleUpdate = (
    referral: Referral,
    value: User | ReferralStatus,
    updateType: ReferralUpdateType,
  ) => {
    const id = referral._id;
    let request = {} as UpdateReferralRequest;

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

    updateReferral(request).catch((error) => {
      console.log(error);
    });
  };

  const HLSection = (referral: Referral) => {
    if (currentUser?.isHousingLocator) {
      return (
        <UserDropdown
          width="100%"
          placeholder="Search"
          onSelect={(value) => {
            handleUpdate(referral, value as User, ReferralUpdateType.ReferringStaff);
          }}
          initialSelection={referral.assignedHousingLocator}
          options={allReferringStaff}
          isTableDropdown={true}
        />
      );
    }
    return (
      <>
        {referral.assignedHousingLocator.firstName + " " + referral.assignedHousingLocator.lastName}
      </>
    );
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
        columns={TABLE_COLUMN_NAMES}
        rows={referrals.map((referral, idx) => {
          const { status, renterCandidate, assignedReferringStaff, updatedAt } = referral;
          // Generate a list of cells for each row
          return [
            <RenterCandidateLink
              key={`renter-link-${idx}`}
              to={`/candidate/${renterCandidate._id}`}
            >
              {renterCandidate.firstName + " " + renterCandidate.lastName}
            </RenterCandidateLink>,
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
              isTableDropdown={true}
            />,
            HLSection(referral),
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
