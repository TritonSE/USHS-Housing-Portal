import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { getAllReferrals } from "@/api/referrals";
import { Referral } from "@/api/units";
import { Button } from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import { Page } from "@/components/Page";
import ReferralFilter from "@/components/ReferralFilter";
import { Table, TableCellContent } from "@/components/Table";
import { DataContext } from "@/contexts/DataContext";

const TABLE_COLUMN_NAMES = [
  "Name",
  "Email",
  "Phone Number",
  "ID",
  "Referring Staff",
  "View",
  "Delete",
];
const ENTRIES_PER_PAGE = 6;

const HeaderText = styled.h1`
  color: black;
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 0.64px;
  word-wrap: break-word;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 50px 96px 50px 96px;
  justify-content: space-between;
`;

const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 27px;
`;

const TableWrapper = styled.div`
  margin: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const DeleteIcon = styled.img`
  align-items: center;
  width: 20px;
  height: 22px;

  cursor: pointer;
  transition: filter 0.3s;

  &:hover {
    filter: brightness(1.4);
  }
`;

const ViewButton = styled(Link)`
  align-items: center;
  width: 88px;
  height: 40 px;

  padding: 8px 24px 8px 24px;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid #b64201;

  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #b64201;
  text-decoration: none;

  &:hover {
    background: #ec85371a;
  }
`;

export function Referrals() {
  //const dataContext = useContext(DataContext);

  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [viewMode, setViewMode] = useState("My Clients");

  const getReferrals = () => {
    getAllReferrals()
      .then((res) => {
        if (res.success) {
          setReferrals(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReferrals();
  }, []);

  const handleViewModeChange = (mode: string) => {
    setViewMode(mode);
  };

  // const filteredReferrals = referrals.filter((referral) => {
  //   if (viewMode === "My Clients") {
  //     // Filter logic for "My Clients" view mode
  //     return referral.assignedReferringStaff === dataContext.currentUser;
  //   } else {
  //     return true;
  //   }
  // });

  return (
    <Page>
      <NavBar page="Referrals" />
      <TopRow>
        <HeaderText>Referrals</HeaderText>
        <FilterContainer>
          <ReferralFilter
            option1="My Clients"
            option2="All Clients"
            //onViewModeChange={handleViewModeChange}
          ></ReferralFilter>
          <AddButton kind="primary">
            <img src={"/plus_sign.svg"} alt="" style={{ marginRight: "8px" }} />
            Add Client
          </AddButton>
        </FilterContainer>
      </TopRow>
      <TableWrapper>
        <Table
          columns={TABLE_COLUMN_NAMES}
          rows={
            referrals
              ? referrals.map((referral, idx) => {
                  const { renterCandidate, assignedReferringStaff } = referral;

                  return [
                    renterCandidate.firstName + " " + renterCandidate.lastName,
                    renterCandidate.email,
                    renterCandidate.phone,
                    renterCandidate._id,
                    assignedReferringStaff.firstName + " " + assignedReferringStaff.lastName,
                    <ViewButton key={`view-${idx}`} to={`/candidate/${renterCandidate._id}`}>
                      View
                    </ViewButton>,
                    <DeleteIcon
                      key={`delete-${idx}`}
                      src="/trash-can.svg"
                      onClick={() => {
                        // TODO
                      }}
                    />,
                  ] as TableCellContent[];
                })
              : []
          }
          rowsPerPage={ENTRIES_PER_PAGE}
        />
      </TableWrapper>
    </Page>
  );
}
