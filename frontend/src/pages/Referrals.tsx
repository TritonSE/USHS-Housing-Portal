import styled from "styled-components";

import { Button } from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import { Page } from "@/components/Page";
import ReferralFilter from "@/components/ReferralFilter";

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

export function Referrals() {
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
    </Page>
  );
}
