import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Button } from "./Button";
import { referralRow } from "./ReferralTableRow";
import { TablePagination } from "./TablePagination";

import { updateReferral, updateReferralRequest } from "@/api/referrals";
import { RenterCandidate, getRenterCandidate } from "@/api/renter-candidates";
import { Referral, getUnitReferrals } from "@/api/units";
import { User } from "@/api/users";
import { ReferralPopup } from "@/components/ReferralPopup";
import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";

// type ReferralTableProps = {
//   id: string;
// };

const ENTRIES_PER_PAGE = 5;

const TableColumnNames = ["Unit", "Housing Locator", "Status", "Last Updated", "Delete"];

const ReferralTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
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
  display: flex;
  justify-content: flex-start;
  color: var(--Neutral-Black, #000);

  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: 0.32px;
  width: 10vw;
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

export const RenterCandidateTable = (id: any) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referringStaff, setReferringStaff] = useState<User[]>([]);
  const [housingLocators, setHousingLocators] = useState<User[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [popup, setPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [renterReferrals, setRenterReferrals] = useState<Referral[]>([]);

  //   const getAllReferringStaff = (): User[] => {
  //     const users = dataContext.allUsers;
  //     return users;
  //   };

  //   const getAllHousingLocators = (): User[] => {
  //     return dataContext.allHousingLocators;
  //   };

  //   const getAllReferrals = () => {
  //     getUnitReferrals(props.id)
  //       .then((res) => {
  //         if (res.success) {
  //           setReferrals(res.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   React.useEffect(() => {
  //     if (authContext.currentUser) {
  //       getAllReferrals();
  //     }
  //     if (dataContext) {
  //       setReferringStaff(getAllReferringStaff());
  //       setHousingLocators(getAllHousingLocators());
  //     }
  //   }, [authContext, dataContext]);

  //   const getReferringStaff = (assignedReferringStaff: User): string => {
  //     const staff = referringStaff.find((manager) => manager._id === assignedReferringStaff._id);
  //     return staff === undefined ? "N/A" : staff.firstName + " " + staff.lastName;
  //   };

  //   const getHousingLocator = (assignedHousingLocator: User): string => {
  //     if (!assignedHousingLocator) {
  //       return "N/A";
  //     }

  //     const locator = housingLocators.find(
  //       (currLocator) => currLocator._id === assignedHousingLocator._id,
  //     );
  //     return locator === undefined ? "N/A" : locator.firstName + " " + locator.lastName;
  //   };

  //   if (!authContext || !dataContext) {
  //     return <ReferralTablePlaceholder>Loading Referrals Table...</ReferralTablePlaceholder>;
  //   }

  //   const handleSelect = (value: string[], referral: Referral) => {
  //     const id = referral._id;
  //     let request = {} as updateReferralRequest;
  //     if (value[0] === "referringStaff") {
  //       request = {
  //         id,
  //         housingLocator: referral.assignedHousingLocator?._id,
  //         referringStaff: value[1],
  //         status: referral.status,
  //       };
  //     } else if (value[0] === "housingLocator") {
  //       request = {
  //         id,
  //         housingLocator: value[1],
  //         referringStaff: referral.assignedReferringStaff._id,
  //         status: referral.status,
  //       };
  //     } else {
  //       request = {
  //         id,
  //         housingLocator: referral.assignedHousingLocator?._id,
  //         referringStaff: referral.assignedReferringStaff._id,
  //         status: value[1],
  //       };
  //     }
  //     updateReferral(request)
  //       .then((result) => {
  //         if (result.success) {
  //           getAllReferrals();
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  const fetchRenterReferrals = () => {
    if (id !== undefined) {
      setLoading(true);
      console.log("id");
      console.log(id);
      void getRenterCandidate(id).then((result) => {
        if (result.success) {
          setRenterReferrals(result.data.referrals);
          console.log("renterReferrals");
          console.log(renterReferrals);
        } else {
          // Go back to the home page if the renter is not found
          navigate("/");
        }
        setLoading(false);
      });
    }
  };

  // React.useEffect(fetchRenterReferrals, []);

  return (
    <ReferralTableContainer>
      <ReferralTableColumnHeaders>
        {TableColumnNames.map((name, idx) =>
          idx === TableColumnNames.length - 1 ? (
            <ReferralTableColumnHeaderEnd key={idx}>{name}</ReferralTableColumnHeaderEnd>
          ) : (
            <ReferralTableColumnHeader key={idx}>{name}</ReferralTableColumnHeader>
          ),
        )}
      </ReferralTableColumnHeaders>

      {renterReferrals && renterReferrals.length > 0 ? (
        <>
          {renterReferrals
            .slice((pageNumber - 1) * ENTRIES_PER_PAGE, pageNumber * ENTRIES_PER_PAGE)
            .map((referral, idx) => (
              <referralTableRow
                key={Math.random()}
                index={idx}
                unit={referral.unitId}
                housingLocator={referral.assignedHousingLocator}
                status={referral.status}
                lastUpdate={referral.updatedAt.toString()}
                onSelect={(value) => {
                  handleSelect(value, referral);
                }}
              />
            ))}
          <ReferralTableFooter>
            <TablePagination
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
