import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { Referral, getUnitReferrals } from "@/api/units";
import { Button } from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import { Page } from "@/components/Page";
import ReferralFilter from "@/components/ReferralFilter";
import { Table } from "@/components/Table";
import { DataContext } from "@/contexts/DataContext";

const columns = ["Name", "Email", "Phone Number", "ID", "Referring Staff", "View", "Delete"];
const rowsPerPage = 6;

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

export function Referrals() {
  // const dataContext = useContext(DataContext);
  // const [referrals, setReferrals] = useState<Referral[]>([]);

  return (
    <Page>
      <NavBar page="Referrals" />
      <TopRow>
        <HeaderText>Referrals</HeaderText>
        <FilterContainer>
          <ReferralFilter option1="My Clients" option2="All Clients"></ReferralFilter>
          <AddButton kind="primary">
            <img src={"/plus_sign.svg"} alt="" style={{ marginRight: "8px" }} />
            Add Client
          </AddButton>
        </FilterContainer>
      </TopRow>
      <TableWrapper>
        <Table columns={columns} rows={referrals} rowsPerPage={rowsPerPage}></Table>
      </TableWrapper>
    </Page>
  );
}
