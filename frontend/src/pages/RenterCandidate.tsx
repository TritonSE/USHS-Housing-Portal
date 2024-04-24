import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getRenterCandidate, RenterCandidate } from "@/api/renter-candidates";
import { Page } from "@/components";
import { Button } from "@/components/Button";
import { NavBar } from "@/components/NavBar";

// import { RenterCandidateTable } from "@/components/RenterCandidateTable";

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fbf7f3;
  margin: 97px;
  gap: 35px;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const InfoRow = styled(Row)`
  gap: 150px;
  align-items: flex-start;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.p`
  font-size: 32px;
  font-family: "Inter";
  font-weight: 650;
`;

const Id = styled.p`
  font-size: 25px;
  font-family: "Neutraface Text";
  font-weight: 600;
`;

const InfoHeader = styled.p`
  font-size: 18px;
  font-family: "Montserrat";
  font-weight: 600;
`;

const InfoText = styled(InfoHeader)`
  font-weight: 400;
`;

const EditButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export function RenterCandidate() {
  const navigate = useNavigate();
  const [renterCandidate, setRenterCandidate] = useState<RenterCandidate>();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const fetchRenterCandidate = () => {
    if (id !== undefined) {
      setLoading(true);
      void getRenterCandidate(id).then((result) => {
        if (result.success) {
          setRenterCandidate(result.data);
        } else {
          // Go back to the home page if the renter is not found
          navigate("/");
        }
        setLoading(false);
      });
    }
  };

  React.useEffect(fetchRenterCandidate, []);

  if (loading || !renterCandidate) {
    // TODO: Loading state
    return null;
  }

  return (
    <Page>
      <Helmet>
        <title>
          {renterCandidate.firstName} {renterCandidate.lastName} | USHS Housing Portal
        </title>
      </Helmet>
      <NavBar />
      <MainColumn>
        <TopRow>
          {/* <Link to="/"> */}
          <Button kind="secondary">
            <img
              className="back-arrow"
              src="/back_arrow.svg"
              alt={"Back arrow"}
              style={{ marginRight: "12px" }}
            />
            Back to Listing
          </Button>
          {/* </Link> */}
          <EditButton kind="secondary">
            <img src={"/pencil.svg"} alt="" style={{ marginRight: "12px" }} />
            Edit
          </EditButton>
        </TopRow>
        <Row>
          <Title>
            {renterCandidate.firstName} {renterCandidate.lastName}
          </Title>
          <Id>#{renterCandidate.uid}</Id>
        </Row>
        <InfoRow>
          <InfoColumn>
            <InfoHeader>Contact Info:</InfoHeader>
            <InfoText>Phone: {renterCandidate.phone}</InfoText>
            <InfoText>Email: {renterCandidate.email}</InfoText>
          </InfoColumn>
          <InfoColumn>
            <InfoHeader>Family Information:</InfoHeader>
            <InfoText>Number of Adults: {renterCandidate.adults}</InfoText>
            <InfoText>Number of Children: {renterCandidate.children}</InfoText>
          </InfoColumn>
          <InfoColumn>
            <InfoHeader>Housing Program:</InfoHeader>
            <InfoText>{renterCandidate.program}</InfoText>
          </InfoColumn>
        </InfoRow>
        <TableContainer>
          <Title>Current Referrals</Title>
          {/* <RenterCandidateTable /> */}
        </TableContainer>
      </MainColumn>
    </Page>
  );
}
